import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Avatar } from "@mui/material";
import Post from "../components/PostComponents/Post";
import './styles/UserPage.css'
import { useGlobal } from "../GlobalState";
import { useAuth } from "../contexts/AuthContext";




export default () => {
    let { username } = useParams();
    const { fetchUserData } = useGlobal();
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(undefined);
    const [postList, setPostList] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const postContainer = useRef(null);
    // const [isLoggedUserPage, setIsLoggedUserPage] = useState(false);
    const isLoggedUserPage = username === authUser?.username;

    const retrieveUserPageData = async () => {
        const userData = await fetchUserData(username);
        setUser(userData);
        setPostList(userData.posts)
    }


    useEffect(() => {
        retrieveUserPageData()
    }, [username])


    return (
        <>
            <div className="user-page py-12 w-full  flex flex-col items-center">
                <div className="profile-wrapper  flex flex-col gap-6 bg-input py-8 rounded-xl  justify-between text-gray-400 p-6 w-[600px]">
                    <div className="profie-upper flex justify-between items-center">
                        <Avatar
                            sx={{ bgcolor: '#DAA520', color: 'gray', width: 100, height: 100, border: '3px solid lightgray' }}
                            alt={user?.username}
                            src={user?.avatar || ''}

                        />


                        <div className="user-infos flex flex-col gap-4 items-start justify-end ms-12">
                            <div className="infos-upper flex items-center gap-6 w-full">
                                <div className="font-bold text-2xl text-gray-200">
                                    {username}
                                </div>

                                <div className="options flex items-center gap-2">                                    <button>
                                    {isLoggedUserPage ? 'Edit Profile' : 'Follow'}
                                </button>
                                    <button>
                                        {isLoggedUserPage ? 'Hidden Posts' : 'Message'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <div className="flex items-center gap-1">
                                    <strong>
                                        {user?.posts.length}
                                    </strong>
                                    <span>
                                        posts
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <strong>
                                        {user?.followers.length}
                                    </strong>
                                    <span>
                                        followers
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <strong>
                                        {user?.followers.length}
                                    </strong>
                                    <span>
                                        followed
                                    </span>
                                </div>

                            </div>
                            <p>
                                {user?.bio || 'Hey there, I am using BoolBoo'}
                            </p>
                        </div>


                    </div>
                </div>

                <div className="posts-container" ref={postContainer}>
                    {
                        postList.map((p, i) => {
                            return p.published && <Post
                                user={user}
                                key={p?.id || `post-${i}`}
                                post={{ ...p, user: user }}
                                setPostList={setPostList}
                                width={600}


                            />
                        })

                    }

                </div>
            </div>

        </>
    )
}