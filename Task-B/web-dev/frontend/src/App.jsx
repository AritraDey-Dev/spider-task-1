import Navbar from "./components/navbar"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipe from "./pages/saved-recipe";
import Home from "./pages/homes";
import Auth from "./pages/auth";

function App(){
  return( 
  
    <Router>
      <Navbar className="bg-red-600"/>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/auth" element={<Auth/>}></Route>
      <Route path="/create-recipe" element={<CreateRecipe/>}></Route>
      <Route path="/saved-recipe" element={<SavedRecipe/>}></Route>
      
      </Routes>
    </Router>


  )
}

export  default App;