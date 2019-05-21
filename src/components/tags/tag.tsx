import PropTypes from 'prop-types';
import React from 'react';
import tagStyles from './tag.module.css';
import { Link } from 'gatsby';
import kebabCase from 'lodash.kebabcase';

const Tag = ({ children }) => {
    const tagSlug = kebabCase(children),
        tagLink = `/blog/tag/${tagSlug}`
    return (
        <div className={tagStyles.tag}>
            <Link to={tagLink} className={tagStyles.tagLink}>
                <p className={tagStyles.tagText}>{children.toUpperCase()}</p>
            </Link>
        </div>
    );
};

Tag.propTypes = {
    children: PropTypes.string.isRequired
};

Tag.defaultProps = {
    children: ``
};

export default Tag;
