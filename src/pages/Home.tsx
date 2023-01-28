import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);

import ReactMarkdown from 'react-markdown'

import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
const ListTexts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    width: 700px;
    max-width: 700px;
  }
  button {
    width: 700px;
    margin: 4px 0;
    text-align: left;
    cursor: pointer;
  }
  margin: 0 0 16px 0;
  margin: auto;
`

const pagesInit = [
  {
    Id: 0,
    Date: 'loading...',
    Title: 'loading...'
  },
]

const Home = () => {
  const [pages, setPages] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https ://api.blog.sepezho.com:4646'}/api/list`).then(e => e.json()).then(e => {
      console.log(e)
      setPages(e.data.reverse().reduce((p: string, n: any) => {

        return p + '-----------------' + n.Title + '<br/>' + n.Text + "<br /><br />"
      }, ''))
    }).catch(e => {
      setError(`load error: ${e}`)
    })
  }, [])

  return <ListTexts>
    <h1>Posts</h1>
    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} children={pages} />

  </ListTexts>
};
// {error ? error : pages.map(e => (<Link to={`/post/${e.Id}`}><button key={e.Id}> {`#${e.Id} ||| ${dayjs(e.Date).fromNow()} ||| ${e.Title}`} </ button></Link>))}

export default Home;
