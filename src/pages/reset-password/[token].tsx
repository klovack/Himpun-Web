import { Flex, Box, Button, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage, NextPageContext } from 'next';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';

import { InputField } from '../../components/InputField';
import { Navbar } from '../../components/Navbar';
import { Wrapper } from '../../components/Wrapper';
import { createUrqlClient } from '../../util/urqlClient';
import { ChangePasswordSchema } from '../../util/validate';
import { useTokenValidQuery, useChangePasswordMutation } from '../../generated/graphql';
import { mapError } from '../../util/mapError';

const ResetPassword: NextPage<{token: string}> = ({token}) => {
  // Handle routing when the token is invalid or expired
  const router = useRouter();
  const [{data, }] = useTokenValidQuery({
    variables: {
      token,
    },
  });
  useEffect(() => {
    if (!data?.tokenValid) {
      router.replace("/");
    }
  }, [token]);

  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  
  return (
    <>
      <Navbar></Navbar>
      <Wrapper
        size="small">
        <Formik
          initialValues={{ newPassword: "", }}
          validationSchema={ChangePasswordSchema}
          onSubmit={async (values, {setErrors}) => {
            const response = await changePassword({
              data: {
                newPassword: values.newPassword,
                token,
              },
            });
            
            console.log(response.data);
            // Check if the password has been successfully changed
            // and if it isn't throw the error through the chakra error.
            // otherwise move user to the homepage
            if (response.data?.changePassword.errors) {
              const errorMap = mapError(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              } 
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {!tokenError ? null : (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle textTransform="capitalize" mr={2}>{tokenError}</AlertTitle>
                  <AlertDescription>
                    <NextLink href="/forgot-password">
                      <Link>Here to request for another token</Link>
                    </NextLink>
                  </AlertDescription>
                  <CloseButton onClick={() => setTokenError('')} position="absolute" right="8px" top="8px" />
                </Alert>
              )}

              <Wrapper
                padding="small"
                noMaxWidth
              >
                <InputField
                  type="password"
                  name="newPassword"
                  label="New Password"
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
                  loadingText="Wait while we change your password"
                >
                  Change Password
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
}

ResetPassword.getInitialProps = (ctx: NextPageContext) => {
  return {
    token: ctx.query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ResetPassword);