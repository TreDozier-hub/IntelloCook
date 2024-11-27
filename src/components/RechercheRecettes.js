import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import data from "../recettesList.json";
import "../components/RechercheRecettes.css";
import "./RecetteSimple.css";
// import "./Search.css";


function RechercheRecettes() {
    const [saisie, setSaisie] = useState("");
    const [alimentGarder, setAlimentGarder] = useState([]);
    const [alimentEviter, setAlimentEviter] = useState([]);

    const rechercheChangement = (event) => {
        setSaisie(event.target.value);
    };

    const suppGarder = (ingredients) => {
        setAlimentGarder((prev) =>
            prev.filter((item) => item.aliment !== ingredients.aliment)
        );
    };

    const suppEviter = (ingredients) => {
        setAlimentEviter((prev) =>
            prev.filter((item) => item.aliment !== ingredients.aliment)
        );
    };

    const alimentChoix = (ingredients, choix) => {
        if (ingredients?.aliment) {
            if (choix === "Garder") {
                setAlimentGarder((prev) => [...prev, ingredients]);
                setAlimentEviter((prev) =>
                    prev.filter((item) => item.aliment !== ingredients.aliment)
                );
            } else if (choix === "Eviter") {
                setAlimentEviter((prev) => [...prev, ingredients]);
                setAlimentGarder((prev) =>
                    prev.filter((item) => item.aliment !== ingredients.aliment)
                );
            }
        }
    };

    const toutAliment = data.recette.flatMap((recette) => recette.ingredients || []);
    const alimentUnique = new Set();
    const filtreAliment = [];

    toutAliment.forEach((ingredients) => {
        if (
            ingredients?.aliment &&
            !alimentUnique.has(ingredients.aliment) &&
            ingredients.aliment.toLowerCase().includes(saisie.toLowerCase())
        ) {
            filtreAliment.push(ingredients);
            alimentUnique.add(ingredients.aliment);
        }
    });

    const filteredRecipes = data.recette.filter((recette) => {
        const recetteAliments = Array.isArray(recette.ingredients)
            ? recette.ingredients.map((ing) => ing.aliment?.toLowerCase())
            : [];
        const contientAlimentEviter = alimentEviter.some((ingredients) =>
            recetteAliments.includes(ingredients.aliment?.toLowerCase())
        );
        const contientAlimentGarder = alimentGarder.some((ingredients) =>
            recetteAliments.includes(ingredients.aliment?.toLowerCase())
        );
        return contientAlimentGarder && !contientAlimentEviter;
    });

    // Composant RecipeCard
    function RecipeCard({ imageRecet, plat, id }) {
        return (
            // On enrobe tout le bloc de la carte avec un <Link> pour le rendre cliquable
            <Link to={`/recette/${id}`} className="CardSimple">
                <div className="">
                    <img
                        src={imageRecet}
                        className="Image-recetteSimple"
                        alt={plat}
                    />
                    <div className="Titre-recetteSimple">{plat}</div>
                    {/* <div className="RecipeResults-card-info">
                        
                    </div> */}
                </div>
            </Link>
        );
    }
    
    function RecipeResults({ recette }) {
        return (
            <div className="CardsSimple">
                <RecipeCard
                    key={recette.id}
                    imageRecet={recette.imageRecet}
                    plat={recette.plat}
                    id={recette.id}
                />
            </div>
        );
    }

    function RecetteDetails() {
        const { id } = useParams();
        // Utiliser l'id pour récupérer les détails de la recette
        return (
            <div>
                <h1>Détails de la recette {id}</h1>
                {/* Afficher les détails de la recette ici */}
            </div>
        );
    }

    return (
        <div className="recherche-recettes">
            {/* Barre de recherche des ingrédients */}
            <div className="search-container">
                <p className="alimentSelector">Choisissez vos ingrédients</p>
                <input
                    className="ingredientInput"
                    value={saisie}
                    onChange={rechercheChangement}
                    type="text"
                    placeholder="Recherche d'ingrédients"
                />
            </div>

            {/* Liste d'ingrédients filtrés */}
            {saisie !== "" && (
                <div className="alignementInputRecherche">
                    {filtreAliment.map((ingredients) => (
                        <div className="ingredient-card" key={ingredients?.aliment}>
                            <span className="Titre-ingredient">{ingredients?.aliment}</span>
                            <div className="buttons">
                                <button
                                    className="buttonGarder"
                                    onClick={() => alimentChoix(ingredients, "Garder")}
                                    disabled={alimentGarder.some((item) => item.aliment === ingredients?.aliment)}
                                >
                                    +
                                </button>
                                <button
                                    className="buttonEviter"
                                    onClick={() => alimentChoix(ingredients, "Eviter")}
                                    disabled={alimentEviter.some((item) => item.aliment === ingredients?.aliment)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Sections côte à côte */}
            <div className="container-sections">
                {/* Section des ingrédients gardés */}
                <div className="ingredient-section">
                    <p className="ingredient-title">Ingrédients gardés</p>
                    <div className="ingredient-list">
                        {alimentGarder.length > 0 &&
                            alimentGarder.map((ingredients, index) => (
                                <div className="ingredient-card"  style={{border: "0px solid #ccc"}} key={index}>
                                    <button
                                        className="delete-button"
                                        onClick={() => suppGarder(ingredients)}
                                    >
                                        X
                                    </button>
                                    <img src={ingredients?.imgAliment} alt="" />
                                    <p class="Titre-ingredient ">{ingredients?.aliment}</p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Section des ingrédients évités */}
                <div className="ingredient-section">
                    <p className="ingredient-title">Ingrédients évités</p>
                    <div className="ingredient-list">
                        {alimentEviter.length > 0 &&
                            alimentEviter.map((ingredients, index) => (
                                <div className="ingredient-card" style={{border: "0px solid #ccc"}} key={index}>
                                    <button
                                        className="delete-button"
                                        onClick={() => suppEviter(ingredients)}
                                    >
                                        X
                                    </button>
                                    <img src={ingredients?.imgAliment} alt="" />
                                    <p class="Titre-ingredient">{ingredients?.aliment}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Résultats de la recherche des recettes */}
            <p className="ingredient-title">Plat(s) associé(s)</p>
            <div className="resultatRecherchePlat">
            
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recette, index) => (
                        <RecipeResults key={index} recette={recette} /> 
                    ))
                ) : (
                    <p className="resultatRecherchePlat">
                        {/* Aucun de ces plats ne vous intéresse ? Alors pourquoi ne pas créer votre propre plat ? */}
                    </p>
                )}
            </div>
        </div>
    );
}

export default RechercheRecettes;