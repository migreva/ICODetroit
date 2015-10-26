import React from 'react';
import { union } from 'lodash';
import BlogPost from './blog-post';
import TagStore from '../store/tags';

var tagStore = new TagStore();

export default class Blog extends React.Component {
  constructor(args) {
    super(args);

    this.appliedFilters = [];
    this.state = {
      posts: this.parsePosts(this.props.posts)
    }
  }

  /**
   * Parse the posts and return an array of posts
   */
  parsePosts(posts) {
    for (let post of posts) {
      if (!post.labels) continue;
      for (let tagString of post.labels) {
        tagStore.addTag(tagString);
      }
    }

    return posts;
  }

  filterChange() {
    let posts = this.props.posts;
    let filters = tagStore.getActiveTags();
    this.setState({
      posts: this.filterPosts_(posts, filters)
    })
  }

  filterPosts_(posts, filters) {
    if (!filters.length) return posts;

    let filteredPosts = [];
    for (let post of posts) {

      let validPost = true;
      for (let filter of filters) {
        if (!post.labels || post.labels.indexOf(filter.toString()) < 0) {
          validPost = false;
          break;
        }
      }

      if (validPost) filteredPosts.push(post);
    }

    return filteredPosts;
  }

  renderBlogPost(post, index) {
    return (
      <BlogPost post={ post }/>
    )
  }

  renderAvailableFilter(filter, index) {
    return (
      <Filter tag={ filter.tag } count={ filter.count }/>
    )
  }

  render() {
    return (
      <div className='blog-container'>
        <div className='blog-posts'>
          { this.state.posts.map(this.renderBlogPost) }
        </div>

        <Filters filterCallback={ this.filterChange.bind(this) }/>
      </div>
    )
  }
}

class Filters extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      showFilters: false
    }
  }

  toggleFilters() {
    this.setState({
      showFilters: !this.state.showFilters
    });
  }

  selectFilter(filterString) {
    tagStore.activateTag(filterString);
    this.setState({
      filterSelect: true,
    });
    if (this.props.filterCallback) this.props.filterCallback();
  }

  removeFilter(filterString) {
    tagStore.deactivateTag(filterString);
    this.setState({
      filterRemove: true
    });
    if (this.props.filterCallback) this.props.filterCallback();
  }

  /**
   * @param {Tag} filter
   */
  renderActiveFilter(filter, index) {
    let filterString = filter.toString();
    return (
      <div className='filter active'>
        <span className='filter-content'>{ filterString }</span>
        <span className='remove-filter'
          onClick={ this.removeFilter.bind(this, filterString) }>
            X
        </span>
      </div>
    )
  }

  /**
   * @param {Tag} filter
   */
  renderAvailableFilter(filter, index) {
    let filterString = filter.toString();
    return (
      <div className='filter available'
        onClick={ this.selectFilter.bind(this, filterString) }>
          <span className='filter-content'>{ filterString }</span>
      </div>
    )
  }

  renderActiveFilters() {
    let activeFilters = tagStore.getActiveTags();

    if (!activeFilters.length) return null;

    return (
      <div className='filter-container active-filters'>
        <hr/>
        <div className='title'>Active Filters</div>
        { activeFilters.map(this.renderActiveFilter.bind(this)) }
      </div>
    )
  }

  renderAvailableFilters() {
    let inactiveFilters = tagStore.getInactiveTags();

    if (!inactiveFilters.length) return (
      <div className='filter-container'>
        No filters available
      </div>
    );

    return (
      <div className='filter-container available-filters'>
        { inactiveFilters.map(this.renderAvailableFilter.bind(this)) }
      </div>
    )
  }

  render() {

    return (
      <div className={ `filters ${this.state.showFilters ? 'show' : 'hide'}`}>
        <div className='filter-display-toggle' onClick={ this.toggleFilters.bind(this) }>Tags</div>
        <div className='filters-container'>
          { this.renderAvailableFilters() }
          { this.renderActiveFilters() }
        </div>
      </div>
    )
  }
}

