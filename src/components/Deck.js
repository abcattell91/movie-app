import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import Card from "./Card";
import "../assets/Deck.css";

import Modal from "./modal";

import { Loader } from "./Loader";

import 'bootstrap/dist/css/bootstrap.min.css';

const to = i => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: 0
});

const from = i => ({ rot: 0, scale: 1, y: 0 });

const trans = (r, s) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [data, setData] = useState([]);
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/contents`).then((response) => {
      setData(response.data);
    });
  }, []);

  const [nope] = useState(() => new Set());
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
      });

      if (!down && nope.size === data.length)
        setTimeout(() => nope.clear() || set(i => to(i)), 600);
    }
  );

  console.log('deck.js', {...data})
  return (
    props.map(({ x, y, rot, scale }, i) => (
    <>
    <Card
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      {...data}
      bind={bind}
      key={i}
      ShowDetail={setShowDetail}
      DetailRequest={setDetailRequest}
      ActivateModal={setActivateModal}
    />
    {activateModal ? detailRequest === false ? (<Modal {...detail} closeModal={setActivateModal} />) : (<Loader />) : ''}
    </>
  )
  ));

}

export default Deck;