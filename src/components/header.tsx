import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './header.module.css';

declare const window: any;

class Header extends React.Component<any, any> {
  static propTypes = {
    siteTitle: PropTypes.string,
  };

  static defaultProps = {
    siteTitle: ``,
  };

  public headerClasses = styles.headerWrapper;

  constructor(props) {
    super(props);
    this.state = {
      scrollTop: window.pageYOffset,
      headerClasses: this.headerClasses
    }
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(event: any) {
    const scrollTop = window.pageYOffset;
    let headerClasses = this.headerClasses;
    if (scrollTop > 0) {
      headerClasses += ` ${styles.scrolled}`;
    }
    this.setState({
      scrollTop,
      headerClasses 
    });
  }

  render() {
    const { siteTitle } = this.props;

    return (
      <header
        className={this.state.headerClasses}
      >
        <div
          className={styles.innerWrapper}
          style={{
            padding: `.5rem .5rem`
          }}
        >
          <h1 className={styles.headerTitle}>
            <Link
              to='/'
              style={{
                color: `#000`,
                textDecoration: `none`,
              }}
            >
              {siteTitle.toUpperCase()}
            </Link>
          </h1>
    
          <nav className={styles.headerNavigation}>
            <Link to="/portfolio">BLOG</Link>
            <Link to="/portfolio">PORTFOLIO</Link>
            <Link to="/portfolio">CONTACT</Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
