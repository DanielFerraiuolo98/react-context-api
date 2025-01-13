import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { filterItems } from "../posts";
import axios from "axios";
import Card from "../Card";
import PostContext from "../Context/PostContext";

const apiUrl = "http://localhost:3000/examples"

const newPost = {
    title: "",
    image: "",
    content: "",
    categoria: "",
    tags: [],
    published: true,
}

function Main() {
    const [formData, setFormData] = useState(newPost);
    const [search, setSearch] = useState("");

    // Accedo allo stato globale dei post e alla funzione per aggiornarlo
    const { post, setPost } = useContext(PostContext);

    // Filtrare i post in base alla ricerca
    const filteredBlog = filterItems(post, search);

    // Funzione per ottenere i dati dal server
    function getData() {
        axios.get(apiUrl)
            .then((res) => {
                console.log(res.data);
                setPost(res.data.data); // Aggiorna lo stato globale con i dati dal server
            })
            .catch((error) => {
                console.error("Errore nel recupero dei dati:", error);
            });
    }

    useEffect(() => {
        getData(); // Carica i dati al primo rendering
    }, []);

    // Funzione per eliminare un post
    function deletePost(id) {
        axios.delete(apiUrl + "/" + id).then((res) => {
            console.log(res.data);
            // Aggiorna la lista dei post nello stato globale
            setPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
        });
    }

    // Gestione dell'input
    function handleInput(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    }

    // Gestione della ricerca
    function handleSearch(e) {
        setSearch(e.target.value);
    }

    return (
        <>
            <section className="main-container">
                <div className="container-lista">
                    <h1 className="lista">Lista dei post</h1>
                </div>
                <div className="col-12">
                    <Link to="/posts/create">Aggiungi nuovo post</Link>
                    <input type="search" name="search" id="search" value={search} className="form-control" onChange={handleSearch} />
                </div>
                {filteredBlog.map(post => (
                    <div className="card-container" key={post.id}>
                        <Card
                            title={post.name}
                            image={post.image}
                            tags={post.tags}
                            content={post.content}
                            categoria={post.categoria}
                            published={post.published}
                            id={post.id}
                            onDelete={() => deletePost(post.id)} // Funzione di eliminazione
                        />
                    </div>
                ))}
            </section>
        </>
    );
}

export default Main;
