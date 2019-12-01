import axios from 'axios';

const hmdaInstance = axios.create({
  baseURL: 'https://api.consumerfinance.gov:443/data/hmda/slice',
  timeout: 20000
});

export const requestMetrics = (stateCode: number, countyCode: number) =>
  hmdaInstance.get(
    `/hmda_lar.json?$select=state_code%2C+county_code%2C+county_name%2C+state_abbr%2C+hud_median_family_income%2C+applicant_income_000s%2C+tract_to_msamd_income&$where=state_code%3D${stateCode}+AND+county_code%3D${countyCode}&$limit=187462446&$offset=0`
  );

export default hmdaInstance;
