import React, { useState } from "react";

interface Logo {
  id: number;
  imageUrl: string;
  altText: string;
}

const logos = [
  {
    id: 1,
    img: "/svglanding/visa.svg",
    text: "visa",
  },
  {
    id: 2,
    img: "/svglanding/around.svg",
    text: "visa",
  },
  {
    id: 3,
    img: "/svglanding/paytm.svg",
    text: "visa",
  },
  {
    id: 4,
    img: "/svglanding/zalo.svg",
    text: "visa",
  },
  {
    id: 5,
    img: "/svglanding/momo.svg",
    text: "visa",
  },
  {
    id: 6,
    img: "/svglanding/vietcombank.svg",
    text: "visa",
  },
  {
    id: 7,
    img: "/svglanding/viettinbank.svg",
    text: "visa",
  },
  {
    id: 8,
    img: "/svglanding/tpbank.svg",
    text: "visa",
  },
  {
    id: 9,
    img: "/svglanding/techcombank.svg",
    text: "visa",
  },
  {
    id: 10,
    img: "/svglanding/vib.svg",
    text: "visa",
  },
  {
    id: 11,
    img: "/svglanding/hdbank.svg",
    text: "visa",
  },
  {
    id: 12,
    img: "/svglanding/acb.svg",
    text: "visa",
  },
];

const Logo: React.FC = () => {
  return (
    <div className="section">
      <div className="sociall">
        <div className="applogo">
          <div className="payment">Payment methods</div>
          <div className="app">
            {logos.slice(0, 6).map((logo) => (
              <img
                key={logo.id}
                src={logo.img}
                alt={logo.text}
                className="logo"
              />
            ))}
            {logos.slice(6, 12).map((logo) => (
              <img
                key={logo.id}
                src={logo.img}
                alt={logo.text}
                className="logo"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
