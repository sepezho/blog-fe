import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import {
  useParams
} from "react-router-dom";

const MdContainer = styled.div`
  max-widht: 500px;
  width: 500px;
`

const Container = styled.div`
  max-widht: 100vw;
  display: flex;
  justify-content: center;
`

function Blog() {
  const [title, setTitle] = useState(`loading...`)
  const [date, setDate] = useState(`loading...`)
  const [text, setText] = useState(`loading...`)

  const { id } = useParams();

  useEffect(() => {
    fetch('https://blog.sepezho.com:4646/api/post', {
      body: JSON.stringify({ id: id }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }).then(e => e.json()).then(e => {
      console.log(e)
      setTitle(e.data[0].Title)
      setDate(e.data[0].Date)
      setText(e.data[0].Text)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <MdContainer>
            post id: {id}
            <br />
            post tile: {title}
            <br />
            post date: {date}
            <ReactMarkdown children={text} />
          </MdContainer>
        </Container>
      </header>
    </div>
  );
}

export default Blog;
