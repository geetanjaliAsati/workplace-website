import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const routes = [
  {
    name: "Jobs",
    path: "/client/jobs",
  },
  {
    name: "Profile",
    path: "/client/profile",
  },
  {
    name: "Conversation",
    path: "/client/conversation",
  },
  {
    name: "Applicants",
    path: "/client/applicants",
  },
];
function ClientHOC({ children }) {
  const navigate = useNavigate();
  const reRoute = (path) => {
    navigate(path);
  };
  return (
    <div>
      <Grid container spacing={0} mr={6}>
        {routes.map((route, index) => {
          return (
            <Grid item xs={2}  key={index}>
              <Button onClick={() => reRoute(route.path)}>{route.name}</Button>
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

export default ClientHOC;
