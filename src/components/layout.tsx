/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import './layout.css'
import PostFooter from './post-footer';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div style={{
        display: `flex`,
        minHeight: `100vh`,
        flexDirection: `column`
      }}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `calc(1.45rem + 62px) auto`,
            width: 1260,
            padding: `0px 1rem 1rem`,
            paddingTop: 0,
            flex: 1
          }}
        >
          <main>{children}</main>
        </div>
        <PostFooter/>
        <Footer></Footer>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
