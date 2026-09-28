const API_BASE_URL = "http://localhost:5000/api";

export async function getRepository(repositoryPath) {
  const url = new URL(`${API_BASE_URL}/repository`);

  url.searchParams.set("path", repositoryPath);

  const response = await fetch(url);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to load repository.");
  }

  return result.data;
}