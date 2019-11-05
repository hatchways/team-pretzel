import React from 'react'
import { Formik } from 'formik'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from '@material-ui/core'

const SignupForms = () => {
  return (
    <Formik
      initialValues={{ fullName: '', email: '', password: '' }}
      onSubmit={values => {
        console.log('values', values)
      }}
    >
      {props => {
        return (
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={props.handleSubmit}
          >
            <FormControl style={{ marginBottom: '1rem' }}>
              <InputLabel shrink={true}>Your name</InputLabel>
              <Input
                type="text"
                name="fullName"
                value={props.values.fullName}
                onChange={props.handleChange}
              />
            </FormControl>
            <FormControl style={{ marginBottom: '1rem' }}>
              <InputLabel shrink={true}>Email Address</InputLabel>
              <Input
                type="email"
                name="email"
                value={props.values.email}
                onChange={props.handleChange}
              />
            </FormControl>
            <FormControl style={{ marginBottom: '1rem' }}>
              <InputLabel shrink={true}>Password</InputLabel>
              <Input
                type="password"
                name="password"
                value={props.values.password}
                onChange={props.handleChange}
              />
            </FormControl>
            <Button type="submit">Create</Button>
          </form>
        )
      }}
    </Formik>
  )
}

export default SignupForms
