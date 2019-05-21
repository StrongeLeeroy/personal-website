import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post-list';


const BlogCategory = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    
    return (
        <Layout>
            <SEO title={`Category: ${pageContext.category}`} keywords={pageContext.allCategories} />
            <h3>{pageContext.category}</h3>
            <PostList posts={allMarkdownRemark.edges}/>
        </Layout>
    );
}

export default BlogCategory;

export const query = graphql`
    query BlogPostsListByCategory($category: String) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { category: { in: [$category] } } }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    excerpt
                }
            }
        }
    }
`;