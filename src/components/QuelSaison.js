import React, { useEffect, useState } from "react";
import recettes from '../recettesList.json';
import saisons from '../Saison.json';

// Importez des images pour chaque saison
import hiverImage from '../assets/hiver.png';
import printempsImage from '../assets/printemps.png';
import eteImage from '../assets/ete.png';
import automneImage from '../assets/automne.png';

const Saison = () => {
  const [recettesAvecSaisons, setRecettesAvecSaisons] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Recherche par saison ou ingrédient
  const [filteredRecettes, setFilteredRecettes] = useState([]);

  useEffect(() => {
    // Fonction pour normaliser les noms (ignorer les majuscules/espaces)
    const normalize = (text) => text.toLowerCase().trim();

    // Fusionner les JSON
    const associerRecettesAuxSaisons = () => {
      return recettes.recette.map((recette) => {
        const saisonsAssociees = []; // Liste des saisons pour chaque recette

        // Vérifier chaque saison
        Object.entries(saisons).forEach(([saison, details]) => {
          // Liste des fruits et légumes de la saison
          const fruitsLegumes = [
            ...details.Fruits.map(normalize),
            ...details.Légumes.map(normalize),
          ];

          // Vérifier si un ingrédient correspond à cette saison
          const aDesIngredientsDeLaSaison = recette.ingredients.some((ingredient) =>
            fruitsLegumes.includes(normalize(ingredient.aliment))
          );

          if (aDesIngredientsDeLaSaison) {
            saisonsAssociees.push(saison);
          }
        });

        // Ajouter les saisons associées à la recette
        return { ...recette, saisons: saisonsAssociees };
      });
    };

    // Mettre à jour l'état avec les recettes associées
    const recettesAvecSaisons = associerRecettesAuxSaisons();
    setRecettesAvecSaisons(recettesAvecSaisons);
    setFilteredRecettes(recettesAvecSaisons); // Initialiser les recettes filtrées
  }, []);

  // Filtrer les recettes selon la recherche
  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    if (!normalizedQuery) {
      // Si aucun critère de recherche, afficher toutes les recettes
      setFilteredRecettes(recettesAvecSaisons);
    } else {
      // Filtrer par saison ou ingrédient
      const results = recettesAvecSaisons.filter((recette) => {
        // Vérifier la saison
        const matchSaison = recette.saisons.some((saison) =>
          saison.toLowerCase().includes(normalizedQuery)
        );

        // Vérifier les ingrédients
        const matchIngredient = recette.ingredients.some((ingredient) =>
          ingredient.aliment.toLowerCase().includes(normalizedQuery)
        );

        return matchSaison || matchIngredient;
      });

      setFilteredRecettes(results);
    }
  }, [searchQuery, recettesAvecSaisons]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Plats et Saisons</h1>

      {/* Barre de recherche */}
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Rechercher par saison ou ingrédient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* Afficher les recettes filtrées */}
      <div>
        {filteredRecettes.map((recette) => (
          <div
            key={recette.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              margin: "10px",
              maxWidth: "400px",
              display: "inline-block",
              textAlign: "left",
            }}
          >
            <h2>{recette.plat}</h2>
            {recette.imageRecet && (
              <img
                src={recette.imageRecet}
                alt={recette.plat}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            )}
            <p>
              <strong>Nombre de personnes :</strong> {recette.nbPers}
            </p>
            <p>
              <strong>Cuisson :</strong> {recette.cuisson || "N/A"} min
            </p>
            <p>
              <strong>Saisons :</strong>{" "}
              {recette.saisons.length > 0
                ? recette.saisons.join(", ")
                : "Non associée à une saison"}
            </p>
            {/* <ul>
              {recette.ingredients.map((ingredient, idx) => (
                <li key={idx}>
                  {ingredient.quantity || ""} {ingredient.unit || ""}{" "}
                  {ingredient.aliment}
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>

      {/* Message si aucune recette correspond */}
      {filteredRecettes.length === 0 && (
        <p style={{ fontSize: "18px", color: "#888" }}>
          Aucun plat ne correspond à votre recherche.
        </p>
      )}
    </div>
  );
};

export default Saison;
