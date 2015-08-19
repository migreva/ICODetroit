import request from 'request';
import Blog from './jsx/blog';
import React from 'react';
import Subpage from '../lib/subpage.js';

function init() {

  request.get('/blog/getPosts/', {
    baseUrl: window.location.origin
  }, (err, resp, body) => {
    if (err) throw Error(err);

    try {
      body = JSON.parse(body);
    }
    catch(e) {
      throw new Error(e);
    }

    let items = [];
    if (!('items' in body)) {
      console.log('No blog items found');
    } else {
      items = body.items;
    }

    let blogPosts = React.render(
      <Blog posts= { items }/>,
      document.getElementById('blog-posts')
    )


  });
}

module.exports = {
  init
}
