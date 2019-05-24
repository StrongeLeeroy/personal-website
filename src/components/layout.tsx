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

const Layout = ({ children, enableScrollTracker }) => (
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
        <Header siteTitle={data.site.siteMetadata.title} enableScrollTracker={enableScrollTracker}/>
        <div
          style={{
            margin: `calc(1.45rem + 100px) 0`,
            minWidth: 400,
            padding: 0,
            flex: 1
          }}
        >
          <main
            style={{
              margin: '0 auto',
              padding: '0 1rem 1rem 1rem',
              maxWidth: 1260
            }}
          >{children}</main>
        </div>
        <PostFooter/>
        <Footer />
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  enableScrollTracker: PropTypes.bool
}

Layout.defaultProps = {
  enableScrollTracker: false
}

export default Layout;
