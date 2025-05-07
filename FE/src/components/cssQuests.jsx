import { Link } from "react-router";

const CSSQuests = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={"/main/questStart/css/1"}>CSS Basics 1</Link>
        </li>
        <li>
          <Link to={"/main/questStart/css/2"}>CSS Basics 2</Link>
        </li>
        <li>
          <Link to={"/main/questStart/css/3"}>CSS Basics 3</Link>
        </li>
      </ul>
    </>
  );
};

export default CSSQuests;
