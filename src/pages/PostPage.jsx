import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {HOST} from "../Constants.js";
import Cookies from "js-cookie";
import Post from "../components/Post.jsx";

function PostPage () {
    const {id} = useParams();
    const[post, setPost] = useState(null);


    useEffect(() => {
        const token = Cookies.get("token");
        axios.get(HOST + "get-post", {
            params: { token, id }
        }).then(response => {
            setPost(response.data.post);
        }).catch(err => {
        });
    }, [id]);



    return (
        <>
            {
                post &&
                <Post item={post} showBids={true} />
            }
        </>
    )
}

export default PostPage;