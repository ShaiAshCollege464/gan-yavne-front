import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {HOST} from "../Constants.js";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Card from "../components/Card";
import Layout from "../components/Layout";
import Proposal from "../components/Proposal.jsx";
import Post from "../components/Post.jsx";

function ClientDashboard() {
    const NOT_SELECTED_CATEGORY = 0;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [postText, setPostText] = useState("");
    const [postFileLink, setPostFileLink] = useState("");
    const [postArea, setPostArea] = useState("");
    const [categories, setCategories] = useState([]);
    const [postCategory, setPostCategory] = useState(NOT_SELECTED_CATEGORY);
    const [searchValue, setSearchValue] = useState("");
    const [myProposals, setMyProposals] = useState([]);

    const getPosts = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "get-user-posts", {
            params: {token: token}
        }).then(response => {
            setPosts(response.data.posts);
        })
    }

    const getProposals = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "my-proposals", {
            params: {token: token}
        }).then(response => {
            setMyProposals(response.data.bids);
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
            getProposals();
        }
    }, [navigate]);

    const filter = () => {
        return posts.filter(item => {
            return item.text.includes(searchValue);
        })
    }

    const handleAddPost = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "/add-post", {
            params: {text: postText, area: postArea, fileLink: postFileLink, categoryId: postCategory, token}
        }).then(response => {
            setPostFileLink("");
            setPostArea("");
            setPostText("");
            setPostCategory(NOT_SELECTED_CATEGORY);
            setModalOpen(false);
            getPosts();
        })
    };

    const handleDeletePost = (postId) => {
        const token = Cookies.get("token");
        axios.get(HOST + "/delete-post", {
            params: {postId: postId, token: token}
        }).then(response => {
            getPosts();
        })
    };

    return (
        <Layout
            title="Client Dashboard"
            searchValue={searchValue}
            setSearchValue={setSearchValue}
        >
            <Modal
                title="Create New Post"
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <div>
                    <Input
                        label="Description"
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        placeholder="What needs to be done?"
                    />

                    <div style={{marginBottom: '1rem'}}>
                        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Category</label>
                        <select
                            value={postCategory}
                            onChange={(e) => setPostCategory(Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--surface)',
                                fontSize: '1rem'
                            }}
                        >
                            <option disabled value={NOT_SELECTED_CATEGORY}>Select Category</option>
                            {categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Area / Location"
                        value={postArea}
                        onChange={(e) => setPostArea(e.target.value)}
                        placeholder="e.g. Tel Aviv"
                    />

                    <Input
                        label="Image URL"
                        value={postFileLink}
                        onChange={(e) => setPostFileLink(e.target.value)}
                        placeholder="https://..."
                    />

                    <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                        <Button text="Cancel" variant="secondary" onClick={() => setModalOpen(false)}
                                style={{width: 'auto'}}/>
                        <Button
                            text="Publish Post"
                            disabled={postText === "" || postFileLink === "" || postArea === "" || postCategory === NOT_SELECTED_CATEGORY}
                            onClick={handleAddPost}
                            style={{width: 'auto'}}
                        />
                    </div>
                </div>
            </Modal>

            <section style={{marginBottom: '3rem'}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--border)',
                    paddingBottom: '0.5rem'
                }}>
                    <h2 style={{fontSize: '1.5rem', margin: 0}}>My Posts</h2>
                    <Button text="Add New Post" onClick={() => setModalOpen(true)}
                            style={{width: 'auto', padding: '0.5rem 1rem'}} className={"max-w-[150px]"}/>
                </div>

                {filter().length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {filter().map(item => (
                            <Post item={item}/>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-lg)'
                    }}>
                        No posts found. Start by creating one!
                    </div>
                )}
            </section>

            <section>
                <h2 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--border)',
                    paddingBottom: '0.5rem'
                }}>Proposals Received</h2>
                {myProposals.length > 0 ? (
                    <div style={{display: 'grid', gap: '1rem'}}>
                        {myProposals.map((item, index) => (
                            <Proposal index={index} item={item}/>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-lg)'
                    }}>
                        No proposals yet.
                    </div>
                )}
            </section>
        </Layout>
    )
}

export default ClientDashboard;