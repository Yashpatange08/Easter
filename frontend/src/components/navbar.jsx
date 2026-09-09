import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from "@mui/icons-material/Info";
import BookIcon from "@mui/icons-material/Book";
import ChatIcon from "@mui/icons-material/Chat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DescriptionIcon from "@mui/icons-material/Description";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext";

export default function Navbar(props) {
  const { drawerWidth, content } = props;
  
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { user, logout } = useAuth();

  const [open, setOpen] = React.useState(false);
  const changeOpenState = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" selected={"/" === path}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/Exams"
              selected={"/Exams" === path}
            >
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={"Exams"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/About"
              selected={"/About" === path}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/PYQs"
              selected={"/PYQs" === path}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={"PYQs"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/Notes"
              selected={"/Notes" === path}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={"Notes"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/Helper"
              selected={"/Helper" === path}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary={"Helper"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </div>
    
  );
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton 
            color="inherit"
            onClick={changeOpenState}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              flexGrow: 1,
            }}
          >
            Easter
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <>
                <Chip
                  label={user.username}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: "rgba(255,255,255,0.7)" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  size="small"
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/signup"
                  size="small"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": { bgcolor: "grey.100" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display:{xs:"none",sm:"block"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {myDrawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open = {open}
        onClose={changeOpenState}
        sx={{
          display:{xs:"block",sm:"none"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {myDrawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
