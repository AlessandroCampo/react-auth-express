import { Avatar } from "@mui/material";

import './post.css';
import { useNavigate } from "react-router";
import { formatTimestamp } from "../../utils";

import { FaRegComment, FaRegHeart } from "react-icons/fa";




export default function ({ comment, isLastComment }) {


    const navigate = useNavigate();


    const showUserPage = (e) => {
        e.preventDefault()
        navigate(`/${comment?.user?.username}`);
    };


    return (
        <div className="comment w-full">

            <div className={`p-6 flex justify-between items-center  ${isLastComment ? '' : 'border-b mb-gray-400'}`}>

                <div className="upper-left flex gap-3 flex-col items-start">

                    <Avatar
                        sx={{ bgcolor: '#DAA520', color: 'gray', width: 48, height: 48 }}
                        alt={comment?.user?.username}
                        src={comment?.user?.avatar || ''}
                        onClick={showUserPage}

                    />


                    <div className="authors-info flex flex-col text-sm">
                        <span className="font-bold">
                            {comment?.user?.username}
                        </span>
                        <span>
                            {formatTimestamp(comment?.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="w-3/5">
                    {comment?.content}
                </div>

                <div className="icons-container flex flex-col gap-3">
                    <div className="iconandcounter">
                        <FaRegHeart
                            className="icon-common"
                        />
                        <span className="counter">
                            {comment?.likes?.length || 0}
                        </span>
                    </div>
                    <div className="iconandcounter">
                        <FaRegComment
                            className="icon-common"
                        />
                        <span className="counter">
                            {comment?.comments?.length || 0}
                        </span>
                    </div>
                </div>


            </div>
        </div>
    )
};



