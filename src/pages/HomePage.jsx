import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import "./HomePage.css";

function HomePage() {
  return (
    <div id="homePage">
      <div id="homePageBanner">
        <Image
          src="https://res.cloudinary.com/dr6horuoy/image/upload/v1651527222/statics/cat4K_tgdxvi.jpg"
          className="img-fluid shadow-4"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}

export default HomePage;
