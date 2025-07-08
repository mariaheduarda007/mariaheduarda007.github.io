import './style.css';
import {Card} from "../../components/card"
import { WeatherProvider } from '../../components/contexto/provider';

export function About() {
  return (
    <div>
      
      <WeatherProvider>
      <Card initInfo="Dados" />
      </WeatherProvider>
    </div>
  );
}


