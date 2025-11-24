import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

function HomePage () {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/")
        } else {
            axios.get("http://localhost:8080/get-posts", {
                params: {token: token}
            }).then(response => {
                setPosts(response.data.posts);
            })
        }
    }, [navigate]);

    return (
        <div>
            Home Page
            <div>
                {
                    posts.map(item => {
                        return (
                            <div>
                                {item.text}
                                {item.area}
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => {
                Cookies.remove("token");
                navigate("/")
            }}>
                Logout
            </button>
        </div>
    )
}

export default HomePage;