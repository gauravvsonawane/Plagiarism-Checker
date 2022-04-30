import React, {useState} from 'react';

const EvaluatorPage = (props) => {
    const[mis, setMis] = useState("");
    let plagiarismScore = "0";
    // const setMis = (_mis) => {
    //     mis = _mis;
    // }
    const setScore = (score) => {
        mis = score;
    }

    const inputMIS = (e) => {
        setMis(e.target.value);
    }

    const LCS = (s1, s2) => {
        console.log("s1: >"+s1);
        console.log("s2: >"+s2);
        let m = s1.length;
        let n = s2.length;

        let dp = Array.from(Array(m+1), () => new Array(n+1));
        for(let i=0;i<=m;i++) {
            dp[i][0] = 0;
        }

        for(let i=0;i<=n;i++) {
            dp[0][i] = 0;
        }

        for(let i=1;i<=m;i++) {
            for(let j=1;j<=n;j++) {

                if(s1[i-1] == s2[j-1]) {
                    dp[i][j] = 1+dp[i-1][j-1];
                }
                else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }

        let i = m, j=n;
        let commonString = "";
        while(i>0 && j>0) {
            if(s1[i-1] == s2[j-1]) {
                commonString = s1[i-1] + commonString;
                i--; j--;
            }
            else {
                if(dp[i-1][j]>dp[i][j-1]) i--;
                else j--;
            }
        }
        console.log("commonString "+commonString);
        
        let percent  = (commonString.length/s1.length)*100;
        

        return percent;

    }

    const auxFetchScore = (arrays, mis) => {

        let maxScore = -1;
        let currentSubmission = "";
        for(let i=0;i<arrays[0].length;i++) {
            if(arrays[0][i]==mis) {
                currentSubmission = arrays[1][i].toString();
                break;
            }
        }
        for(let i=0;i<arrays[1].length;i++) {
            if(arrays[0][i]!=mis)
                maxScore = Math.max(maxScore,LCS(currentSubmission, arrays[1][i]));
        }

        return maxScore;

    }

    const fetchScore = async(e) => {
        e.preventDefault();
        const arrays = await props.Web3States.contractInst.methods.getAllSubmissions().call();
        console.log(arrays);

        console.log("plagiarism "+auxFetchScore(arrays, mis));
    }

    return (

        <section class="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
            <div class="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
                <form>
                    <div class="flex flex-col p-1 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                        <input class="px-6 py-2 text-gray-300 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="mis" placeholder="Enter MIS number" aria-label="Enter MIS number" onChange={inputMIS} />

                        <button class="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none" onClick={fetchScore}>Fetch Score</button>
                    </div>
                </form>
            </div>

            <div class="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
                <div class="px-6 py-6 md:px-8 md:py-0">
                    <h2 class="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">MIS Number: <span class="text-blue-600 dark:text-blue-400 md:text-blue-300">{mis}</span></h2>
                    <p class="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Plagiarism Score: <span class="text-blue-600 dark:text-blue-400 md:text-red-400">{plagiarismScore}</span></p>

                    {/* <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Plagiarism Score of this student is too high, marks deductible : {90}</p> */}
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Original work appears to have been submitted by this student. </p>
                </div>
            </div>
        </section>
    );
}

export default EvaluatorPage;




