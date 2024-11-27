import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../recettesList.json";
import "./RecetteDetail.css";
// import "./RecetteDetail.css";

function RecetteDetail() {
  const { id } = useParams(); // Récupère l'ID de la recette depuis l'URL
  const recette = data.recette.find((r) => r.id === parseInt(id)); // Recherche la recette par ID

  const [nbPersonnes, setNbPersonnes] = useState(recette.nbPers); // État pour gérer le nombre de personnes

  if (!recette) {
    return <h2>Recette non trouvée</h2>; // Gère les cas où l'ID n'existe pas
  }

  // Fonction pour ajuster la quantité d'ingrédients
  const calculerQuantite = (quantiteOriginale) => {
    if (!quantiteOriginale || isNaN(quantiteOriginale)) return quantiteOriginale; // Cas où ce n'est pas un nombre
    return ((quantiteOriginale * nbPersonnes) / recette.nbPers).toFixed(2); // Règle de trois
  };

  // Gestion des boutons "+" et "-"
  const augmenterPersonnes = () => setNbPersonnes((prev) => prev + 1);
  const diminuerPersonnes = () => {
    if (nbPersonnes > 1) setNbPersonnes((prev) => prev - 1);
  };

  const saisonsImages = {
    Printemps: "printemps.png",
    Été: "./assets/ete.png",
    Automne: "./assets/automne.png",
    Hiver: "../assets/hiver.png"
  };

  return (
    <div className="recette-detail">
      
      {/* Affichage des saisons */}
    <div className="saisons-plat">
      <h2>Saison(s)</h2>
      <div className="saisons-images">
        {recette.saisons.map((saison, index) => (
          <div key={index} className="saison">
            <img
              src={saisonsImages[saison]}
              alt={saison}
              title={`Plat adapté pour ${saison}`}
            />
            <p>{saison}</p>
          </div>
        ))}
      </div>
    </div>


      <div className="recette-plat">
        <h1>{recette.plat}</h1>
        {/* <p>
         &nbsp; | &nbsp; Cuisson : {recette.cuisson} min.
        </p> */}
        <div className="nb-personnes">
          <button onClick={diminuerPersonnes}>-</button>
            <p> Nb pers. : {nbPersonnes}</p>
            <button style={{fontsize: "9px" }} onClick={augmenterPersonnes}>+</button>
            <p> &nbsp; | &nbsp; Cuisson : {recette.cuisson} min.</p>
        </div>
      </div>

      
      <div className="recette-ensemble">
        <div className="ingredients">
          <h2>Liste ingrédients</h2>
          <div className="list-ingredients">
            {recette.ingredients.map((ingredient, index) => (
              <img
                key={index}
                src={ingredient.imgAliment || "placeholder.jpg"}
                alt={ingredient.aliment}
                title={ingredient.aliment}
              />
            ))}
          </div>
        </div>

        <div className="quant-ingredients">
          <h2>Quant. ingrédients</h2>
          <ul>
            {recette.ingredients.map((ingredient, index) => (
              <li key={index}>
                {calculerQuantite(ingredient.quantity)}{" "}
                {ingredient.unit || ""} {ingredient.aliment}
              </li>
            ))}
          </ul>
        </div>

        <div className="recette-image">
          <img src={recette.imageRecet} alt={recette.plat} />
        </div>
      </div>

      {/* Étapes de préparation */}
      <div className="etape-recette">
        <h2>Étapes</h2>
        <ol>
          {recette.etape.map((etape, index) => (
            <li key={index}>{etape}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecetteDetail;