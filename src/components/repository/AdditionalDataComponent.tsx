import { Repository } from "../../types/githubTypes";
import { formatReadableDate } from "../../utils/formatReadableDate";

interface RepositoryCardProps {
  repository: Repository;
}

const AditionalDataComponent: React.FC<RepositoryCardProps> = ({
  repository,
}) => {
  return (
    <>
      <h3 className="additional-info__title">Additional info:</h3>
      <section className="additional-info__section">
        <p>
          <span>Number of open issues:</span> {repository.open_issues}
        </p>
        <p>
          <span>Created at:</span>
          {formatReadableDate(repository.created_at) || "-"}
        </p>
        <p>
          <span>Updated at:</span>
          {formatReadableDate(repository.updated_at) || "-"}
        </p>
        <p>
          <span>Licence:</span> {repository.license.name || "-"}
        </p>
      </section>
    </>
  );
};

export default AditionalDataComponent;
