import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {HOST} from "../Constants.js";

function BidPage () {
    const {id} = useParams();
    const[description, setDescription] = useState(null);
    const[conversation, setConversation] = useState([])
    const[newMessage, setNewMessage] = useState("");



    const getBid = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "get-bid", {
            params: { token, id }
        }).then(response => {
            setDescription(response.data.description);
            setConversation(response.data.conversation);
        }).catch(err => {
        });
    }

    useEffect(() => {
        getBid();
    }, [id]);


    return (
        <>
            Bid
            {
                <>
                    {
                        description
                    }

                    {
                        conversation.map(item => {
                            return (
                                <div style={{
                                    marginBottom: "20px"
                                }}>
                                    <div>
                                        Time: {item.time}
                                    </div>
                                    <div>
                                        Sender: {item.sender}

                                    </div>
                                    <div>
                                        {item.message}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div>
                                            <textarea value={newMessage} onChange={(event) => {
                                                setNewMessage(event.target.value)
                                            }}/>
                        <button onClick={() => {
                            const token = Cookies.get("token");
                            axios.get(HOST + "send-message", {
                                params: { token, newMessage, bidId: id }
                            }).then(response => {
                                setNewMessage("");
                                getBid();
                            }).catch(err => {
                            });

                        }}>Send</button>
                    </div>
                </>
            }
        </>
    )
}

export default BidPage;