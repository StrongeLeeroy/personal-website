import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styles from './scroll-to-top-button.module.css';
import ArrowUp from '../icons/arrow-up';

declare const window: any;
declare const document: any;

export interface ScrollToTopButtonState {
    scrollDistance: number;
}

export default class ScrollToTopButton extends React.Component<{}, ScrollToTopButtonState> {

    constructor(props) {
        super(props);
        this.state = {
            scrollDistance: this.getScrolledDistance()
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event: any) {
        this.setState({
            scrollDistance: this.getScrolledDistance()
        });
    }

    scrollToTop() {
        const c = this.getScrolledDistance();

        if (c > 0) {
            (window as any).requestAnimationFrame(this.scrollToTop.bind(this));
            (window as any).scrollTo(0, c - c / 4);
        }
    }

    getScrolledDistance(): number {
        if (typeof document !== `undefined`) {
            return (document as any).documentElement.scrollTop || (document as any).body.scrollTop;
        }
    }

    render() {
        const classes = this.state.scrollDistance > 1000 ?
            `${styles.scrollButton} ${styles.shown}` :
            `${styles.scrollButton} ${styles.hidden}`;

        return (
            <button className={classes} onClick={() => this.scrollToTop()}>
                <ArrowUp fill="#efdd4d" />
            </button>
        );
    }
}
