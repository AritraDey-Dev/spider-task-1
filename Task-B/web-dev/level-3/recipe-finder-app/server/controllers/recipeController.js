const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredients, procedure, image, author } = req.body;
        const recipe = await Recipe.create({ name, ingredients, procedure, image, author });
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Implement other CRUD operations as needed (update, delete)
