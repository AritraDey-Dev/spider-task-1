import mongoose from "mongoose"

const  userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    savedRecipes:[{type:mongoose.Schema.Types.ObjectId,ref:"Recipe"}]
})
const recipeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ingredients:[
        {
            type:String,
            required:true
        }
    ],
    instructions:{
        type:String,
        
    },
    imageUrl:{
        type:String,
        required:true
    },
    cookingTime:{
        type:Number,
        required:true,

    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const User=mongoose.model("User",userSchema)
const RecipeModel=mongoose.model("Recipes",recipeSchema)


module.exports=({
    User,
   RecipeModel
})

export { User, RecipeModel };