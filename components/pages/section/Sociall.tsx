import React, { useState } from "react";

const Sociall: React.FC = () => {
  return (
    <div id="social-section" className="section">
      <div className="sociall">
        <div className="social">
          <div className="title">Social networking services</div>
          <div className="titlee">
            <div className="best">Best</div>
            <div className="and">and</div>
            <div className="cheapest">Cheapest</div>
          </div>
          <div className="professional">
            We are a professional provider of Twitter (X) Social Networking
            Services:
          </div>
          <div className="liWith">
            <div className="liWithlikes">
              <img src="\svg\ellipse.svg" alt="" />
              <div>Increase likes, Followers, Pull members.</div>
            </div>
            <div className="liWithlikes">
              <img src="\svg\ellipse.svg" alt="" />
              <div>Fastest speed, cheapest and most effective cost.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sociall;
