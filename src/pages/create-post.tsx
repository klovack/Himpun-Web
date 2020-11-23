import React from 'react';
import { withUrqlClient } from 'next-urql';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

import { createUrqlClient } from '../util/urqlClient';
import { Navbar } from '../components/Navbar';
import { Wrapper } from '../components/Wrapper';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { Box, Button, Flex } from '@chakra-ui/core';

interface CreatePostProps {
  
}

const CreatePost: React.FC<CreatePostProps> = ({}) => {

  return (
    <>
      <Navbar></Navbar>
      
      <Wrapper
        size="regular"
        className="create-post"
      >
        <Formik          
          initialValues={{ postBody: "", postTitle: "", }}
          // validationSchema={LoginSchema}
          onSubmit={(values, {setErrors}) => {
            console.log(values);
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="create-post__form">
              <div className="create-post__action">
                <Button
                  variant="ghost"
                  variantColor="red"
                  type="button"
                  loadingText="Saving"
                >Save &amp; Close</Button>

                <Button
                  variantColor="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  loadingText="Publishing"
                >Publish</Button>
              </div>

              <div className="create-post__input">
                <InputField
                  type="text"
                  id="postTitle"
                  name="postTitle"
                  placeholder="Title of the post"
                  className="create-post__input__title"
                />
                
                <ReactQuill
                  placeholder="Write your story"
                  className="create-post__input__body"
                  id="postBody"
                  theme="bubble"
                  value={values.postBody}
                  onChange={(v) => {
                    setFieldValue('postBody', v);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(CreatePost);
