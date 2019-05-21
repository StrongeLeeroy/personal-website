import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post-list';


const BlogTagPage = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;

    return (
        <Layout>
            <SEO title={`Tag: ${pageContext.tag}`} keywords={pageContext.allTags} />
            <h3>{pageContext.tag}</h3>
            <PostList posts={allMarkdownRemark.edges}/>
        </Layout>
    );
}

export default BlogTagPage;

export const query = graphql`
    query BlogPostsListByTag($tag: String) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`;