import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./SingleColorPalette.css";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shades: this.gatherShades(this.props.colorId),
      format: "hex",
    };
    this.gatherShades = this.gatherShades.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeFormat(evt) {
    // console.log(evt.target.value);
    this.setState({
      format: evt.target.value,
    });
  }

  gatherShades(colorId) {
    const colors = this.props.data.colors;
    let colorShades = [];
    for (let shade in colors) {
      for (let color of colors[shade]) {
        if (color.id === colorId) {
          colorShades.push(color);
        }
      }
    }
    return colorShades.slice(1);
  }

  render() {
    const { paletteName, emoji, id } = this.props.data;
    const colorBoxes = this.state.shades.map((el) => (
      <ColorBox
        color={el}
        paletteId={this.props.data.id}
        colorFormat={this.state.format}
        showLink={false}
        key={el.name}
      />
    ));
    return (
      <div className="SingleColorPalette-container">
        <Navbar
          level={this.state.level}
          handleChange={this.changeFormat}
          showLev
          el={false}
          format={this.state.format}
        />

        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to={`/palette/${id}`} className="go-back-button">
            Go Back
          </Link>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

// color={el}
//           paletteId={this.props.data.id}
//           colorFormat={this.state.format}
//           key={el.id}
