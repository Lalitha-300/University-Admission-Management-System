/* =================================================
   UNIVERSITY ADMISSION MANAGEMENT SYSTEM
   JAVASCRIPT
================================================= */


/* =================================================
   COURSE SEARCH
================================================= */

document.addEventListener("DOMContentLoaded", function () {


    // Find course search box

    const searchInput =
        document.getElementById("courseSearch");


    // Find course cards

    const courseCards =
        document.querySelectorAll(".course-card");


    // Find no-results message

    const noResults =
        document.getElementById("noResults");


    // Run this code only if
    // course search exists

    if (
        searchInput &&
        noResults &&
        courseCards.length > 0
    ) {


        // Search while typing

        searchInput.addEventListener(
            "input",
            function () {


                // Get search text

                const searchText =
                    searchInput.value
                    .trim()
                    .toLowerCase();


                // Matching course counter

                let matchingCourses = 0;


                // Check each course

                courseCards.forEach(
                    function (card) {


                        // Get course name

                        const courseName =
                            card
                            .getAttribute("data-course")
                            .toLowerCase();


                        // Check course match

                        if (
                            searchText === "" ||
                            courseName.includes(searchText)
                        ) {


                            // Show course

                            card.style.display = "";


                            // Increase count

                            matchingCourses++;


                        } else {


                            // Hide course

                            card.style.display = "none";

                        }

                    }
                );


                // Show no results message

                if (matchingCourses === 0) {

                    noResults.style.display = "block";

                } else {

                    noResults.style.display = "none";

                }

            }
        );

    }

});



/* =================================================
   ADMISSION FORM
================================================= */

