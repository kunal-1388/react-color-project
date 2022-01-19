import React, { Component } from "react";
import "./PaletteFooter.css";
export default class PaletteFooter extends Component {
  render() {
    const { paletteName, emoji } = this.props;
    return (
      <div className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </div>
    );
  }
}
