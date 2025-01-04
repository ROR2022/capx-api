//import * as finnhub from 'finnhub';
import * as dotenv from 'dotenv';
import axios from 'axios';
//import e from 'express';

dotenv.config();

const { FINNHUB_APIKEY } = process.env;

const basicFinnhubUrl = 'https://finnhub.io/api/v1/';

/* const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = FINNHUB_APIKEY;
const finnhubClient = new finnhub.DefaultApi();

export const getDataByQuery = (query: string) => {
  console.log('getting data by query: ', query);
  console.log('finnhubClient: ', finnhubClient);
  return new Promise((resolve, reject) => {
    finnhubClient.symbolSearch(
      query,
      (error: any, data: any, response: any) => {
        console.log(data);
        if (error) {
          console.log(error);
          reject(error);
        }
        if (response) {
          console.log(response);
        }
        if (data) {
          console.log(data);
          resolve(data);
        }
      },
    );
  });
}; */

export const getDataByQuery = async (query: string) => {
  //console.log('getting data by query axios: ', query);
  const serviceEndpoint = '/search';
  try {
    const response = await axios.get(
      `${basicFinnhubUrl}${serviceEndpoint}?q=${query}&token=${FINNHUB_APIKEY}`,
    );
    //console.log('response axios: ', response);
    return response.data;
  } catch (error) {
    console.error('error getDataByQuery: ', error.response.data);
    return error;
  }
};

export const getCompanyProfileBySymbol = async (symbol: string) => {
  console.log('getting company profile by symbol axios: ', symbol);
  const serviceEndpoint = '/stock/profile2';
  try {
    const response: any = await axios.get(
      `${basicFinnhubUrl}${serviceEndpoint}?symbol=${symbol}&token=${FINNHUB_APIKEY}`,
    );
    //console.log('response axios: ', response);
    const { data, error } = response;
    if (data && !error) {
      return { ...data, symbol };
    } else {
      console.log('error getCompanyProfileBySymbol: ', error);
      return { error: 'No data found', symbol };
    }
    //return response.data;
  } catch (error) {
    console.log('error getCompanyProfileBySymbol: ', error.response.data);
    return { error: String(error), symbol };
  }
};

export const getStockPriceBySymbol = async (symbol: string) => {
  //console.log('getting stock price by symbol axios: ', symbol);
  const serviceEndpoint = '/quote';
  try {
    const response: any = await axios.get(
      `${basicFinnhubUrl}${serviceEndpoint}?symbol=${symbol}&token=${FINNHUB_APIKEY}`,
    );
    //console.log('response getStockPriceBySymbol: ', symbol, response.data);
    const { data, error } = response;
    if (data && !error) {
      return { ...data, symbol };
    } else {
      return { error: 'No data found', symbol };
    }
    //return response.data;
  } catch (error) {
    console.error('error getStockPriceBySymbol: ', error.response?.data);
    return { error: String(error), symbol };
  }
};
