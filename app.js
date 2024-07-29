const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.redirect('/customers');
});

app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', { route: '/dashboard' });
});

app.get('/product', (req, res) => {
    res.render('pages/product', { route: '/product' });
});

app.get('/customers', (req, res) => {
    res.render('pages/customers', { route: '/customers' });
});

app.get('/income', (req, res) => {
    res.render('pages/income', { route: '/income' });
});

app.get('/promote', (req, res) => {
    res.render('pages/promote', { route: '/promote' });
});

app.get('/help', (req, res) => {
    res.render('pages/help', { route: '/help'});
});

app.get('/profile', (req, res) => {
    res.render('pages/profile', { route: '/profile' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
