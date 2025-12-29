import {useNavigate} from "react-router-dom";

import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {HOST} from "./Constants";
import CustomButton from "./custom/CustomButton.jsx";
import Modal from "react-modal";


function ProfessionalDashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(0);
    const [message, setMessage] = useState("");
    const [bid, setBid] = useState(0);
    const [myBids, setMyBids] = useState([]);

    const getPosts = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "get-all-posts", {
            params: {token: token}
        }).then(response => {
            setPosts(response.data.posts);
        })
    }

    const getMyBids = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "my-bids", {
            params: {token: token}
        }).then(response => {
            setMyBids(response.data.bids);
        })

    }

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/")
        } else {
            getPosts();
            getMyBids();
        }
    }, [navigate]);

    const getPostById = () => {
        return posts.find(item => item.id == selectedPostId);
    }

    const isAlreadyBided = (postId) => {
        return myBids.map(item => item.postId).includes(postId);
    }

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

                                <td>
                                    {
                                        !isAlreadyBided(item.id) ?
                                        <CustomButton
                                            text={"Bid"} onClick={() => {
                                            setSelectedPostId(item.id);

                                        }}/>
                                            :
                                            <>
                                                You already bided!
                                            </>
                                    }
                                </td>

                            </tr>
                        )
                    })
                }
            </table>
            {
                selectedPostId > 0 &&
                <Modal
                    onRequestClose={() => {
                        setSelectedPostId(0)
                    }}
                    isOpen={true}
                    style={{}}
                    contentLabel="Example Modal"
                >
                    <div>
                        Make a bid for: {getPostById().text}
                        <input placeholder={"Write your message: "} value={message} onChange={(event) => setMessage(event.target.value) }/>
                        <input
                            placeholder={"Write your bid: "}
                            value={bid}
                            type={"number"}
                            onChange={(event) => setBid(Number(event.target.value))}/>
                        <CustomButton
                            text={"Send your bid"}
                            onClick={() => {
                                setSelectedPostId(0);
                                const token = Cookies.get("token");
                                axios.get(HOST + "make-bid", {
                                    params: {token,
                                        postId: selectedPostId,
                                        proposedPrice: bid,
                                        description: message
                                    }
                                }).then(response => {
                                    getMyBids();
                                })
                            }}
                        />
                    </div>
                </Modal>
            }

            <div>
                My Bids: {myBids.length}
                <table>
                    <tr>
                        <th>
                            Message
                        </th>
                        <th>
                            Proposed Price
                        </th>
                        <th>
                            Status
                        </th>

                    </tr>
                    {
                        myBids.map(item => {
                            return (
                                <tr>
                                    <td>
                                        {item.description}
                                    </td>
                                    <td>
                                        {item.proposedPrice}
                                    </td>
                                    <td>
                                        {item.status}
                                    </td>

                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default ProfessionalDashboard;