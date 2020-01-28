/** @jsx jsx */
// React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
// UI
import { jsx } from '@emotion/core';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Box,
} from '@chakra-ui/core';
// Redux
import { useSelector } from 'react-redux';
// Types
import { RootState } from '../rootReducer';

const LoadingSpinner: FC = () => {
  const { fetching } = useSelector((state: RootState) => state.getMetrics);

  return (
    <Box>
      <Modal isOpen={fetching} isCentered>
        <ModalOverlay />
        <ModalContent
          css={{ backgroundColor: 'transparent', boxShadow: 'none' }}
        >
          <Spinner size="xl" color="teal.400" css={{ alignSelf: 'center' }} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LoadingSpinner;
