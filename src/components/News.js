import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:6,
    category:'general',
  }  
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }  

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

async updateNews(){
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0407a8f741d4a1db6d9efad964b8e3b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false,
});
}

  async componentDidMount() {
   this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  };

  handleNextClick = async () => { 
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">Today's Breaking News</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div
                    className="col-md-4 d-flex justify-content-center"
                    key={element.url}
                  >
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page >=
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}