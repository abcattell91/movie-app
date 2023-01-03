// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const PER_DECK = 20

// export const Pagination = ({data, loadMore}) => {
//   const [data, setData] = useState([])
//   const [limit] = 20
//   const [offset, setOffset] = 0
//   const [setLoadMore] = useState(false)

//   const total = offset + PER_DECK

//   const loadDataFromServer = () => {
//     axios.get(`localhost:3001/api/v1/contents?limit=${limit}&offset=${offset}`).then((response) => {
//       setData(response.data);
//     });
//   };

//   const loadMore = () => {
//     setLoadMore(offset + PER_DECK)
//     if (offset >= total)

//     return
//       setOffset({offset: offset}, () => {
//         loadDataFromServer();
//     });
//   };
// };
