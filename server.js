const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

let isLogged = true;


app.engine('.hbs', hbs());
app.set('view engine', '.hbs');


app.use('/user', (req, res, next) => {
  if(isLogged) next();
  else res.send('Please log in!');
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/user/settings', (req, res) => {
  res.render('user_settings');
});
app.get('/user/panel', (req, res) => {
  res.render('user_panel');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});