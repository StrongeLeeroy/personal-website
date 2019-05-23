import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post-list';

export const indexKeywords = [
  'gorka', 'hernandez', 'estomba', 'web', 'developer', 'consultant', 'portfolio', 'blog', 'contact', 'react', 'angular', 'guides', 'guide',
  'tutorial', 'help', 'beginners', 'intermediate', 'advanced', 'tutorials'
];

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={indexKeywords} />
    <div>
      Homepage
    </div>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog-post" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            author
            date(formatString: "Do MMMM YYYY")
          }
          fields {
            slug
            type
          }
          excerpt
        }
      }
    }
  }
`;