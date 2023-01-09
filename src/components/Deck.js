import React, { useEffect, useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { useSprings } from "@react-spring/web";
import { useGesture } from "react-with-gesture";
import Card from "./Card";
import "../assets/Deck.css";


import Modal from "./modal";

import { Loader } from "./Loader";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const limit = 10

const to = i => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: 0
});
const from = i => ({ rot: 0, scale: 1.5, y: -100 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [nope] = useState(() => new Set());
  const [data, setData] = useState([])
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [liked, setLiked] = useState(false)
  const [disLiked, setDisliked] = useState(false)

  useEffect(() => {
       axios.get(`http://localhost:3001/api/v1/contents?limit=${limit}&offset=${offset}`)
          .then((response) => {
          setData(response.data.contents);
        });
    }, [offset]);


  const [props, set] = useSprings(data.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      const like = (200 + window.innerWidth) && xDir > 0.90 && index;

      if ((200 + window.innerWidth) && xDir > 0.90)
        setLiked(true);

        console.log('liked', like)

      const disLike = (200 + window.innerWidth) && xDir < -0.90 && index;

      if ((200 + window.innerWidth) && xDir > -0.90)
        setDisliked(true);

      console.log('Disliked', disLike)

      if (!down && trigger) nope.add(index);

      set(i => {
        if (index !== i) return;
        const isNope = nope.has(index);

        const x = isNope ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isNope ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isNope ? 200 : 500 }
        };
      }, setLoading(false));

      if (!down && nope.size === data.length)
        setTimeout(() => nope.clear() || set(i => to(i)) , 600);
    }
  );

  const handleMoreCards = () => {
    setOffset(offset + limit);
    // setResetState(offset)
    setTimeout(() => (nope.clear() || set(i => to(i))) && setLoading(true), 600);
  };

  const override: CSSProperties = {
    borderColor: "#ff6666",
    height: "45px",
    width: "40px"
  };

  const cards = props.map(({ x, y, rot, scale }, i) => (
    <Card
      i={i}
      x={x}
      y={y}
      trans={trans}
      data={data}
      bind={bind}
      key={i}
      ShowDetail={setShowDetail}
      DetailRequest={setDetailRequest}
      ActivateModal={setActivateModal}
      rot={rot}
      scale={scale}
    />
  ));

    return (
      <>
        <div className="loading">
          <ClipLoader
            loading={loading}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={override}
          />
        </div>
        <div className="button-container" style={{display: loading ? 'none' : ''}}>
          <button className="load-button" onClick={handleMoreCards}>
            {'Swipe Some More?'}
          </button>
        </div>
        {cards}
        {activateModal ? ( detailRequest === false ? ( <Modal {...detail} closeModal={setActivateModal} /> ) : ( <Loader /> )) : ( "" )}
      </>
    );
}

export default Deck;
