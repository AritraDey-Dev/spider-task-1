import express from "express";
import {User,RecipeModel} from "../models/Schema"
import { verifyToken } from "./middleware";
import mongoose from "mongoose"

const router=express.Router();

router.get('/',async (req,res)=>{
    try{const result=await RecipeModel.find({});
    res.json(result)
     }catch(e){
        res.status(401).json(e)
     }
})

router.post("/",verifyToken,async (req,res)=>{
    const recipe = new RecipeModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner,
      });

      try{
        const result=await recipe.save();
    
            res.status(201).json({
                createdRecipe: {
                  name: result.name,
                  image: result.image,
                  ingredients: result.ingredients,
                  instructions: result.instructions,
                  _id: result._id,
                },
              });
     
      }catch(e){
        console.log(e)
        res.status(500).json(e)
      }
})

router.get("/:recipeId",async (req,res)=>{
    try{
        const result=await RecipeModel.findById(req.params.recipeId);
        res.json(result)
    }catch(e){
        res.status(401).json(e)
    }
})

router.get("/savedRecipes/:userId",async (req,res)=>{
    try{
        const user=await User.findById(req.params.userId);
        const savedRecipes=await RecipeModel.find({
            _id:{$in:user.savedRecipes
            }
        });
        console.log(savedRecipes)
        res.status(201).json(savedRecipes)
    }catch(e){
        res.status(401).json(e)
    }
})

router.get("/savedRecipes/ids/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
