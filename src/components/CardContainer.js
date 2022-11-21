import React from 'react';
import axios from 'axios'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : poster} />
      <Card.Body>
        <Card.Text>{title}</Card.Text>
        <Button onClick={() => clickHandler()} variant='primary'>Info</Button>
      </Card.Body>
    </Card>
  )
}

export default CardContainer;
