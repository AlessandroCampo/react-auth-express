import { useNavigate } from "react-router";

export default function ({ children }) {
    const navigate = useNavigate();
    const existingToken = localStorage.getItem('authTokenReact');
    if (!existingToken) {
        return navigate('/login')
    }

    return children

}