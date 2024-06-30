const User = require('../models/User');
const Recipe = require('../models/Recipe');

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = authService.generateToken(user._id);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.saveRecipe = async (req, res) => {
    try {
        const { userId } = req.user;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { recipeId } = req.body;
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (user.favoriteRecipes.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe already saved as favorite' });
        }

        user.favoriteRecipes.push(recipeId);
        await user.save();

        res.json({ message: 'Recipe saved to favorites successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getFavoriteRecipes = async (req, res) => {
    try {
        const { userId } = req.user;
        
        const user = await User.findById(userId).populate('favoriteRecipes');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.favoriteRecipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSavedRecipe = async (req, res) => {
    try {
        const { userId } = req.user;
        const { recipeId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const index = user.favoriteRecipes.indexOf(recipeId);
        if (index === -1) {
            return res.status(400).json({ message: 'Recipe not found in favorites' });
        }

        user.favoriteRecipes.splice(index, 1);
        await user.save();

        res.json({ message: 'Recipe deleted from favorites successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
