import React from "react";
import { Link } from "react-router-dom";
import TopicBadges from "./TopicBadges";

interface RepositoryCardProps {
  name: string;
  stars: number;
  forks: number;
  ownerName: string;
  ownerAvatarUrl: string;
  description: string;
  topics: string[];
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  name,
  stars,
  forks,
  ownerName,
  ownerAvatarUrl,
  description,
  topics,
}) => {
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
          <Link to={"/"}>
            <h2 className="repository-card__name">{name}</h2>
          </Link>
        </div>
        <p>{description}</p>
        <TopicBadges topics={topics} maxNumberOfTopicsShown={8} />
      </section>

      <section className="repository-card__metadata">
        <span title="Number of Stars">&#11088; {stars}</span>
        <span title="Number of Forks">⎇ {forks}</span>
      </section>
    </section>
  );
};

export default RepositoryCard;
