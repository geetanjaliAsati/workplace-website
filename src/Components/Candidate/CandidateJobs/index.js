import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobSearch from "./JobSearch";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import JobInfoModal from "./JobInfoModal";
import uuid from "uuidv4";

function CandidateJobs() {
  const [openModal, setOpenModal] = useState(false);
  const [ModalData, setModalData] = useState(null);
  const [filter, setFilter] = React.useState({
    selectedDomain: null,
    selectedSkills: [],
  });
  const [allJobs, setAllJobs] = useState(null);
  const fetchAllJobs = async () => {
    const q = query(collection(db, "jobs"));

    const querySnapshot = await getDocs(q);
    let jobs = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      jobs.push(doc.data());
    });
    setAllJobs(jobs);
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);

  const applyOnJob = async (job) => {
    const application_id = uuid();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "applications", application_id), {
      job_id: job.job_id,
      application_id,
      createdAt: new Date(),
      client_id: job.client_id,
      interest_showen: "candidate",
      job_title: job?.title ? job.title : "title",
      client_name: job?.client_name ? job.client_name : "client",
      candidate_name: loggedInUser?.displayName
        ? loggedInUser.displayName
        : "candidate",
      candidate_id: loggedInUser?.uid ? loggedInUser.uid : "candidate",
      project_bugdet: job?.budget ? job.budget : "budget",
    });  
  };
  return (
    <div>
      <JobSearch filter={filter} setFilter={setFilter} />
      {allJobs && allJobs.length === 0 ? (
        <div>no job :(</div>
      ) : allJobs && allJobs.length > 0 ? (
        <div>
          {allJobs.map((item) => {
            return (
              <JobCard
                applyOnJob={applyOnJob}
                setOpenModal={setOpenModal}
                setModalData={setModalData}
                key={item.job_id}
                job={item}
              />
            );
          })}
        </div>
      ) : (
        <div>loading</div>
      )}
      <JobInfoModal
        applyOnJob={applyOnJob}
        ModalData={ModalData}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
}

export default CandidateJobs;
