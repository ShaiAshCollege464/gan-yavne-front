import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import Modal from "react-modal";
import {HOST} from "./Constants.js";

function ClientDashboard() {
    const NOT_SELECTED_CATEGORY = 0;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [postText, setPostText] = useState("");
    const [postFileLink, setPostFileLink] = useState("");
    const [postArea, setPostArea] = useState("");
    const [categories, setCategories] = useState([]);
    const [postCategory,setPostCategory] = useState(NOT_SELECTED_CATEGORY);



    const getPosts = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "get-user-posts", {
            params: {token: token}
        }).then(response => {
            setPosts(response.data.posts);
        })
    }
    const getCategories = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "get-all-categories", {
            params: {token: token}
        }).then(response => {
            setCategories(response.data.categories);
        })
    }


    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/")
        } else {
            getPosts();
            getCategories();
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
                        <select
                            value={postCategory}
                            onChange={(e) => setPostCategory(Number(e.target.value))}
                        >
                            <option disabled value={NOT_SELECTED_CATEGORY}>Select Category</option>
                            {categories.map(item =>{
                                return(
                                    <option value={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                        <input value={postArea} onChange={(event) => {
                            setPostArea(event.target.value)
                        }} placeholder={"Enter the post area: "}/>
                        <input value={postFileLink} onChange={(event) => {
                            setPostFileLink(event.target.value)
                        }} placeholder={"Enter the post image link: "}/>
                        <button
                            disabled={postText === "" || postFileLink === "" || postArea === "" || postCategory === NOT_SELECTED_CATEGORY}
                            onClick={() => {
                                setModalOpen(false);
                                const token = Cookies.get("token");
                                axios.get(HOST + "/add-post", {
                                    params: {text: postText, area: postArea, fileLink: postFileLink,categoryId:postCategory, token}
                                }).then(response => {
                                    setPostFileLink("");
                                    setPostArea("");
                                    setPostText("");
                                    setPostCategory(NOT_SELECTED_CATEGORY);

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
                                        axios.get(HOST + "/delete-post", {
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