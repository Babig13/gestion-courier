import { useEffect, useState } from "react"
import "./SendMessage.css"

export default function SendMessage({ selectedCompanies, setIsShown }) {
        // État pour stocker les IDs sélectionnées
        const [selectedIds, setSelectedIds] = useState([]);
        // État pour stocker l'ID de l'administrateur
        const [adminId, setAdminId] = useState('');
        // État pour suivre le succès de l'envoi des données
        const [isSuccess, setIsSuccess] = useState(false);

    
    useEffect(() => {
        // Vérifier que selectedCompanies est un tableau
        if (Array.isArray(selectedCompanies)) {
            // Extraire les _id de chaque objet et créer le tableau d'objets avec _id
            const idsArray = selectedCompanies.map(company => company._id);
            setSelectedIds(idsArray);
        }
    }, [selectedCompanies]);

    useEffect(() => {
        const getAdminId = localStorage.getItem("userId");
        setAdminId(getAdminId);
    }, []);

    

    const handleSend = () => {
        // Utiliser URLSearchParams pour construire les paramètres de l'URL
        const urlSearchParams = new URLSearchParams();
        selectedIds.forEach(id => urlSearchParams.append("userId", id));

        // Construire l'URL avec les paramètres
        const url = `http://51.83.69.229:3000/api/users/sendModalEntreprise?adminId=${adminId}&${urlSearchParams.toString()}`;

        // Effectuer la requête
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            // Ne pas envoyer de données dans le corps de la requête
        })
        .then(response => {
            // Gérer la réponse selon vos besoins
            console.log(response)
            if (response.ok) {
                setIsSuccess(true);
            } else {
                setIsSuccess(false);
                console.error('Erreur :', response.status);
            }
        })
        .catch(error => {
            setIsSuccess(false);
            console.error('Erreur :', error);
        });
    }

       // Fonction pour fermer la modal et réinitialiser le message de succès
       const handleModalClose = () => {
        setIsSuccess(false);
        setIsShown(false);
    }

    return (

        <div className="notify-frame">

            <h2>Vous vous apprêtez à notifier :</h2>
            <div className="companies-to-notify">
            <ul className="companies-to-notify-list">
                {selectedCompanies.map(company => (
                    <li key={company.firm_name}>{company.firm_name}</li>
                ))}
            </ul>
            </div>
            <div className="notify-button-frame">
                <button 
                className="send-message-cancel"
                onClick={handleModalClose}
                
                >
                    Annuler
                </button>
                <button 
                    className="send-message-send" 
                    type="submit"
                    onClick={handleSend}
                >
                    Envoyer
                </button>
                {isSuccess && <p className="success-message">Données envoyées avec succès !</p>}
            </div>

        </div>
        
    )
}
