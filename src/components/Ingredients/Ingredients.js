import React, { useState } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import { getCiphers } from "crypto";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    fetch("https://react-hooks-813.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: resData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = id => {
    setUserIngredients(prevIngredients =>
      prevIngredients.filter(item => {
        return item.id !== id;
      })
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
