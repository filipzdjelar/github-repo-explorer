import { GithubContributor, Repos, Repository } from "../types/githubTypes";
import { HttpMethod, fetchApi } from "../utils/fetchApi";

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

export async function getContributors(
  repositoryId: string
): Promise<GithubContributor[]> {
  const response = await fetchApi<GithubContributor[]>(
    HttpMethod.GET,
    `repositories/${repositoryId}/contributors?&per_page=10&page=1`
  );
  return response;
}
