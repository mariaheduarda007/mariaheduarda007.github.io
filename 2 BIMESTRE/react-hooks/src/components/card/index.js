import { useState, useEffect, useContext } from 'react';
import "./style.css";
import { Icon } from "../icon"
import { WeatherContext } from '../contexto/context';


export function Card(props) {

    const [info, setInfo] = useState(props.initInfo);
    const weather = useContext(WeatherContext);

    return (
        <div className="card">
            <Icon />
            <p > {info}:{weather} </p>
        </div>
    )
}