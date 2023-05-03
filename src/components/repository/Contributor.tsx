import { GithubContributor } from "../../types/githubTypes";
import Tooltip from "../common/Tooltip";

interface ContributorProps {
  contributor: GithubContributor;
}

const Contributor: React.FC<ContributorProps> = ({ contributor }) => {
  return (
    <div>
      <Tooltip
        position="bottom"
        behavior="hover"
        offsetY={0}
        offsetX={20}
        minWidth={150}
        tooltipContent={`Contributions: ${contributor.contributions}`}
      >
        <div className="contributor__wrapper">
          <img
            src={contributor.avatar_url}
            alt={`${contributor.login}'s avatar`}
            height={40}
            width={40}
          />
          <p className="repository-card__name">{contributor.login}</p>
        </div>
      </Tooltip>
    </div>
  );
};

export default Contributor;
