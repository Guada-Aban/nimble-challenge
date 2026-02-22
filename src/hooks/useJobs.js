import { useState, useEffect } from "react";
import { getJobs } from "../services/api";

export function useJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState (null);

    useEffect (() => {
        getJobs()
            .then(setJobs)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return {jobs, loading, error};
}