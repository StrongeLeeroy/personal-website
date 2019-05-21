import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Portfolio = () => (
  <Layout>
    <SEO title="Portfolio" />
    <h1>Hi from the portfolio</h1>
    <p>Welcome to the portfolio</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default Portfolio;
