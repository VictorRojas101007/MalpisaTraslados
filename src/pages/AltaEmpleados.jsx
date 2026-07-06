import { useEffect, useState } from "react";
import { registrarUsuario } from "../services/usuariosService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AltaEmpleado() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    tiendaId: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { usuario, cargando: authCargando } = useAuth();

  useEffect(() => {
    if (authCargando) return;

    if (!usuario) {
      navigate("/login", { replace: true });
      return;
    }

    if (usuario.rol !== "admin") {
      navigate("/", { replace: true });
    }
  }, [authCargando, usuario, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setCargando(true);

    try {
      await registrarUsuario(form);
      setMensaje(`Empleado ${form.nombre} creado correctamente`);
      setForm({
        nombre: "",
        email: "",
        password: "",
        tiendaId: "",
      });
      console.log(usuario);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMensaje("Ese correo ya está registrado");
      } else if (error.code === "auth/weak-password") {
        setMensaje("La contraseña debe tener mas de 6 dígitos");
      } else {
        setMensaje("Ocurrio un error al crear el usuario");
      }
    } finally {
      setCargando(false);
    }
  };

  if (authCargando) return <p>...cargando</p>;
  if (!usuario || usuario.rol !== "admin") return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_-20px_rgba(15,23,42,0.2)]">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-900 to-blue-700 px-6 py-8 text-white sm:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
              Administración
            </p>
            <h2 className="mt-2 text-3xl font-bold">Dar de alta a un empleado</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              Completa los datos para crear un nuevo acceso para tu equipo.
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="nombre">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    placeholder="Ingresa el nombre del empleado"
                    onChange={handleChange}
                    value={form.nombre}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Ingresa el correo del empleado"
                    onChange={handleChange}
                    value={form.email}
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
                    type="password"
                    name="password"
                    placeholder="Ingresa la contraseña del empleado"
                    onChange={handleChange}
                    value={form.password}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="tiendaId">
                    Tienda
                  </label>
                  <select
                    id="tiendaId"
                    name="tiendaId"
                    value={form.tiendaId}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Selecciona una tienda</option>
                    <option value="Tienda Malpisa">Tienda Malpisa</option>
                    <option value="Tienda Color Centro">Tienda Color Centro</option>
                    <option value="Almacen Prisma">Almacen Prisma</option>
                  </select>
                </div>
              </div>

              {mensaje && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {mensaje}
                </div>
              )}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 sm:w-auto sm:px-8"
              >
                {cargando ? "Creando..." : "Crear empleado"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AltaEmpleado;