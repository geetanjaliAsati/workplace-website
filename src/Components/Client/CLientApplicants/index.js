import React, { useEffect } from "react";
import {
  query,
  where,
  getDocs,
  doc,
  collection,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import uuid from "uuidv4";
import { db } from "../../../config/firebaseInitisize";
import ApplicationTable from "../../common/ApplicationTable";
function CLientApplicants() {
  const [applications, setAllApplications] = React.useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const clientId = loggedInUser.uid;
  const fetchAllApplications = async () => {
    try {
      const q = query(
        collection(db, "applications"),
        where("client_id", "==", clientId)
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

  const handleAction = async (action, Applicationdata) => {
    console.log(action, Applicationdata);
    if (action === "reject") {
      try {
        await deleteDoc(
          doc(db, "applications", Applicationdata.application_id)
        );
        const filteredApplications = applications.filter((application) => {
          return application.application_id !== Applicationdata.application_id;
        });
        setAllApplications(filteredApplications);
      } catch (err) {
        console.log(err);
      }
    } else if (action === "accept") {
      try {
        const one_to_one_id = `${Applicationdata.application_id}_${Applicationdata.client_id}_${Applicationdata.candidate_id}`;
        const message = `hey ${Applicationdata.candidate_name}, we have accepted your application for the job ${Applicationdata.job_title}`;
        await setDoc(doc(db, "conversations", one_to_one_id), {
          client_id: Applicationdata.client_id,
          candidate_name: Applicationdata.candidate_name,
          client_name: Applicationdata.client_name,
          candidate_id: Applicationdata.candidate_id,
          job_id: Applicationdata.job_id,
          application_id: Applicationdata.application_id,
          last_message: message,
          one_to_one_id, //application_id+client_id+candidate_id
        });

        await setDoc(doc(db, "one-to-one", uuid()), {
          message_id: uuid(),
          sender_id: Applicationdata.client_id,
          one_to_one_id,
          createdAt: new Date().getTime(),
          message,
        });

        await setDoc(
          doc(db, "applications", Applicationdata.application_id),
          {
            interest_showen: "accepted",
          },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {applications && applications.length === 0 ? (
        <div>no applications</div>
      ) : applications && applications.length > 0 ? (
        <div>
          <ApplicationTable
            handleAction={handleAction}
            buttons={true}
            columns={[
              { label: "Candidate Name", key: "candidate_name" },
              { label: "Job Title", key: "job_title" },
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

export default CLientApplicants;
