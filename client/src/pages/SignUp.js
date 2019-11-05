import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import SignupForms from './presentational/SignupForms'

const styles = {
  link: {
    borderRadius: '9999px',
    display: 'inline-block',
    textDecoration: 'none',
    backgroundColor: 'white',
    color: 'black',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    marginBottom: '.5rem',
    fontSize: '1rem',
    position: 'absolute',
    right: '3rem',
    top: '3rem'
  }
}

const SignUp = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%'
        }}
      >
        <div style={{ width: '60%' }}>
          <Typography
            variant="h4"
            align="left"
            style={{ fontWeight: 'bold', marginBottom: '2.5rem' }}
          >
            Create an account
          </Typography>
          <SignupForms />
        </div>
      </section>
      <section
        style={{ backgroundColor: 'black', height: '100%', width: '50%' }}
      >
        <Link style={styles.link} to="/signin">
          Sign in
        </Link>
      </section>
    </div>
  )
}

export default SignUp
