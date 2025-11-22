// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/button";


const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-muted shadow">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                        Car<span className="text-primary">Market</span>
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <div className="mr-2">
                        <ThemeToggle />
                    </div>

                    {user ? (
                        <>
                            <span className="text-sm font-medium hidden sm:inline">{user.email}</span>
                            <Button onClick={() => navigate("/")} >
                                All Cars
                            </Button>
                            <Button onClick={() => navigate("/my-cars")} >
                                My Cars
                            </Button>
                            <Button onClick={() => navigate("/add-car")} variant="outline">
                                Sell Car
                            </Button>
                            <Button onClick={() => { logout(); navigate("/"); }} variant="destructive">
                                Logout
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
            </div>
        </nav>
    );
};

export default Navbar;
