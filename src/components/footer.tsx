import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './footer.module.css';

const Footer = ({}) => (
  <footer
    style={{
      background: `#20232a`,
      color: `#ffffff`,
      fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1260,
        padding: `5rem .5rem`,
      }}
    >
      <div className={styles.footerGrid}>
        <div>
          <h2 className={styles.footerLogo}>STARTJS</h2>
          <p className={styles.footerCopyright}>Copyright &copy; {new Date().getFullYear()} Gorka Hernández Estomba</p>
        </div>
        <nav style={{
          paddingLeft: 40
        }}>
          <h4 className={styles.footerListHeader}>NAVIGATION</h4>
          <div className={styles.footerLinkList}>
            <Link to="">Blog</Link>
            <Link to="">Portfolio</Link>
            <Link to="">Contact</Link>
          </div>
        </nav>
        <nav>
          <h4 className={styles.footerListHeader}>SOCIAL</h4>
          <div className={styles.footerLinkList}>
            <Link to="">LinkedIn</Link>
            <Link to="">Twitter</Link>
            <Link to="">GitHub</Link>
            <Link to="">Stack Overflow</Link>
          </div>
        </nav>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
