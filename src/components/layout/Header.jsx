import React from "react";
import styles from './Header.module.css'

const Header = () => {
  return     <header>
  <div className={styles.headerContainer}>
  <h1>Weather App</h1>
  </div>
</header>
};

export default Header;