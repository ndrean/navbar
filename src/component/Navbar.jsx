import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import history from "../utils/history";

import SgnButton from "./SgnButton";

import KiteLogo from "../img/kitesurfingLogo.svg";

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Badge,
  MenuItem,
  Menu,
  Link,
  Icon,
  Box,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  AccountCircle,
  PeopleAltRounded,
  VisibilityRounded,
  Contacts,
  Info,
  LockOpenOutlined,
  ContactsOutlined,
  // ErrorOutline,
  HomeOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    marginRight: theme.spacing(2),
  },
  midway: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
}));

const defaultBoxProps = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  style: { width: "5rem", height: "3rem", backgroundColor: "#3f51b5" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "5px",
};

const LinkItem = ({ to, handler, text, children }) => {
  return (
    <MenuItem component={Link} href={to} onClick={action(handler)}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
    </MenuItem>
  );
};

const Navbar = observer(({ store, ...props }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // <- drawer
  const [state, setState] = React.useState({ left: false });
  const anchor = "left";
  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className={classes.list} role="presentation">
      <List>
        {["Home", "About", "Login in"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 && (
                <LinkItem to="/" handler={handleMenuClose} text={text}>
                  <HomeOutlined />
                </LinkItem>
              )}
              {index === 1 && (
                <LinkItem to="/about" handler={handleAbout} text={text}>
                  <Info />
                </LinkItem>
              )}
              {index === 2 && (
                <LinkItem
                  to="/signinform"
                  handler={handleMenuClose}
                  text={text}
                >
                  <LockOpenOutlined />
                </LinkItem>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Contacts", "Add Contact"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 && (
                <LinkItem to="/contacts" handler={handleMenuClose} text={text}>
                  <ContactsOutlined />
                </LinkItem>
              )}
              {index === 1 && (
                <LinkItem to="/addusers" handler={handleMenuClose} text={text}>
                  <Contacts />
                </LinkItem>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );
  // drawer -<

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleAbout(e) {
    store.inc(); // <- ok for Mobx
    handleMenuClose(e);
  }

  function handleLogin(e) {
    handleMenuClose(e);
    e.preventDefault();
    history.push({ pathname: e.currentTarget.pathname });
  }
  function handleMenuClose(e) {
    setAnchorEl(null);
    setState({ ...state, left: false });
    e.preventDefault();
    history.push({ pathname: e.currentTarget.pathname });
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} href="/signinform" onClick={handleLogin}>
        Login in
      </MenuItem>
      <MenuItem component={Link} href="/t" onClick={handleMenuClose}>
        Sign up
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show number views" color="inherit">
          <Badge badgeContent={store.nb} color="secondary">
            <VisibilityRounded />
          </Badge>
        </IconButton>
        <p>Views</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show number contacts" color="inherit">
          <Badge badgeContent={store.nbUsers} color="secondary">
            <PeopleAltRounded />
          </Badge>
        </IconButton>
        <p>Contacts</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="sticky">
          <Toolbar>
            <Button
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>

            <Typography className={classes.midway} variant="h6" noWrap>
              The DownWinder
            </Typography>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              style={{ marginLeft: "50px" }}
            >
              <Box borderRadius={10} {...defaultBoxProps}>
                <SgnButton store={store} />
              </Box>
            </Typography>
            <div className={classes.grow}>
              <Typography>
                <Icon classes={{ root: classes.iconRoot }}>
                  <img
                    component="img"
                    alt="logo"
                    className={classes.imageIcon}
                    src={KiteLogo}
                    loading="lazy"
                    style={{ width: 40 }}
                  />
                </Icon>
                {/* <Logo style={{ width: 40 }} /> */}
                {/* <img alt="logo" src={KiteLogo}  /> */}
              </Typography>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show number contacts" color="inherit">
                <Badge badgeContent={store.nbUsers} color="secondary">
                  <PeopleAltRounded />
                </Badge>
              </IconButton>
              <IconButton aria-label="show new views" color="inherit">
                <Badge badgeContent={store.nb} color="secondary">
                  <VisibilityRounded />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <Badge
                  badgeContent={store.nbUsers + store.nb}
                  color="secondary"
                >
                  <MoreIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </>
  );
});

export default Navbar;
