import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { IncomingMessage } from 'http'

interface ApiOptions {
  req: IncomingMessage | undefined
}

const getApiClient = ({ req }: ApiOptions) => {
  if (typeof window === 'undefined') {
    const config: AxiosRequestConfig = {
      baseURL: 'http://ticketing-auth:8080',
      withCredentials: true
    };

    if (req?.headers) {
      config.headers = req.headers as AxiosRequestHeaders;
    }

    return axios.create(config);
  } else {
    const config: AxiosRequestConfig = {
      baseURL: 'http://localhost:8080',
      withCredentials: true
    };

    return axios.create(config);
  }
};

export default getApiClient;