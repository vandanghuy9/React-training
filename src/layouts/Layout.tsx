import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { default as MenuIcon } from "@mui/icons-material/Menu";
import SideBar from "./sidebar/SideBar";

const styles = {
  root: {
    display: "flex",
  },
  appBar: (theme: any) => ({
    // position: "sticky", // sticky is not supported by IE11.
    top: 0,
    transition: theme.transitions.create("top"),
    backdropFilter: "blur(20px)",
    boxShadow: `inset 0px -1px 1px ${theme.palette.grey[100]}`,
    backgroundColor: "rgba(255,255,255,0.72)",
    zIndex: theme.zIndex.drawer + 1,
  }),
  menuButton: {
    marginRight: 3,
    width: 48,
    height: 48,
  },
  sectionDesktop: (theme: any) => ({
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  }),
  appName: (theme: any) => ({
    paddingLeft: 0.5,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  }),
};

const Layout = ({ children }: any) => {
  const Main = styled("main")(({ theme, isOpen }) => ({
    flexShrink: 1,
    flexGrow: 1,
    maxWidth: "100%",
    padding: theme.spacing(3),
    transition: theme.transitions.create(["maxWidth", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -300,
    ...(isOpen
      ? {
          maxWidth: "calc(100% - 300px)",
          transition: theme.transitions.create(["maxWidth", "margin"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }
      : {}),
  }));
  const Offset = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const [open, setOpen] = useState(true);

  return (
    <Box sx={styles.root}>
      <AppBar position="fixed" color="inherit" sx={styles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={styles.appName} variant="h6" noWrap>
            Open ERP
          </Typography>

          {/* Use this div tag to push the icons to the right */}
        </Toolbar>
      </AppBar>
      <SideBar open={open} />
      <Main isOpen={open}>
        <Offset />
        {children}
      </Main>
    </Box>
  );
};

export default Layout;
