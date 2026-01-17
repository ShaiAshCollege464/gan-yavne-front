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
    const[messages, setMessages] = useState("");
    const[typing, setTyping] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        const listener = new EventSource(HOST + "/subscribe?token=" + token);

        listener.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            const messageReceived = {
                message: message.content,
                sender: message.sender,
                time: message.time
            };
            setConversation((prevConversation) => [...prevConversation, messageReceived]);
        });

        listener.addEventListener("typing", (event) => {
            setTyping(true);
        });

        return () => {
            listener.close();
        };
    }, []);


    useEffect(() => {
        const token = Cookies.get("token");
        axios.get(HOST + "typing", {
            params: { token, bidId: id}
        }).then(response => {
        }).catch(err => {
        });

    }, [id, newMessage])

    useEffect(() => {
        if (typing) {
            setTimeout(() => {
                setTyping(false);
            }, 10000)
        }
    }, [typing]);




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
            {
                typing ?
                <>
                    Someone is typing...
                </>
                    :
                    <>
                    NOT TYPING
                    </>
            }
        </>
    )
}

export default BidPage;