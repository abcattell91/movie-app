import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

import '../assets/modal.css';

function Modal({closeModal, id, title, rating, genres, trailer, description}) {

  return (
    <div className="modalBackground">
      <div key={id} className='modalContainer'>
        <div className='titleCloseBtn'>
          <FontAwesomeIcon
          onClick={() => closeModal(false)}
          icon={faSquareXmark}
          size='3x'
          />
        </div>
        <div className='modalTitle'>
          <h1>{console.log(title)}</h1>
          <div className='modalRating'>
            <h1>{Math.round((rating + Number.EPSILON) * 10) / 10}</h1>
          </div>
        </div>
        <div className='modalBody'>
          <iframe src={console.log(trailer)} title={title} className="modalTrailer" />
            <div className='modalDescription'>
              <p>{description}</p>
            </div>
            <div className='modalGenres'>
            { genres.map((genre, i) => (
              <li
                className='modalGenre'
                key={i}>
                {genre}
              </li>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
