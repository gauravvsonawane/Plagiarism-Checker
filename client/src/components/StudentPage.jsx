import React from 'react';

const StudentPage = (props) => {

  let assignment = "";
  const setAssignment = (e) => {
    console.log("hello");
    
    assignment = preProcess(e.target.value);
    console.log("hello");
  }
  const shedString = (string, separator) => {
    //we split the string and make it free of separator
    const separatedArray = string.split(separator);
    //we join the separatedArray with empty string
    const separatedString = separatedArray.join("");
    return separatedString;
 }
  const preProcess = (assignment) => {
    assignment = assignment.replace(/(\r\n|\n|\r)/gm, ""); // remove line breaks
    assignment = assignment.replace(/['"]+/g, ''); // remove "
    return assignment;
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      await props.Web3States.contractInst.methods.setSubmission(props.Web3States.accounts[0], assignment)
        .send({ from: props.Web3States.accounts[0] });
    }
    catch (error) {
      alert(error.message);
      return false;
    }
    const state = await props.Web3States.contractInst.methods.getSubmissionState().call();
    if(state==1) {
      alert("Assignment successfully submitted!");
    }
    else if(state==2) {
      alert("You have already submitted the assignment!");
    }
  }

  return (
    <section class="w-full max-w-2xl px-6 py-4 mx-auto mt-12 bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Submission</h2>
    <p class="mt-3 text-center text-gray-600 dark:text-gray-400">Paste your work here! This submission will be considered for plagiarism.</p>
    
    
    <div class="mt-6 ">

        <div class="w-full mt-4">
            <textarea class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        onChange={setAssignment}></textarea>
        </div>

        <div class="flex justify-center mt-6">
            <button class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    onClick={onSubmit}>Submit</button>
        </div>
    </div>
</section>
  )
}

export default StudentPage;