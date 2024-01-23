import { useState } from "react";

const Contact = () => {
  const teleLink = "https://t.me/johnbuittkstudio";
  const zaloLink = " https://zalo.me/0382824306";

  return (
    <div className="contact">
      <div className={`contact-menu`}>
        <button onClick={() => window.open(teleLink, "_blank")}>
          <img src="/svg/tele-logo.svg" alt="" />
        </button>
        <button onClick={() => window.open(zaloLink, "_blank")}>
          <img src="/svg/zalo-logo.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Contact;
