import React, { useState } from "react";

const faqData = [
  {
    Header: "What is XFarm.shop? ",
    key: "1",
    content:
      "XFarm.shop is an advanced service dedicated to enhancing visibility and interaction on Twitter. Our mission is to provide users with a unique and powerful Twitter experience, empowering them to build a robust online presence and achieve their personal or business goals in the realm of social media. ",
    img: "/images/What is XFarm.shop.png",
  },
  {
    Header: "How to purchase a product?",
    key: "2",
    content:
      " To pay for your orders, top up your account first. The top-up and delivery process is automated, but it may take a few minutes for the system to process your request. ",
    img: "/images/How to purchase a product.png",
  },
  {
    Header: "How to recharge?",
    key: "3",
    content: (
      <>
        <p>To top up your account, follow these steps: </p>
        <ul>
          <li> Select the Payment tab on the menu bar.</li>
          <li> Follow the instructions.</li>
          <li>
            {" "}
            Make a transfer with the correct content. The money will
            automatically be credited to your account. You can top up any
            amount, starting from 1 VND
          </li>
        </ul>
      </>
    ),
    //   To top up your account, follow these steps:

    //   1. Select the "Payment" tab on the menu bar.
    //   2. Follow the instructions.
    //   3. Make a transfer with the correct content.

    //   The money will automatically be credited to your account. You can top up any amount, starting from 1 VND
    // `,
    img: "/images/How to recharge.png",
  },
  {
    Header:
      "What is the process to recover the money if I transferred it wrongly? ",
    key: "4",
    content:
      "We have seen this happen many times, so please be careful when depositing money. If you accidentally transfer money to the wrong account, please contact our support team immediately via tele/zalo. We will investigate the matter and return the money to the correct recipient. Please note that we will only return the money to the correct recipient to prevent scam cases.",
    img: "/images/What_is_the_process_to_recover_the_money_if_I_transferred_it_wrongly.png",
  },
  {
    Header: "I made a deposit but the money didn't show up in my account. ",
    key: "5",
    content:
      "Occasionally, due to system errors, bank errors, or user errors such as entering the wrong syntax when depositing money, your balance may not be updated. Please do not worry and contact our support team immediately to have it updated.",
      img: "/images/I made a deposit but the money didn't show up in my account.png",
  },
  {
    Header: " Is it possible to cancel my order? ",
    key: "6",
    content:
      "We do not offer order cancellation once the order has begun processing.Please note that we will not refund orders that are installed with incorrect information (incomplete information, wrong link, not public...) or that are faulty or die during the system's increase process. ",
    img: "/images/Is it possible to cancel my order.png",
  },
  {
    Header: "What is the warranty policy?",
    key: "7",
    content: (
      <>
        <ul>
          <li>
            {" "}
            In case you have an order running on our system and also buy goods
            from other parties at the same time, the shop will not be
            responsible for resolving the shortage of quantity between the two
            parties.
          </li>
        </ul>
        <p>
          In the event that you have an order running on our system and are also
          purchasing items from other parties at the same time, the shop will
          not be responsible for resolving any quantity shortages between the
          two parties.
        </p>
        <ul>
          <li>
            We will not refund orders that are installed with incorrect
            information (incomplete information, wrong link, not public...) or
            are faulty or die during the system increase process.
          </li>
          <li>
            We do not support order cancellation once the order has started
            running.
          </li>
          <li>Warranty period: 20 days.</li>
          <li>
            Guaranteed warranty within 48 hours after completing the order.
          </li>
        </ul>
      </>
    ),
    img: "/images/What is the warranty policy.png",
  },
];

const FAQ: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setExpandedItem(expandedItem === key ? null : key);
  };

  const renderFaqItems = (items: typeof faqData) => {
    return items.map((item) => (
      <div
        key={item.key}
        className={`faq-item ${expandedItem === item.key ? "expanded" : ""}`}
        onClick={() => toggleItem(item.key)}
      >
        <div className="faq-header">{item.Header}</div>
        {expandedItem === item.key && (
          <div className="faq-content">
            {item.content && <p>{item.content}</p>}
            {item.img && <img src={item.img} alt={item.Header} />}
          </div>
        )}
      </div>
    ));
  };

  const firstSection = faqData.slice(0, 3);
  const secondSection = faqData.slice(3);

  return (
    <div id="faq-section" className="section">
      <div className="sociall">
        <div className="faq">
          <div className="shop">FAQ XFarm.shop</div>
          <div className="frequently">Frequently asked questions</div>
          <div className="fdata">
            <div className="faq-section">{renderFaqItems(firstSection)}</div>
            <div className="faq-section">{renderFaqItems(secondSection)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
