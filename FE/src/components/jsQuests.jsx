import { Link } from "react-router";

const JSQuests = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={"/main/questStart/js/1"}>JavaScript Basics 1</Link>
        </li>
        <li>
          <Link to={"/main/questStart/js/2"}>JavaScript Basics 2</Link>
        </li>
        <li>
          <Link to={"/main/questStart/js/3"}>JavaScript Basics 3</Link>
        </li>
      </ul>
    </>
  );
};

export default JSQuests;
