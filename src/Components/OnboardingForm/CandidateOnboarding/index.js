import React, { useState, useEffect } from "react";
import { TextField, Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import { Label } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { domains, skillsList } from "../../../constants/index";
import { useNavigate } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CandidateONboarding() {
  let navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [candidateInfo, setCandidateInfo] = React.useState({
    name: "",
    email: loggedInUser.email,
    phone: "",
    skills: [],
    domain: [],
    socialMedia: {
      linkedIn: "",
      github: "",
      twitter: "",
      instagram: "",
    },
  });

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setCandidateInfo((p) => {
      return {
        ...p,
        skills: typeof value === "string" ? value.split(",") : value,
      };
    });
    // On autofill we get a stringified value.
  };

  const handleDomainChange = (event) => {
    setCandidateInfo((p) => {
      return { ...p, domain: event.target.value };
    });
  };

  const submitInfo = async (e) => {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    let userId = userInfo.uid;
    e.preventDefault();
    console.log(candidateInfo);
    try {
      const docRef = await setDoc(doc(db, "usersData", userId), {
        ...candidateInfo,
        userId: userId,
        step: 200,
        user_type: "candidate",
      });

      navigate("/candidate/profile");
    } catch (e) {
      alert("Error occored");
      console.error("Error adding document: ", e);
    }

    setCandidateInfo({
      name: "",
      email: "",
      phone: "",
      skills: [],
      domain: [],
      socialMedia: {
        linkedIn: "",
        github: "",
        twitter: "",
        instagram: "",
      },
    });
  };
  return (
    <div
      style={{
        backgroundColor: "#e5e5e5",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <form onSubmit={(e) => submitInfo(e)}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "50px 20px 0 20px ",
            padding: "20px",
            paddingTop: "50px",
            borderRadius: "20px",
          }}
        >
          <Grid
            container
            spacing={3}
            maxWidth="80%"
            p={4}
            sx={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 0px 15px #DCD7D7",
              margin: "auto",
              fontSize: "15px",
            }}
          >
            {/* ====================================================================================== */}
            <Grid item xs={12} md={6}>
              <label>Name*</label>
              <TextField
                required
                value={candidateInfo.name}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return { ...p, name: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                email<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                disabled
                required
                type="email"
                value={candidateInfo.email}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return { ...p, email: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>
                Phone no.<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                required
                type="number"
                inputProps={{ maxLength: 10 }}
                value={candidateInfo.phone}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return { ...p, phone: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <label>Education</label>
              <TextField
                value={candidateInfo.education}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return { ...p, education: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <label>Experience</label>
              <TextField
                value={candidateInfo.experience}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return { ...p, experience: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>linkedIn</label>
              <TextField
                value={candidateInfo.socialMedia.linkedIn}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        linkedIn: e.target.value,
                      },
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Twitter</label>
              <TextField
                value={candidateInfo.socialMedia.twitter}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        twitter: e.target.value,
                      },
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Github</label>
              <TextField
                value={candidateInfo.socialMedia.github}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return {
                      ...p,
                      socialMedia: { ...p.socialMedia, github: e.target.value },
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Instagram</label>
              <TextField
                value={candidateInfo.socialMedia.instagram}
                onChange={(e) => {
                  setCandidateInfo((p) => {
                    return {
                      ...p,
                      socialMedia: {
                        ...p.socialMedia,
                        instagram: e.target.value,
                      },
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <la>
                Tags<span style={{ color: "red" }}>*</span>
              </la>
              <FormControl required sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Select
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={candidateInfo.skills}
                  onChange={handleSkillsChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {skillsList.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        checked={candidateInfo.skills.indexOf(name) > -1}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <la>
                interested Domains<span style={{ color: "red" }}>*</span>
              </la>
              <FormControl fullWidth required sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-required-label">
                  Select
                </InputLabel>
                <Select
                  sx={{ width: "85%" }}
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={candidateInfo.domain}
                  label="Age *"
                  onChange={handleDomainChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>FrontEnd</MenuItem>
                  <MenuItem value={20}>BackEnd</MenuItem>
                  <MenuItem value={30}>Full stack</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>

            {/* --------------------------------------------------- */}

            <Grid item lg={12}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                type="submit"
                sx={{ float: "right", width: "150px" }}
              >
                Submit
              </Button>
            </Grid>
            {/* ---------------------------------------------------------- */}
          </Grid>
        </div>
      </form>
    </div>
  );
}

export default CandidateONboarding;

//name *
//email*
//phone*
// education
// experience
// social media url eg linkedIN , github , twitter
//intrested domain eg- forented, backend, fullstack, devops, mobile, data science, ml, ai, Marketing, sales, HR, finance, operations, product, design, content, legal, customer support, other
// skills * min 2
