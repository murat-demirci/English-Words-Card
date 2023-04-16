import CardForm from "./CardForm";
import CardShow from "./CardShow";

function CardList({ cards, onDelete, updateDB,onAdd }) {
  return (
    <div className="w-100">
      <CardForm onAdd={onAdd}/>
      <div className="columns is-justify-content-start has-text-centered is-flex-wrap-wrap is-variable is-1 mx-auto">
        {cards.map((card) => {
          return (
            <CardShow
              card={card}
              key={card.id}
              onDelete={onDelete}
              updateDB={updateDB}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardList;
