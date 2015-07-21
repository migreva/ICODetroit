import request from 'request';

function init() {

  request.get('/blog/getPosts/', {
    baseUrl: window.location.origin
  }, (err, resp, body) => {
    if (err) throw Error(err);

    console.log(body);
  });
}

module.exports = {
  init
}