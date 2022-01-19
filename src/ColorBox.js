import React, { Component } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
    this.handleState = this.handleState.bind(this);
  }

  handleState() {
    this.setState(
      {
        copied: true,
      },
      () => {
        setTimeout(
          () =>
            this.setState({
              copied: false,
            }),
          1500
        );
      }
    );
  }

  render() {
    // console.log(this.props.color);
    const color = this.props.color[this.props.colorFormat];
    const { showLink } = this.props;
    // console.log(color);
    const paletteId = this.props.paletteId;
    const colorId = this.props.color.id;
    return (
      <CopyToClipboard text={color}>
        <span
          className="ColorBox"
          style={{ backgroundColor: color }}
          onClick={this.handleState}
        >
          <div
            className={`overlay ${this.state.copied ? "show" : ""}`}
            style={{ backgroundColor: color }}
          ></div>
          <div className={`copy-msg ${this.state.copied ? "show" : ""}`}>
            <h1>Copied!!</h1>
            <p>{color}</p>
          </div>
          <div className="ColorBox-ColorName">{this.props.color.name}</div>

          <button className="ColorBox-CopyButton">Copy</button>

          {showLink && (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ColorBox-More">
                <span>More</span>
              </div>
            </Link>
          )}
        </span>
      </CopyToClipboard>
    );
  }
}
