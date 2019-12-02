import React, { FC } from 'react';
import { Box, Heading, List, ListItem } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Title from '../../app/components/Title';

const Info: FC = () => {
  const {
    metrics: {
      transactions,
      stateName,
      countyName,
      medianIncome,
      homebuyersMedianIncome,
      medianLoanAmount,
      incomeToLoanAmount
    }
  } = useSelector((state: RootState) => state.getMetrics);

  return (
    <Box w="20%">
      <Title>{stateName}</Title>
      <Heading>{countyName}</Heading>
      <List>
        <ListItem>{`Loans Closed: ${transactions}`}</ListItem>
        <ListItem>{`Median Income: $${medianIncome}`}</ListItem>
        <ListItem>{`Median Income of Homebuyers: $${homebuyersMedianIncome}`}</ListItem>
        <ListItem>{`Median Loan Amount: $${medianLoanAmount}`}</ListItem>
        <ListItem>{`Income To Loan Amount Ratio: ${incomeToLoanAmount}`}</ListItem>
      </List>
    </Box>
  );
};

export default Info;
