import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RepositoryCard from "./RepositoryCard";
import Pagination from "./Pagination";
import { getRepos } from "../services/githubService";
import Spinner, { SpinnerVariant } from "./Spinner";

const TopRepositories = () => {
  const { search } = useParams();
  const maxResultsPerPage = 10;

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRepos(maxResultsPerPage, currentPage, search || "")
      .then((data) => {
        setResults(data.items);
        setTotalPages(
          // 1000 is maximum allowed number of items to fetch from github
          data?.total_count <= 1000
            ? Math.ceil(data?.total_count / maxResultsPerPage)
            : 1000 / maxResultsPerPage
        );
      })
      .catch((error) => console.error("erorcinaaaaaa", error))
      .finally(() => setLoading(false));
  }, [search, currentPage]);

  return (
    <div className="top-results__wrapper">
      {!loading ? (
        <>
          {results.length > 0 &&
            results.map((result: any) => {
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
        </>
      ) : (
        <div className="spinner__wrapper">
          <Spinner variant={SpinnerVariant.LIGHT} />
        </div>
      )}
    </div>
  );
};

export default TopRepositories;
