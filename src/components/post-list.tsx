import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import postListStyles from './post-list.module.css';

const PostList = ({ posts }) => (
    <>
        <h4>{posts.length} posts</h4>
        {
            posts.map(({ node }) => (
                <div className={postListStyles.postWrapper} key={node.id}>
                    <Link className={postListStyles.headerLink} to={node.fields.slug}>
                        <h3>{node.frontmatter.title} {" "}</h3>
                    </Link>
                    <p className={postListStyles.postDate}>
                        {node.frontmatter.date.toUpperCase()}
                        <span className="separator-square"></span>
                        <span className={postListStyles.postuthor}>{node.frontmatter.author.toUpperCase()}</span>
                    </p>
                    <p>
                        {node.excerpt}
                        <br/>
                        <Link className="read-more-link" to={node.fields.slug}>READ MORE</Link>
                    </p>
                </div>
            ))
        }
    </>
);

PostList.defaultProps = {
    posts: []
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object)
}

export default PostList;