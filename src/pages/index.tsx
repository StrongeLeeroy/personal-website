import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post-list';

const indexKeywords = [
  'gorka', 'hernandez', 'estomba', 'web', 'developer', 'consultant', 'portfolio', 'blog', 'contact', 'react', 'angular', 'guides', 'guide',
  'tutorial', 'help', 'beginners', 'intermediate', 'advanced', 'tutorials'
];

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={indexKeywords} />
    <div>
      <PostList posts={data.allMarkdownRemark.edges}/>
    </div>
    <Link to="/portfolio/">Portfolio</Link>
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
    allMarkdownRemark {
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
          }
          excerpt
        }
      }
    }
  }
`