import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import Card from "./Card";
import "../assets/Deck.css";

import Modal from "./modal";

import { Loader } from "./Loader";

import "bootstrap/dist/css/bootstrap.min.css";

const to = (i) => ({
  x: 0,
  y: 0,
  delay: 0,
});

const from = (i) => ({ y: 0 });

const limit = 10;

const trans = (r, s) => `rotateY(${r / 10}deg) rotateZ(${r}deg)`;

function Deck() {
  const [data, setData] = useState()
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axios.get(`http://localhost:3001/api/v1/contents?limit=${limit}&offset=${page}`).then((response) => {
            setData([response.data]);
            setLoading(false);
          });
        }
        getData();
    },[page]);
    console.log(data)

  const [nope] = useState(() => new Set());
  const [props, set] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.1;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) nope.add(index);

      set((i) => {
        if (index !== i) return;
        const isNope = nope.has(index);

        const x = isNope ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        return {
          x,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isNope ? 200 : 500 },
        };
      });

      if (!down && nope.size === data.length)
        setTimeout(() => nope.clear() || set((i) => to(i)), 600);
    }
  );

  const cards = props.map(({ x, y }, i) => (
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
    />
  ));

  return (
    <>
      <>{cards}
        {activateModal ? (
          detailRequest === false ? (
            <Modal {...detail} closeModal={setActivateModal} />
          ) : (
            <Loader />
          )
        ) : (
          ""
        )}
      </>
      {<button className="btn-load-more" onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>}
    </>
  );
}

export default Deck;
