/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        const [ year, month, day ] = new Date(node.frontmatter.date)
            .toISOString()
            .split("T")[0]
            .split("-");

        const slug = value.replace("/blog", "").replace(/\/$/, "");
        const url = `/blog/${year}/${month}/${day}${slug}`;

        createNodeField({
            name: `slug`,
            node,
            value: url
        })
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const blogPost = path.resolve(`./src/layouts/blog-post.tsx`);

    return graphql(`
        query blogPosts {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date
                            author
                            category
                            tags
                            featured
                        }
                        html
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            console.error(result.errors);
            reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;
        for (const post of posts) {
            createPage({
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug
                }
            })
        }
    });
}