import React, { useEffect, useState,useNavigate } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import { TextField, Grid, Box, Button } from "@mui/material";
function ClientProfile() {
    const [clientData, setClientData] = useState(null);
    const [editState, setEditState] = useState(false);
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.uid;
    async function getProfile() {
      try {
        const docRef = doc(db, "usersData", userId);
        const docData = await getDoc(docRef);
        if (docData.exists()) {
          console.log("Document data:", docData.data());
          setClientData({ ...docData.data() });
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
        e.preventDefault()
        try {
          await setDoc(doc(db, "usersData", userId), {
            ...clientData,
          });
          alert('Profile Updated')
        } catch (e) {
          alert("Error occored");
          console.error("Error adding document: ", e);
        }
      }
      setEditState(!editState);
    };
  
  return (
    <div>
    {clientData ? (
    <div
    style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      backgroundColor: "#F2F2F2",
      minHeight: "100vh",
    }}
    >
      <Grid container spacing={8} justifyContent="center">
            <Grid item xs={2} md={2}>
              <Button onClick={saveProfile}>
                {editState ? "save" : "Edit"}
              </Button>
            </Grid>
            <Grid item xs={2} md={2}>
              <Button>Logout</Button>
            </Grid>
          </Grid>
      <form>
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            background: "#fff",
            padding: "70px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <label>Name*</label>
              <TextField
              disabled={!editState}
                required
                value={clientData.name}
                onChange={(e) => {
                  setClientData((p) => {
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
              <label>email*</label>
              <TextField
              disabled={!editState}
                required
                type="email"
                value={clientData.email}
                onChange={(e) => {
                  setClientData((p) => {
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
              <label>Phone no.*</label>
              <TextField
              disabled={!editState}
                required
                type="number"
                inputProps={{ maxLength: 10 }}
                value={clientData.phone}
                onChange={(e) => {
                  setClientData((p) => {
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
              <label>Location*</label>
              <TextField
              disabled={!editState}
              required
                value={clientData.location}
                onChange={(e) => {
                  setClientData((p) => {
                    return { ...p, location: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* website */}

            <Grid item xs={12} md={6}>
              <label>Website</label>
              <TextField
              disabled={!editState}
                value={clientData.website}
                onChange={(e) => {
                  setClientData((p) => {
                    return {
                      ...p,
                      website: e.target.value,
                      
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            {/* //company */}
            <Grid item xs={12} md={6}>
              <label>Company</label>
              <TextField
              disabled={!editState}
                value={clientData.company}
                onChange={(e) => {
                  setClientData((p) => {
                    return { ...p, company: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            

           
            
           
           
          </Grid>
        </div>
      </form>
    </div>
    ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default ClientProfile;
