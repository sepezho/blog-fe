import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);

const ListTexts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 700px;
    margin: 4px 0;
    text-align: left;
    cursor: pointer;
  }
  margin: 0 0 16px 0;
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
      setPages(e.data.reverse())
    })
  }, [])

  return <div>
    <ListTexts>
      <h1>Posts</h1>
      {pages.map(e => (<Link to={`/post/${e.Id}`}><button key={e.Id}> {`#${e.Id} ||| ${dayjs(e.Date).fromNow()} ||| ${e.Title}`} </ button></Link>))}
    </ListTexts>
  </div >;
};

export default Home;
