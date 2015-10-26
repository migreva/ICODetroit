import Router from 'express';
import { blogger } from '../../config';
import request from 'request';

export default class Blogger {

  constructor() {
    this.cache = undefined;
    this.apiRoot = 'https://www.googleapis.com/blogger/v3/';
    this.api = {
      posts: {
        url: `blogs/${blogger.blogId}/posts`,
        urlParams: {
          maxResults: 10,
        }
      }
    }
    this.timeout = 1000 * 60 * 60; // 1 hour

    this.setRoutes();

    this.bloggerLoop().catch(function(e) {
      throw new Error(e);
    });
  }

  setRoutes() {
    this.router = Router();

    this.router.get('/getPosts/', async (req, res) => {
      if (this.cache) {
        res.json(this.cache);
        return;
      }

      let articles;
      try {
        articles = await this.fetchArticles();
        res.json(articles);
      }
      catch(e) {
        res.status(500).json(e);
      }
    });
  }

  async bloggerLoop() {

    try {
      this.cache = await this.fetchArticles()
    }
    catch(e) {
      console.error(e);
    }

    setTimeout(() => {
      this.bloggerLoop.call(this).catch(function(e) {
        throw new Error(e);
      });
    }, this.timeout)
  }

  fetchArticles() {
    return new Promise((resolve, reject) => {

      let url = this.getUrl('posts');
      console.log(`Fetching ${url}`);
      request.get(url, (err, resp, body) => {
        console.log(resp.statusCode);
        if (err || resp.statusCode != 200) reject(err);

        let response = {};

        try {
          response = JSON.parse(body);
        }
        catch(e) {
          console.log(`Error parsing blogger response`);
          console.log(body);
          throw new Error(e);
        }

        resolve(response);
      });
    });
  }

  getUrl(path) {
    if (!(path in this.api)) throw Error(`Path ${path} not found`);
    let api = this.api[path];

    let urlParams = `key=${blogger.apiKey}&`;
    if (urlParams in api.urlParams) {
      for (let param in api.urlParams) {
        urlParams += `${param}=${api.urlParams[param]}&`;
      }
    }
    urlParams = urlParams.slice(0, -1);

    return `${ this.apiRoot }${ api.url }?${ urlParams }`;
  }
}
