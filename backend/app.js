import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

import indexRouter from './src/routes/api.js';

var app = express();


app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('🚀 Servidor rodando!');
});

export default app;
