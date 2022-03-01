
import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import propTypes from 'prop-types';

export default class App extends Component {
  
  render() {
    const apiKey = process.env.REACT_APP_NEWS_API
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News key="general"apiKey={apiKey} category="general" />} />
            <Route exact path="/business" element={<News key="business"apiKey={apiKey} category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment"apiKey={apiKey} category="entertainment" />} />
            <Route exact path="/health" element={<News key="health"apiKey={apiKey} category="health" />} />
            <Route exact path="/science" element={<News key="science"apiKey={apiKey} category="science" />} />
            <Route exact path="/sports" element={<News key="sports"apiKey={apiKey} category="sports" />} />
            <Route exact path="/technology" element={<News key="technology"apiKey={apiKey} category="technology" />} />
          </Routes>
        </BrowserRouter>

      </div >
    );
  }
}



