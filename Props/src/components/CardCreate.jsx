import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFloppyDisk,
  faXmark,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { useState } from "react";

function CardCreate({ card, hoverUpdate, hoverCancel, showEdit, updateDB }) {
  library.add(faFloppyDisk, faXmark, faCaretRight);
  const [kelime, setKelime] = useState(card.kelime ? card.kelime : "");
  const [anlami, setAnlami] = useState(card.anlami ? card.anlami : "");
  const kelimeInput = $(".card").find("#kelime");
  const anlamiInput = $(".card").find("#anlami");
  const handleSaveHover = () => {
    hoverUpdate(".btn-save");
  };
  const handleCancelHover = () => {
    hoverCancel(".btn-cancel");
  };
  const handleCancelClick = () => {
    showEdit(false);
  };

  const handleChange = (e) => {
    e.target.id === "kelime"
      ? setKelime(e.target.value)
      : setAnlami(e.target.value);
  };
  const handleInputFocus = (e) => {
    $(e.target).next().children().addClass("has-text-primary");
  };
  const handleInputBlur = (e) => {
    $(e.target).next().children().removeClass("has-text-primary");
  };

  const handleSaveClick = (e) => {
    kelimeInput.val() !== kelime && anlamiInput.val() !== anlami
      ? showEdit(false)
      : updateDB(card.id, kelime, anlami);
    showEdit(false);
  };
  return (
    <>
      <div className="column is-one-quarter">
        <div className="card">
          <header className="card-header justify-content-center">
            <div className="control has-icons-left w-50">
              <input
                id="kelime"
                className="input is-rounded is-primary is-outlined w-100 is-small"
                type="text"
                value={kelime}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleChange}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faCaretRight} />
              </span>
            </div>
          </header>
          <div className="card-content">
            <div className="control has-icons-left">
              <input
                id="anlami"
                className="input is-rounded is-primary is-outlined w-100 is-small"
                type="text"
                value={anlami}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleChange}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faCaretRight} />
              </span>
            </div>
          </div>
          <footer className="card-footer p-1">
            <button
              className="button btn-save is-primary is-outlined is-small w-100 m-1 p-1"
              onMouseEnter={handleSaveHover}
              onClick={handleSaveClick}
            >
              <span className="icon has-text-primary">
                <FontAwesomeIcon icon={faFloppyDisk} />
              </span>
              <span>Kaydet</span>
            </button>
            <button
              className="button btn-cancel is-danger is-outlined is-small w-100 m-1 p-1"
              onMouseEnter={handleCancelHover}
              onClick={handleCancelClick}
            >
              <span className="icon has-text-danger ">
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <span>Vazgec</span>
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default CardCreate;
