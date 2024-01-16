import { SearchInput } from "evergreen-ui";
import CardEntreprise from "../components/CardEntreprise/CardEntreprise";
import Header from "../components/Header/Header";
import { FaEnvelope, FaPlus } from "react-icons/fa6";
import "./Admin.css";
export default function Admin() {
  return (
    <>
      <div className="admin-home">
        <Header />
        <SearchInput placeholder="Recherche" />
        <CardEntreprise />
        <div className="bottom-menu">
          <button>
            <FaPlus />
          </button>
          <button>
            <FaEnvelope />
          </button>
        </div>
      </div>
    </>
  );
}
