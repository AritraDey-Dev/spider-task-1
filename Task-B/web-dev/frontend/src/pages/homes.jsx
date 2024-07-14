import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash"; 
import Rating from "react-rating-stars-component";
import { useGetUserID } from "../hooks/useGetUserID";


export default function Home () {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cookingTimeFilter, setCookingTimeFilter] = useState("");
  const [ingredientsFilter, setIngredientsFilter] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [commentsToShow, setCommentsToShow] = useState({});
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const updatedRecipes = response.data.map(recipe => {
          const storedRecipe = storedRecipes.find(saved => saved._id === recipe._id);
          return {
            ...recipe,
            saved: storedRecipe ? storedRecipe.saved : false 
          };
        });
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);
        initializeCommentStates(updatedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const initializeCommentStates = (recipesData) => {
    const initialCommentInputs = {};
    const initialCommentsToShow = {};
    
    recipesData.forEach(recipe => {
      initialCommentInputs[recipe._id] = "";
      initialCommentsToShow[recipe._id] = 5;
    });

    setCommentInputs(initialCommentInputs);
    setCommentsToShow(initialCommentsToShow);
  };

  const handleFilter = () => {
    let filtered = [...recipes];

    if (cookingTimeFilter) {
      filtered = filtered.filter(recipe => recipe.cookingTime <= parseInt(cookingTimeFilter));
    }

    if (ingredientsFilter) {
      filtered = filtered.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(ingredientsFilter.toLowerCase()))
      );
    }

    setFilteredRecipes(filtered);
    initializeCommentStates(filtered);
  };

  const handleResetFilters = () => {
    setCookingTimeFilter("");
    setIngredientsFilter("");
    setFilteredRecipes(recipes);
    initializeCommentStates(recipes);
  };

  const handleRatingChange = (recipeId, rating) => {
    const updatedRecipes = recipes.map(recipe =>
      recipe._id === recipeId ? { ...recipe, rating } : recipe
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
  };

  const handleCommentInputChange = (recipeId, value) => {
    setCommentInputs({ ...commentInputs, [recipeId]: value });
  };

  const handleCommentSubmit = (recipeId) => {
    const commentInput = commentInputs[recipeId];

    if (commentInput.trim() !== "") {
      const updatedRecipes = recipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, comments: [...(recipe.comments || []), commentInput] } : recipe
      );
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
      setCommentInputs({ ...commentInputs, [recipeId]: "" });
    }
  };

  const handleLoadMoreComments = (recipeId) => {
    setCommentsToShow({ ...commentsToShow, [recipeId]: commentsToShow[recipeId] + 5 });
  };

  const handleSaveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:3000/recipes", {
        recipeID: recipeId,
        userID: userID,
      });
      const updatedRecipes = recipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, saved: !recipe.saved } : recipe
      );
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Recipe Search and Filter</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <input
          type="number"
          placeholder="Max Cooking Time (minutes)"
          value={cookingTimeFilter}
          onChange={(e) => setCookingTimeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Ingredient"
          value={ingredientsFilter}
          onChange={(e) => setIngredientsFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <li key={recipe._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{recipe.name}</h2>
              <Rating
                count={5}
                value={recipe.rating || 0}
                onChange={(rating) => handleRatingChange(recipe._id, rating)}
                size={24}
                activeColor="#ffd700"
              />
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

            {recipe.comments && recipe.comments.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Comments:</h3>
                <ul className="list-disc list-inside">
                  {recipe.comments.slice(0, commentsToShow[recipe._id]).map((comment, index) => (
                    <li key={index} className="mb-1">
                      {comment}
                    </li>
                  ))}
                </ul>
                {recipe.comments.length > commentsToShow[recipe._id] && (
                  <button
                    onClick={() => handleLoadMoreComments(recipe._id)}
                    className="text-blue-500 hover:underline mt-2"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}

            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInputs[recipe._id]}
                onChange={(e) => handleCommentInputChange(recipe._id, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
              />
              <button
                onClick={() => handleCommentSubmit(recipe._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
              >
                Add Comment
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => handleSaveRecipe(recipe._id)}
                className={`px-4 py-2 rounded-md ${
                  recipe.saved ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                } hover:bg-green-600`}
              >
                {recipe.saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


