import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import './App.css';
import axios from 'axios';
import Modal from './components/modal';

// Component imports
import MovieModalDetail from './components/MovieModalDetail';
import CardContainer from './components/CardContainer';
import { Loader } from './components/Loader';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
// import Modal from 'react-bootstrap/Modal';

function App() {
  const [data, setData] = useState(null);
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/contents`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
<>
        { data !== null && data.length > 0 && data.map((result, index) => (

          <TinderCard
            className='swipe'
            key={result.title}
            onSwipe={(dir) => swiped(dir, result.title)}
            Screen={() => outOfFrame(result.title)}
            preventSwipe='up, down'
          >
            <CardContainer
              ShowDetail={setShowDetail}
              DetailRequest={setDetailRequest}
              ActivateModal={setActivateModal}
              {...result}
              key={index}
            />
          </TinderCard>

        ))}
        {activateModal ? detailRequest === false ? (<Modal {...detail} closeModal={setActivateModal} />) : (<Loader />) : ''}
</>
  );
}
export default App;
