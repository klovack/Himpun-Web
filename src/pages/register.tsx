import { SimpleGrid, Button, Flex, Box } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

interface registerProps {
  
}

const MUTATION_REGISTER = `
mutation Register($username: String!, $password: String!, $firstname: String!, $lastname:String!){
  register(
    credentials: {
      username: $username
      password: $password
    }
    options: {
      firstname: $firstname
      lastname: $lastname
    }
  ) {
    errors {
      field
      message
    }
    user {
      id
      username
      firstname
      lastname
    }
  }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(MUTATION_REGISTER);
  
  return (
    <Wrapper
      size="small">
      <Formik
        initialValues={{ username: "", password: "", firstname: "", lastname: ""}}
        onSubmit={(values) => register(values) }
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