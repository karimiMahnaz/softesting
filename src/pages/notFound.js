import React from "react";
import { useHistory } from "react-router-dom";

import styles from "../styles/notFound.module.scss";
import img from "../assets/Page/bg.jpg";
///import { VisibilityContext } from '../contexts/visibilityContext';

const NotFound = () => {
  ////const { notFoundFrmShow, setNotFoundFrmShow, setFormsHide } = useContext(VisibilityContext);
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  document.title = "SofTesting | NotFound";

  return (
    <div id={styles.notFound} style={{ backgroundImage: `url(${img})` }}>
      <div className={styles.notFound}>
        <div className={styles.notFound404}>
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <a href="/" onClick={handleClick}>
          Go To Homepage
        </a>
      </div>
    </div>
  );
};
export default NotFound;
