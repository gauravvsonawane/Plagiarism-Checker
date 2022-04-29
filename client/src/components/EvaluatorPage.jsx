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
        console.log(mis);
    }

    const LCS = (s1, s2) => {
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
        console.log(commonString);
        console.log(commonString.length);
        
        let percent  = (commonString.length/s1.length)*100;
        

        return percent;

    }

    const fetchScore = async(e) => {
        e.preventDefault();
        console.log(mis);
        const arrays = await props.Web3States.contractInst.methods.getAllSubmissions().call();
        console.log(arrays);

        console.log(LCS("// Name : Gaurav Valmik Sonawane // MIS No. : 111915036 /* #include <stdio.h> #include <stdlib.h> #include <GL/glut.h> #include <math.h> #define PI 3.1415927 GLfloat T=0; void spin() { T=T+0.05; if(T>360){ T=0; } glutPostRedisplay(); } void draw_cylinder(GLfloat radius,GLfloat height,GLubyte R,GLubyte G,GLubyte B) { GLfloat x = 0.0; GLfloat y = 0.0; GLfloat angle = 0.0; GLfloat angle_stepsize = 0.1; glColor3ub(R-40,0,B-100); glBegin(GL_QUAD_STRIP); angle = 0.0; while( angle < 2*PI ) { x = radius * cos(angle); y = radius * sin(angle); glVertex3f(x, y , height); glVertex3f(x, y , 0.0); angle = angle + angle_stepsize; } glVertex3f(radius, 0.0, height); glVertex3f(radius, 0.0, 0.0); glEnd(); glColor3ub(R-200,G,B); glBegin(GL_POLYGON); angle = 0.0; while( angle < 2*PI ) { x = radius * cos(angle); y = radius * sin(angle); glVertex3f(x, y , height); angle = angle + angle_stepsize; } glVertex3f(radius, 0.0, height); glEnd(); } void display(void) { glClear(GL_COLOR_BUFFER_BIT); glLoadIdentity(); glTranslatef(0.0,-0.4,-3.0); glRotatef(T, 1.0, 1.0, 0.0); draw_cylinder(0.3, 1.0, 255, 160, 100); glFlush(); } void reshape(int width, int height) { if (width == 0 || height == 0) return; glMatrixMode(GL_PROJECTION); glLoadIdentity(); gluPerspective(40.0, (GLdouble)width/(GLdouble)height, 0.5, 20.0); glMatrixMode(GL_MODELVIEW); glViewport(0, 0, width, height); } int main(int argc, char **argv) { glutInit(&argc, argv); glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB); glutInitWindowSize(640,480); glutCreateWindow(Create Cylinder); glClearColor(0.0,0.0,0.0,0.0); glutDisplayFunc(display); glutIdleFunc(spin); glutReshapeFunc(reshape); glutMainLoop(); return 0; } */", "//Yatharth Kale //111915140 #include <stdio.h> #include <stdlib.h> #include <GL/glut.h> #include <math.h> #define PI 3.1415927 GLfloat T=0; void spin() { T=T+0.1; if(T>360){ T=0; } glutPostRedisplay(); } void draw_cylinder(GLfloat radius,GLfloat height,GLubyte R,GLubyte G,GLubyte B) { GLfloat x = 0.0; GLfloat y = 0.0; GLfloat angle = 0.0; GLfloat angle_stepsize = 0.1; glColor3ub(R-0,G-100,B-100); glBegin(GL_QUAD_STRIP); angle = 0.0; while( angle < 2*PI ) { x = radius * cos(angle); y = radius * sin(angle); glVertex3f(x, y , height); glVertex3f(x, y , 0.0); angle = angle + angle_stepsize; } glVertex3f(radius, 0.0, height); glVertex3f(radius, 0.0, 0.0); glEnd(); glColor3ub(R-200,G,B-100); glBegin(GL_POLYGON); angle = 0.0; while( angle < 2*PI ) { x = radius * cos(angle); y = radius * sin(angle); glVertex3f(x, y , height); angle = angle + angle_stepsize; } glVertex3f(radius, 0.0, height); glEnd(); } void display(void) { glClear(GL_COLOR_BUFFER_BIT); glLoadIdentity(); glTranslatef(0.0,-0.4,-3.0); glRotatef(T, 1.0, 4.0, 0.0); draw_cylinder(0.3, 1.0, 255, 160, 100); glFlush(); } void reshape(int width, int height) { if (width == 0 || height == 0) return; glMatrixMode(GL_PROJECTION); glLoadIdentity(); gluPerspective(40.0, (GLdouble)width/(GLdouble)height, 0.5, 20.0); glMatrixMode(GL_MODELVIEW); glViewport(0, 0, width, height); } int main(int argc, char **argv) { glutInit(&argc, argv); glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB); glutInitWindowSize(640,480); glutCreateWindow(Create Cylinder); glClearColor(0.0,0.0,0.0,0.0); glutDisplayFunc(display); glutIdleFunc(spin); glutReshapeFunc(reshape); glutMainLoop(); return 0; }"));
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




