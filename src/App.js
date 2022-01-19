import React, { Component } from "react";
import "./App.css";
import seedColors from "./seedColors";
import Palette from "./Palette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: seedColors,
    };
    this.savePalette = this.savePalette.bind(this);
  }
  findPalette(id) {
    for (let palette of this.state.colors) {
      if (palette.id === id) {
        return palette;
      }
    }
    return {};
  }
  savePalette(colorsArray, paletteName) {
    const newColor = {
      paletteName: paletteName,
      colors: colorsArray,
      id: paletteName.toLowerCase().split(" ").join("-"),
      emoji: "",
    };
    this.setState((st) => ({
      colors: [...st.colors, newColor],
    }));
    console.log(newColor);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={(routeProps) => (
              <NewPaletteForm
                palettes={this.state.colors}
                {...routeProps}
                savePalette={this.savePalette}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(routeProps) => {
              return (
                <PaletteList
                  {...routeProps}
                  data={this.state.colors}
                ></PaletteList>
              );
            }}
          />
          <Route
            exact
            path="/palette/:id"
            render={(routeProps) => {
              // console.log(routeProps.match.params.id);
              let palette = this.findPalette(routeProps.match.params.id);

              if (
                Object.keys(palette).length === 0 &&
                palette.constructor === Object
              ) {
                return <h1>enter a valid id</h1>;
              }

              return (
                <Palette {...routeProps} data={generatePalette(palette)} />
              );
            }}
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={(routeProps) => {
              // console.log(routeProps.match.params.id);
              let palette = this.findPalette(routeProps.match.params.paletteId);

              if (
                Object.keys(palette).length === 0 &&
                palette.constructor === Object
              ) {
                return <h1>enter a valid id</h1>;
              }

              return (
                <SingleColorPalette
                  {...routeProps}
                  colorId={routeProps.match.params.colorId}
                  data={generatePalette(palette)}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
