import React from "react";
import Container from "@mui/material/Container";
import "./index.css";
import { TextField, Grid, Box, Button } from "@mui/material";
import { addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { useNavigate } from "react-router-dom";

function ClientOnboarding() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [clientInfo, setClientInfo] = React.useState({
    name: "",
    email: loggedInUser.email,
    phone: "",
    company: "",
    location: "",
    website: "",
    socialMedia: { linkedIn: "" },
  });

  const submitInfo = async (e) => {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    let userId = userInfo.uid;
    e.preventDefault();
    console.log(clientInfo);
    try {
      const docRef = await setDoc(doc(db, "usersData", userId), {
        ...clientInfo,
        userId: userId,
        step: 2,
        user_type: "client",
      });

      navigate("/client/profile");
    } catch (e) {
      alert("Error occored");
      console.error("Error adding document: ", e);
    }

    setClientInfo({
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      website: "",
    });
  };
  return (
    <div className="main-container">
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#FFFAFA",
          boxShadow: "0px 0px 15px #DCD7D7",
          padding: "90px 10px",
          borderRadius: "20px",
        }}
      >
        <h2 className="heading"> SetUp your client profile</h2>
        <form onSubmit={submitInfo}>
          <Grid
            container
            spacing={5}
            maxWidth="80%"
            p={4}
            sx={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 0px 15px #DCD7D7",
              margin: "auto",
              fontSize: "15px",
            }}
          >
            {/* ----------------------------------------------------- */}
            {/* /neame*
          //email*
          //phone*
          //location*
          //company
          //website */}

            <Grid item md={6} xs={12}>
              <label>Company Name*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                size="small"
                required
                value={clientInfo.companyName}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, companyName: e.target.value };
                  });
                }}
              />
            </Grid>
            {/* ----------------------------------------------------- */}

            <Grid item md={6} xs={12}>
              <label>Phone Number*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                type="number"
                variant="outlined"
                size="small"
                required
                value={clientInfo.phone}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, phone: e.target.value };
                  });
                }}
              />
            </Grid>
            {/* ----------------------------------------------------- */}
            <Grid item lg={6} md={6} xs={12}>
              <label>Your Name*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Write your name"
                variant="outlined"
                size="small"
                required
                value={clientInfo.name}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, name: e.target.value };
                  });
                }}
              />
            </Grid>
            {/* ----------------------------------------------------- */}
            <Grid item lg={6} md={6} xs={12}>
              <label>Email*</label>
              <TextField
                fullWidth
                disabled
                id="outlined-basic"
                placeholder="Contact@gmail.com"
                variant="outlined"
                size="small"
                type="email"
                required
                value={clientInfo.email}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, email: e.target.value };
                  });
                }}
              />
            </Grid>
            {/* ------------------------------------------------------- */}

            <Grid item lg={6} md={6} xs={12}>
              <label>Location*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Type your company address"
                variant="outlined"
                size="small"
                required
                value={clientInfo.location}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, location: e.target.value };
                  });
                }}
              />
            </Grid>
            {/* ----------------------------------------------------- */}
            <Grid item lg={6} md={6} xs={12}>
              <label>Website*</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="url"
                variant="outlined"
                size="small"
                required
                value={clientInfo.website}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return { ...p, website: e.target.value };
                  });
                }}
              />
            </Grid>
            {/* ------------------------------------------------------- */}
            <Grid item lg={6} md={6} xs={12}>
              <label>Linkedin</label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="url"
                variant="outlined"
                size="small"
                value={clientInfo.socialMedia.linkedIn}
                onChange={(e) => {
                  setClientInfo((p) => {
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        linkedIn: e.target.value,
                      },
                    };
                  });
                }}
              />
            </Grid>
            {/* ------------------------------------------------------- */}

            {/* ------------------------------------------------------- */}
            <Grid item lg={12}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                type="submit"
                sx={{ float: "right", width: "150px" }}
              >
                Complete Setup
              </Button>
            </Grid>
            {/* ------------------------------------------------------- */}
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default ClientOnboarding;

//neame*
//email*
//phone*
//location*
//company
//website
