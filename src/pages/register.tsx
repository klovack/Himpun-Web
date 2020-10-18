import { FormControl, FormLabel, Input, FormErrorMessage, Box } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

interface registerProps {
  
}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper
      size="small">
      <Formik
        initialValues={{ username: "", password: ""}}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({values, handleChange}) => (
          <Form>
            <InputField
              name= "username"
              label="Username"
              placeholder="username"
            ></InputField>

            <Wrapper
              padding="small"
              noMaxWidth
            >
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="My Super Secret Password"
              >
              </InputField>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Register;