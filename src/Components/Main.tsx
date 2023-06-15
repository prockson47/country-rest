import React from "react";

import CountryCards from "./CountryCards";
import '../Styles/main.css';


const Main: React.FC = () => {
  return (
    <main className="main">
      <div className="country-cards">
        <CountryCards />
      </div>
    </main>
  );
};

export default Main;
