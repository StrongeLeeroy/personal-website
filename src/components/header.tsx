import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './header.module.css';
import LogoImg from './logo-img';

declare const window: any;
declare const document: any;

export interface HeaderState {
  scrollTop: number;
  headerClasses: string;
  completion?: number;
}
export interface HeaderProps {
  siteTitle: string;
  enableScrollTracker: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  static propTypes = {
    siteTitle: PropTypes.string,
    enableScrollTracker: PropTypes.bool
  };

  static defaultProps = {
    siteTitle: ``,
    enableScrollTracker: false
  };

  public headerClasses = styles.headerWrapper;

  constructor(props) {
    super(props);

    this.state = {
      scrollTop: window.pageYOffset,
      headerClasses: this.headerClasses,
      completion: this.getCompletion()
    }
  }

  getCompletion() {
    if (window.pageYOffset > 0) {
      return window.pageYOffset / document.body.offsetHeight * 100
    } else {
      return 0;
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

    const newState: HeaderState = {
      scrollTop,
      headerClasses
    }

    if (this.props.enableScrollTracker) {
      newState.completion = this.getCompletion();
    }

    this.setState(newState);
  }

  render() {
    const linkActive = { borderBottom: '3px solid rgb(73, 93, 192)' };
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
          <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
            <LogoImg />
          </Link>
          
          <nav className={styles.headerNavigation}>
            <Link to="/blog" activeStyle={linkActive} partiallyActive={true}>BLOG</Link>
            <Link to="/portfolio" activeStyle={linkActive} partiallyActive={true}>PORTFOLIO</Link>
            <Link to="/contact" activeStyle={linkActive} partiallyActive={true}>CONTACT</Link>
          </nav>
        </div>
        {
          this.props.enableScrollTracker ?
            <div className={styles.scrollComplete} style={{ width: this.state.completion + '%' }}></div> :
            null
        }
      </header>
    );
  }
}

export default Header;
