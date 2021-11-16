import { ErrorItem, ErrorResponse } from "../../types/api";

const ErrorAlert = (errorItemProps: ErrorItem) => {
  return (
    <div className="error-alert">
      <p>{errorItemProps.message}</p>
      <p>{errorItemProps.field}</p>
    </div>
  )
}

const ErrorAlerts = ({ errors }: ErrorResponse) => {
  return (
    <div className="alert alert-danger my-4">
      <h4>Whoops....</h4>

      <ul>
        {errors.map((e: ErrorItem) => <li key={`error-${Date.now().toString()}`}><ErrorAlert {...e} /></li>)}
      </ul>
    </div>
  )
}

export default ErrorAlerts;