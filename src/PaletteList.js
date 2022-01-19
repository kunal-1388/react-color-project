import React from "react";
import { makeStyles } from "@mui/styles";
import MiniPaletts from "./MiniPaletts";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    height: "auto",
    backgroundColor: "blue",
    paddingBottom: "15%",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "auto",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    fontSize: "1rem",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    height: "max-content",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    columnGap: "5%",
    rowGap: "5%",
  },
});

function PaletteList(props) {
  const classes = useStyles();
  const palettelist = props.data;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettelist.map((el) => {
            return (
              <MiniPaletts data={el} history={props.history} key={el.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PaletteList;
