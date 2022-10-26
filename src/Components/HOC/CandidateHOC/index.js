import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const routes = [
  {
    name: "Jobs",
    path: "/candidate/jobs",
  },
  {
    name: "Profile",
    path: "/candidate/profile",
  },
  {
    name: "Conversation",
    path: "/candidate/conversation",
  },
  {
    name: "Applications",
    path: "/candidate/applications",
  },
];
function CandidateHOC({ children }) {
  const navigate = useNavigate();
  const [menu, setMenu] = React.useState(false);
  const reRoute = (path) => {
    navigate(path);
  };
  function displayMenu() {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#FFFFF",
        boxShadow: "0px 2px 4px #AEACAC",
        marginTop: "0px",
        maxHeight: "50px",
        maxWidth: "100vw",
        overflow: "visible",
        textAlign: "center",
        border: "1px solid white",
      }}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={displayMenu}
        sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Grid
        container
        rowSpacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          textAlign: "center",
          position: "absolute",
          backgroundColor: "#FFFFFF",
          width: { sm: "200px", xs: "140px", md: "100vw", lg: "100vw" },
          boxShadow: "0px 0px 5px #A7A1A1",
          display: {
            xs: menu ? "block" : "none",
            sm: menu ? "block" : "none",
            md: "flex",
            lg: "flex",
          },
        }}
      >
        {routes.map((route, index) => {
          return (
            <Grid item md={2} xs={12} sm={12} key={index}>
              <Button
                onClick={() => reRoute(route.path)}
                sx={{ color: "black" }}
              >
                {route.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <div style={{ margin: "60px auto", maxWidth: "1100px", width: "90%" }}>
        {children}
      </div>
    </div>
  );
}

export default CandidateHOC;
