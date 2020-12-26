import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Sidebar from './Sidebar';
import Header from './Header';
import Routes from '../Routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  // appBar: {
  //     zIndex: theme.zIndex.drawer + 1,
  //     transition: theme.transitions.create(['width', 'margin'], {
  //         easing: theme.transitions.easing.sharp,
  //         duration: theme.transitions.duration.leavingScreen,
  //     }),
  // },
  // appBarShift: {
  //     marginLeft: drawerWidth,
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     transition: theme.transitions.create(['width', 'margin'], {
  //         easing: theme.transitions.easing.sharp,
  //         duration: theme.transitions.duration.enteringScreen,
  //     }),
  // },
  appBarSpacer: theme.mixins.toolbar,
  // menuButton: {
  //     marginRight: 36,
  // },
  // menuButtonHidden: {
  //     display: 'none',
  // },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    padding: theme.spacing(4),
  },
  // leftNav:{
  //     padding: theme.spacing(2),
  //     display: 'flex',
  //     overflow: 'auto',
  //     flexDirection: 'column',
  // }
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  // drawerPaper: {
  //     position: 'relative',
  //     whiteSpace: 'nowrap',
  //     width: drawerWidth,
  //     transition: theme.transitions.create('width', {
  //         easing: theme.transitions.easing.sharp,
  //         duration: theme.transitions.duration.enteringScreen,
  //     }),
  // },
}));

export default function Layout() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };
  return (
    <div className={classes.page}>
      <Header
        sidebarExpanded={sidebarExpanded}
        onToggle={handleSidebarToggle}
      />

      <Sidebar
        expanded={sidebarExpanded}
        onToggle={handleSidebarToggle}
      />

      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={fixedHeightPaper}>
          <Routes />
        </div>
      </div>

    </div>
  );
}
