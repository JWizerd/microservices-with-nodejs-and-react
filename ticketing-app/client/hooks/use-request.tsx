import axios, { AxiosError } from "axios";
import { ReactElement, useState } from "react";
import ErrorAlerts from "../components/alerts/error";
import { ErrorResponse } from "../types/api";
import { UseRequestOptions } from "./types/request";

const useRequest = () => {
  const [errors, setErrors] = useState<ReactElement>();

  const makeRequest = async ({ url, method, body, onSuccess }: UseRequestOptions) => {
    try {
      const { data } = await axios[method](url, body);
      if (typeof onSuccess === "function") onSuccess(data);
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorMsgs = axiosError?.response?.data as ErrorResponse;
      setErrors(<ErrorAlerts errors={errorMsgs.errors} />)
    }
  }

  return { makeRequest, errors };
}

export default useRequest;