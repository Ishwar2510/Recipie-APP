import React from "react";
export default function Recipie(props) {
  return (
    <div className="rContainer">
      <h3>{props.title}</h3>
      <img width="100px" src={props.image} alt ="img"/>
      <h4>Recipe</h4>
      <ol>
        {props.instruction[0]?.steps?.map((e, index) => {
          return <li key={index}>{e.step}</li>;
        })}
      </ol>
      <p>Serving : {props.serving}</p>
      <h3>Price : Rs {props.price}</h3>
    </div>
  );
}
