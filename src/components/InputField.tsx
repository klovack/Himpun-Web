import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label: string,
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, {error, touched}] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        variant="flushed"
        placeholder={props.placeholder} />
      { error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null }
    </FormControl>
  );
}