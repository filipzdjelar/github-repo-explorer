import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RepositoryCard from "./RepositoryCard";
import Pagination from "./Pagination";

const TopRepositories = () => {
  const location = useLocation();
  const searchQuery = location.pathname.replace("/", "");
  const maxResultsPerPage = 10;

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc&per_page=${maxResultsPerPage}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.items);
        setTotalPages(
          // 1000 is maximum allowed number of items to fetch from github
          data.total_count <= 1000
            ? Math.ceil(data.total_count / maxResultsPerPage)
            : 1000 / maxResultsPerPage
        );
      })
      .catch((error) => console.error(error));
  }, [searchQuery, currentPage]);

  return (
    <div className="top-results__wrapper">
      {results.map((result: any) => {
        return (
          <RepositoryCard
            key={result.id}
            name={result.full_name}
            stars={result.stargazers_count}
            forks={result.forks_count}
            ownerName={result.owner.login}
            ownerAvatarUrl={result.owner.avatar_url}
            description={result.description}
            topics={result.topics}
          />
        );
      })}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TopRepositories;
