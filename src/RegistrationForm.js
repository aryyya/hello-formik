import React from 'react';
import './RegistrationForm.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField as Input, Button, Paper, CircularProgress } from '@material-ui/core';

const regex = {
  email: {
    // worst email validation check of all time
    test: (email) => email.includes('@') && email.includes('.')
  }
};

const initialValues = {
  email: '',
  password: ''
};

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(
      'The server has responded!\n\n'
        + 'Data sent:\n'
        + JSON.stringify(values, null, 4)
    );
    setSubmitting(false);
  }, 3000);
};

const validateEmail = (email) => {
  let error;
  if (!email) {
    error = 'An email is required.';
  } else if (!regex.email.test(email)) {
    error = 'That email address is not valid.';
  }
  return error;
};

const validatePassword = (password) => {
  let error;
  if (!password) {
    error = 'A password is required.';
  } else if (password.length < 8) {
    error = 'The password is too short.';
  }
  return error;
};

const RegistrationForm = () => {
  return (
    <Paper className="reg-form__container">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting
        }) => (
          <Form className="reg-form__form" autoComplete="off">
            
            {/* Email Field */}
            <div className="reg-form__row">
              <Field
                name="email"
                validate={validateEmail}
              >
                {({ field }) => (
                  <Input
                    className="reg-form__input"
                    label="Email *"
                    variant="outlined"
                    error={Boolean(touched[field.name] && errors[field.name])}
                    {...field}
                  />
                )}
              </Field>
            </div>
            <ErrorMessage name="email">
              {(message) => (
                <div className="reg-form__row reg-form__error-message">
                  {message}
                </div>
              )}
            </ErrorMessage>

            {/* Password Field */}
            <div className="reg-form__row">
              <Field
                name="password"
                validate={validatePassword}
              >
                {({ field }) => (
                  <Input
                    className="reg-form__input"
                    label="Password *"
                    type="password"
                    variant="outlined"
                    error={Boolean(touched[field.name] && errors[field.name])}
                    {...field}
                  />
                )}
              </Field>
            </div>
            <ErrorMessage name="password">
              {(message) => (
                <div className="reg-form__row reg-form__error-message">
                  {message}
                </div>
              )}
            </ErrorMessage>
            
            {/* Submit Button */}
            <div className="reg-form__row">
              <Button
                className="reg-form__input"
                type="submit"
                size="large"
                variant="contained"
                color="primary"
              >
                {
                  isSubmitting
                    ? (
                      <CircularProgress style={{ color: 'white' }} />
                    )
                    : (
                      'Submit'
                    )
                }
              </Button>
            </div>

            {/* Current State */}
            <div className="reg-form__row">
              <pre className="reg-form__state">
                {JSON.stringify(values, null, 2)}
              </pre>
            </div>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default RegistrationForm;
