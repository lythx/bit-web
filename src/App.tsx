import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const nobelDataFetched = useRef(false)
  const [nobelData, setNobelData] = useState([])
  useEffect(() => {
    if(nobelDataFetched.current) { return }
    nobelDataFetched.current = true
    ;(async () => {
      const res = await fetch('https://api.nobelprize.org/2.1/nobelPrizes')
      if(!res.ok) {
        alert(`Fetch error`) // TODO
        console.log(res)
        return
      } 
      const data = await res.json()
      setNobelData(data.nobelPrizes)
    })()
  }, [nobelData, nobelDataFetched])
  console.log(nobelData)
  return (
    <div className="App">
    </div>
  );
}

export default App;
