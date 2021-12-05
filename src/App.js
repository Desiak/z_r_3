import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState(null);
  const [prevIndex,setPrevIndex]=useState(null);
  const [quoteIndex, setQuoteIndex]= useState(null);

  const getNewQuote=()=>{
    setPrevIndex(quoteIndex);
    const quoteInd= Math.floor(Math.random()*data.length);
    setQuoteIndex(quoteInd)
  }

  const getPrevQuote=()=>{
    setQuoteIndex(prevIndex);
  }

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json")
    .then((response) => {
    if (response.ok) {
      setData(response)
    return response.json();
    }
    
    }).then(json=>{
      setData(json)
    })
    .catch((error) => {
    console.error("Error fetching data: ", error);
    })
  
    
  }, [])

  return (
    <div className="App">
     <h1>Zadanie 3</h1>
     <button className="btn" onClick={()=>{getPrevQuote()}} disabled={quoteIndex===prevIndex}>Poprzedni cytat</button>
     <button className="btn" onClick={()=>{getNewQuote()}}>Losuj</button>
     <p>{data&&data[quoteIndex] && data[quoteIndex].quote}</p>
     <p>{data&&data[quoteIndex] && data[quoteIndex].author}</p>
    </div>
  );
}

export default App;
