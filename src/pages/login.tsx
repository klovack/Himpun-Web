import { Button, Flex, Box, Link } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { mapError } from '../util/mapError';
import { LoginSchema } from '../util/validate';
import { Navbar } from '../components/Navbar';
import { createUrqlClient } from '../util/urqlClient';
import { strconv } from '../util/strconv';

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
          initialValues={{ usernameOrEmail: "", password: "", }}
          validationSchema={LoginSchema}
          onSubmit={async (values, {setErrors}) => {
            const response = await login({credentials: values });
            console.log(response.data);
            // Check the credentials validity
            // and if it isn't valid throw the error through the chakra error.
            // otherwise move user to the homepage
            if (response.data?.login.errors) {
              setErrors(mapError(response.data.login.errors, { username: "usernameOrEmail", email: "usernameOrEmail"}));
            } else if (response.data?.login.user) {
              if (typeof router.query.redirect === "string") {
                router.push("/" + strconv.camelCaseToHyphens(router.query.redirect));
              } else {
                router.push("/");
              }
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
                  name= "usernameOrEmail"
                  label="Username/Email"
                  placeholder="username or email"
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

              <Flex wrap="wrap" align="baseline" justify="flex-end">
                <Box mr={4}>
                  <NextLink href="/forgot-password">
                    <Link color="blue.300">Forgot Password?</Link>
                  </NextLink>
                </Box>
                <Button
                  mt={4}
                  variantColor="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  loadingText="Logging In"
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