import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import { useField } from 'formik';
import mitt from 'next/dist/next-server/lib/mitt';
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
  const [field, {error}] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder} />
      { error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
    </FormControl>
  );
}