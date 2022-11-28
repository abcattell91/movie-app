import React from 'react'

function Modal({closeModal, id, title, rating, duration, genres, trailer, description}) {

  return (
    <div className="modalBackground">
      <button onClick={() => closeModal(false)}>X</button>
      <div key={id} className='modalContainer'>
        <div className='modalTitle'>{title}</div>
        <div className='modalBody'>
          <div>
            {description}
            {Math.round((rating + Number.EPSILON) * 10) / 10}
            {duration}
          </div>
          { genres.map((genre) => (
          <div>{genre}</div>
          ))}
          <div className='modalTrailer'>
            <iframe src={trailer} title={title} height="350px"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
