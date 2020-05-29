import * as React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { CSSProperties } from "react"

const styles: { [key: string]: CSSProperties } = {
  form: {
    width: 500,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    border: 'none',
    outline: 'none',
    backgroundColor: '#f1f1f1',
    padding: '8px 16px',
    borderRadius: 4,
    fontFamily: 'Segoe UI'
  },
  textarea: {
    border: 'none',
    outline: 'none',
    backgroundColor: '#f1f1f1',
    padding: '8px 16px',
    borderRadius: 4,
    fontFamily: 'Segoe UI',
    resize: 'vertical',
    height: 150
  },
  formLabel: {
    fontFamily: 'Segoe UI',
    fontWeight: 500,
    fontSize: '.7rem',
    marginTop: 25
  }
}

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <h1 style={{ textAlign: 'center', fontSize: '4rem' }}>Hello</h1>
    <p style={{ textAlign: 'center' }}>I'm <strong>Gorka</strong>, and I'd love to hear from you.</p>
    <form action="" style={styles.form}>
      <label style={styles.formLabel} htmlFor="contact-form-name">NAME</label>
      <input style={styles.input} type="text" id="contact-form-name" placeholder={'Your name'}/>

      <label style={styles.formLabel} htmlFor="contact-form-email">EMAIL</label>
      <input style={styles.input} type="text" id="contact-form-email" placeholder={'Your email address'}/>

      <label style={styles.formLabel} htmlFor="contact-form-message">MESSAGE</label>
      <textarea style={styles.textarea} id="contact-form-message" placeholder={'What can I do for you?'}/>
    </form>
  </Layout>
);

export default Contact;
