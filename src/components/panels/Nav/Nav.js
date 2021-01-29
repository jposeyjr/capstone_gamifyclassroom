import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import useStyles from './styles';

const Nav = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [menuOpen, setOpen] = useState(false);
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  //if the user is an admin or teacher show the teacher home page
  if (props.store.user.id != null && props.store.user.role_id === 2) {
    loginLinkData.path = '/teacherhome';
    loginLinkData.text = 'Home';
  }

  //if the user is not an admin or teacher show the student home page
  if (props.store.user.id != null && props.store.user.role_id === 3) {
    loginLinkData.path = '/student';
    loginLinkData.text = 'Home';
  }

  if (props.store.user.id == null) {
    loginLinkData.path = '/';
    loginLinkData.text = 'Home';
  }

  const handleDrawerOpen = () => {
    setOpen(!menuOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            className={classes.menuButton}
            aria-label='Menu'
          >
            <MenuIcon className={classes.icon} />
          </IconButton>
          <Typography className={classes.title} variant='h1'>
            Gamified Classroom
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          onBackdropClick: handleDrawerClose,
          keepMounted: true,
        }}
        open={menuOpen}
        anchor='left'
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronLeftIcon className={classes.icon} />
          </IconButton>
        </div>
        <List className={classes.listItems}>
          <ListItem button component={Link} to={loginLinkData.path}>
            <ListItemIcon>
              <HomeIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText>{loginLinkData.text}</ListItemText>
          </ListItem>
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {/* Always show this link since the about page is not protected */}
          <ListItem button component={Link} to={'/about'}>
            <ListItemIcon>
              <InfoIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
          {props.store.user.id && (
            <>
              <ListItem button onClick={() => dispatch({ type: 'LOGOUT' })}>
                <ListItemIcon>
                  <ExitToAppIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
