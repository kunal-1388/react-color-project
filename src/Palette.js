import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    // console.log(level);
    this.setState({ level });
  }
  changeFormat(evt) {
    // console.log(evt.target.value);
    this.setState({
      format: evt.target.value,
    });
  }

  render() {
    // console.log(this.props.data);
    const { paletteName, emoji } = this.props.data;
    const colorsList = this.props.data.colors[this.state.level].map((el) => {
      // console.log(el);
      return (
        <ColorBox
          color={el}
          paletteId={this.props.data.id}
          colorFormat={this.state.format}
          key={el.id}
          showLink={true}
        />
      );
    });
    return (
      <div className="Palette">
        <Navbar
          level={this.state.level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          format={this.state.format}
          showLevel={true}
        />
        <div className="Palette-Colors">{colorsList}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
