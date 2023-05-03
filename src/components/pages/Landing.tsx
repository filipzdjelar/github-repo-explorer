import SearchBar from "../common/SearchBar";

const Landing: React.FC = () => {
  return (
    <section className="landing">
      <h1>Welcome to the Github Repository Explorer.</h1>
      <h3>
        Please enter what you are looking for, or select one of the options we
        have picked for you!
      </h3>
      <SearchBar placeholder="Search repositories" />
    </section>
  );
};

export default Landing;
