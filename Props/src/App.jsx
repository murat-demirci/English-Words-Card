import { useState, useEffect } from "react";
import "./App.css";
import $ from "jquery";
import CardList from "./components/CardList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.min.css";

function App() {
  const [card, setCard] = useState([]);
  const getAllData = async () => {
    const response = await axios.get("http://localhost:3000/kelimeler");
    setCard(response.data);
  };

  useEffect(() => {
    getAllData();
  }, []);
  const handleDelete = async (cardId) => {
    await axios.delete(`http://localhost:3000/kelimeler/${cardId}`);
    const newCards = card.filter((c) => {
      return c.id !== cardId;
    });
    $.when(
      $(`input[value = ${cardId}]`).closest(".column").addClass("delete-anim")
    ).then(function () {
      setTimeout(() => {
        setCard(newCards);
      }, 210);
    });
  };

  const handleUpdate = async (cardId, kelimeVal, anlamiVal) => {
    await axios.put(`http://localhost:3000/kelimeler/${cardId}`, {
      kelime: kelimeVal,
      anlami: anlamiVal,
    });
    const updatedCard = card.map((c) => {
      if (c.id === cardId) {
        return { id: cardId, kelime: kelimeVal, anlami: anlamiVal };
      }
      return c;
    });
    setCard(updatedCard);
  };

  const handleAddClick = async (values) => {
      const response = await axios.post(`http://localhost:3000/kelimeler/`, {
        kelime: values[0],
        anlami: values[1],
      });
      const newCards = [...card, response.data];
      setCard(newCards);
  };

  return (
    <div className="App container">
      <CardList
        cards={card}
        onDelete={handleDelete}
        updateDB={handleUpdate}
        onAdd={handleAddClick}
      />
    </div>
  );
}

export default App;
