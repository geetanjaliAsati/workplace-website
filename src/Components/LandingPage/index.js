import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Section2 from "./Section2/Section2";
import Section3 from "./section-3/section.js";
import BannerImage from "./Section4";
import Headers from "./Headers";
function LandingPage() {
  return (
    <div>
      <div>
        <NavBar />
        <Headers />
      </div>

      <div >
        <Section2 />
      </div>

      <Section3 />

      <div>
        <BannerImage />
      </div>

      {/* <div>Never Want to Miss Any Job News?</div> */}
      <Footer />
    </div>
  );
}

export default LandingPage;
