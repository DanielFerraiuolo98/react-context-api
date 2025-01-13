import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";


const apiUrl = "http://localhost:3000/examples"

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    useEffect(getData, [id]);

    function getData() {
        axios.get(apiUrl + "/posts/" + id).then((res) => {
            console.log(res.data.item);
            setPost(res.data.item);
        })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("finito");
            })
    }

    return (
        <>
            <h1>Sono il post con id {id}</h1>
            <Card
                data={post}
            />
        </>
    )
}