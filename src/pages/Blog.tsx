import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import dayjs from 'dayjs'

import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import {
  useParams
} from "react-router-dom";

const MdContainer = styled.div`
  max-widht: 700px;
  width: 700px;
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
  const [views, setViews] = useState(`loading...`)
  const [error, setError] = useState('')

  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646/' : 'https://api.blog.sepezho.com:4646/'}api/post`, {
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
      setViews(e.data[0].Views)
    }).catch(e => {
      setError(`load error: ${e}`)
    })
  }, [])
  const adf = `A paragraph with *emphasis* and **strong importance**.<br /> (link)[https://google.com]`
  console.log(text)
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <MdContainer>
            <h1>Posts #{id}</h1>
            <br />
            title: {title}
            <br />
            views: {views}
            <br />
            date: {dayjs(date).format('DD/MM/YYYY')}
            <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} children={error ? error : text} />

          </MdContainer>
        </Container>
      </header>
    </div>
  );
}

export default Blog;
