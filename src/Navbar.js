import React, { Component } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.changeColorFormat = this.changeColorFormat.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }
  changeColorFormat(evt) {
    this.props.handleChange(evt);
    this.setState({
      open: true,
    });
  }
  handleSnackbar() {
    this.setState((st) => ({
      open: !st.open,
    }));
  }

  render() {
    const { showLevel } = this.props;
    return (
      <div className="Navbar">
        <div className="Logo">
          <Link to="/">Color Project</Link>
        </div>
        {showLevel && (
          <div className="slider">
            <h5>Level:{this.props.level}</h5>
            <Slider
              min={100}
              max={900}
              onChange={this.props.changeLevel}
              defaultValue={this.props.level}
              step={100}
            />
          </div>
        )}
        <div className="select-container">
          <Box className="select-container-box" sx={{ minWidth: 140 }}>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">
                Color Format
              </InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.props.format}
                label="Age"
                onChange={this.changeColorFormat}
              >
                <MenuItem value="hex">HEX-#ffffff</MenuItem>
                <MenuItem value="rgb">RGB(255,255,255)</MenuItem>
                <MenuItem value="rgba">RGBA(255,255,255,1.0)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleSnackbar}
          message="Color Format Changed"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={this.handleSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    );
  }
}
