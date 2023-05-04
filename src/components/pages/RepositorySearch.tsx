import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RepositoryCard from "../repository/RepositoryCard";
import Pagination from "../common/Pagination";
import { searchRepositories } from "../../services/githubService";
import Spinner, { SpinnerVariant } from "../common/Spinner";
import { Repository } from "../../types/githubTypes";
import { toast } from "react-toastify";
import Dropdown from "../common/Dropdown";

const RESULTS_PER_PAGE = 10;
const MAX_TOTAL_COUNT = 1000;

const RepositorySearch: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("stars");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setLoading(true);
    searchRepositories(RESULTS_PER_PAGE, currentPage, sortBy, order, search)
      .then(
        (data) => {
          setRepositories(data.items);
          setTotalPages(
            Math.ceil(
              Math.min(data.total_count, MAX_TOTAL_COUNT) / RESULTS_PER_PAGE
            )
          );
        },
        (error) => {
          toast.error(error.message);
          navigate("/");
        }
      )
      .finally(() => setLoading(false));
  }, [search, sortBy, currentPage, order]);

  const handleSortByChange = (option: string) => {
    setSortBy(option);
    setCurrentPage(1);
  };

  const handleOrderChange = (option: string) => {
    setOrder(option);
    setCurrentPage(1);
  };

  return (
    <div className="top-results__wrapper">
      {loading ? (
        <div className="spinner__wrapper">
          <Spinner variant={SpinnerVariant.LIGHT} />
        </div>
      ) : (
        <>
          {repositories.length > 0 ? (
            <>
              <div className="top-results__header">
                <h3>Search results for : '{search}'</h3>
                <Dropdown
                  title="Sorted by:"
                  onSelect={handleSortByChange}
                  initial={sortBy}
                  options={["stars", "forks"]}
                />
                <Dropdown
                  title="Order:"
                  onSelect={handleOrderChange}
                  initial={order}
                  options={["desc", "asc"]}
                />
              </div>
              {repositories.map((repository: Repository) => (
                <RepositoryCard
                  key={repository.id}
                  repository={repository}
                  isLinkActive={true}
                  maxNumberOfTopicsShown={8}
                />
              ))}
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
              <h3>No results found 😭</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RepositorySearch;
