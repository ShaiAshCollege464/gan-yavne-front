import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { HOST } from "../Constants";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Card from "../components/Card";

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
            params: { token: token }
        }).then(response => {
            setPosts(response.data.posts);
        })
    }

    const getMyBids = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "my-bids", {
            params: { token: token }
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

    const handleBid = () => {
        const token = Cookies.get("token");
        axios.get(HOST + "make-bid", {
            params: {
                token,
                postId: selectedPostId,
                proposedPrice: bid,
                description: message
            }
        }).then(response => {
            setSelectedPostId(0);
            setMessage(""); // Reset message
            setBid(0);      // Reset bid
            getMyBids();
        })
    };

    return (
        <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Professional Dashboard</h1>
            </div>

            <Modal
                title={selectedPostId > 0 ? `Bid for: ${getPostById()?.text}` : "Make a Bid"}
                isOpen={selectedPostId > 0}
                onClose={() => setSelectedPostId(0)}
            >
                <div>
                    <Input
                        label="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Why are you the best for this job?"
                    />
                    <Input
                        label="Proposed Price (₪)"
                        type="number"
                        value={bid}
                        onChange={(e) => setBid(Number(e.target.value))}
                        placeholder="0"
                    />
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <Button text="Cancel" variant="secondary" onClick={() => setSelectedPostId(0)} style={{ width: 'auto' }} />
                        <Button
                            text="Send Bid"
                            onClick={handleBid}
                            style={{ width: 'auto' }}
                        />
                    </div>
                </div>
            </Modal>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>Available Jobs</h2>
                {posts.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {posts.map(item => (
                            <Card key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    height: '200px',
                                    backgroundImage: `url(${item.fileLink})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: '1rem'
                                }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.8rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {item.categoryName}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.text}</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>📍 {item.area}</p>
                                </div>
                                {!isAlreadyBided(item.id) ? (
                                    <Button
                                        text="Place a Bid"
                                        onClick={() => setSelectedPostId(item.id)}
                                    />
                                ) : (
                                    <div style={{
                                        padding: '0.75rem',
                                        textAlign: 'center',
                                        backgroundColor: '#ecfdf5',
                                        color: '#059669',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '600'
                                    }}>
                                        ✓ Bid Placed
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
                        No jobs available at the moment.
                    </div>
                )}
            </section>

            <section>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>My Bids</h2>
                {myBids.length > 0 ? (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {myBids.map((item, index) => (
                            <Card key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.description}</h4>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        Status: <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.status}</span>
                                    </div>
                                </div>
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    color: 'var(--primary)',
                                    minWidth: '100px',
                                    textAlign: 'right'
                                }}>
                                    {item.proposedPrice} ₪
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
                        You haven't placed any bids yet.
                    </div>
                )}
            </section>
        </div>
    )
}

export default ProfessionalDashboard;