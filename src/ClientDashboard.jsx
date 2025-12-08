import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import Modal from "react-modal";

function ClientDashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [postText, setPostText] = useState("");

    const getPosts = () => {
        const token = Cookies.get("token");
        axios.get("http://localhost:8080/get-user-posts", {
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
            Home Page

            <div>
                <button onClick={() => {
                    setModalOpen(true);
                }}>
                    Add New Post
                </button>
                <Modal
                    onRequestClose={() => {
                        setModalOpen(false)
                    }}
                    isOpen={modalOpen}
                    style={{}}
                    contentLabel="Example Modal"
                >
                    <div>
                        <input value={postText} onChange={(event) => {
                            setPostText(event.target.value)
                        }} placeholder={"Enter the post description: "}/>
                        <input placeholder={"Enter the post category"}/>
                        <input placeholder={"Enter the post area: "}/>
                        <input placeholder={"Enter the post image link: "}/>
                        <button onClick={() => {
                            setModalOpen(false);
                            const token = Cookies.get("token");
                            axios.get("http://localhost:8080/add-post", {
                                params: {text: postText, token}
                            }).then(response => {
                                getPosts();
                            })

                        }}>Add
                        </button>
                    </div>
                </Modal>
            </div>
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
                    <th>
                        //delete
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
                                <td>
                                    <button onClick={() => {
                                        const token = Cookies.get("token");
                                        axios.get("http://localhost:8080/delete-post", {
                                            params: {postId: item.id, token: token}
                                        }).then(response => {
                                            getPosts();
                                        })

                                    }}>DELETE
                                    </button>
                                </td>

                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ClientDashboard;