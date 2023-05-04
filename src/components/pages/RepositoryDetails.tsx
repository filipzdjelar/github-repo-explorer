import { useEffect, useState } from "react";
import {
  getContributors,
  getRepositoryById,
} from "../../services/githubService";
import { useNavigate, useParams } from "react-router-dom";
import Spinner, { SpinnerVariant } from "../common/Spinner";
import { Repository, GithubContributor } from "../../types/githubTypes";
import { toast } from "react-toastify";
import RepositoryCard from "../repository/RepositoryCard";
import ContributorsSection from "../repository/ContributorsSection";
import AdditionalDataComponent from "../repository/AdditionalDataComponent";

const RepositoryDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<Repository>();
  const [loading, setLoading] = useState(false);
  const [contributors, setContributors] = useState<GithubContributor[]>();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([getRepositoryById(id), getContributors(id)])
      .then(([repository, contributors]) => {
        setRepository(repository);
        setContributors(contributors);
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {!loading ? (
        <>
          {repository && (
            <>
              <RepositoryCard repository={repository} isLinkActive={false} />
              <AdditionalDataComponent repository={repository} />
            </>
          )}

          {contributors && <ContributorsSection contributors={contributors} />}
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
