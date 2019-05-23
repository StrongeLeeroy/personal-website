import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProjectCard from '../components/portfolio/project-card';

const Portfolio = ({ data }) => (
  <Layout>
    <SEO title="Portfolio" />
    <div
      style={{
        width: 1260,
        padding: `0px 1rem 1rem`
      }}
    >
      {
        data.allMarkdownRemark.edges
          .map(project => (<ProjectCard key={project.node.id} project={project} />))
      }
    </div>
  </Layout>
);

export default Portfolio;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { type: { eq: "portfolio-project" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            author
            category
            tags
            date(formatString: "Do MMMM YYYY")
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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