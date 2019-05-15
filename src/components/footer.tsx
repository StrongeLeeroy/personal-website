import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Footer = ({}) => (
  <footer
    style={{
      background: `#444444`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `5rem 1rem`,
      }}
    >
      Footer content
    </div>
  </footer>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
