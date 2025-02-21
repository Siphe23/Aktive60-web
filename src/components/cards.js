import React from "react";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import "../styles/Cards.css"; // Make sure to create this file for styling

const Cards = () => {
  const cardData = [
    {
      title: "Active Members",
      value: "412",
      info: "from last month",
      percentage: "+12%",
      icon: <FaUsers size={30} color="#4A90E2" />,
      color: "green",
    },
    {
      title: "Check-ins",
      value: "17",
      info: "Check-ins today",
      percentage: null,
      icon: <IoMdLogIn size={30} color="#A84FEF" />,
      color: null,
    },
    {
      title: "New Members Requests",
      value: "05",
      info: "Members",
      percentage: null,
      icon: <FaUserPlus size={30} color="#2ECC71" />,
      color: null,
    },
  ];

  return (
    <div className="cards-container">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          <div className="card-header">
            <span>{card.title}</span>
            {card.icon}
          </div>
          <h2>{card.value}</h2>
          <p>
            {card.percentage && (
              <span className="percentage" style={{ color: card.color }}>
                {card.percentage}
              </span>
            )}
            {card.info}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
