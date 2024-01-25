import React, { useState } from "react";
import { APP_URL } from "constants/routes";
import Link from "next/link";
const Join: React.FC = () => {
  return (
    <div id="services-section" className="section">
      <div className="sociall">
        <div className="join">
          <div className="pf">HOPE THAT IS ENOUGH!</div>
          <div className="ps">Join XFarm.shop</div>
          <div className="pt">Subscrible to update news about us.</div>
          <Link href={APP_URL.REGISTER}>
            <a className="join-button">Join us now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
