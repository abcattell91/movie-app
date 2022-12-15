import React, { useState, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

import "../assets/modal.css";

function Modal({
  closeModal,
  id,
  title,
  rating,
  genres,
  trailer,
  description
})
{
  const [loading, setLoading] = useState(true)

  const hideSpinner = () => {
    setLoading(false)
  };

  const override: CSSProperties = {
    borderColor: "#ff6666",
    height: "45px",
    width: "40px"
  };

  return (
    <div className="modalBackground">
      <div key={id} className="modalContainer">
        <div className="titleCloseBtn">
          <FontAwesomeIcon
            onClick={() => closeModal(false)}
            icon={faSquareXmark}
            size="3x"
          />
        </div>
        <div className="modalTitle">
          <h2>{title}</h2>
          <div className="modalRating">
            <h2>{Math.round((rating + Number.EPSILON) * 10) / 10}</h2>
          </div>
        </div>
        <div className="modalBody">
          <div className="video">
            <div className="loader">
            <ClipLoader
              loading={loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
              cssOverride={override}
            />
            </div>
            <iframe
              onLoad={hideSpinner}
              src={trailer}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
              className="modalTrailer"
              loading='eager'
            />
          </div>
          <div className="modalDescription">
            <p>{description}</p>
          </div>
          <div className="modalGenres">
            {genres.map((genre, i) => (
              <li className="modalGenre" key={i}>
                {genre}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
