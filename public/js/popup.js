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

    emailInput.addEventListener("change", () => {
        if(!emailInput.checkValidity()) {
            submitBtn.disabled = true;
            console.log(emailInput.validationMessage);
        }
        else submitBtn.disabled = false;
    })

    closeBtn.addEventListener("click", () => {
        overlay.style.opacity = 0;
    })
 
})();