import PostsPage from './pages/PostsPage';
import HomePage from './pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import DefaultLayout from './pages/DefaultLayout';
import AddPostPage from './pages/AddPostPage';
import PostPage from './pages/PostPage';
import notFoundPage from './pages/notFoundPage';
import { PostsProvider } from './Context/PostContext';
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = "http://localhost:3000";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get(apiUrl + "/examples")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
      })
      .catch((error) => {
        console.error('Errore nel recupero dei post:', error);
      });
  };

  return (
    <PostsProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={HomePage} />
            <Route index Component={PostsPage} />
            <Route path="/contact" Component={ContactPage} />
            <Route path="/about" Component={AboutPage} />
            <Route path="/posts">
              <Route index Component={PostsPage} />
              <Route path=":id" Component={PostPage} />
              <Route path="create" Component={AddPostPage} />
              <Route path="ricette" element={<Navigate to="/posts" />} />
            </Route>
          </Route>
          <Route path="*" Component={notFoundPage} />
        </Routes>
      </BrowserRouter>
    </PostsProvider>
  )
}

export default App