document.addEventListener("DOMContentLoaded", function () {


    // Find admission form

    const admissionForm =
        document.getElementById("admissionForm");


    // If admission form does not exist,
    // stop this section

    if (!admissionForm) {

        return;

    }



    /* =============================================
       GET FORM ELEMENTS
    ============================================= */

    const courseSelect =
        document.getElementById("course");


    const checkEligibilityButton =
        document.getElementById("checkEligibility");


    const eligibilityResult =
        document.getElementById("eligibilityResult");


    const twelfthPercentage =
        document.getElementById("twelfthPercentage");


    const successMessage =
        document.getElementById("successMessage");



    /* =============================================
       ELIGIBILITY CHECK
    ============================================= */

    checkEligibilityButton.addEventListener(
        "click",
        function () {


            // Check whether course was selected

            if (courseSelect.value === "") {

                eligibilityResult.className =
                    "eligibility-result eligibility-failure";

                eligibilityResult.innerHTML =
                    "Please select a course first.";

                return;

            }


            // Get selected course option

            const selectedOption =
                courseSelect.options[
                    courseSelect.selectedIndex
                ];


            // Get required percentage

            const requiredPercentage =
                Number(
                    selectedOption
                    .getAttribute("data-eligibility")
                );


            // Get student's percentage

            const studentPercentage =
                Number(
                    twelfthPercentage.value
                );


            // Check whether percentage
            // has been entered

            if (
                twelfthPercentage.value === ""
            ) {

                eligibilityResult.className =
                    "eligibility-result eligibility-failure";

                eligibilityResult.innerHTML =
                    "Please enter your 12th / Intermediate percentage.";

                return;

            }


            // Check eligibility

            if (
                studentPercentage >=
                requiredPercentage
            ) {


                // Student is eligible

                eligibilityResult.className =
                    "eligibility-result eligibility-success";


                eligibilityResult.innerHTML =
                    "✓ You are eligible for " +
                    courseSelect.value +
                    ". Required percentage: " +
                    requiredPercentage +
                    "%. Your percentage: " +
                    studentPercentage +
                    "%.";


            } else {


                // Student is not eligible

                eligibilityResult.className =
                    "eligibility-result eligibility-failure";


                eligibilityResult.innerHTML =
                    "✗ You are not eligible for " +
                    courseSelect.value +
                    ". Required percentage: " +
                    requiredPercentage +
                    "%. Your percentage: " +
                    studentPercentage +
                    "%.";

            }

        }
    );



    /* =============================================
       FORM SUBMISSION
    ============================================= */

    admissionForm.addEventListener(
        "submit",
        function (event) {


            // Stop normal form submission

            event.preventDefault();



            /* =====================================
               GET FORM VALUES
            ===================================== */

            const fullName =
                document
                .getElementById("fullName")
                .value
                .trim();


            const email =
                document
                .getElementById("email")
                .value
                .trim();


            const phone =
                document
                .getElementById("phone")
                .value
                .trim();


            const dob =
                document
                .getElementById("dob")
                .value;


            const gender =
                document
                .getElementById("gender")
                .value;


            const address =
                document
                .getElementById("address")
                .value
                .trim();


            const tenthPercentage =
                document
                .getElementById("tenthPercentage")
                .value;


            const twelfthPercentageValue =
                document
                .getElementById("twelfthPercentage")
                .value;


            const entranceExam =
                document
                .getElementById("entranceExam")
                .value;


            const entranceScore =
                document
                .getElementById("entranceScore")
                .value;


            const course =
                document
                .getElementById("course")
                .value;


            const photo =
                document
                .getElementById("photo")
                .files[0];


            const certificate =
                document
                .getElementById("certificate")
                .files[0];


            const declaration =
                document
                .getElementById("declaration")
                .checked;



            /* =====================================
               BASIC VALIDATION
            ===================================== */


            // Check phone number

            if (
                !/^[0-9]{10}$/.test(phone)
            ) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }


            // Check percentages

            if (
                Number(tenthPercentage) < 0 ||
                Number(tenthPercentage) > 100 ||
                Number(twelfthPercentageValue) < 0 ||
                Number(twelfthPercentageValue) > 100
            ) {

                alert(
                    "Percentage must be between 0 and 100."
                );

                return;

            }


            // Check required files

            if (!photo || !certificate) {

                alert(
                    "Please upload the required documents."
                );

                return;

            }


            // Check declaration

            if (!declaration) {

                alert(
                    "Please accept the declaration before submitting."
                );

                return;

            }



            /* =====================================
               ELIGIBILITY CHECK BEFORE SUBMISSION
            ===================================== */


            const selectedOption =
                courseSelect.options[
                    courseSelect.selectedIndex
                ];


            const requiredPercentage =
                Number(
                    selectedOption
                    .getAttribute("data-eligibility")
                );


            const studentPercentage =
                Number(
                    twelfthPercentageValue
                );


            if (
                studentPercentage <
                requiredPercentage
            ) {

                alert(
                    "You are not eligible for the selected course."
                );

                return;

            }



            /* =====================================
               GENERATE APPLICATION ID
            ===================================== */

            const applicationID =
                "UNI" +
                Date.now()
                .toString()
                .slice(-8);



            /* =====================================
               CREATE APPLICATION OBJECT
            ===================================== */

            const applicationData = {

                applicationID: applicationID,

                fullName: fullName,

                email: email,

                phone: phone,

                dob: dob,

                gender: gender,

                address: address,

                tenthPercentage:
                    tenthPercentage,

                twelfthPercentage:
                    twelfthPercentageValue,

                entranceExam:
                    entranceExam,

                entranceScore:
                    entranceScore,

                course:
                    course,

                photoName:
                    photo.name,

                certificateName:
                    certificate.name,

                status:
                    "Application Submitted"

            };



            /* =====================================
               SAVE DATA TO LOCAL STORAGE
            ===================================== */


            localStorage.setItem(
                "universityApplication",
                JSON.stringify(applicationData)
            );



            /* =====================================
               SHOW SUCCESS MESSAGE
            ===================================== */

            successMessage.style.display =
                "block";


            successMessage.innerHTML = `

                <h3>
                    ✓ Application Submitted Successfully
                </h3>

                <p>
                    Your application has been
                    submitted successfully.
                </p>

                <p>
                    <strong>
                        Application ID:
                    </strong>
                    ${applicationID}
                </p>

                <p>
                    <strong>
                        Applicant:
                    </strong>
                    ${fullName}
                </p>

                <p>
                    <strong>
                        Course:
                    </strong>
                    ${course}
                </p>

                <p>
                    <strong>
                        Status:
                    </strong>
                    Application Submitted
                </p>

            `;



            /* =====================================
               SCROLL TO SUCCESS MESSAGE
            ===================================== */

            successMessage.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});