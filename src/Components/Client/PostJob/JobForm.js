import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  ListItemText,
  InputLabel,
  FormHelperText,
  Checkbox,
  OutlinedInput,
  Box,
} from "@mui/material";
import  uuid  from 'uuidv4';
import { setDoc, addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { domainList, skillsList } from "../../../constants/";
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
function JobForm() {
  // title
  // skills=[]
  //domain = '
  //experience=''
  // budget=''
  // description=''
  // dueration=''
  // language=''
  //
  const [jobData, setJobData] = useState({
    title: "",

    description: "",
    budget: "",
    duration: "",
    experience: "",
    language: "",
    domain: "",
    skills: [],
  });
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobData((p) => {
      return {
        ...p,
        skills: typeof value === "string" ? value.split(",") : value,
      };
    });
    // On autofill we get a stringified value.
  };
  const handleDomainChange = (event) => {
    setJobData((p) => {
      return { ...p, domain: event.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const { uid } = loggedInUser;
    const job_id = uuid();
    console.log(jobData);
    const docRef = await setDoc(doc(db, "jobs", job_id), {
      ...jobData,
      job_id,
      client_id: uid,
      client_name: loggedInUser.displayName,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <div  
    style={{
      backgroundColor: "#e5e5e5",
      minHeight: "100vh",
      paddingTop:"50px"
    }}>
     <form onSubmit={handleSubmit}>
          <div
            style={{
              maxWidth: "1100px",
              margin: "50px 20px 0 20px ",
              padding: "20px",
              paddingTop: "30px",
              borderRadius: "20px",
            }}
          >
       
            <Grid container spacing={3}
             maxWidth="90%"
             p={4}
             sx={{
               backgroundColor: "#FFFFFF",
               boxShadow: "0px 0px 15px #DCD7D7",
               margin: "auto",
               fontSize: "15px",
             }}
            >
              <Grid item xs={12} md={6}>
                <label>Title</label>
                <TextField
                  required
                  value={jobData.title}
                  onChange={(e) => {
                    setJobData((p) => {
                      return {
                        ...p,
                        title: e.target.value,
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
                <label>description*</label>
                <TextField
                  required
                  value={jobData.description}
                  onChange={(e) => {
                    setJobData((p) => {
                      return {
                        ...p,
                        description: e.target.value,
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
                <label>budget*</label>
                <TextField
                  type="number"
                  required
                  value={jobData.budget}
                  onChange={(e) => {
                    setJobData((p) => {
                      return {
                        ...p,
                        budget: e.target.value,
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
                <label>Duration*</label>
                <TextField
                  required
                  value={jobData.duration}
                  onChange={(e) => {
                    setJobData((p) => {
                      return {
                        ...p,
                        duration: e.target.value,
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
                <label>experience</label>
                <TextField
                  required
                  value={jobData.experience}
                  onChange={(e) => {
                    setJobData((p) => {
                      return {
                        ...p,
                        experience: e.target.value,
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
                <label>Language</label>
                <TextField
                  required
                  value={jobData.language}
                  onChange={(e) => {
                    setJobData((p) => {
                      return {
                        ...p,
                        language: e.target.value,
                      };
                    });
                  }}
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>

              <Grid item sx={12} md={6}>
                <la>
                  Skills<span style={{ color: "red" }}>*</span>
                </la>
                <FormControl
                  width="100%"
                  fullWidth
                  required
                  sx={{ minWidth: "100%" }}
                >
                  <InputLabel id="demo-multiple-checkbox-label">
                    Select
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    fullWidth
                    width="100%"
                    value={jobData.skills}
                    onChange={handleSkillsChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {skillsList.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={jobData.skills.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <la>
                  Domain<span style={{ color: "red" }}>*</span>
                </la>
                <FormControl
                  width="100%"
                  fullWidth
                  required
                  sx={{ minWidth: "100%" }}
                >
                  <InputLabel id="demo-simple-select-required-label">
                    Select
                  </InputLabel>
                  <Select
                    sx={{ width: "85%" }}
                    id="demo-simple-select-required"
                    value={jobData.domain}
                    label="Age *"
                    onChange={handleDomainChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {domainList.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            
            <Box textAlign="center">
              <Button
                variant="contained"
          
                size="small"
                type="submit"
                sx={{ marginTop: "10px", width: "150px" }}
              >
                Submit
              </Button>
            </Box>
            
          </div>
      </form>
    </div>
  );
}

export default JobForm;
