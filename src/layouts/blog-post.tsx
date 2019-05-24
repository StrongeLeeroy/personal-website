import React from 'react';
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TagCloud from '../components/tags/tag-cloud';
import postStyles from './blog-post.module.css';
import kebabCase from 'lodash.kebabcase';
import ScrollToTopButton from '../components/scroll-to-top-button/scroll-to-top-button';

const BlogPost = ({ data }) => {
    const { markdownRemark } = data;
    
    return (
        <>
        {/* {
            markdownRemark.frontmatter.image ? <div className={postStyles.featuredImage}>
                <Img fluid={markdownRemark.frontmatter.image.childImageSharp.fluid} />
            </div> : null
        } */}
        <Layout enableScrollTracker={true}>
            <SEO title={markdownRemark.frontmatter.title} keywords={markdownRemark.frontmatter.tags} />
            <ScrollToTopButton />

            <h4 className={postStyles.headerDate}>{markdownRemark.frontmatter.date}</h4>
            <h4 className={postStyles.headerAuthor}>{markdownRemark.frontmatter.author}</h4>
            
            <h1 className={postStyles.headerTitle}>{markdownRemark.frontmatter.title}</h1>
            {/* <div className={postStyles.categoriesWrapper}>
                {markdownRemark.frontmatter.category.map(category => (
                    <Link
                        className={postStyles.categoryName}
                        key={category}
                        to={`/blog/category/${kebabCase(category)}`}
                    >
                        {category.toUpperCase()}
                    </Link>
                ))}
            </div> */}

            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
            <hr/>
            <div className={postStyles.headerTagCloud}>
                <TagCloud tags={markdownRemark.frontmatter.tags} />
            </div>
        </Layout>
        </>
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
                image {
                    childImageSharp {
                        fluid(maxWidth: 2000, quality: 100) {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;