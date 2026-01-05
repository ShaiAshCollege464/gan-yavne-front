import Button from "./Button.jsx";
import Proposal from "./Proposal.jsx";
import Card from "./Card.jsx";
import {useNavigate} from "react-router-dom";

function Post (props) {
    const item = props.item;
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            if (!props.showBids) {
                navigate("/post/" + item.id);
            }
        }}>
            <Card key={item.id} style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{
                    height: '200px',
                    backgroundImage: `url(${item.fileLink})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem'
                }}/>
                <div style={{flex: 1}}>
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
                    <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>{item.text}</h3>
                    <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>📍 {item.area}</p>
                </div>
                <Button
                    text="Delete Post"
                    variant="danger"
                    onClick={() => handleDeletePost(item.id)}
                />
                {
                    props.showBids &&
                    <>
                        {
                            item.bids.length == 0 ?
                                <>
                                    No Bids Yes
                                </>
                                :
                                <>
                                    {item.bids.length} Bids
                                </>
                        }
                        {
                            item.bids.map((item, index) => {
                                return (
                                    <Proposal item={item} index={index}/>
                                )
                            })
                        }
                    </>

                }
            </Card>

        </div>
    )
}

export default Post;