import {useState} from "react";

function CustomButton (props) {
    const [hover, setHover] = useState(false);

    return (
        <button style={{
            backgroundColor: "#0096FF",
            border: "0px",
            color: "white",
            paddingRight: "1.0em ",
            paddingLeft: "1.0em",
            borderRadius: "0.5em",
            cursor: hover ? "pointer" : "",
            transition: "all 150ms ease",
            transform: hover ? "translateY(-0.2em)" : "none",
            marginRight: "1.0em",
            marginLeft: "1.0em",
            marginTop: "0.5em",
            marginBottom: "0.5em",
            fontSize: "1.0em",
        }}
                onClick={props.onClick} disabled={props.disabled}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
        >
            {props.text}
        </button>
    )
}

export default CustomButton;