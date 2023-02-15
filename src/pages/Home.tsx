import styled from 'styled-components'
import React, { useRef, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from "react-router-dom";
import VideoJS from 'video.js'
import ReactMarkdown from 'react-markdown'

import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
dayjs.extend(relativeTime);
interface VideoControlsProps {
  src: string;
}

function VideoControls({ src }: VideoControlsProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  function handlePlayPauseClick(): void {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }

  function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  }

  function handleTimeUpdate(): void {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  function handleDurationChange(): void {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("durationchange", handleDurationChange);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        videoRef.current.removeEventListener("durationchange", handleDurationChange);
      };
    };
  }, []);

  return (
    <div className="video-container">
      <div className="video-window">
        <video className="video" ref={videoRef}>
          <source src={src} type="video/mp4"></source>
        </video>
      </div>
      <div className="controls-container">
        <button className="plplay-pause-buttonay-pause-button" onClick={handlePlayPauseClick}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          className="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <input
          className="time-slider"
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
}
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
  img {

    max-width: 400px;
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
  const [pages, setPages] = useState([])
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [result, setResult] = useState([<div></div>])

  const ref = useRef(null)
  const playerRef = React.useRef(null);


  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      VideoJS.log('player is waiting');
    });

    player.on('dispose', () => {
      VideoJS.log('player will dispose');
    });
  };

  const openVideo = (e: string) => {
    alert(e)
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/list?page=${page}`).then(e => e.json()).then(e => {
      setPages(pages[0] ? [...pages, ...e.data] : e.data)
    }).catch(e => {
      setError(`load error: ${e}`)
    })
  }, [page])

  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const toggleAudio = (file: string) => {
    console.log(isPlaying)
    if (isPlaying) {
      audio.pause();
    } else {
      audio.src = `${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/audio?file=${file}`
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    (async () => {
      let resultNew = [];
      let i = 0;
      while (i < pages.length) {
        const n = pages[i] as any;
        if (n.Thumbnail) {
          const resp = await fetch(`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/image?image=${n.Thumbnail}`)
          const req = await resp.blob();
          const areaImageObjectURL = URL.createObjectURL(req);
          const videoJsOptions = {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
              src:
                `${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/video?file=${n.Video}`,
              type: 'video/mp4'
            }]
          };
          // <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          console.log(n.Video
          )

          if (n.Video.includes('video_files')) {
            resultNew.push(
              <>
                -----------------
                {n.Title}
                <br />
                {n.Date}
                <br />
                <video className="video" controls>
                  <source src={`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/video?file=${n.Video}`} type="video/mp4"></source>
                </video>
                <br />
                <div dangerouslySetInnerHTML={{ __html: n.Text }}></div>
                <br />
                <br />
              </>
            )
          } else {
            resultNew.push(
              <>
                -----------------
                {n.Title}
                <br />
                {n.Date}
                <br />
                <VideoControls src={`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/video?file=${n.Video}`} />
                <br />
                <div dangerouslySetInnerHTML={{ __html: n.Text }}></div>
                <br />
                <br />
              </>
            )
          }
        } else {
          if (n.Video && n.Video.includes('voice_messages')) {
            resultNew.push(
              <>
                -----------------
                {n.Title}
                <br />
                {n.Date}
                <br />

                <button onClick={() => toggleAudio(n.Video)}>{isPlaying ? 'Pause audio' : 'Play audio'}</button>
                <br />
                <div dangerouslySetInnerHTML={{ __html: n.Text }}></div>
                <br />
                <br />
              </>
            )
          }
          if (n.Photo) {
            const resp = await fetch(`${process.env.REACT_APP_MODE === 'dev' ? 'http://localhost:4646' : 'https://api.blog.sepezho.com:4646'}/api/image?image=${n.Photo}`)
            const req = await resp.blob();
            const areaImageObjectURL = URL.createObjectURL(req);
            resultNew.push(
              <>
                -----------------
                {n.Title}
                <br />
                {n.Date}
                <br />
                <img src={areaImageObjectURL} alt='' />
                <br />
                <div dangerouslySetInnerHTML={{ __html: n.Text }}></div>
                <br />
                <br />
              </>
            )
          } else if (!(n.Video && n.Video.includes('voice_messages'))) {
            resultNew.push(
              <>
                -----------------
                {n.Title}
                <br />
                {n.Date}
                <br />
                <div dangerouslySetInnerHTML={{ __html: n.Text }}></div>
                <br />
                <br />
              </>
            )
          }
        }
        i++;
      }
      setResult(resultNew)
    })()
  }, [pages])

  return <ListTexts>
    <h1>Posts</h1>

    <p>
      {
        result
      }
    </p>
    <button onClick={() => setPage(page + 1)}>load more</button>
  </ListTexts>
};
//    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} children={pages} />

// {error ? error : pages.map(e => (<Link to={`/post/${e.Id}`}><button key={e.Id}> {`#${e.Id} ||| ${dayjs(e.Date).fromNow()} ||| ${e.Title}`} </ button></Link>))}

export default Home;
