import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import BlockCheck from "./contracts/BlockCheck.json";
import getWeb3 from "./getWeb3";
import { useState, useEffect } from "react";

// components
import Navbar from "./components/Navbar";
import Greeting from "./components/Greeting";
import FormStudent from "./components/FormStudent";
import FormEvaluator from "./components/FormEvaluator";
import StudentPage from "./components/StudentPage";
import EvaluatorPage from "./components/EvaluatorPage";

// css
import "./App.css";

const App = () => {
  const [Web3States, setWeb3States] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contractInst: null,
  });


  const [components, setComponents] = useState({
    "nav-bar":true,
    "greeting":true,
    "form-student":false,
    "form-evaluator":true,
    "student-page":false,
    "evaluator-page":false
  });

  const resetComponents = () => {
    setComponents({
    "nav-bar":false,
    "greeting":false,
    "form-student":false,
    "form-evaluator":false,
    "student-page":false,
    "evaluator-page":false
    });
  }

  // Callback START
  const EvaluatorSignUp = () => {
    resetComponents();
    setComponents({
      "nav-bar":true,
      "greeting":true,
      "form-evaluator":true
    })
  }
  const StudentSignUp = () => {
    resetComponents();
    setComponents({
      "nav-bar":true,
      "greeting":true,
      "form-student":true
    });
  }

  const StudentPageCB = () => {
    resetComponents();
    setComponents({
      "nav-bar":true,
      "student-page":true
    });
  }
  const EvaluatorPageCB = () => {
    resetComponents();
    setComponents({
      "nav-bar":true,
      "evaluator-page":true
    });
  }

  // Callback END

  const getAndSetWeb3 = async () => {
    try {
      const w3 = await getWeb3(); // Get network provider and web3 instance.
      const acc = await w3.eth.getAccounts(); // Use web3 to get the user's accounts.
      const networkId = await w3.eth.net.getId(); // Get the contract instance.
      const deployedNetwork = BlockCheck.networks[networkId];
      const instance = new w3.eth.Contract(
        BlockCheck.abi,
        deployedNetwork && deployedNetwork.address
      );

      // await instance.methods.set(5).send({ from: acc[0] });
      // const response = await instance.methods.get().call();
      // console.log("response", response);
      // setWeb3States({web3:w3, accounts:acc, contractInst:instance, storageValue:response});
      setWeb3States({ web3: w3, accounts: acc, contractInst: instance });
    } catch (error) {
      alert(
        "Failed to load web3, accounts, or contract. Check console for details."
      );
      console.error(error);
    }
  };

  useEffect(() => {
    getAndSetWeb3();
  }, []);

  // if (!Web3States.web3) {
  //   return <div>Loading Web3, accounts, and contract...</div>;
  // }
  return (
    <div className="container px-6 mx-auto">
      {components["nav-bar"] && <Navbar callback_evaluator_signup={EvaluatorSignUp}
                                        callback_student_signup={StudentSignUp} />}

      <div class="flex flex-col items-center py-6 lg:h-[32rem] lg:flex-row">
        {components["greeting"] && <Greeting /> }
        {components["form-student"] && <FormStudent Web3States={Web3States}
                                                    callback_student_page={StudentPageCB}/> }
        {components["form-evaluator"] && <FormEvaluator Web3States={Web3States}
                                                        callback_evaluator_page={EvaluatorPageCB}/> }
        {components["student-page"] && <StudentPage Web3States={Web3States}/> }
        {components["evaluator-page"] && <EvaluatorPage Web3States={Web3States}/> }
        
      </div>
    </div>
  );
};

export default App;
