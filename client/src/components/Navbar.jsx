
import React from 'react'

const Navbar = (props) => {

    const onEvalClick = () => {
        props.callback_evaluator_signup();
    }
    const onStudentClick = () => {
        props.callback_student_signup();
    }
    return (
        <nav class="flex flex-col py-2 sm:flex-row sm:justify-between sm:items-center">
            <div>
                <a href="/" class="text-2xl font-semibold text-white hover:text-gray-300">BlockCheck</a>
            </div>

            <div class="flex items-center mt-2 -mx-2 sm:mt-0">
                <button class="px-3 py-1 text-sm font-semibold text-white transition-colors duration-200 transform border-2 rounded-md hover:bg-gray-700" onClick={onEvalClick}>Evaluator's Sign In</button>
                <button class="px-3 py-1 text-sm font-semibold text-white transition-colors duration-200 transform border-2 rounded-md hover:bg-gray-700 ml-5" onClick={onStudentClick}>Student's Sign In</button>
            </div>
        </nav>
    )
}

export default Navbar;
