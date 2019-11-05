import React from 'react'
import { Typography } from '@material-ui/core'
import SignupForms from './presentational/SignupForms'

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
      ></section>
    </div>
  )
}

export default SignUp
