import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [cookies,setCookies]=useCookies(["access_token"]);
    const navigate=useNavigate();
    const logout=()=>{
        setCookies("access_token","")
        window.localStorage.removeItem("userID")
        toast.success("Logged out")
        navigate("/auth");
    }
    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-400">Home</Link>
                <Link to="/create-recipe" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-400">Create Recipe</Link>
                <Link to="/saved-recipe" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-400">Saved Recipe</Link>
                {!cookies.access_token ? (
                    <Link to="/auth" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-400">Login/Register</Link>
                ) : (
                    <button onClick={logout} className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-400">Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
