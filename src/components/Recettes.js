import React from "react";
import RecetteSimple from "./RecetteSimple";
import data from "../recettesList.json";
import "./RecetteSimple.css";

function Recettes() {
  // const premiereRecette = data.recette[0, 2];
  const recettesVedettes = data.recette;
  return (
    <div>
      <h2>Recette en vedette</h2>
      {/* <RecetteSimple recette={premiereRecette} /> */}

      <div className="cardSimple">
        {recettesVedettes.map((recette, index) => (
          <RecetteSimple key={index} recette={recette} />
        ))}
      </div>
    </div>
  );
}

export default Recettes;

