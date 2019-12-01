import React, { FC } from 'react';
import { Text } from '@chakra-ui/core';

const Title: FC = ({ children }) => (
  <Text as="h1" fontFamily="Gudea" fontWeight={700}>
    {children}
  </Text>
);

export default Title;
