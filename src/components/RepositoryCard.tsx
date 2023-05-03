import React from "react";
import { Link, useParams } from "react-router-dom";
import TopicBadges from "./TopicBadges";
import Tooltip from "./Tooltip";

interface RepositoryCardProps {
  name: string;
  stars: number;
  forks: number;
  ownerName: string;
  ownerAvatarUrl: string;
  description: string;
  topics: string[];
  id: number;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  name,
  stars,
  forks,
  ownerName,
  ownerAvatarUrl,
  description,
  topics,
  id,
}) => {
  const { search } = useParams();

  return (
    <section className="repository-card">
      <section className="repository-card__info-section">
        <div className="repository-card__title">
          <img
            src={ownerAvatarUrl}
            alt={`${ownerName}'s avatar`}
            height={40}
            width={40}
          />
          <Link to={`/${search}/${id}`}>
            <h2 className="repository-card__name">{name}</h2>
          </Link>
        </div>
        <p>{description}</p>
        <TopicBadges topics={topics} maxNumberOfTopicsShown={8} />
      </section>

      <section className="repository-card__metadata">
        <span>
          <Tooltip
            position="bottom"
            behavior="hover"
            offsetY={5}
            offsetX={-20}
            minWidth={150}
            tooltipContent={`This repository has ${stars} stargazers!`}
          >
            &#11088; {stars}
          </Tooltip>
        </span>

        <span>
          <Tooltip
            position="bottom"
            behavior="hover"
            offsetY={5}
            offsetX={-20}
            minWidth={150}
            tooltipContent={`This repository has ${forks} forks!`}
          >
            ⎇ {forks}
          </Tooltip>
        </span>
      </section>
    </section>
  );
};

export default RepositoryCard;
