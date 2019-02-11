import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quote: "",
      author: ""
    };
    this.isClicked = this.isClicked.bind(this);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  componentWillMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let random = this.getRandomInt(data.quotes.length);
        this.setState(() => ({
          quotes: data.quotes,
          quote: data.quotes[random].quote,
          author: data.quotes[random].author
        }));
      })
      .catch(err => {});
  }

  isClicked() {
    let random = this.getRandomInt(this.state.quotes.length);
    setTimeout(() => {
      this.setState(() => ({
        quote: this.state.quotes[random].quote,
        author: this.state.quotes[random].author
      }));
    }, 200);
  }

  render() {
    return (
      <div className="box-wrapper">
        <div className="box-background">
          <div className="box-content">
            <h1>"{this.state.quote}"</h1>
            <p>-{this.state.author}</p>
            <Action passed={this.isClicked} />
          </div>
        </div>
      </div>
    );
  }
}

const Action = props => {
  return (
    <div class="box-button__next">
      <button className="twitter">Twitter</button>
      <button className="github">Facebook</button>
      <button className="next" onClick={props.passed}>
        New Quote
      </button>
    </div>
  );
};

export default Display;
