import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  const handleRemoveRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3000/recipes/remove/${userID}/${recipeId}`);
      // Update state to remove the deleted recipe
      setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeId));
    } catch (err) {
      console.error("Error removing recipe:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Saved Recipes</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{recipe.name}</h2>
              <button
                onClick={() => handleRemoveRecipe(recipe._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
            <div className="instructions mb-4">
              <p className="text-gray-700">{recipe.description}</p>
            </div>
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600">Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
