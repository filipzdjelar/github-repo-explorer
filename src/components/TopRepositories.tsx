import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RepositoryCard from "./RepositoryCard";
import Pagination from "./Pagination";
import { getRepos } from "../services/githubService";
import Spinner, { SpinnerVariant } from "./Spinner";
import { Repository } from "../types/githubTypes";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown";

const TopRepositories = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const maxResultsPerPage = 10;

  const [results, setResults] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRepos(maxResultsPerPage, currentPage, sortBy, search)
      .then((data) => {
        setResults(data.items);
        setTotalPages(
          // 1000 is maximum allowed number of items to fetch from github
          data.total_count <= 1000
            ? Math.ceil(data.total_count / maxResultsPerPage)
            : 1000 / maxResultsPerPage
        );
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [search, sortBy, currentPage]);

  return (
    <div className="top-results__wrapper">
      {!loading ? (
        <>
          {results.length > 0 ? (
            <>
              <h3>Search results for : '{search}'</h3>
              <Dropdown
                title="Sorted by:"
                onSelect={setSortBy}
                initial={sortBy}
                options={sortOptions}
              />

              {results.map((result: Repository) => {
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
                    id={result.id}
                  />
                );
              })}
            </>
          ) : (
            <div className="spinner__wrapper">
              <h3>No results found 😭</h3>
            </div>
          )}
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

const sortOptions = ["stars", "forks"];
