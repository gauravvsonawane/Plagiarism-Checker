import React from 'react';

function StudentPage() {
  return (
    <section class="w-full max-w-2xl px-6 py-4 mx-auto mt-12 bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Submission</h2>
    <p class="mt-3 text-center text-gray-600 dark:text-gray-400">Paste your work here! This submission will be considered for plagiarism.</p>
    
    
    <div class="mt-6 ">

        <div class="w-full mt-4">
            <textarea class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
        </div>

        <div class="flex justify-center mt-6">
            <button class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
        </div>
    </div>
</section>
  )
}

export default StudentPage;