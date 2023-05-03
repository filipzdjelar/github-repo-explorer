import React from "react";
import { Link, useParams } from "react-router-dom";
import TopicBadges from "./TopicBadges";
import Tooltip from "../common/Tooltip";
import { Repository } from "../../types/githubTypes";

interface RepositoryCardProps {
  repository: Repository;
  isLinkActive: Boolean;
  maxNumberOfTopicsShown?: number;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  isLinkActive,
  maxNumberOfTopicsShown,
}) => {
  const { search } = useParams();

  return (
    <section className="repository-card">
      <section className="repository-card__info-section">
        <div className="repository-card__title">
          <img
            src={repository.owner.avatar_url}
            alt={`${repository.owner.login}'s avatar`}
            height={40}
            width={40}
          />
          {isLinkActive ? (
            <Link to={`/${search}/${repository.id}`}>
              <h2 className="repository-card__name">{repository.full_name}</h2>
            </Link>
          ) : (
            <h2 className="repository-card__name">{repository.full_name}</h2>
          )}
        </div>
        <p>{repository.description}</p>
        <TopicBadges
          topics={repository.topics}
          maxNumberOfTopicsShown={maxNumberOfTopicsShown}
        />
      </section>

      <section className="repository-card__metadata">
        <span>
          <Tooltip
            position="bottom"
            behavior="hover"
            offsetY={5}
            offsetX={-20}
            minWidth={150}
            tooltipContent={`This repository has ${repository.stargazers_count} stargazers!`}
          >
            &#11088; {repository.stargazers_count}
          </Tooltip>
        </span>

        <span>
          <Tooltip
            position="bottom"
            behavior="hover"
            offsetY={5}
            offsetX={-20}
            minWidth={150}
            tooltipContent={`This repository has ${repository.forks_count} forks!`}
          >
            ⎇ {repository.forks_count}
          </Tooltip>
        </span>
      </section>
    </section>
  );
};

export default RepositoryCard;
