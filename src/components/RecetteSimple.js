import React from "react";
import "./RecetteSimple.css";

function RecetteSimple({ recette }) {

  return (
    <div className="cardsSimple">
      <img className="Image-recetteSimple" src={recette.imageRecet} alt={recette.plat}/>
      <h2 className="Titre-recetteSimple">{recette.plat}</h2>
    </div>
  );
}

export default RecetteSimple;