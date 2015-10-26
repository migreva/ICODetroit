import express from 'express';
import path from 'path';

import router from './router';

let app = express();

// Template language
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// Static file path
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use(router);

export default app;