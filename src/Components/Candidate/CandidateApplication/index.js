import React, { useEffect } from "react";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebaseInitisize";
import ApplicationTable from "../../common/ApplicationTable";
function CandidateApplication() {
  const [applications, setAllApplications] = React.useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const candidateId = loggedInUser.uid;
  const fetchAllApplications = async () => {
    try {
      const q = query(
        collection(db, "applications"),
        where("candidate_id", "==", candidateId)
      );

      const querySnapshot = await getDocs(q);
      let applications = [];
      querySnapshot.forEach((doc) => {
        applications.push(doc.data());
        console.log(applications);
      });
      setAllApplications(applications);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);
  return (
    <div>
      {applications && applications.length === 0 ? (
        <div>no applications</div>
      ) : applications && applications.length > 0 ? (
        <div>
          <ApplicationTable
          // columns={["Job Title", "Client Name",'Budget','Status',"date"]}
            columns={[
              { label: "Job Title", key: "job_title" },
              { label: "Client Name", key: "client_name" },
              { label: "Budget", key: "project_bugdet" },
              { label: "Status", key: "interest_showen" },
              { label: "date", key: "createdAt" },
            ]}
          
          rows={applications}
          />
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default CandidateApplication;
