import styled from 'styled-components'
import React, { useRef, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from "react-router-dom";

import ReactMarkdown from 'react-markdown'

import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
dayjs.extend(relativeTime);
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
  const [page, setPage] = useState(1)

  const ref = useRef(null)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/list?page=${page}`).then(e => e.json()).then(e => {
      (async () => {

        let result = '';
        let i = 0;

        while (i < e.data.length) {
          const n = e.data[i];

          if (n.Thumbnail) {
            const resp = await fetch(`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/image?image=${n.Thumbnail}`)
            const req = await resp.blob();
            const areaImageObjectURL = URL.createObjectURL(req);

            console.log(areaImageObjectURL)
            result += '-----------------' + n.Title + '<br/>' + "<img src=" + areaImageObjectURL + " alt='' /><br />" + n.Text + "<br /><br />"
          } else {
            result += '-----------------' + n.Title + '<br/>' + n.Text + "<br /><br />"
          }
          i++;
        }
        if (ref.current) {
          //@ts-ignore
          ref.current.innerHTML = pages + result
        }
        setPages(pages + result)
      })()
    }).catch(e => {
      setError(`load error: ${e}`)
    })
  }, [page])

  return <ListTexts>
    <h1>Posts</h1>

    <div ref={ref}>
    </div>
    <button onClick={() => setPage(page + 1)}>load more</button>
  </ListTexts>
};
//    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} children={pages} />

// {error ? error : pages.map(e => (<Link to={`/post/${e.Id}`}><button key={e.Id}> {`#${e.Id} ||| ${dayjs(e.Date).fromNow()} ||| ${e.Title}`} </ button></Link>))}

export default Home;
