import React from 'react';
import Img from 'gatsby-image'
import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => {
    const { node } = project;
    console.log(project);
    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            display: 'flex',
            overflow: 'hidden'
        }}>
            <div style={{
                width: '40%'
            }}>
                <Img fluid={node.frontmatter.image.childImageSharp.fluid}
                    style={{
                        margin: 0,
                        display: 'block'
                    }}
                />
                {/* <img
                    src={node.frontmatter.image.childImageSharp.fluid.src}
                    alt={node.frontmatter.title}
                    style={{
                        margin: 0,
                        display: 'block'
                    }}
                /> */}
            </div>
            <div style={{
                padding: '2rem 1.5rem',
                width: '60%'
            }}>
                <h5
                    style={{
                        fontFamily: 'League Spartan',
                        marginBottom: 3,
                        color: 'rgb(150, 150, 150)',
                        fontSize: '.6rem',
                        letterSpacing: '.05em'
                    }}
                >
                    {node.frontmatter.category[0].toUpperCase()}
                </h5>
                <h3
                    style={{
                        fontFamily: 'League Spartan'
                    }}
                >
                    {node.frontmatter.title}
                </h3>
                <p
                    style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
                    }}
                >Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    );
};

ProjectCard.propTypes = {}

ProjectCard.defaultProps = {}

export default ProjectCard;