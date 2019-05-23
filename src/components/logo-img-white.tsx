import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const LogoImgWhite = () => (
    <StaticQuery
        query={graphql`
            query {
                image: file(relativePath: { eq: "startjs-logo-white-2.png" }) {
                childImageSharp {
                    fluid(maxWidth: 150) {
                    ...GatsbyImageSharpFluid
                    }
                }
                }
            }
        `}
        render={data => <Img style={{ width: 150 }} fluid={data.image.childImageSharp.fluid} />}
    />
);

export default LogoImgWhite;