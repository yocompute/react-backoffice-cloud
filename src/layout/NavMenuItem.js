import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const NavMenuItem = ({ data }) => {
  const classes = useStyles();
  return (
    <NavLink to={data.path} className={classes.link}>
      <Tooltip title={data.tip} TransitionComponent={Fade} placement="right">
        <ListItem button>
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText>{data.text}</ListItemText>
        </ListItem>
      </Tooltip>
    </NavLink>
  );
};

export default NavMenuItem;
