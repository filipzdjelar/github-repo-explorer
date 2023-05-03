import { useEffect, useState } from "react";
import { getContributors, getRepositoryById } from "../services/githubService";
import { useParams } from "react-router-dom";
import Spinner, { SpinnerVariant } from "./Spinner";
import { Repository, User } from "../types/githubTypes";
import TopicBadges from "./TopicBadges";
import Tooltip from "./Tooltip";
import { toast } from "react-toastify";

const RepositoryDetails = () => {
  const { id } = useParams();
  const [result, setResult] = useState<Repository>();
  const [loading, setLoading] = useState(false);
  const [contributors, setContributors] = useState<User[]>();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([getRepositoryById(id), getContributors(id)])
      .then(([repository, contributors]) => {
        setResult(repository);
        setContributors(contributors);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      {!loading ? (
        <>
          {contributors &&
            contributors.map((contributor) => {
              return <span key={contributor.id}>{contributor.login}</span>;
            })}

          {result ? (
            <section className="repository-card">
              <section className="repository-card__info-section">
                <div className="repository-card__title">
                  <img
                    src={result.owner.avatar_url}
                    alt={`${result.owner.name}'s avatar`}
                    height={40}
                    width={40}
                  />

                  <h2 className="repository-card__name">{result.full_name}</h2>
                </div>
                <p>{result.description}</p>
                <TopicBadges topics={result.topics} />
              </section>

              <section className="repository-card__metadata">
                <span>
                  <Tooltip
                    position="bottom"
                    behavior="hover"
                    offsetY={5}
                    offsetX={-20}
                    minWidth={150}
                    tooltipContent={`This repository has ${result.stargazers_count} stargazers!`}
                  >
                    &#11088; {result.stargazers_count}
                  </Tooltip>
                </span>

                <span>
                  <Tooltip
                    position="bottom"
                    behavior="hover"
                    offsetY={5}
                    offsetX={-20}
                    minWidth={150}
                    tooltipContent={`This repository has ${result.forks_count} forks!`}
                  >
                    ⎇ {result.forks_count}
                  </Tooltip>
                </span>
              </section>
            </section>
          ) : null}
        </>
      ) : (
        <div className="spinner__wrapper">
          <Spinner variant={SpinnerVariant.LIGHT} />
        </div>
      )}
    </div>
  );
};

export default RepositoryDetails;
