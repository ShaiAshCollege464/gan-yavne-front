import {useNavigate} from "react-router-dom";

import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

function ProfessionalDashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        const token = Cookies.get("token");
        axios.get("http://localhost:8080/get-all-posts", {
            params: {token: token}
        }).then(response => {
            setPosts(response.data.posts);
        })
    }

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/")
        } else {
            getPosts();
        }
    }, [navigate]);

    return (
        <div>
            <table>
                <tr>
                    <th>
                        Text
                    </th>
                    <th>
                        Area
                    </th>
                    <th>
                        Category
                    </th>
                    <th>
                        Image
                    </th>

                </tr>
                {
                    posts.map(item => {
                        return (
                            <tr>
                                <td>
                                    {item.text}
                                </td>
                                <td>
                                    {item.area}
                                </td>
                                <td>
                                    {item.categoryName}
                                </td>
                                <td>
                                    <img style={{
                                        width: 100,
                                        height: 50
                                    }} src={item.fileLink}/>
                                </td>

                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ProfessionalDashboard;