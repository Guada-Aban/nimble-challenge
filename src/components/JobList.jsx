import { useJobs } from "../hooks/useJobs";
import JobCard from "./JobCard";

export default function JobList({ candidate }) {
  const { jobs, loading, error } = useJobs();

  if (loading) return <p>Cargando posiciones...</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!jobs.length) return <p>No hay posiciones disponibles</p>;

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}