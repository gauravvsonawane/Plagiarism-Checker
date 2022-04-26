import React from "react";

function FormStudent(props) {

  let mis="";
  let email="";
  
  const authenticateStudent = async (e) => {
    e.preventDefault();
    const authenticated = await props.Web3States.contractInst.methods.authenticateStudent(props.Web3States.accounts[0]).call();
    if(authenticated) {
      props.callback_student_page();
    }
    else {
      alert("User not registered!");
    }
  }

  const setMis = (_mis) => {
    mis = _mis;
  }

  const setEmail = (_email) => {
    email = _email;
  }

  const inputMis = (e) =>{
    var _mis = e.target.value;
    setMis(_mis);
  }

  const inputEmail = (e) =>{
    var _email = e.target.value;
    setEmail(_email);
  }

  const signup = async () => {
    try {
      await props.Web3States.contractInst.methods.addStudent(mis, email, props.Web3States.accounts[0])
        .send({ from: props.Web3States.accounts[0] });
    }
    catch (error) {
      alert(error.message);
      return false;
    }
    const state = await props.Web3States.contractInst.methods.getAddStudentState().call();
    if(state==1) {
      alert("Student added successfully!");
    }
    else if(state==2) {
      alert("Student already exists!");
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

          <form>
            <div class="mt-4">
              <input
                class="block w-full px-4 py-2 text-gray-300 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring"
                type="text"
                placeholder="MIS Number"
                aria-label="MIS Number"
                onChange={inputMis}
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
                onClick={authenticateStudent}
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

export default FormStudent;
