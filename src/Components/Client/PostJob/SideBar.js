import React, { useEffect, useState } from "react";
import "./Sidebar.css"
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import Search from "../../../assets/svgFile/search.svg";
import { Input, TextField, Grid } from "@mui/material";
function SideBar() {
  const [allJobs, setAllJobs] = useState([]);
  let loggedInUser = JSON.parse(localStorage.getItem("user"));
  let clientId = loggedInUser.uid;


  const fetchAllJobs = async () => {
    const q = query(collection(db, "jobs"), where("client_id", "==", clientId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setAllJobs((prev) => [...prev, change.doc.data()])
        }
      });
    }); 
    return unsubscribe;
  };
  
  useEffect(() => {
    const unsubscribe=fetchAllJobs();
    return () =>unsubscribe
  }, []);
  return (
    <div className="row">
      <TextField
        placeholder="Search title or keywoard"
        sx={{
          border: "none",
          outline: "none",
          width: "100%",

          "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
        size="small"
        id="outlined-basic"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <img
              src={Search}
              alt="Search"
              style={{
                marginRight: "10px",
                maxWidth: "20px",
                width: { xs: "10%", md: "100%" },
                maxHeight: "20px",
                height: { xs: "10%", md: "100%" },
              }}
            />
          ),
        }}
      />

      {allJobs && allJobs.length === 0 ? (
        <div>no data</div>
      ) : allJobs && allJobs.length > 0 ? (
        /**=================================== */
        <div className="column">
          {allJobs.map((job) => {
            return (
              <div className="card">
                
                <h3>
                  {job.title}
                </h3>
                <p>
                  {job.description}
                </p>
                
              </div>
            );
          })}
        </div>
      ) : (
        /**=================================== */

        <div>loading</div>
      )}
    </div>
  );
}

export default SideBar;
