import sunIcon from '../../assets/sun-icon.jpg';
import { useState } from 'react';
import "./style.css";


export function Icon(props) {

    const [icon, setIcon] = useState(sunIcon)

    return (
        <img className="icon" src={icon} >
        </img>

    )
}