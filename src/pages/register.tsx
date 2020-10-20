import { SimpleGrid, Button, Flex, Box } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import { useRouter } from 'next/router';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { mapError } from '../util/mapError';
import { RegisterSchema } from '../util/validate';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  
  return (
    <Wrapper
      size="small">
      <Formik
        initialValues={{ username: "", password: "", firstname: "", lastname: ""}}
        validationSchema={RegisterSchema}
        onSubmit={async (values, {setErrors}) => {
          const response = await register(values);

          // Check the credentials validity
          // and if it isn't valid throw the error through the chakra error.
          // otherwise move user to the homepage
          if (response.data?.register.errors) {
            setErrors(mapError(response.data.register.errors));
          } else if (response.data?.register.user) {
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

            <Wrapper
              padding="small"
              noMaxWidth
            >
              <SimpleGrid columns={2} spacing={10}>
                <InputField
                  name="firstname"
                  label="Firstname"
                  placeholder="Alex"
                >
                </InputField>

                <InputField
                  name="lastname"
                  label="Lastname"
                  placeholder="Alexander"
                >
                </InputField>
              </SimpleGrid>
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
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Register;