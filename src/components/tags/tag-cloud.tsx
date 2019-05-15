import PropTypes from 'prop-types';
import React from 'react';
import Tag from "./tag";
import tagStyles from './tag.module.css';

const TagCloud = ({ tags }) => (
    <div className={tagStyles.tagCloud}>
        {
            tags.map(tag => (<Tag>{tag}</Tag>))
        }
    </div>
);

TagCloud.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

TagCloud.defaultProps = {
    tags: []
};

export default TagCloud;