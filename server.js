require('dotenv').config();
const express = require('express');
const db = require('./util/dbConnection');
const app = express();
const nunjucks = require('nunjucks');

nunjucks.configure("./", {
    express: app,
    noCache: true
});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/pages', (_, res) => {
    db.query("select * from donors", (err, result) => {
        if (err) return res.send(`<h1>Erro 500</h1><h3>${err}</h3>`);
        const donors = result.rows;

        return res.render('index.html', { donors });
    });

});
app.post('/', (req, res) => {
    const { name, email, bloodType } = req.body;

    if (!name || !email || !bloodType) {
        return res.send("<h1>Erro 401</h1><h3>Todos os campos são obrigatorios</h3>");
    }
    const query = `insert into donors ("name","email","bloodType") VALUES 
    ($1,$2,$3)`
    db.query(query, [name, email, bloodType], err => {
        if (err) return res.send(`<h1>Erro 500</h1><h3>${err}</h3>`);

        return res.redirect('/');
    });

});

app.listen(3000, () => {
    console.log("Server Started 2");
});