import React, { Suspense } from "react";
import LandingPage from "../Components/LandingPage";
import Signup from "../Components/Signup";
import ClientOnboarding from "../Components/OnboardingForm/ClientOnboarding";
import CandidateONboarding from "../Components/OnboardingForm/CandidateOnboarding";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CandidateProfile from "../Components/Candidate/CandidateProfile";
import CandidateHOC from "../Components/HOC/CandidateHOC";
import ClientProfile from "../Components/Client/ClientProfile";
import ClientHOC from "../Components/HOC/ClientHOC";
import PostJob from "../Components/Client/PostJob";
import CandidateJobs from "../Components/Candidate/CandidateJobs";
import CandidateApplication from "../Components/Candidate/CandidateApplication";
import CandidateConversation from "../Components/Candidate/CandidateConversation";
import CLientApplicants from "../Components/Client/CLientApplicants";
import ClientConversation from "../Components/Client/ClientConversation";
function Navs() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signIn/candidate"
            element={<Signup type={"candidate"} />}
          />

          <Route
            path="/onboarding/candidate"
            element={<CandidateONboarding />}
          />

          <Route
            path="/candidate/profile"
            element={
              <CandidateHOC>
                <CandidateProfile />
              </CandidateHOC>
            }
          />
          <Route
            path="candidate/jobs"
            element={
              <CandidateHOC>
                <CandidateJobs />
              </CandidateHOC>
            }
          />

          <Route
            path="candidate/applications"
            element={
              <CandidateHOC>
                <CandidateApplication />
              </CandidateHOC>
            }
          />
          <Route
            path="candidate/conversation"
            element={
              <CandidateHOC>
                <CandidateConversation />
              </CandidateHOC>
            }
          />

          <Route path="/signIn/client" element={<Signup type={"client"} />} />
          <Route path="/onboarding/client" element={<ClientOnboarding />} />
          <Route
            path="/client/profile"
            element={
              <ClientHOC>
                <ClientProfile />
              </ClientHOC>
            }
          />
          <Route
            path="/client/Jobs"
            element={
              <ClientHOC>
                <PostJob />
              </ClientHOC>
            }
          />

          <Route
            path="/client/applicants"
            element={
              <ClientHOC>
                <CLientApplicants />
              </ClientHOC>
            }
          />
          <Route
            path="/client/conversation"
            element={
              <ClientHOC>
                <ClientConversation />
              </ClientHOC>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Navs;
