import "./Notification.css";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { IconContext } from "react-icons";
export default function Notification() {
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
            <button className="notif-cancel-button">
              <FaXmark />
            </button>
            <button className="notif-validate-button">
              <FaCheck />
            </button>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}
