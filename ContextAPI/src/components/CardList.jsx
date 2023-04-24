import CardForm from "./CardForm";
import CardShow from "./CardShow";
import { useContext } from "react";
import CardsContext from '../context/card';

function CardList() {
  const { cards } = useContext(CardsContext);
  return (
    <div className="w-100">
      <CardForm />
      <div className="columns is-justify-content-start has-text-centered is-flex-wrap-wrap is-variable is-1 mx-auto">
        {cards.map((card) => {
          return <CardShow card={card} key={card.id} />;
        })}
      </div>
    </div>
  );
}

export default CardList;
