import PropTypes from 'prop-types';
import React from 'react';
import tagStyles from './tag.module.css';

const Tag = ({ children }) => (
    <div className={tagStyles.tag}>
        <p className={tagStyles.tagText}>{children}</p>
    </div>
);

Tag.propTypes = {
    children: PropTypes.string.isRequired
};

Tag.defaultProps = {
    children: ``
};

export default Tag;
