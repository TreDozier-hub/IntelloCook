// Ingredient.js
import React from "react";

function Ingredient({ ingredient }) {
  return (
    <li >
      {ingredient.imgAliment && (
        <img
          src={ingredient.imgAliment}
          alt={ingredient.aliment}          
        />
      )}
      <span>
        {ingredient.quantity} {ingredient.unit} {ingredient.aliment}
      </span>
    </li>
  );
}

export default Ingredient;
