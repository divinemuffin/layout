// class Popup {
//     constructor() 
// };


(function() {

    // Popup namespace
    let isVisible = true;

    let closeBtn = document.querySelector(".popup > .close-button");
    let overlay = document.querySelector(".overlay");

    let emailInput = document.querySelector(".popup > .content > input[type='email']");
    let submitBtn = document.querySelector(".popup > .content > input[type='submit']");


    let sendEmail = function() {
        let url = "https://us-central1-nod-test-38899.cloudfunctions.net/sendMail";
        let params = new URLSearchParams();
        let headers = new Headers({'Content-Type':'application/json', 'Access-Controll-Allow-Origin':'*'});

        params.set("to")


    }

    let checkEmailValidity = function() {

        if(!emailInput.checkValidity()) {
            submitBtn.disabled = true;
            console.log(emailInput.validationMessage);
        }
        else submitBtn.disabled = false;
    }

    checkEmailValidity(); // initial chaeck just in case
    console.log("submitBtn");

    emailInput.addEventListener("keyup", () => {
        checkEmailValidity();
    })

    closeBtn.addEventListener("click", () => {
        overlay.style.opacity = 0;
    });

    submitBtn.addEventListener("submit", e => {
        //  method="POST" action="https://us-central1-nod-test-38899.cloudfunctions.net/sendMail"
        e.preventDefault();
        console.log("Hei");
        
    });
 
})();