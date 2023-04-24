import "./App.css";
import CardList from "./components/CardList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.min.css";
import { useEffect,useContext } from "react";
import CardsContext from './context/card'

function App() {
  const {getAllData} = useContext(CardsContext);
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="App container">
      <CardList/>
    </div>
  );
}

export default App;
