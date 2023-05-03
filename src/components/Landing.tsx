import SearchBar from "./SearchBar";

const Landing = () => {
  return (
    <section className="landing">
      <h1>Welcome to Github Repository Exlorer</h1>
      <h3>
        Enter what you looking for, or select one of options we picked for you!
      </h3>
      <SearchBar placeholder="Search repositories" />
    </section>
  );
};

export default Landing;
