import { createContext, useState } from "react";
import { posts } from "../posts";

const PostContext = createContext();
export const PostsProvider = ({ children }) => {
    const [post, setPost] = useState(posts);

    return (
        <PostContext.Provider value={{ post, setPost }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContext;
