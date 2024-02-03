import React from "react";

const Footter: React.FC = () => {
  return (
    <div className="footter">
      <div className="logo">
        <div className="img">
          <img src="/images/logo.png" alt="" />
          <div className="text">
            <div>
              <a href="#social-section">Home</a>
            </div>
            <div>
              <a href="#services-section">Services</a>
            </div>
            <div>
              <a href="#faq-section">FAQ</a>
            </div>
          </div>
        </div>
        <div className="appp">
          <a
            className="tele"
            // href="https://t.me/XSpeeder"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/tele.png" alt="telegram" />
          </a>
          <a
            className="tw"
            // href="https://twitter.com/XSpeedershop"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/tw.png" alt="twiiter" />
          </a>
          <a
            className="zalo"
            // href="https://zalo.me/g/dsugwp477"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/zalo.png" alt="zalo" />
          </a>
        </div>
      </div>
      <div className="privaci">
        <div className="left">
          <img src="/images/text.png" alt="" />
        </div>
        <div className="right">
          <img src="/images/textt.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footter;
