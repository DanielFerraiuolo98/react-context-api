import { useContext } from "react";
import PostContext from "../Context/PostContext";

export default function AboutPage() {
    const { post } = useContext(PostContext);
    return (
        <>
            <section className="main-container">
                <div className="container-lista">
                    <h1>About Page</h1>
                    <h2>Posts:</h2>
                    <ul>
                        {post.map((p) => {
                            return (
                                <li key={p.id}>
                                    <h2>{p.title}</h2>
                                    <img src={p.image} alt={p.title} />
                                    <p>{p.content}</p>
                                    <p>{p.tags}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </>
    );
}
