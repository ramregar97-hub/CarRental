import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await loginUser(form);

        login({ email: form.email }, res.data.token);

        navigate("/");
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl shadow">
            <h2 className="text-xl mb-4 font-semibold">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <Button className="w-full" type="submit">Login</Button>
            </form>
        </div>
    );
};

export default Login;
