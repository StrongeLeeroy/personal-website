import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './header.module.css';
import LogoImg from './logo-img';

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
            padding: `.5rem 1rem`
          }}
        >
          <Link to='/'>
            <LogoImg />
          </Link>
          
          <nav className={styles.headerNavigation}>
            <Link to="/blog">BLOG</Link>
            <Link to="/portfolio">PORTFOLIO</Link>
            <Link to="/contact">CONTACT</Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
