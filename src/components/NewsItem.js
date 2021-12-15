import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card text-center">
      <span class="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{zIndex:1,left:"50%"}}>{source}</span>
          <img src={!imageUrl?"https://images.unsplash.com/photo-1493612276216-ee3925520721?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
                {description}...
            </p>
            <p className="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-danger">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
