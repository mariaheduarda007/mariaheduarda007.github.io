import './style.css';
import { WeatherProvider } from '../../components/contexto/provider';
import {Title} from '../../components/title'
export function Home() {
  return (
    <div>
      <WeatherProvider>
        <Title />
      </WeatherProvider>      
    </div>
  );
}

