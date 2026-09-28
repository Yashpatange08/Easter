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
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../context/AuthContext";

export default function Navbar(props) {
  const { drawerWidth, content } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.toLowerCase();
  const { user, logout, backendOnline } = useAuth();

  const [open, setOpen] = React.useState(false);
  const changeOpenState = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = () => {
    if (open) setOpen(false);
  };

  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              selected={"/" === currentPath}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <HomeIcon color={"/" === currentPath ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/pyqs"
              selected={currentPath.startsWith("/pyq")}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <DescriptionIcon color={currentPath.startsWith("/pyq") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText
                primary={"PYQs (Question Papers)"}
                primaryTypographyProps={{ fontWeight: currentPath.startsWith("/pyq") ? 700 : 500 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/notes"
              selected={currentPath.startsWith("/note")}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <LibraryBooksIcon color={currentPath.startsWith("/note") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary={"Notes"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/exams"
              selected={currentPath.startsWith("/exam")}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <BookIcon color={currentPath.startsWith("/exam") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary={"Exams"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/helper"
              selected={currentPath.startsWith("/helper")}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <ChatIcon color={currentPath.startsWith("/helper") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary={"Study Helper"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/about"
              selected={currentPath.startsWith("/about")}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <InfoIcon color={currentPath.startsWith("/about") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary={"About"} />
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
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
        }}
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
              fontWeight: 800,
              letterSpacing: 0.5,
              flexGrow: 1,
            }}
          >
            Easter
          </Typography>

          {/* Backend Health Badge */}
          <Tooltip title={backendOnline ? "Django REST API is connected" : "Connecting to Django backend..."}>
            <Chip
              size="small"
              label={backendOnline ? "API Online" : "Checking API..."}
              sx={{
                mr: 2,
                bgcolor: backendOnline ? "rgba(46, 125, 50, 0.9)" : "rgba(237, 108, 2, 0.9)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.75rem",
                display: { xs: "none", md: "inline-flex" },
              }}
            />
          </Tooltip>

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
          display: { xs: "none", sm: "block" },
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
        open={open}
        onClose={changeOpenState}
        sx={{
          display: { xs: "block", sm: "none" },
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

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
