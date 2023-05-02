import { useParams } from "react-router-dom";

const AngularPage = () => {
  const { search, id } = useParams();
  console.log(search, id);
  return (
    <>
      <p>angulator</p>
    </>
  );
};

export default AngularPage;
