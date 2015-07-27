import express from 'express.io';
import path from 'path';
import config from '../config';
import router from './routes/router';
import sockets from './routes/sockets';

let app = express();

// Template language
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// Static file path
console.log(path.join(__dirname, '../static'));
app.use(express.static(path.join(__dirname, '../static')));

router.init(app);
// sockets.init(app);

if (!config.PROD) {
  let server = app.listen(3001, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

  });
}
