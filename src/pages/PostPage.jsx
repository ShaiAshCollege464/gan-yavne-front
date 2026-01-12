import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {HOST} from "../Constants.js";
import Cookies from "js-cookie";
import Post from "../components/Post.jsx";

function PostPage () {
    const {id} = useParams();
    const[post, setPost] = useState(null);
    const[userType,setUserType] = useState(0);


    useEffect(() => {
        const token = Cookies.get("token");
        axios.get(HOST + "get-default-params", {
            params: { token: token }
        }).then(response => {
            setUserType(response.data.userType)
        })

    }, [id]);

    useEffect(() => {
        const token = Cookies.get("token");
        if(userType == 1){
            axios.get(HOST + "get-post-user", {
                params: { token, id }
            }).then(response => {
                setPost(response.data.post);
            }).catch(err => {
            });
        }else if (userType == 2){
            axios.get(HOST + "get-post-professional", {
                params: { token, id }
            }).then(response => {
                setPost(response.data.post);
            }).catch(err => {
            });
        }

    }, [userType]);



    return (
        <>
            {
                post &&
                <Post item={post} showBids={true} client = {userType===1} />
            }
        </>
    )
}

export default PostPage;