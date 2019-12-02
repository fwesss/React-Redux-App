import axios, { AxiosPromise } from 'axios';

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
  readonly results: any;
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

const calculateSum = (applicants: any, field: string) =>
  applicants.reduce((accumulator: any, currentValue: any) => ({
    [field]: accumulator[field] + currentValue[field]
  }))[field];

const calculateMedian = (applicants: any, field: string) => {
  const values = applicants.map((applicant: any) => applicant[field]);

  values.sort((a: number, b: number) => a - b);
  const half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  }

  return (values[half - 1] + values[half]) / 2;
};

const aggregateData = (data: string) => {
  const parsedData: Data = JSON.parse(data);

  const stateName = parsedData.results[0].state_name;
  const countyName = parsedData.results[0].county_name;
  const homebuyersAverageIncome = Math.floor(
    Math.floor(calculateSum(parsedData.results, 'applicant_income_000s') / parsedData.results.length) * 1000
  );
  const homebuyersMedianIncome = calculateMedian(parsedData.results, 'applicant_income_000s') * 1000;
  const medianIncome = parsedData.results[0].hud_median_family_income;
  const medianLoanAmount = calculateMedian(parsedData.results, 'loan_amount_000s') * 1000;
  const averageLoanAmount =
    Math.floor(calculateSum(parsedData.results, 'loan_amount_000s') / parsedData.results.length) * 1000;
  const incomeToLoanAmount = homebuyersMedianIncome / medianLoanAmount;

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
      transactions: parsedData.results.length
    }
  };
};

const hmdaInstance = axios.create({
  baseURL: 'https://api.consumerfinance.gov:443/data/hmda/slice',
  timeout: 60000,
  transformResponse: [aggregateData]
});

const requestMetrics = (stateCode: number, countyCode: number, year: number): AxiosPromise =>
  hmdaInstance.get(
    `https://api.consumerfinance.gov:443/data/hmda/slice/hmda_lar.json?$select=state_name%2C+county_name%2C+census_tract_number%2C+hud_median_family_income%2C+applicant_income_000s%2C+number_of_1_to_4_family_units%2C+number_of_owner_occupied_units%2C+minority_population%2C+population%2C+loan_amount_000s&$where=state_code%3D${stateCode}+AND+county_code%3D${countyCode}+AND+as_of_year%3D${year}+AND+hud_median_family_income+IS+NOT+NULL+AND+loan_amount_000s+IS+NOT+NULL+AND+applicant_income_000s+IS+NOT+NULL+AND+loan_purpose%3D1+AND+lien_status%3D1+AND+action_taken%3D1+AND+owner_occupancy%3D1&$limit=999999999&$offset=0`
  );

export default requestMetrics;
