import React, { Component } from 'react';
import NewsItem from './NewsItem';
import json from "../sampleResponse.json"
import propTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar'



export default class News extends Component {

    static defaultProps = {
        category: 'general',
    }

    static propTypes = {
        category: propTypes.string,
    }


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            progress: 0
        }

    }



    async componentDidMount() {
        let url = `https://newsapi.org/v2/everything?q=${this.props.category}&sortBy=publishedAt&apiKey=${this.props.apiKey}&page=1&pageSize=6`;
        let data = await fetch(url);
        this.setState({ progress: 30 })
        let parsedData = await data.json();
        this.setState({ progress: 60 })
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, progress: 100 });
    }

    handlePrevClick = async () => {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/everything?q=${this.props.category}&sortBy=publishedAt&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=6`;
        let data = await fetch(url);
        this.setState({ progress: 30 })
        let parsedData = await data.json();
        this.setState({ progress: 60 })
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false,
            progress: 100
        });

    }
    handleNextClick = async () => {

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 6)) { }
        else {
            this.setState({ loading: true });
            let url = `https://newsapi.org/v2/everything?q${this.props.category}&sortBy=publishedAt&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=6`;
            let data = await fetch(url);
            this.setState({ progress: 30 })
            let parsedData = await data.json();
            this.setState({ progress: 60 })
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
                progress: 100
            });
        }
    }

    render() {
        return (
            <>
                <LoadingBar
                    color="red"
                    width="5px"
                    progress={this.state.progress}
                    onLoaderFinished={() => this.setState({ progress: 0 })}
                />
                <div className="container my-3">
                    <h1 className='text-center'>NewsMonkey - Top Headlines Today</h1>
                    <div className="row">
                        {this.state.loading === true ? <div className="loading"><img src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" width="40%" alt="spinner" /></div> : this.state.articles?.map((element) => {
                            return <div className="col-md-4 transi" key={element.content + Math.floor((Math.random() * 100) + 1)}>
                                <NewsItem title={element.title ? element.title.slice(0, 79) : ""} description={element.description ? element.description.slice(0, 145) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} info={element.source.name} />
                            </div>
                        })}
                    </div>{
                        this.state.loading === false ?
                            <div className="container d-flex justify-content-between">
                                <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                            </div> : <></>
                    }
                </div>
            </>
        );
    }
}
