import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import "./App.css";


const DURATION = 240;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      quote: "",
      author: "",
      fadeTransition: null,
      fadeState: "fade-in",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // Perform this event when the app loads
  componentDidMount() {
    this.getQuote();
  }

  changeColour() {
    let randomColour = colours[Math.floor(Math.random() * colours.length)];
    document.body.style.transition = 0.24 + "s";
    document.body.style.backgroundColor = randomColour;
    document.getElementById('new-quote').style.backgroundColor = randomColour;
    document.getElementById('tweet-quote').style.backgroundColor = randomColour;
  }

  getQuote() {
    let url ="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    const timeout = setTimeout(() => {
      axios.get(url).then((response) => {
        let data = response.data["quotes"];
        let quoteNum = Math.floor(Math.random() * data.length);

        let randomQuote = data[quoteNum];
        this.setState({
          quote: randomQuote["quote"],
          author: randomQuote["author"],
          fadeTransition: timeout,
          fadeState: "fade-in",
        });
      });
    }, DURATION);

    clearTimeout(this.state.fadeTransition);

    this.setState({
      fadeState: "fade-out",
      fadeTransition: timeout,
    });
  }

  handleClick() {
    this.getQuote();
    this.changeColour();
  }

  render() {
    const { quote, author } = this.state;
    return (
      <div>

        <h1 className="title">Random Quote Generator</h1>
        <div id="quote-box">
          <div
            className={`quote-wrapper ${this.state.fadeState}`}
            style={{ transitionDuration: `${DURATION}ms` }}
          >
            <h3 id="text">{quote}</h3>
            <p id="author">-{author}</p>
          </div>

          <div className="button-container">
            <button id="new-quote" onClick={this.handleClick}>New quote</button>
            <a id="tweet-quote" target="blank" href="twitter.com/intent/tweet">
              <i id="twitter-icon" class="fab fa-twitter"></i>
            </a>
          </div>

        </div>
        <div className="author-container">
          <p>Project Made by Deval Panchal</p>
        </div>

      </div>
    );
  }
}

const colours = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
  '#4287f5',
  '#42e3f5',
  '#42f59e',
  '#894f62',
  '#bc4555',
  '#f5f5f5',
  '#3792cb',
  '#1c4966',
  '#0e2433'
];