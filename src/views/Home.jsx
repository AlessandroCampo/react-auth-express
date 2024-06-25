import { useEffect, useRef, useState, useContext } from "react";
import CreatePost from "../components/PostComponents/CreatePost.jsx"
import Post from "../components/PostComponents/Post";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customAxiosInstance } from "../axiosClient.js";

import { Error } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useGlobal } from "../GlobalState.jsx";




const Home = () => {


    const { user, setUser } = useAuth();
    const { fetchUserData, notifyError, notifySuccess } = useGlobal();

    const [postList, setPostList] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);

    const postContainer = useRef(null);

    const addNewPost = (newPost) => {
        console.log('adding a new post', newPost)
        setPostList(oldList => [newPost, ...oldList]);
        console.log(postList)
    }

    const retrieveAuthData = async () => {
        const username = localStorage.getItem('reactUsername');
        if (!username) {
            //handle later
            return
        }
        const userData = await fetchUserData(username);
        if (!userData) {
            //handle later
            return
        }

        setUser(userData);
    }


    const fetchPosts = async (page = 1) => {

        customAxiosInstance.get(`posts?page=${page}`)
            .then((res) => {
                if (res) {
                    setTotalPages(res.data.totalPages);
                    setPostList(oldList => [...oldList, ...res.data.allPosts]);
                }
            })
            .catch(err => console.error(err));

    }


    useEffect(() => {
        retrieveAuthData();
        fetchPosts();
    }, [])



    useEffect(() => {
        const handleScroll = async () => {
            if (postContainer.current) {
                const scrollTop = document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                const containerHeight = postContainer.current.offsetHeight;
                const containerTop = postContainer.current.offsetTop;
                const bottomOfViewport = scrollTop + windowHeight;
                const triggerPoint = containerTop + containerHeight * 0.9;

                if (bottomOfViewport >= triggerPoint) {
                    console.log('triggered')
                    const token = localStorage.getItem('authTokenReact');
                    setLastPage(prevPage => {
                        const nextPage = prevPage + 1;
                        fetchPosts(nextPage);
                        return nextPage;
                    })
                    return
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [postList]);



    return (
        <>

            <ToastContainer
                theme="dark"
                hideProgressBar
            />

            <div className="home-container overflow-auto">
                <div className="home-middle w-full flex items-center flex-col py-12">
                    <CreatePost
                        user={user}
                        setPostList={setPostList}
                        notifyError={notifyError}
                        notifySuccess={notifySuccess}
                        onPostCreate={(newPost) => { addNewPost(newPost) }}
                    />
                    <div className="posts-container" ref={postContainer}>
                        {
                            postList.map((p, i) => {
                                return p.published && <Post
                                    key={p.id || `post-${i}`}
                                    post={p}
                                    setPostList={setPostList}
                                    width={350}


                                />
                            })

                        }

                    </div>
                </div>




            </div>

        </>
    )
}

export default Home;