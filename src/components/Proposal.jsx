import Card from "./Card.jsx";
import {useNavigate} from "react-router-dom";

function Proposal (props) {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            navigate("/bid/" + props.item.id);
        }}>
            <Card key={props.index}
                  style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <h4 style={{margin: 0, fontSize: '1.1rem'}}>{props.item.description}</h4>
                </div>
                <div style={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: 'var(--primary)'
                }}>
                    {props.item.proposedPrice} ₪
                </div>
            </Card>
        </div>
    )
}
export default Proposal;