import React, { useEffect, useState } from "react";
import "./App.css";
import Recipie from "./components/recipie";
import { Fallback } from "./components/Fallback";
function App() {
  const [apicounter, setapicounter] = useState(0);
  const APP_KEY = "b94ffb5737d54526a631f10df9aac84e";
  const [query, setQuery] = useState("pasta");
  const [data, setData] = useState(Fallback);
  const [input, setInput] = useState("");
  const [loader,setLoader]=useState(false);
  
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APP_KEY}&query=${query}&addRecipeInformation=true`;

  useEffect(() => {
    if (query == null) {
      return;
    }
    setLoader(true)
    apicall();
  }, [query]);

  async function apicall() {
    setapicounter((prev) => prev + 1);
    // console.log(apicounter);
    // seterror(false);
    try {
      let response = await fetch(url);
      let receivedData = await response.json();
      if (receivedData.code == 402) {
        alert(receivedData.message);
        setData(Fallback);
      } else {
        if (receivedData.results.length > 0) {
          console.log(receivedData.results);
          setData(receivedData.results);
          setLoader(false);
        }
      }
    } catch (error) {
      setData(Fallback);
      console.log("this is an error");
      // console.log(error);
      setLoader(false);
      
    }
  }

  function formSubmit(e) {
    e.preventDefault();
    
    setQuery(input);
  }
  function inputQuery(e) {
    setInput(e.target.value);
  }

  return (
    <div className="Recipe_App" onSubmit={formSubmit}>
      <h1> LET COOK SOMETHING</h1>
      <div className="search_form">
        <input
          className="search_bar"
          type="text"
          value={input}
          onChange={inputQuery}
          placeholder="Enter Item to Search For"
        ></input>
        <button className="search_button" onClick={formSubmit}>
          Search
        </button>
      </div>
      {(loader)?<h1>LOADING......</h1>:""}
      
      <div className="recepiesConatiner">
        {data.map((e) => {
          return (
            <Recipie
              key={e.id}
              title={e.title}
              image={e.image}
              summary={e.summary}
              dishTypes={e.dishTypes}
              serving={e.servings}
              price={e.pricePerServing}
              instruction={e.analyzedInstructions}
            />
          );
        })}
      </div>
      <footer>
        <h6>
          A recipe has no soul . You as the cook, must bring soul to the recipie
        </h6>
        <p>THOMAS KELLER</p>
      </footer>
    </div>
  );
}

export default App;
