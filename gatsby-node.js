/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);
const kebabCase = require(`lodash.kebabcase`);

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
    const blogCategory = path.resolve(`./src/layouts/blog-category.tsx`);
    const blogTag = path.resolve(`./src/layouts/blog-tag-page.tsx`);

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
            // reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;
        const categories = [];
        const tags = [];
        for (const post of posts) {
            for (const category of post.node.frontmatter.category) {
                categories.push(category);
            }
            for (const tag of post.node.frontmatter.tags) {
                tags.push(tag);
            }
            createPage({
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug
                }
            })
        }

        const postsPerCategory = {};
        for (const category of categories) {
            if (postsPerCategory[category]) {
                postsPerCategory[category] = postsPerCategory[category] + 1;
            } else {
                postsPerCategory[category] = 1;
            }
        }

        for (const category of Object.keys(postsPerCategory)) {
            const link = `/blog/category/${kebabCase(category)}`;

            createPage({
                path: link,
                component: blogCategory,
                context: {
                    allCategories: categories,
                    category
                }
            })
        }

        const postsPerTag = {};
        for (const tag of tags) {
            if (postsPerTag[tag]) {
                postsPerTag[tag] = postsPerTag[tag] + 1;
            } else {
                postsPerTag[tag] = 1;
            }
        }

        for (const tag of Object.keys(postsPerTag)) {
            const link = `/blog/tag/${kebabCase(tag)}`;

            createPage({
                path: link,
                component: blogTag,
                context: {
                    allTags: tags,
                    tag
                }
            })
        }
    });
}