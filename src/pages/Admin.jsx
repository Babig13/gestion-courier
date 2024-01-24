import { Dialog, SearchInput } from "evergreen-ui";
import CardEntreprise from "../components/CardEntreprise/CardEntreprise";
import Header from "../components/Header/Header";
import { IconContext } from "react-icons";
import { FaEnvelope, FaPlus } from "react-icons/fa6";
import "./Admin.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SendMessage from "../components/SendMessage/SendMessage";

export default function Admin() {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isShown, setIsShown] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(selectedCompanies);
  return (
    <>
      <div className="admin-home">
        <Header />

        <SearchInput
          placeholder="Recherche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Dialog
          isShown={isShown}
          title="No footer"
          onCloseComplete={() => setIsShown(false)}
          containerProps={{ className: "custom-modal-container" }}
          hasFooter={false}
          hasHeader={false}
        >
          <SendMessage
            setIsShown={setIsShown}
            selectedCompanies={selectedCompanies}
          />
        </Dialog>

        <CardEntreprise
          searchTerm={searchTerm}
          setSelectedCompanies={setSelectedCompanies}
        />

        <div className="bottom-menu">
          <IconContext.Provider
            value={{
              color: "white",
              className: "companies-icons",
              size: "32px",
            }}
          >
            <Link to={"createuser"}>
              <button>
                <FaPlus />
              </button>
            </Link>
            <button onClick={() => setIsShown(true)}>
              <FaEnvelope />
            </button>
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}
