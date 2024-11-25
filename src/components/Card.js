import React from "react";
import Recette from "./Recette.js";
import data from "../recettesList.json";

function Card() {
    
  return (

        <div className="card">
          <h1>Recettes de cuisine</h1>
          <div className="recette">
            {data.recette.map((recette, quantity, unit, aliment,index) => (
              <Recette key={index} recette={recette} quantity={quantity} unit={unit} aliment={aliment}/>
            ))}
          </div>
          </div>
        );
    }

    export default Card;

    