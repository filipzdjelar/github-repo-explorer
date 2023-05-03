import { useEffect, useState } from "react";
import {
  getContributors,
  getRepositoryById,
} from "../../services/githubService";
import { useParams } from "react-router-dom";
import Spinner, { SpinnerVariant } from "../common/Spinner";
import { Repository, User } from "../../types/githubTypes";
import { toast } from "react-toastify";
import RepositoryCard from "../repository/RepositoryCard";

const RepositoryDetails: React.FC = () => {
  const { id } = useParams();
  const [repository, setRepository] = useState<Repository>();
  const [loading, setLoading] = useState(false);
  const [contributors, setContributors] = useState<User[]>();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([getRepositoryById(id), getContributors(id)])
      .then(([repository, contributors]) => {
        setRepository(repository);
        setContributors(contributors);
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {!loading ? (
        <>
          {contributors &&
            contributors.map((contributor) => {
              return <span key={contributor.id}>{contributor.login}</span>;
            })}

          {repository && (
            <RepositoryCard repository={repository} isLinkActive={false} />
          )}
        </>
      ) : (
        <div className="spinner__wrapper">
          <Spinner variant={SpinnerVariant.LIGHT} />
        </div>
      )}
    </>
  );
};

export default RepositoryDetails;
