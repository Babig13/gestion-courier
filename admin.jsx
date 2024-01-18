import { SearchInput } from "evergreen-ui";
import CardEntreprise from "../components/CardEntreprise/CardEntreprise";
import Header from "../components/Header/Header";
import { IconContext } from "react-icons";
import { FaEnvelope, FaPlus } from "react-icons/fa6";
import './Admin.css'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Admin(){

    const [searchTerm, setSearchTerm] = useState('');

    return(
        <>
            <div className="admin-home">

                <Header />

                <SearchInput 
                placeholder="Recherche"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

                <CardEntreprise searchTerm={searchTerm} />

                <div className="bottom-menu">
                    <IconContext.Provider value={{ color: "white", className: "companies-icons", size:"32px" }}>
                        <Link to={'createuser'}>
                            <button><FaPlus /></button>
                        </Link>
                        <button><FaEnvelope /></button>
                    </IconContext.Provider>
                </div>

            </div>


        </>
    )
}