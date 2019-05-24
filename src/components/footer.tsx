import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import styles from './footer.module.css';
import LogoImg from './logo-img';
import LogoImgWhite from './logo-img-white';

const Footer = () => {
  return (
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
          padding: `5rem 1rem`,
        }}
      >
        <div className={styles.footerGrid}>
          <div>
            {/* <Img fluid={data.image.childImageSharp.fluid} /> */}

            <LogoImgWhite/>

            {/* <h2 className={styles.footerLogo}>STARTJS</h2> */}
            <p className={styles.footerCopyright}>Copyright &copy; {new Date().getFullYear()} Gorka Hernández Estomba</p>
          </div>
          <nav style={{
            paddingLeft: 40
          }}>
            <h4 className={styles.footerListHeader}>NAVIGATION</h4>
            <div className={styles.footerLinkList}>
              <Link to="/blog">Blog</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </nav>
          <nav>
            <h4 className={styles.footerListHeader}>SOCIAL</h4>
            <div className={styles.footerLinkList}>
              <a href="https://www.linkedin.com/in/gorka-hern%C3%A1ndez-estomba-695656b3/" target="_blank">LinkedIn</a>
              <a href="https://twitter.com/GorkaJS" target="_blank">Twitter</a>
              <a href="https://github.com/StrongeLeeroy" target="_blank">GitHub</a>
              <a href="https://stackoverflow.com/users/7640744/gorka-hernandez" target="_blank">Stack Overflow</a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
