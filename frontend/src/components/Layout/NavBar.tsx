// src/components/Navbar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = (
        <>
            {user ? (
                <>
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
        </>
    );

    return (
        <nav className="w-full bg-muted shadow">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                        Car<span className="text-primary">Market</span>
                    </h2>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    {navLinks}
                </div>

                <div className="md:hidden flex items-center">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        {navLinks}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
