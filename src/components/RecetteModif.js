import React, { useState } from "react";

function RecetteSimple({ recette }) {
  const [nbPersonnes, setNbPersonnes] = useState(recette.nbPers);

  // Fonction pour calculer la nouvelle quantité (avec règle de trois)
  const calculerQuantite = (quantiteOriginale) => {
    if (!quantiteOriginale || isNaN(quantiteOriginale)) return quantiteOriginale; 
    return ((quantiteOriginale * nbPersonnes) / recette.nbPers).toFixed(2);
  };

  return (
    <div href="" style={{ border: "1px solid #ccc", padding: "20px", textAlign: "center" }}>
      <img
        src={recette.imageRecet || "https://via.placeholder.com/250"}
        alt={recette.plat}
        style={{ width: "100%", maxWidth: "250px", borderRadius: "8px" }}
      />
      <h2>{recette.plat}</h2>

      {/* Pour ajuster le nombre de personnes */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setNbPersonnes(nbPersonnes - 1)} disabled={nbPersonnes <= 1}>
          -
        </button>
        <span style={{ margin: "0 10px" }}>{nbPersonnes} personne(s)</span>
        <button onClick={() => setNbPersonnes(nbPersonnes + 1)}>+</button>
      </div>

      {/* Ingrédients avec quantités modifiés */}
      <h3>Ingrédients :</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {recette.ingredients.map((ingredient, index) => (
          <li key={index} style={{ marginBottom: "5px" }}>
            <img
              src={ingredient.imgAliment || "https://via.placeholder.com/50"}
              alt={ingredient.aliment}
              style={{ width: "50px", marginRight: "10px", verticalAlign: "middle" }}
            />
            {ingredient.aliment} : {calculerQuantite(ingredient.quantity)} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecetteSimple;