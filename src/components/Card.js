import React from "react";
import { animated, to } from "react-spring";
import axios from "axios";

import '../assets/Card.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Card = ({ ShowDetail, DetailRequest, ActivateModal, i, x, y, trans, bind, data}) => {
  const { poster, id } = data[i];
  console.log('data id', data[i].id)

  const clickHandler = () => {
    ActivateModal(true);
    DetailRequest(true);

    axios.get(`http://localhost:3001/api/v1/contents/${id}`).then((response) => {
      DetailRequest(false);
      ShowDetail(response.data);
    });
    console.log('showdetail', ShowDetail)
  };

  return (
    <animated.div
      key={i}
      {...bind(i)}
      style={{
        transform: to([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <div>
        <img className="card" src={poster} key={id} loading="lazy" alt="poster_picture" />
        <FontAwesomeIcon
        onClick={() => clickHandler()}
        icon={faBars}
        size="3x"
        className='hamburger-icon'
      />
      </div>
      </animated.div>
  );
};

export default Card;
