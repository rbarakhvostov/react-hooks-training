import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <>
      <HookSwitcher />
    </>
  );
}

const HookSwitcher = () => {

  const [color, setColor] = useState('gray');
  const [fontSize, setFontSize] = useState(14);

  const style = {
    padding:'10px',
    backgroundColor: color,
    border: '1px solid black',
    fontSize: `${fontSize}px`
  }

  return (
    <div style={style}>
      Hello World
      <button onClick={() => setColor('gray')}>Dark</button>
      <button onClick={() => setColor('white')}>Light</button>
      <button onClick={() => setFontSize((f) => f + 2)}>Font+</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
