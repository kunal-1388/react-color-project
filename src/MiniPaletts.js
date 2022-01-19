import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    backgroundColor: "gray",
    height: "140px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",

    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4.5px",
  },
});

function MiniPaletts(props) {
  const classes = useStyles();
  const { paletteName, emoji, colors, id } = props.data;
  let history = props.history;
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      key={color.name}
      style={{ backgroundColor: color.color }}
    ></div>
  ));
  // console.log(props);
  function handleClick(id) {
    history.push(`/palette/${id}`);
  }

  return (
    <div className={classes.root} onClick={() => handleClick(id)}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default MiniPaletts;
