import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { indexKeywords } from '.';
import PostList from '../components/post-list';

const Blog = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={indexKeywords} />
    <div
      style={{
        maxWidth: 1260,
        padding: `0px 1rem 1rem`
      }}
    >
      <PostList posts={data.allMarkdownRemark.edges}/>
    </div>
  </Layout>
);

export default Blog;


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
`