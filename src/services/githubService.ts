import { Repository, User } from "../types/githubTypes";
import { HttpMethod, fetchApi } from "../utils/fetchApi";

interface Repos {
  items: Repository[];
  total_count: number;
}

export async function searchRepositories(
  perPage: number,
  currentPage: number,
  sortBy: string,
  order: string,
  searchQuery?: string
): Promise<Repos> {
  let url = `search/repositories?sort=${sortBy}&order=${order}&per_page=${perPage}&page=${currentPage}`;

  if (searchQuery && searchQuery.trim() !== "") {
    url += `&q=${encodeURIComponent(searchQuery.trim())}`;
  }

  const repos = await fetchApi<Repos>(HttpMethod.GET, url);
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

export async function getContributors(repositoryId: string): Promise<User[]> {
  const response = await fetchApi<User[]>(
    HttpMethod.GET,
    `repositories/${repositoryId}/contributors?&per_page=10&page=1`
  );
  return response;
}
