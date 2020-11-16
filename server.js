const express = require('express');
const path = require('path');

const app = express();

let isLogged = false;

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use('/user', (req, res, next) => {
  if(isLogged) next();
  else res.send('Please log in!');
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});
app.get('/user/settings', (req, res) => {
  res.show('user_settings.html');
});
app.get('/user/panel', (req, res) => {
  res.show('user_panel.html');
});

app.use((req, res) => {
  res.status(404).send('<h1>Nothing here...</h1><br><img src="tenor.gif">');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});