import { Box } from '@chakra-ui/core';
import React from 'react'

interface wrapperProps {
  size?: "extra-small" | "small" | "regular" | "large";
  padding?: "small" | "regular" | "large";
  noMaxWidth?: boolean;
}

export const Wrapper: React.FC<wrapperProps> = ({
  children,
  size="regular", 
  padding = "regular",
  noMaxWidth,
}) => {
  let actualSize = calculateSize({size});
  let actualPadding = calculatePadding({padding});
  
  return (
    <Box 
      paddingTop={actualPadding}
      paddingBottom={actualPadding}
      mx="auto" 
      maxW={noMaxWidth ? "100%" : actualSize}
      w="100%">
      {children}
    </Box>
  );
}

function calculatePadding({padding}: wrapperProps): number {
  let result = 10;
  switch (padding) {
    case "large":
      result = 20;
      break;

    case "small":
      result = 5;
      break;
  }
  return result;
}

function calculateSize({size}: wrapperProps): string {
  let result = "800px";
  switch (size) {
    case "large":
      result = "1200px"
      break;

    case "small":
      result = "600px"
      break;

    case "extra-small":
      result = "400px"
      break;
  }
  return result;
}