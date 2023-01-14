import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMarkdown from 'react-markdown'

function App() {
  const text = `
# some *sample* 
# *text*`

  return (
    <div className="App">
      <header className="App-header">
        <ReactMarkdown children={text} />
      </header>
    </div>
  );
}

export default App;
