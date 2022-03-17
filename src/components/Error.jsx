import React from "react";
import styles from "./Error.module.css";

const Error = () => {
  return <div className={styles.errorCont}><p className={styles.error}>Sorry, an error occured. Please refresh or select another city.</p></div>
};

export default Error;