import React from "react";
import "./Notification.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";

const Notification = ({ onConfirm, onCancel }) => {
  return (
    <>
      <IconContext.Provider
        value={{ color: "white", className: "notif-button", size: "30px" }}
      >
        <div className="notification-modal">
          <div>
            <h2>Confimer la réception du courrier :</h2>
            <p></p>
          </div>

          <div className="notif-button-frame">
            <button className="notif-cancel-button" onClick={onCancel}>
              <FaTimes />
            </button>
            <button className="notif-validate-button" onClick={onConfirm}>
              <FaCheck />
            </button>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Notification;
