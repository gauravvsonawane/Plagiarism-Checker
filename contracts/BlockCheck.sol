// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

struct Evaluator{
    string employee_id;
    string email;
    string wallet_address;
}

struct Student{
    string mis_number;
    string email;
    string wallet_address;
}

contract BlockCheck{
    Evaluator[] public Evaluators;
    Student[] public Students;
    mapping (string=>Evaluator) public mapWalletAddress2Evaluator;
    mapping (string=>Student) public mapWalletAddress2Student;
    mapping (string=>string) public mapMIS2Submission;


    // Assignment functions START
    function isAssignmentSubmitted(string memory _mis_number) public view returns(bool) {
        if(areStringsEqual(mapMIS2Submission[_mis_number], "")) {
            return false;
        }
        else {
            return true;
        }
        
    }
    string[] public MIS_arr;
    string[] public submission_arr;
    function getAllSubmissions() public view returns(string[] memory, string[] memory) {
        return (MIS_arr, submission_arr);
    }
    uint submissionState = 0;
    function setSubmission(string memory _wallet_address, string memory _submission) public {
        submissionState = 0;
        string memory _mis_number = getMIS(_wallet_address);
        if(!isAssignmentSubmitted(_mis_number)) {
            mapMIS2Submission[_mis_number] = _submission;
            MIS_arr.push(_mis_number);
            submission_arr.push(_submission);
            submissionState = 1;
        }
        else {
            submissionState = 2;
        }
    }
    function getSubmissionState() public view returns(uint) {
        return submissionState;
    }


    // Assignment functions END

    // Evaluator functions START
    uint public state_add_evaluator = 0; // 0:not added
    function getAddEvaluatorState() public view returns(uint) {
        return state_add_evaluator;
    }
    function addEvaluator(string memory _employee_id, string memory _email, string memory _wallet_address) public {
        state_add_evaluator = 0;
        Evaluator memory newEvaluator = Evaluator({
                    employee_id:_employee_id, 
                    email:_email,
                    wallet_address:_wallet_address
        });

        if(!isEvaluatorRegistered(newEvaluator)) {
                Evaluators.push(newEvaluator);
                mapWalletAddress2Evaluator[_wallet_address] = newEvaluator;
                state_add_evaluator = 1;
        }
        else {
            state_add_evaluator = 2;
        }
    }

    function isEvaluatorRegistered(Evaluator memory item) public view returns(bool) {
        if(!areStringsEqual(mapWalletAddress2Evaluator[item.wallet_address].employee_id,"")) return true;
        else return false;
    }

    function authenticateEvaluator(string memory _wallet_address) public view returns(bool) {
        if(!areStringsEqual(mapWalletAddress2Evaluator[_wallet_address].employee_id,"")) return true;
        else return false;
    }

    // Evaluator functions END

    // Student functions START
    
    uint public state_add_student = 0; // 0:not added
    function getAddStudentState() public view returns(uint) {
        return state_add_student;
    }
    function addStudent(string memory _mis_number, string memory _email, string memory _wallet_address) public {
        state_add_student = 0;
        Student memory newStudent = Student({
                    mis_number:_mis_number, 
                    email:_email,
                    wallet_address:_wallet_address
        });

        if(!isStudentRegistered(newStudent)) {
                Students.push(newStudent);
                mapWalletAddress2Student[_wallet_address] = newStudent;
                state_add_student = 1;
        }
        else {
            state_add_student = 2;
        }
    }

    function isStudentRegistered(Student memory item) public view returns(bool) {
        if(!areStringsEqual(mapWalletAddress2Student[item.wallet_address].mis_number,"")) return true;
        else return false;
    }

    function authenticateStudent(string memory _wallet_address) public view returns(bool) {
        if(!areStringsEqual(mapWalletAddress2Student[_wallet_address].mis_number,"")) return true;
        else return false;
    }

    function getMIS(string memory _wallet_address) public view returns(string memory) {
        return mapWalletAddress2Student[_wallet_address].mis_number;
    }

    // Student functions END



    // utility functions START
    function areStringsEqual(string memory S1, string memory S2) public pure returns(bool){
        return keccak256(bytes(S1)) == keccak256(bytes(S2));
    }
    // utility functions END
}