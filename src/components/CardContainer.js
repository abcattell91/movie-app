import React from 'react';
import axios from 'axios'

import '../App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const CardContainer = ({id, title, poster, ShowDetail, DetailRequest, ActivateModal}) => {

  const clickHandler = () => {

    ActivateModal(true);
    DetailRequest(true);

    axios.get(`http://localhost:3001/api/v1/contents/${id}`).then((response) => {
      DetailRequest(false);
      ShowDetail(response.data);
    });
  };

  return (
    <>
      <FontAwesomeIcon
        onClick={() => clickHandler()}
        icon={faBars}
        size="3x"
        className='hamburger-icon' />
    </>
        )
}


export default CardContainer;
