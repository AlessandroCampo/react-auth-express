


export default function ({ element }) {
    return (
        <div className="icons-container">
            <div className="iconandcounter">
                <FaRegHeart
                    className="icon-common"
                />
                <span className="counter">
                    {element?.likes?.length || 0}
                </span>
            </div>
            <div className="iconandcounter">
                <FaRegComment
                    className="icon-common"
                />
                <span className="counter">
                    {element?.comments?.length || 0}
                </span>
            </div>
            <div className="iconandcounter">
                <GrSync
                    className="icon-common"
                />
                <span className="counter">
                    {element?.comments?.length || 0}
                </span>
            </div>
        </div>
    )
};