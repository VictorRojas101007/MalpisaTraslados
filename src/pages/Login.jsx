import { useEffect, useState } from "react";
import { iniciarSesion } from "../services/usuariosService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    console.log(usuario);
    if (usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await iniciarSesion({ email, password });
      navigate("/");
    } catch (error) {
      setError("Email o contraseña incorrecto");
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_-20px_rgba(15,23,42,0.2)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-8 text-white sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_40%)]" />
            <div className="relative">
              <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]">
                Acceso seguro
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                Gestiona tus traslados con control y velocidad.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-blue-50 sm:text-base">
                Inicia sesión para confirmar movimientos, revisar pendientes y mantener el inventario siempre al día.
              </p>
            </div>

            <div className="relative mt-10 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
                Panel operativo
              </p>
              <p className="mt-2 text-sm text-white/90">
                Toda la operación centralizada en una sola vista.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Bienvenido
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Iniciar sesión</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Ingresa tus credenciales para continuar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="tu@correo.com"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {cargando ? "Ingresando..." : "Iniciar sesión"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;