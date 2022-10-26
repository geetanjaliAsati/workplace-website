import { Button } from "@mui/material";
import React from "react";
import "./CandidateJobs.css";
function JobCard({ job, setOpenModal, setModalData, applyOnJob }) {
  const openDescription = () => {
    setModalData(job);
    setOpenModal(true);
  };

  return (
    <div className="jobcard">
      <div onClick={openDescription}>
        <div>{job.title}</div>
        <div>description {job.description}</div>
        <div>duration: {job.duration}</div>
        <div>domain: {job.domain}</div>
        <div>experience {job.experience}</div>
        <div>language {job.language}</div>
        <div>skills</div>
        {job.skills?.map((skill) => {
          return <div>{skill}</div>;
        })}
        </div>
        <Button onClick={() => applyOnJob(job)}>Apply</Button>
      
    </div>
  );
}

export default JobCard;
// {
//   budget: "4";
//   description: "job";
//   domain: "Web Development";
//   duration: "9";
//   experience: "1";
//   language: "english";
//   skills: ["React"];
//   title: "frontend";
// }
