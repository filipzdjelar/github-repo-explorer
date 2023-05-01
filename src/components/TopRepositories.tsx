import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RepositoryCard from "./RepositoryCard";

const TopRepositories = () => {
  const location = useLocation();
  const searchQuery = location.pathname.replace("/", "");
  const maxResults = 10;

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc&per_page=${maxResults}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.items);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="top-results__wrapper">
      {results
        ? results.map((result: any) => {
            return (
              <RepositoryCard
                key={result.id}
                name={result.full_name}
                stars={result.stargazers_count}
                forks={result.forks_count}
                ownerName={result.owner.login}
                ownerAvatarUrl={result.owner.avatar_url}
                description={result.description}
                topics={result.topics}
              />
            );
          })
        : null}
    </div>
  );
};

export default TopRepositories;
