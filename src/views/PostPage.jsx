import { customAxiosInstance } from "../axiosClient";
import Post from "../components/PostComponents/Post";
import Comment from "../components/PostComponents/Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";



export default () => {
    const [post, setPost] = useState(undefined);
    const { slug } = useParams();

    const fetchPostInfo = async () => {
        try {
            const { data } = await axios.get(`posts/${slug}`)

            if (!data) return
            console.log(data)
            setPost(data.foundPost);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchPostInfo()
    }, [slug])


    return (
        <div className="w-full flex items-center justify-center py-12">

            {
                post &&
                    post.published ?
                    <div>
                        <Post
                            post={post}
                            className='single-post'
                            width={550}
                            isLinkClickable={false}
                        />
                        <div className="comment-container mt-12 bg-input text-gray-400 rounded-xl w-[550px]">
                            {post.comments.map((c, i) => (
                                <Comment
                                    key={`comment-${c?.id}`}
                                    comment={c}
                                    isLastComment={i == post.comments.length - 1}
                                />
                            ))}
                        </div>
                    </div> :
                    <p className="text-gray-400 text-4xl">
                        The post you're looking for has been hidden or removed by {`${post?.user.username}`}
                    </p>
            }
        </div>


    )
};