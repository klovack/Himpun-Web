import { Flex, Button, Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import { InputField } from '../components/InputField';
import { Navbar } from '../components/Navbar';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../util/urqlClient';
import { EmailSchema } from '../util/validate';
import { useForgotPasswordMutation } from '../generated/graphql';
import { useIsAuth } from '../util/useIsAuth';

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  useIsAuth('', true);
  
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const [isSent, setIsSent] = useState(false); 
  const [, forgotPassword] = useForgotPasswordMutation();  

  return (
    <>
      <Navbar></Navbar>
      <Wrapper
        size="small">
        <Formik
          initialValues={{ email: "", }}
          validationSchema={EmailSchema}
          onSubmit={async (values, {setErrors}) => {
            const response = await forgotPassword(values);
            
            // Check if the password has been successfully changed
            // and if it isn't throw the error through the chakra error.
            // otherwise move user to the homepage
            if (!response.data?.forgotPassword) {
              setErrors({
                email: 'Whether the email is invalid or the email is not in our database'
              });
            } else {
              setIsSent(true);
            }
          }}
        >
          {({ isSubmitting }) => (
            isSent ? 
            <Wrapper
                padding="small"
                noMaxWidth
              >
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon size="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Email Sent!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Check your email to reset your password. Also don't forget to check your spam folder.
                </AlertDescription>
              </Alert>

              <Button
                mt={4}
                mr={4}
                variant="ghost"
                variantColor="red"
                onClick={goBack}
                type="button"
                textAlign="center"
                loadingText="Going Back"
              >
                Back
              </Button>
            </Wrapper>
              :
            <Form>
              <Wrapper
                padding="small"
                noMaxWidth
              >
                <InputField
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="user@himpun.com"
                >
                </InputField>
              </Wrapper>

              <Flex align="baseline" justify="flex-end">
                <Button
                  mt={4}
                  mr={4}
                  variant="ghost"
                  variantColor="red"
                  onClick={goBack}
                  type="button"
                  loadingText="Going Back"
                >
                  Back
                </Button>

                <Button
                  mt={4}
                  variantColor="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  loadingText="Sending Email"
                >
                  Request to Change Password
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);