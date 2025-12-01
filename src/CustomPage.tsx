import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function CustomPage (props) {
    const navigate = useNavigate();

    return (
        <div>
            This is some general content
            {props.children}

            <button onClick={() => {
                Cookies.remove("token");
                navigate("/")
            }}>
                Logout
            </button>
        </div>
    )
}


