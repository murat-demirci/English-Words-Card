import $ from "jquery";
import { useState, useContext } from "react";
import CardCreate from "./CardCreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare, faBan } from "@fortawesome/free-solid-svg-icons";
import CardsContext from "../context/card";

function CardShow({ card }) {
  const { handleDelete } = useContext(CardsContext);
  const [showEdit, setshowEdit] = useState(false);
  console.log(showEdit);
  library.add(faPenToSquare, faBan);

  const handleEditClick = () => {
    setshowEdit(!showEdit);
  };
  const handleDeleteClick = () => {
    handleDelete(card.id);
  };
  const handleEditHover = (classN) => {
    !showEdit
      ? $(".btn-edit .icon").removeClass("has-text-primary")
      : $(classN + " .icon").removeClass("has-text-primary");
  };
  const handleDeleteHover = (classN) => {
    !showEdit
      ? $(".btn-delete .icon").removeClass("has-text-danger")
      : $(classN + " .icon").removeClass("has-text-danger");
  };

  return (
    <>
      {!showEdit ? (
        <>
          <div className="column is-one-quarter">
            <div className="card w-100">
              <header className="card-header">
                <p className="card-header-title is-centered">{card.kelime}</p>
              </header>
              <div className="card-content">
                <div className="content has-text-center">{card.anlami}</div>
              </div>
              <footer className="card-footer p-1">
                <button
                  className="button btn-edit is-primary is-outlined is-small w-100 m-1 p-1"
                  onClick={handleEditClick}
                  onMouseEnter={handleEditHover}
                >
                  <span className="icon has-text-primary">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                  <span>Duzenle</span>
                </button>
                <button
                  className="button btn-delete is-danger is-outlined is-small w-100 m-1 p-1"
                  onClick={handleDeleteClick}
                  onMouseEnter={handleDeleteHover}
                >
                  <input
                    type="number"
                    className="d-none"
                    readOnly
                    value={card.id}
                  />
                  <span className="icon has-text-danger ">
                    <FontAwesomeIcon icon={faBan} />
                  </span>
                  <span>Sil</span>
                </button>
              </footer>
            </div>
          </div>
        </>
      ) : (
        <>
          <CardCreate
            card={card}
            showEdit={setshowEdit}
            updateHover={handleEditHover}
            cancelHover={handleDeleteHover}
          />
        </>
      )}
    </>
  );
}

export default CardShow;
