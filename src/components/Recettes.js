import React from "react";
import { Link } from "react-router-dom";
import RecetteSimple from "./RecetteSimple";
import data from "../recettesList.json";
import "./RecetteSimple.css";

// function Recettes() {
//   // const premiereRecette = data.recette[0, 2];
//   const recettesVedettes = data.recette;
//   return (
//     <div>
//       <h2>Recette en vedette</h2>
//       {/* <RecetteSimple recette={premiereRecette} /> */}

//       <div className="cardSimple">
//         {recettesVedettes.map((recette, index) => (
//           <RecetteSimple key={index} recette={recette} />
//         ))}
//       </div>
//     </div>
//   );
// }

function Recettes() {
  const recettesVedettes = data.recette;

  return (
    <div>
      <h2>Recettes en vedette</h2>
      <div className="cardSimple">
        {recettesVedettes.map((recette) => (
          <Link
            to={`/recette/${recette.id}`}
            key={recette.id}
            className="cardsSimple"
          >
            <img className="Image-recetteSimple" src={recette.imageRecet} alt={recette.plat} />
            <h2 className="Titre-recetteSimple">{recette.plat}</h2>
            {/* <p>Pour {recette.nbPers} personnes</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recettes;