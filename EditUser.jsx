import { useParams } from "react-router-dom";

export default function EditUser(){

        const { firm_name } = useParams();

        console.log('firmname:', firm_name); 
      
        // Utilisez le firmname comme nécessaire dans votre composant
        // ...
    return(
        <>
        <h1> Bonjour ! {firm_name}</h1>
        </>
    )
}