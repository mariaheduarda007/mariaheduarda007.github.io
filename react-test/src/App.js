import logo from './logo.svg';
import './App.css';
import Welcome from './components/welcome';
import Link from './components/link'
import Counter from './components/counter';
import List from './components/list'
import Mega from './components/mega'

function App() {
  return (
    <div className="App">
      <Welcome color="purple" />
      <Link url="https://mariaheduarda007.github.io" text="Github"/>
      <Counter value="0"/>
      <List/>
      <Mega/>

    </div>
  );
}

export default App;
