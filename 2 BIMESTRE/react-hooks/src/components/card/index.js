import { useState, useEffect } from 'react';
import "./index.css";
import { Icon } from "../icon"


export function Card(props) {

    const [info, setInfo] = useState("Sunny")

    useEffect(() => {
        setInfo(info + "!");
    }, []);

    return (
        <div className="card">
            <Icon />
            <p> {info} </p>
        </div>
    )
}