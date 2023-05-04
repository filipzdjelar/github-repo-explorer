import { GithubContributor } from "../../types/githubTypes";
import Contributor from "./Contributor";

interface ContributorSEctionProps {
  contributors: GithubContributor[];
}

const ContributorsSection: React.FC<ContributorSEctionProps> = ({
  contributors,
}) => {
  return (
    <>
      <h3>Top contributors:</h3>
      <section className="contributor__section">
        {contributors.map((contributor) => {
          return <Contributor key={contributor.id} contributor={contributor} />;
        })}
      </section>
    </>
  );
};

export default ContributorsSection;
