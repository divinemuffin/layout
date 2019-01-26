(function() {
    // Popup namespace
    const overlay = document.querySelector(".overlay");
    const feedbackForm = overlay.querySelector(".content");

    const closeBtn = overlay.querySelector(".close-button");

    const nameInput = feedbackForm.querySelector(".input-name");
    const phoneInput = feedbackForm.querySelector(".input-phone");
    const emailInput = feedbackForm.querySelector(".input-email");
    const msgInput = feedbackForm.querySelector(".input-textarea");
    const submitBtn = feedbackForm.querySelector(".input-submit");

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
        feedbackForm.insertBefore(node, refNode);
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

    document.onkeydown = function(evt) {
        // adding listener on "esc" key press 
        // to close popup
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key == "Escape" || evt.key == "Esc");
        } else {
            isEscape = (evt.keyCode == 27);
        }
        if (isEscape) {
            overlay.style.opacity = 0;
            overlay.style.visibility = "hidden";
        }
    };


    feedbackForm.addEventListener("submit", e => {
        e.preventDefault();
        submitBtn.value = "[ Sending ... ]";

        let params = [];


        for (const key in formInputs={userName:nameInput, phone:phoneInput, email:emailInput, message:msgInput}) {
            if (formInputs.hasOwnProperty(key)) {
                console.log(`${key}=${formInputs[key].value}`);
                params.push(`${key}=${formInputs[key].value}`);
            }
        }

        params.push(`serverTime=${new Date()}`)

        var http = new XMLHttpRequest();
        var url = '/sendMail';
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {
            //Call a function when the state changes.
            console.log(http.readyState, http);
            if(http.readyState == 4 && http.status === 200) {
                alert(http.responseText);
                submitBtn.className = "input input-submit sent";
                submitBtn.value = "[ Sent ]";
            }
            else if (http.readyState == 4 && http.status === 0) {
                submitBtn.className = "input input-submit warn";
                submitBtn.value = "[ CORS ]"
            }
            else {
                submitBtn.className = "input input-submit error";
                submitBtn.value = "[ Error ]";
            }
        }
        http.send(params.join("&"));
    });    
})();