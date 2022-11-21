import React, { useEffect, useState } from 'react';

import axios from 'axios'

import MovieModalDetail from './components/MovieModalDetail';
import CardContainer from './components/CardContainer';
import { Loader } from './components/Loader';

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Modal from 'react-bootstrap/Modal';

function App() {
  const [data, setData] = useState(null);
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/contents`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Container>
    <Row>
      { data !== null && data.length > 0 && data.map((result, index) => (
        <Col>
          <CardContainer
            ShowDetail={setShowDetail}
            DetailRequest={setDetailRequest}
            ActivateModal={setActivateModal}
            {...result}
            key={index}
          />
        </Col>
      ))}

      <Modal style={{padding: '10px'}} show={activateModal} onHide={() => setActivateModal(false)}>
        { detailRequest === false ? (<MovieModalDetail {...detail} />) : (<Loader />) }
      </Modal>
    </Row>
    </Container>
  );
}
export default App;
