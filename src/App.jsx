import { useState, useEffect } from "react";
import { getCandidateByEmail } from "./services/api";
import JobList from "./components/JobList";

const EMAIL = "guadalupeaban04@gmail.com";

export default function App() {
  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCandidateByEmail(EMAIL)
      .then(setCandidate)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p style={{ color: "#dc2626", padding: "40px", fontFamily: "sans-serif" }}>Error: {error}</p>;
  if (!candidate) return <p style={{ padding: "40px", fontFamily: "sans-serif", color: "#888" }}>Cargando...</p>;

  return (
    <main style={{
      fontFamily: "'Segoe UI', sans-serif",
      padding: "60px 20px",
      minHeight: "100vh",
      background: "#f9fafb",
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: "620px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
          Posiciones abiertas
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "36px", fontSize: "15px" }}>
          ¡Hola, {candidate.firstName}! Ingresá la URL de tu repositorio y enviá tu postulación.
        </p>
        <JobList candidate={candidate} />
      </div>
    </main>
  );
}