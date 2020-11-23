import { Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import React from 'react';
import 'react-quill/dist/quill.bubble.css';
import { InputField } from '../components/InputField';
import { Navbar } from '../components/Navbar';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { isServer } from '../util/isServer';
import { createUrqlClient } from '../util/urqlClient';
import { useIsAuth } from '../util/useIsAuth';
import { CreatePostSchema } from '../util/validate';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


interface CreatePostProps {

}

const POST_LOCAL_STORAGE_NAME = "unsentPost";

const CreatePost: React.FC<CreatePostProps> = ({ }) => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();

  useIsAuth("create-post");

  let defaultValue = {
    postBody: "",
    postTitle: ""
  };

  if (!isServer()) {
    const unsentPostString = localStorage.getItem(POST_LOCAL_STORAGE_NAME);
    if (!!unsentPostString) {
      const unsentPost = JSON.parse(unsentPostString);
      defaultValue = {
        postBody: unsentPost?.postBody ? unsentPost?.postBody : "",
        postTitle: unsentPost?.postTitle ? unsentPost?.postTitle : "",
      };
    }
  }

  const handlePostRequest = async (values: {
    postBody: string,
    postTitle: string,
  }, isPublished: boolean = false) => {
    localStorage.setItem(POST_LOCAL_STORAGE_NAME, JSON.stringify(values));
    const res = await createPost({
      data: {
        title: values.postTitle,
        body: values.postBody,
        isPublished,
      }
    });

    const { error } = res;

    if (!error) {
      localStorage.removeItem(POST_LOCAL_STORAGE_NAME);
      router.push("/");
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <Wrapper
        size="regular"
        className="create-post"
      >
        <Formik
          initialValues={{ postBody: defaultValue.postBody, postTitle: defaultValue.postTitle, }}
          validationSchema={CreatePostSchema}
          onSubmit={(values) => handlePostRequest(values, true)}
        >
          {({ setFieldValue, values, isSubmitting, errors }) => (
            <Form className="create-post__form">
              <div className="create-post__action">
                <Button
                  variant="ghost"
                  variantColor="red"
                  type="button"
                  loadingText="Saving"
                  onClick={() => handlePostRequest({
                    postBody: values.postBody,
                    postTitle: values.postTitle,
                  })}
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
                  placeholder={errors.postBody ? errors.postBody : "Write your story..."}
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
