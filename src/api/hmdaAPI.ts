// Axios
import axios, { AxiosPromise } from 'axios';

type Result = {
  [key: string]: number;
};

type Data = {
  readonly computing: boolean | null;
  readonly dataset: string;
  readonly dimensions: string | null;
  readonly errors: {};
  readonly page: number;
  readonly query: {
    readonly group: string | null;
    readonly limit: number;
    readonly offset: number;
    readonly orderBy: string;
    readonly select: string;
    readonly where: string | null;
  };
  readonly results: Result[];
  readonly size: number;
  readonly slice: string;
  readonly total: number;
  readonly _links: readonly [
    {
      readonly href: string;
      readonly rel: string;
    }
  ];
};

const calculateSum = (applicants: Result[], field: string): number =>
  applicants.reduce((accumulator, currentValue) => ({
    [field]: accumulator[field] + currentValue[field],
  }))[field];

const calculateMedian = (applicants: Result[], field: string): number => {
  const values = applicants.map((applicant) => applicant[field]);

  values.sort((a: number, b: number) => a - b);
  const half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  }

  return (values[half - 1] + values[half]) / 2;
};

const aggregateData: (data: string) => {} = (data: string) => {
  const parsedData: Data = JSON.parse(data);

  const resultsYear = parsedData.results[0].as_of_year;
  const stateName = parsedData.results[0].state_name;
  const countyName = parsedData.results[0].county_name;
  const homebuyersAverageIncome = Math.floor(
    Math.floor(
      calculateSum(parsedData.results, 'applicant_income_000s') /
        parsedData.results.length
    ) * 1000
  );
  const homebuyersMedianIncome =
    calculateMedian(parsedData.results, 'applicant_income_000s') * 1000;
  const medianIncome = parsedData.results[0].hud_median_family_income;
  const medianLoanAmount =
    calculateMedian(parsedData.results, 'loan_amount_000s') * 1000;
  const averageLoanAmount =
    Math.floor(
      calculateSum(parsedData.results, 'loan_amount_000s') /
        parsedData.results.length
    ) * 1000;
  const incomeToLoanAmount = medianIncome / medianLoanAmount;
  const homebuyerIncomeToLoanAmount = homebuyersMedianIncome / medianLoanAmount;

  return {
    ...parsedData,
    results: {
      stateName,
      countyName,
      homebuyersAverageIncome,
      homebuyersMedianIncome,
      medianIncome,
      medianLoanAmount,
      averageLoanAmount,
      incomeToLoanAmount,
      homebuyerIncomeToLoanAmount,
      transactions: parsedData.results.length,
      resultsYear,
    },
  };
};

const hmdaInstance = axios.create({
  baseURL: 'https://api.consumerfinance.gov:443/data/hmda/slice',
  timeout: 60000,
  transformResponse: [aggregateData],
});

const requestMetrics = (
  stateCode: number,
  countyCode: number,
  year: number
): AxiosPromise =>
  hmdaInstance.get(
    `/hmda_lar.json?$select=as_of_year%2C+state_name%2C+county_name%2C+hud_median_family_income%2C+applicant_income_000s%2C+loan_amount_000s&$where=state_code%3D${stateCode}+AND+county_code%3D${countyCode}+AND+as_of_year%3D${year}+AND+hud_median_family_income+IS+NOT+NULL+AND+loan_amount_000s+IS+NOT+NULL+AND+applicant_income_000s+IS+NOT+NULL+AND+loan_purpose%3D1+AND+lien_status%3D1+AND+action_taken%3D1+AND+owner_occupancy%3D1&$limit=1000&$offset=0`
  );

export default requestMetrics;
