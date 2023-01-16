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
    id: 0,
    date: 'loading...',
    title: 'loading...'
  },
]

const Home = () => {
  const [pages, setPages] = useState(pagesInit)

  useEffect(() => {
    fetch('https://sepezho.com:4646/blogapi').then(e => e.json()).then(e => {
      console.log(e)
      setPages(e.pages)
    })
  }, [])

  return <div>
    <ListTexts>
      <h1>Posts</h1>
      {pages.map(e => (<Link to={`/post/${e.id}`}><button key={e.id}> {`#${e.id} / ${e.date} / ${e.title}`} </ button></Link>))}
    </ListTexts>
  </div >;
};

export default Home;
