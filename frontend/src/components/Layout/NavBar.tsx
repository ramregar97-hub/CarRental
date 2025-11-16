import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="w-full px-6 py-4 shadow flex items-center justify-between">
            <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate("/")}
            >
                CarMarket
            </h1>

            <div className="flex items-center gap-4">
                <ThemeToggle />

                {user ? (
                    <>
                        <span>{user.email}</span>
                        <Button onClick={logout} variant="destructive">
                            Logout
                        </Button>

                        <Button onClick={() => navigate("/add-car")} variant="outline">
                            Sell Car
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => navigate("/login")}>Login</Button>
                        <Button onClick={() => navigate("/register")} variant="outline">
                            Register
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
