import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { login, logout } from "../../../../app/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from ?? "/articles";
  const user = useAppSelector(s => s.auth.user);

  const dispatch = useAppDispatch();
  const [username, setU] = useState("");
  const [password, setP] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    navigate(from, { replace: true });
  };

  if (user) {
    return (
      <div className="p-6 rounded-xl border bg-white dark:bg-gray-900">
        <p className="mb-3">Ya estás autenticado como <b>{user.name}</b>.</p>
        <button className="px-3 py-2 rounded border" onClick={() => dispatch(logout())}>Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm">
      <h1 className="text-2xl font-bold">Login</h1>
      <div>
        <label className="block text-sm font-medium mb-1">Usuario</label>
        <input className="w-full px-3 py-2 rounded-lg border"
               value={username} onChange={(e) => setU(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contraseña</label>
        <input type="password" className="w-full px-3 py-2 rounded-lg border"
               value={password} onChange={(e) => setP(e.target.value)} />
      </div>
      <button className="px-4 py-2 rounded-lg bg-gray-900 text-white">Entrar</button>
    </form>
  );
}
