import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TagCloud from '../components/tags/tag-cloud';
import postStyles from './blog-post.module.css';

const BlogPost = ({ data }) => {
    const { markdownRemark } = data;
    
    return (
        <Layout>
            <SEO title={markdownRemark.frontmatter.title} keywords={markdownRemark.frontmatter.tags} />
            <h4 className={postStyles.headerDate}>{markdownRemark.frontmatter.date}</h4>
            <h4 className={postStyles.headerAuthor}>{markdownRemark.frontmatter.author}</h4>
            <h1 className={postStyles.headerTitle}>{markdownRemark.frontmatter.title}</h1>
            {/* <p>In: {markdownRemark.frontmatter.category.join()}</p> */}
            <div className={postStyles.headerTagCloud}>
                <TagCloud tags={markdownRemark.frontmatter.tags} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
        </Layout>
    );
}

export default BlogPost;

export const query = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                author
                category
                tags
            }
        }
    }
`;