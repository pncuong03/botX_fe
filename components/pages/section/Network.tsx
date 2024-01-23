import React, { useState } from "react";
import { APP_URL } from "constants/routes";
import Link from "next/link";
const Network: React.FC = () => {
  return (
    <div className="section">
      <div className="sociall">
        <div className="network">
          <div className="text">
            <div className="pf">
              #1 social network services cheapest assembly on the market
            </div>
            <div className="ps">
              XSpeeder.shop is a website providing social networking services
              and SEO services cheapest. The interface is extremely customer and
              reseller friendly where everyone can easily use the service to
              reach more customers on social networks. Our website helps users
              achieve the goal of Twitter Likes, Followers and many other social
              networking Services.
            </div>
            <Link href={APP_URL.LOGIN}>
              <a className="bt">Sign up now</a>
            </Link>
          </div>
          <div className="imagee">
            <img className="img" src="/images/network.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
