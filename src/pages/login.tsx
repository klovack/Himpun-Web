import { Button, Flex, Box } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { mapError } from '../util/mapError';
import { LoginSchema } from '../util/validate';
import { Navbar } from '../components/Navbar';
import { createUrqlClient } from '../util/urqlClient';

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  
  return (
    <>
      <Navbar></Navbar>
      <Wrapper
        size="small">
        <Formik
          initialValues={{ username: "", password: "", }}
          validationSchema={LoginSchema}
          onSubmit={async (values, {setErrors}) => {
            const response = await login({credentials: values });

            // Check the credentials validity
            // and if it isn't valid throw the error through the chakra error.
            // otherwise move user to the homepage
            if (response.data?.login.errors) {
              setErrors(mapError(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Wrapper
                padding="small"
                noMaxWidth
              >
                <InputField
                  name= "username"
                  label="Username"
                  placeholder="username"
                ></InputField>
              </Wrapper>

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

              <Flex align="end" justify="space-between">
                <Box />
                <Button
                  mt={4}
                  variantColor="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  loadingText="Registering"
                >
                  Login
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(Login);