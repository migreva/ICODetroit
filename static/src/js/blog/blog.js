import request from 'request';
import BlogPost from './jsx/blog-post';
import React from 'react';

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

    if (!('items' in body)) {
      console.log('No blog items found');
    }

    let blogPosts = document.getElementById('blog-posts');
    for (let i = 0; i < body.items.length; i++) {
      let blogPost = body.items[i];

      let element = document.createElement('div');
      element.id = blogPost.id;
      blogPosts.appendChild(element);

      React.render(
        <BlogPost article={ blogPost }/>,
        element
      )
    }
  });
}

module.exports = {
  init
}