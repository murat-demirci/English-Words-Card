import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import $ from "jquery";

const CardsContext = createContext();

function Provider({ children }) {
  const [cards, setCard] = useState([]);
  const getAllData = async () => {
    const response = await axios.get("http://localhost:3000/kelimeler");
    setCard(response.data);
  };
  const handleDelete = async (cardId) => {
    await axios.delete(`http://localhost:3000/kelimeler/${cardId}`);
    const newCards = cards.filter((c) => {
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
    const updatedCard = cards.map((c) => {
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
    const newCards = [...cards, response.data];
    setCard(newCards);
  };
  const sharedValuesAndMethods = {
    cards,
    getAllData,
    handleDelete,
    handleUpdate,
    handleAddClick
  };
  return (
    <CardsContext.Provider value={sharedValuesAndMethods}>
      {children}
    </CardsContext.Provider>
  );
}

export { Provider };
export default CardsContext;
