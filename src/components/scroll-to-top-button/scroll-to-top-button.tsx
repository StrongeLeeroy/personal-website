import React from 'react';
import styles from './scroll-to-top-button.module.css';

export default class ScrollToTopButton extends React.Component {

    componentDidMount() {
        console.log(styles);
    }

    scrollToTop() {
        console.log('SCROLL CALLED');
        const c = (document as any).documentElement.scrollTop || (document as any).body.scrollTop;

        if (c > 0) {
            (window as any).requestAnimationFrame(this.scrollToTop.bind(this));
            (window as any).scrollTo(0, c - c / 4);
        }
    }

    render() {
        return (
            <button className={styles.scrollButton} onClick={() => this.scrollToTop()}>TOP</button>
        );
    }
}
