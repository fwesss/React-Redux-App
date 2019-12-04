/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// React
import React, { FC } from 'react';
// UI
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Title from '../../app/components/Title';
import Query from '../query/Query';

const Info: FC = () => {
  const {
    fetching,
    metrics: {
      resultsYear,
      transactions,
      stateName,
      countyName,
      medianIncome,
      homebuyersMedianIncome,
      medianLoanAmount,
      incomeToLoanAmount,
      homebuyerIncomeToLoanAmount
    }
  } = useSelector((state: RootState) => state.getMetrics);

  return (
    <Box w="20%" pt="10rem" px="2rem" css={fetching && { display: 'none' }}>
      <Title>{stateName}</Title>
      <Heading>{countyName}</Heading>
      <Text>{resultsYear}</Text>
      <List>
        <ListItem>{`Loans Closed: ${transactions}`}</ListItem>
        <ListItem>{`Median Income: $${medianIncome.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</ListItem>
        <ListItem>{`Median Income of Homebuyers: $${homebuyersMedianIncome
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</ListItem>
        <ListItem>{`Median Loan Amount: $${medianLoanAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</ListItem>
        <ListItem>{`Home Buyer Income To Loan Amount Ratio: ${Math.trunc(
          Math.round(homebuyerIncomeToLoanAmount * 100)
        )}%`}</ListItem>
        <ListItem>{`Resident Income To Loan Amount Ratio: ${Math.trunc(
          Math.round(incomeToLoanAmount * 100)
        )}%`}</ListItem>
      </List>
      <Query />
    </Box>
  );
};

export default Info;
