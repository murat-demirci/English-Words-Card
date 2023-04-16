import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function CardForm({ onAdd }) {
  library.add(faTriangleExclamation);
  const handleAddClick = async (e) => {
    e.preventDefault();
    const inputs = $(e.target).closest("#formAdd").find("input").get();
    const words = inputs.map((w) => {
      return $(w).val();
    });
    if (
      (words[0] !== "" && words[1] !== "") ||
      (words[0].length > 0 && words[1].length > 0)
    ) {
      onAdd(words);
      inputs.filter((e) => {
        $(e).val("");
        $(e).next().addClass("d-none");
      });
    } else {
      inputs.filter((e) => {
        if ($(e).val() === "") {
          $(e).attr("placeHolder", "");
          $(e).next().removeClass("d-none");
        } else {
          $(e).next().addClass("d-none");
        }
      });
    }
  };
  const handleInputChange = (e) => {
    if ($(e.target).val() !== "" || $(e.target).val().length > 0) {
      $(e.target).next().addClass("d-none");
    } 
    else 
    {
      $(e.target).next().removeClass("d-none");
    }
  };
  return (
    <>
      <div className="columns is-justify-content-center has-text-centered mt-2 mx-auto">
        <div className="column is-full">
          <form id="formAdd">
            <div className="columns">
              <div className="column is-half">
                <label className="label">Kelime</label>
                <div className="control icon-text has-icons-left">
                  <input
                    className="input is-rounded is-primary is-outlined has-text-centered  p-2"
                    type="text"
                    placeholder="Kelime Giriniz..."
                    onChange={handleInputChange}
                  />
                  <span className="icon is-small is-left w-100 has-text-danger d-none">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="mr-1"
                    />
                    <small>Lutfen bu alani doldurunuz!</small>
                  </span>
                </div>
              </div>
              <div className="column is-half">
                <label className="label">Anlami</label>
                <div className="control icon-text has-icons-left">
                  <input
                    className="input is-rounded is-primary is-outlined has-text-centered p-2"
                    type="text"
                    placeholder="Kelimenin Anlamini Giriniz..."
                    onChange={handleInputChange}
                  />
                  <span className="icon is-small is-left w-100 has-text-danger d-none">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="mr-1"
                    />
                    <small>Lutfen bu alani doldurunuz!</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-full">
                <button
                  className="button btn-add is-primary is-outlined is-rounded is-fullwidth"
                  onClick={handleAddClick}
                >
                  Ekle
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CardForm;
