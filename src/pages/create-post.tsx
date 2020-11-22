import React from 'react';
import { withUrqlClient } from 'next-urql';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

import { createUrqlClient } from '../util/urqlClient';
import { Navbar } from '../components/Navbar';
import { Wrapper } from '../components/Wrapper';
import { Formik } from 'formik';
import { InputField } from '../components/InputField';

interface CreatePostProps {
  
}

const CreatePost: React.FC<CreatePostProps> = ({}) => {

  return (
    <>
      <Navbar></Navbar>
      
      <Wrapper
        size="regular"
      >
        <Formik
          initialValues={{ postBody: "", password: "", }}
          // validationSchema={LoginSchema}
          onSubmit={async (values, {setErrors}) => {
            // const response = await login({credentials: values });
            // console.log(response.data);
            // Check the credentials validity
            // and if it isn't valid throw the error through the chakra error.
            // otherwise move user to the homepage
            // if (response.data?.login.errors) {
            //   setErrors(mapError(response.data.login.errors, { username: "usernameOrEmail", email: "usernameOrEmail"}));
            // } else if (response.data?.login.user) {
            //   router.push("/");
            // }
          }}
        >
          {({ setFieldValue, values }) => (
            <>
              <InputField
                name="postTitle"
                placeholder="Title of the post"
                className="create-post__title"
              />
              
              <ReactQuill
                placeholder="Write your story"
                className="create-post__body"
                id="postBody"
                theme="bubble"
                value={values.postBody}
                onChange={(v) => setFieldValue('postBody', v)}
              />
            </>
          )}
        </Formik>
      </Wrapper>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(CreatePost);
