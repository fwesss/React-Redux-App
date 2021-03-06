// React
import React, { FC } from 'react';
// UI
import { Heading } from '@chakra-ui/core';

const Title: FC = ({ children }) => (
  <Heading as="h1" fontFamily="Gudea" fontWeight={700}>
    {children}
  </Heading>
);

export default Title;
