import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/core';
import { useField } from 'formik';
import React, { InputHTMLAttributes, useState } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label: string,
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  type,
  ...props
}) => {
  const [field, {error, touched}] = useField(props);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  let inputField;
  if (type && type === "password") {
    
    inputField = (
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          variant="flushed"
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
        <InputRightElement>
          <IconButton
            aria-label="Show password or Hide"
            onClick={handleClick}
            variant="ghost"
            icon={show ? "view" : "view-off"} />
        </InputRightElement>
      </InputGroup>
    );
  } else {
    inputField = (
      <Input
        type={type}
        {...field}
        {...props}
        id={field.name}
        variant="flushed"
        placeholder={props.placeholder} />
    );
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {inputField}
      { error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null }
    </FormControl>
  );
}