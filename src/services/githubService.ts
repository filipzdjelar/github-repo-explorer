import { Repository } from "../types/githubTypes";
import { HttpMethod, fetchApi } from "../utils/fetchApi";

interface Repos {
  items: [];
  total_count: number;
}

export async function getRepos(
  maxResultsPerPage: number,
  currentPage: number,
  sortBy: string,
  searchQuery: string
): Promise<Repos> {
  const repos = await fetchApi<Repos>(
    HttpMethod.GET,
    `search/repositories?q=${searchQuery}&sort=${sortBy}&order=desc&per_page=${maxResultsPerPage}&page=${currentPage}`
  );
  return repos;
}

export async function getRepositoryById(
  repositoryId: string
): Promise<Repository> {
  const response = await fetchApi<Repository>(
    HttpMethod.GET,
    `repositories/${repositoryId}`
  );
  return response;
}
