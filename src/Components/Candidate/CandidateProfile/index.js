import React, { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { TextField, Grid, Box, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

function CandidateProfile() {
  const [candidateData, setCandidateData] = useState(null);
  const [editState, setEditState] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user.uid;
  async function getProfile() {
    try {
      const docRef = doc(db, "usersData", userId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        console.log("Document data:", docData.data());
        setCandidateData({ ...docData.data() });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const saveProfile = async (e) => {
    if (editState) {
      e.preventDefault();
      try {
        await setDoc(doc(db, "usersData", userId), {
          ...candidateData,
        });
        alert("Profile Updated");
      } catch (e) {
        alert("Error occored");
        console.error("Error adding document: ", e);
      }
    }
    setEditState(!editState);
  };
  const navigate = useNavigate();
  const reRoute = () => {
    navigate("/");
  };
  const logoutProfile = () => {
    alert("Are you want to Logout?");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("real key");

    reRoute();
  };
  return (
    <div>
      {candidateData ? (
        <div>
          <Grid container spacing={8} justifyContent="center">
            <Grid item xs={2} md={2}>
              <Button onClick={saveProfile}>
                {editState ? "save" : "Edit"}
              </Button>
            </Grid>
            <Grid item xs={2} md={2}>
              <Button onClick={logoutProfile}>Logout</Button>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2} rowSpacing={4}>
            <Grid item xs={12} md={6}>
              <label>
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                disabled={!editState}
                required
                value={candidateData.name}
                onChange={(e) => {
                  setCandidateData((p) => {
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
                disabled={!editState}
                required
                type="email"
                value={candidateData.email}
                onChange={(e) => {
                  setCandidateData((p) => {
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
                disabled={!editState}
                required
                type="number"
                inputProps={{ maxLength: 10 }}
                value={candidateData.phone}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, phone: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Education</label>
              <TextField
                disabled={!editState}
                value={candidateData.education}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, education: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Experience</label>
              <TextField
                disabled={!editState}
                value={candidateData.experience}
                onChange={(e) => {
                  setCandidateData((p) => {
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
                disabled={!editState}
                value={candidateData.socialMedia?.linkedIn}
                onChange={(e) => {
                  setCandidateData((p) => {
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
                disabled={!editState}
                value={candidateData.socialMedia?.twitter}
                onChange={(e) => {
                  setCandidateData((p) => {
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
                disabled={!editState}
                value={candidateData.socialMedia?.github}
                onChange={(e) => {
                  setCandidateData((p) => {
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
                disabled={!editState}
                value={candidateData.socialMedia?.instagram}
                onChange={(e) => {
                  setCandidateData((p) => {
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

            {/* <Grid item xs={12} md={6}>
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
                  value={candidateData.skills}
                  onChange={handleSkillsChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {skillsList.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        checked={candidateData.skills.indexOf(name) > -1}
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
                  value={candidateData.domain}
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
            </Grid> */}
          </Grid>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default CandidateProfile;
