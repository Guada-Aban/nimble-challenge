import { useState } from "react";
import { applyToJob } from "../services/api";
import StatusMessage from "./StatusMessage";

export default function JobCard({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [hovered, setHovered] = useState(false);

  async function handleSubmit() {
    if (!repoUrl.trim()) {
      setStatus({ type: "error", message: "Ingresá la URL de tu repositorio de GitHub." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await applyToJob({
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        jobId: job.id,
        repoUrl: repoUrl.trim(),
    });

    
      setStatus({ type: "success", message: "Postulación enviada con éxito!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "24px 28px",
      marginBottom: "16px",
      boxShadow: hovered
        ? "0 4px 16px rgba(0,0,0,0.10)"
        : "0 1px 4px rgba(0,0,0,0.05)",
      transition: "box-shadow 0.2s ease",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 style={{ margin: "0 0 16px 0", fontSize: "17px", fontWeight: "600", color: "#111" }}>
        {job.title}
      </h3>
      <input
        type="url"
        placeholder="Ingresá la URL de tu repositorio de GitHub"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          fontSize: "14px",
          marginBottom: "12px",
          boxSizing: "border-box",
          outline: "none",
          color: "#111",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => e.target.style.borderColor = "#2563eb"}
        onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 22px",
          background: loading ? "#93c5fd" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => { if (!loading) e.target.style.background = "#1d4ed8"; }}
        onMouseLeave={(e) => { if (!loading) e.target.style.background = "#2563eb"; }}
      >
        {loading ? "Enviando..." : "Postularme"}
      </button>
      <StatusMessage type={status?.type} message={status?.message} />
    </div>
  );
}