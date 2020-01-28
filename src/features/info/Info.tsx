/** @jsx jsx */
import { jsx } from '@emotion/core';
// React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
// UI
import { Box, Heading, List, ListItem } from '@chakra-ui/core';
// Redux
import { useSelector } from 'react-redux';
// Components
import Title from '../../app/components/Title';
import Query from '../query/Query';
// Types
import { RootState } from '../../app/rootReducer';

const Info: FC = () => {
  const {
    fetching,
    metrics: {
      resultsYear,
      stateName,
      countyName,
      medianIncome,
      homebuyersMedianIncome,
      medianLoanAmount,
      incomeToLoanAmount,
      homebuyerIncomeToLoanAmount,
    },
  } = useSelector((state: RootState) => state.getMetrics);

  return (
    <Box
      w="20%"
      pt="10rem"
      px="2rem"
      position="fixed"
      right={0}
      css={fetching && { display: 'none' }}
    >
      <Title>{stateName}</Title>
      <Heading fontFamily="heading">{countyName}</Heading>

      <List p={0} fontFamily="body">
        <ListItem p="0.25rem">{resultsYear}</ListItem>
        <ListItem p="0.25rem">{`Median Income: $${medianIncome
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</ListItem>
        <ListItem p="0.25rem">{`Median Income of Homebuyers: $${homebuyersMedianIncome
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</ListItem>
        <ListItem p="0.25rem">{`Median Loan Amount: $${medianLoanAmount
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</ListItem>
        <ListItem p="0.25rem">{`Home Buyer Income To Loan Amount Ratio: ${Math.trunc(
          Math.round(homebuyerIncomeToLoanAmount * 100)
        )}%`}</ListItem>
        <ListItem p="0.25rem">{`Resident Income To Loan Amount Ratio: ${Math.trunc(
          Math.round(incomeToLoanAmount * 100)
        )}%`}</ListItem>
      </List>
      <Query />
    </Box>
  );
};

export default Info;
