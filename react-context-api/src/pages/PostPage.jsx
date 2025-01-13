import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "../Card";
import PostContext from "../Context/PostContext";

const apiUrl = "http://localhost:3000/examples"

export default function PostPage() {
    const { id } = useParams();  // Ottieni l'ID dal parametro della URL
    const { post, setPost } = useContext(PostContext); // Accedi allo stato globale dei post
    const [singlePost, setSinglePost] = useState(null); // Stato locale per un singolo post

    useEffect(() => {
        getData();
    }, [id, post]);

    // Funzione per ottenere i dati dal server
    function getData() {
        axios.get(apiUrl + "/posts/" + id)
            .then((res) => {
                console.log(res.data.item);
                setSinglePost(res.data.item);
                // Aggiungi il post ricevuto alla lista globale se necessario
                setPost((prevPosts) => [...prevPosts, res.data.item]);
            })
            .catch((error) => {
                console.error("Errore nel recupero dei dati:", error);
            });
    }

    return (
        <>
            <h1>Sono il post con id {id}</h1>
            <Card data={singlePost} />
        </>
    );
}
