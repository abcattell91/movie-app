import React from "react";
import { animated, interpolate } from "react-spring";
import axios from "axios";

import '../assets/Card.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Card = ({ ShowDetail, DetailRequest, ActivateModal, i, x, y, rot, scale, trans, bind, data}) => {
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
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot], trans)
        }}
      >
        <img className="card" src={poster} key={id} alt="poster_picture" />
        <FontAwesomeIcon
        onClick={() => clickHandler()}
        icon={faBars}
        size="3x"
        className='hamburger-icon'
      />
      </animated.div>
    </animated.div>
  );
};

export default Card;
