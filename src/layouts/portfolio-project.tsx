import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TagCloud from '../components/tags/tag-cloud';
import kebabCase from 'lodash.kebabcase';
import ScrollToTopButton from '../components/scroll-to-top-button/scroll-to-top-button';

const PortfolioProject = ({ data }) => {
    const { markdownRemark } = data;
    
    return (
        <Layout>
            <SEO title={markdownRemark.frontmatter.title} keywords={markdownRemark.frontmatter.tags} />
            <ScrollToTopButton />
            <h4>{markdownRemark.frontmatter.date}</h4>
            <h4>{markdownRemark.frontmatter.author}</h4>
            <h1>{markdownRemark.frontmatter.title}</h1>
            {/* <p>In: {markdownRemark.frontmatter.category.join()}</p> */}
            <div>
                <TagCloud tags={markdownRemark.frontmatter.tags} />
            </div>
            <div>
                {markdownRemark.frontmatter.category.map(category => (
                    <Link key={category} to={`/portfolio/category/${kebabCase(category)}`}>{category}</Link>
                ))}
            </div>
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
        </Layout>
    );
}

export default PortfolioProject;

export const query = graphql`
    query PortfolioProjectsBySlug($slug: String!) {
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