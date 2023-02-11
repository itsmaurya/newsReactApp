import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'


export class News extends Component {

  constructor() {
    super();
    console.log("This is a constructor in News component");
    this.state = {
      articles: [],
      Loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=050a8a67452c4f1488f1ccd8e3ce9376"&page=1&pageSize=${this.props.pageSize}`
    this.setState({Loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(data);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,Loading:false })

  }

  handleNext = async () => {
    console.log("Next");
    if (!this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=050a8a67452c4f1488f1ccd8e3ce9376"&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({Loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(data);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        Loading:false
      })
    }

  }
  handlePre = async () => {
    console.log("Pre");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=050a8a67452c4f1488f1ccd8e3ce9376"&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({Loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(data);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      Loading:false
    })


  }
  render() {
    return (
      <div className='container my-3'>

        <h2>News Monkey- Top headline</h2>
        {this.state.Loading && <Spinner />}
        <div className="row mb-3">
          {this.state.Loading && this.state.articles.map((element) => {

            return <div className="col md-3" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })
          }
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePre}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News