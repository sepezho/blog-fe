import styled from 'styled-components'
import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

const ListTexts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    max-width: 500px;
    margin: 4px 0;
  }
`

const pagesInit = [
  {
    Id: 0,
    Date: 'loading...',
    Title: 'loading...'
  },
]

const Home = () => {
  const [pages, setPages] = useState(pagesInit)

  useEffect(() => {
    fetch('https://blog.sepezho.com:4646/api/list').then(e => e.json()).then(e => {
      console.log(e)
      setPages(e.data)
    })
  }, [])

  return <div>
    <ListTexts>
      <h1>Posts</h1>
      {pages.map(e => (<Link to={`/post/${e.Id}`}><button key={e.Id}> {`#${e.Id} / ${e.Date} / ${e.Title}`} </ button></Link>))}
    </ListTexts>
  </div >;
};

export default Home;
