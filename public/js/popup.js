(function() {

    // Popup namespace
    let isVisible = true;

    const emailForm = document.querySelector(".popup .content");
    const overlay = document.querySelector(".overlay");

    const closeBtn = overlay.querySelector(".close-button");
    const status = overlay.querySelector(".close-button");

    const nameInput = emailForm.querySelector(".feedback-name");
    const phoneInput = emailForm.querySelector(".feedback-phone");
    const emailInput = emailForm.querySelector(".feedback-email");
    const msgInput = emailForm.querySelector(".feedback-message");

    const submitBtn = emailForm.querySelector("input[type='submit']");

    let template = ``;

    let checkFormValidity = function() {
        if(!emailInput.checkValidity() || !nameInput.checkValidity() || !phoneInput.checkValidity()) {
            submitBtn.disabled = true;
        }
        else submitBtn.disabled = false;
    }

    let displayHint = function(refNode) {
        let node = document.createElement("p");
        node.innerText = refNode.validationMessage;
        node.classList = "hint";
        emailForm.insertBefore(node, refNode);
    }

    checkFormValidity(); // initial chaeck just in case

    emailInput.addEventListener("keyup", () => {
        checkFormValidity();
    })
    nameInput.addEventListener("keyup", () => {
        checkFormValidity();
    })
    phoneInput.addEventListener("keyup", () => {
        checkFormValidity();
    })

    closeBtn.addEventListener("click", () => {
        overlay.style.opacity = 0;
        overlay.style.visibility = "hidden";
    });


    emailForm.addEventListener("submit", e => {
        e.preventDefault();
        submitBtn.value = "[ Sending ... ]";

        let params = [];


        for (const key in formInputs={userName:nameInput, phone:phoneInput, email:emailInput, message:msgInput}) {
            if (formInputs.hasOwnProperty(key)) {
                params.push(`${key}=${formInputs[key].value}`);
            }
        }

        params.push(`serverTime=${new Date()}`)

        var http = new XMLHttpRequest();
        var url = 'https://us-central1-nod-test-38899.cloudfunctions.net/sendMail';
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {
            //Call a function when the state changes.
            console.log(http.readyState, http);
            if(http.readyState == 4 && http.status === 200) {
                alert(http.responseText);
                submitBtn.className = "feedback-submit sent";
                submitBtn.value = "[ Sent ]";
            }
            else if (http.readyState == 4 && http.status === 0) {
                submitBtn.className = "feedback-submit warn";
                submitBtn.value = "[ CORS ]"
            }
            else {
                submitBtn.className = "feedback-submit error";
                submitBtn.value = "[ Error ]";
            }
        }
        http.send(params.join("&"));
    });    
})();