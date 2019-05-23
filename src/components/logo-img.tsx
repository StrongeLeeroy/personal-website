import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const LogoImg = () => (
    <StaticQuery
        query={graphql`
            query {
                image: file(relativePath: { eq: "startjs-logo.png" }) {
                childImageSharp {
                    fluid(maxHeight: 40) {
                    ...GatsbyImageSharpFluid
                    }
                }
                }
            }
        `}
        render={data => <img style={{ height: 40, width: 120, margin: 0 }} src={data.image.childImageSharp.fluid.src} />}
    />
);

export default LogoImg;