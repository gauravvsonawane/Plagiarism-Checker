import React from "react";
import { useState } from "react";

function FormEvaluator(props) {

  let eid = "";
  let email = "";
  const setEid = (_eid) => {
    eid = _eid;
  }
  const setEmail = (_email) => {
    email = _email;
  }
  const on = () => {
    alert("hello");
  }
  const inputEID = (e) => {
    var _eid = e.target.value;
    setEid(_eid);
  }
  const inputEmail = (e) => {
    var _email = e.target.value;
    setEmail(_email);
  }

  const authenticateEvaluator = async (e) => {
    e.preventDefault();
    const authenticated = await props.Web3States.contractInst.methods.authenticateEvaluator(props.Web3States.accounts[0]).call();
    if(authenticated) {
      props.callback_evaluator_page();
    }
    else {
      alert("User not registered!");
    }
  }

  const signup = async (e) => {
    // e.preventDefault();
    try {
      await props.Web3States.contractInst.methods.addEvaluator(eid, email, props.Web3States.accounts[0])
        .send({ from: props.Web3States.accounts[0] });
    }
    catch (error) {
      alert(error.message);
      return false;
    }
    const state = await props.Web3States.contractInst.methods.getAddEvaluatorState().call();
    if(state==1) {
      alert("Evaluator added successfully!");
    }
    else if(state==2) {
      alert("Evaluator already exists!");
    }
    else {
      alert("##########");
    }
  }

  return (
    <div class="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
      <div class="max-w-sm bg-white rounded-lg dark:bg-gray-800">
        <div class="p-5 text-center">
          <h2 class="text-2xl font-semibold text-gray-700 dark:text-white fo">
            Registration
          </h2>

          <form >
            <div class="mt-4">
              <input
                class="block w-full px-4 py-2 text-gray-300 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring"
                type="text"
                placeholder="Employee Id"
                aria-label="Employee Id"
                onChange={inputEID}
              />
              <input
                class="block w-full px-4 py-2 mt-4 text-gray-300 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                onChange={inputEmail}
              />
            </div>

            <div class="flex items-center justify-between mt-4">
              <button
                class="text-sm text-gray-600 dark:text-gray-200 hover:underline"
                onClick={authenticateEvaluator}
              >
                Already registered?
              </button>
              <button class="px-4 py-2 font-semibold text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700"
                onClick={signup}>
                Sign up!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormEvaluator;
