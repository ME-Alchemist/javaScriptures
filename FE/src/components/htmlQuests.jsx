import { Link } from "react-router";

const HtmlQuests = () => {
  return (
    <>
      <li className="dropdown-item">
        <Link to="/main/questStart/html/1">HTML Basics 1</Link>
      </li>
      <li className="dropdown-item">
        <Link to="/main/questStart/html/2">HTML Basics 2</Link>
      </li>
      <li className="dropdown-item">
        <Link to="/main/questStart/html/3">HTML Basics 3</Link>
      </li>
    </>
  );
};

export default HtmlQuests;
