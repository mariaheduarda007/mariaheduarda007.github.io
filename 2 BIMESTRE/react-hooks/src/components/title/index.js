import { useContext} from "react";
import { WeatherContext } from "../contexto/context";

export function Title (){

    const title = useContext(WeatherContext);

    return (
        <div>

            <h1> {title} </h1>
        </div>
    );

}