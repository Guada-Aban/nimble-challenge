const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function getCandidateByEmail (email) {
  const res = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);

    let data = null;
    try {
        data = await res.json();
    }   catch {

    }

    if (!res.ok){
        throw new Error (data?.message || "Error al obtener el candidato");
    }

    return data;
}

export async function getJobs() {
    const res = await fetch (`${BASE_URL}/api/jobs/get-list`);

    let data = null;
    try {
        data = await res.json();
    } catch {

    }

    if (!res.ok) {
        throw new Error (data?.message || "Error al obtener las posiciones");
    }

    return data;
}

export async function applyToJob ({ uuid, jobId, candidateId, repoUrl}) {
    const res = await fetch (`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST" ,
        headers: {"Content-Type": "application/json"} ,
        body: JSON.stringify ({ uuid, jobId, candidateId, repoUrl}) ,

    });

    let data = null;
    try {
        data = await res.json();
    }catch {

    }

    if (!res.ok) {
        throw new Error (data?.message || "Error al enviar la postulación.");
    }

    return data;
}