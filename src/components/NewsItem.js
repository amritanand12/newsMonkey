import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, info } = this.props;
        return (
            <div className='my-3' >
                <div className="card">
                    <img className="card-img-top position-relative" src={imageUrl} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{title}  <span className="badge rounded-pill bg-success" style={{opacity: '0.8'}}>
                            {info}
                        </span></h5>
                        <p className="card-text text-truncate">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-success">Read More</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
