import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
const useStyles = makeStyles({
  root: {
    display: "inline-block",
    width: "20%",
    height: "25%",
    marginTop: "0px",
    cursor: "pointer",
    marginBottom: "-4.5px",
    position: "relative",
  },
  content: {
    position: "absolute",
    bottom: "0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  colorName: {
    marginLeft: "0.3rem",
  },
  deleteIcon: {
    marginRight: "0.3rem",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.3)",
    },
  },
});

export default function DraggableColorBox(props) {
  const { root, content, colorName, deleteIcon } = useStyles();
  const { color, name } = props;

  return (
    <div className="root" className={root} style={{ backgroundColor: color }}>
      <div className={content}>
        <div className={colorName}>{name}</div>
        <div className={deleteIcon} onClick={() => props.handleDelete(name)}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
