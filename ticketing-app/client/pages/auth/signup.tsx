import { SyntheticEvent, useState } from "react";
import { UseRequestOptions } from "../../hooks/types/request";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

interface SignUpFormFields extends HTMLFormControlsCollection {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

const SignUpForm = () => {
  const { makeRequest, errors } = useRequest();

  const handleSuccess = (data: any) => {
    Router.push("/");
  }

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as SignUpFormFields;
    const opts: UseRequestOptions = {
      url: 'http://localhost:8080/api/users/signup',
      method: 'post',
      body: {
        email: formElements.email.value,
        password: formElements.password.value
      },
      onSuccess: handleSuccess
    };

    makeRequest(opts);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <form className="SignUpForm" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" />
            </div>

            <div className="form-group">
              {errors}
              <input type="submit" className="form-control btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;