import Badge from "./Badge";

interface TopicBadgesProps {
  topics: string[];
  maxNumberOfTopicsShown?: number;
}

const TopicBadges: React.FC<TopicBadgesProps> = ({
  topics,
  maxNumberOfTopicsShown,
}) => {
  const displayedTopics = maxNumberOfTopicsShown
    ? topics.slice(0, maxNumberOfTopicsShown)
    : topics;

  return (
    <div className="badge__wrapper">
      {displayedTopics.map((topic) => (
        <Badge key={topic} label={topic} />
      ))}
    </div>
  );
};

export default TopicBadges;
