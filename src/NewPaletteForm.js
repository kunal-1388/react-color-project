import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@mui/material/Button";
import DraggableColorBox from "./DraggableColorBox";
import "./NewPaletteForm.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NewPaletteForm(props) {
  const theme = useTheme();
  const [state, setState] = useState({
    open: false,
    currcolor: "purple",
    colors: [],
    name: "",
    paletteName: "",
  });

  const handleDrawerOpen = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const handleDrawerClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  function handleClick() {
    const newColor = {
      name: state.name,
      color: state.currcolor,
    };
    setState({
      ...state,
      colors: [...state.colors, newColor],
      name: "",
    });
  }

  function handleChange(evt) {
    setState({
      ...state,
      name: evt.target.value,
    });
  }

  function handleSave() {
    // console.log("before");

    props.savePalette(state.colors, state.paletteName);
    props.history.push("/");
    // console.log("after");
  }

  function handlePaletteNameChange(evt) {
    setState({
      ...state,
      paletteName: evt.target.value,
    });
  }
  
  function handleDelete(name) {
    let map1 = state.colors.filter(
      (color) => color.name.toLowerCase() !== name.toLowerCase()
    );
    setState({
      ...state,
      colors: map1,
    });
  }

  useEffect(() => {
    ValidatorForm.addValidationRule("isValidColorName", (value) => {
      for (let color of state.colors) {
        if (color.name.toLowerCase() === value.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
    ValidatorForm.addValidationRule("isValidColor", (value) => {
      for (let color of state.colors) {
        if (color.color.toLowerCase() === state.currcolor.toLowerCase()) {
          return false;
        }
      }
      return true;
    });

    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      for (let palette of props.palettes) {
        if (palette.paletteName.toLowerCase() === value.toLowerCase()) {
          return false;
        }
        console.log(palette);
      }
      return true;
    });
  });

  let open = state.open;
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} sx={{ bgcolor: "azure" }}>
        <Toolbar className="toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <ValidatorForm
              className="palette-save-form"
              onError={(errors) => console.log(errors)}
              onSubmit={handleSave}
            >
              <TextValidator
                onChange={handlePaletteNameChange}
                name="paletteName"
                value={state.paletteName}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter Palette Name",
                  "Palette Name already exists",
                ]}
                placeholder="Palette Name"
              />
              <Button variant="contained" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* <ListItem button key={"inbox"}> */}
        <h3>Design Your Palette</h3>
        <div>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={state.currcolor}
          onChange={(color) => setState({ ...state, currcolor: color.hex })}
          onChangeComplete={(color) =>
            setState({ ...state, currcolor: color.hex })
          }
        />
        <ValidatorForm onSubmit={handleClick}>
          <TextValidator
            type="text"
            name="name"
            validators={["required", "isValidColorName", "isValidColor"]}
            errorMessages={[
              "Color name is required",
              "Color name already exists",
              "Color already exists",
            ]}
            onChange={handleChange}
            value={state.name}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ backgroundColor: state.currcolor }}
          >
            Add Color
          </Button>
        </ValidatorForm>

        {/* </ListItem> */}
      </Drawer>
      <Main open={open} id="main">
        <DrawerHeader />
        {state.colors.map((el) => (
          <DraggableColorBox
            color={el.color}
            name={el.name}
            handleDelete={handleDelete}
          />
        ))}
      </Main>
    </Box>
  );
}
