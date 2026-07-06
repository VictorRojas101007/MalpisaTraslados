import { useNavigate } from "react-router-dom";

function BotonVolver() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors text-gray-600"
      aria-label="Volver al inicio"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

export default BotonVolver;