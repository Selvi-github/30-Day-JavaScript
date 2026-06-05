var nameError=document.getElementById("name-error");
var phoneError=document.getElementById("phone-error");
var emailError=document.getElementById("email-error");
var messageError=document.getElementById("message-error");
var submitError=document.getElementById("submit-error");

function validateName(){
    var name=document.getElementById("contact-name").value;
    if(name.length==0){
        nameError.innerHTML="name is required";
        return false;
    }
    if(!name.match(/^[A-Za-z]+(?:\s+[A-Za-z]+)+$/)){
        nameError.innerHTML="write full name";
        return false;
    }
    nameError.innerHTML='<i class="fas fa-check-circle"></i>';
    return true;
}
function validatePhone(){
    var phone=document.getElementById("contact-phone").value;
    var digits=phone.replace(/\D/g, "");
    if(phone.length==0){
        phoneError.innerHTML="phone is required";
        return false;
    }
    if(digits.length!==10){
        phoneError.innerHTML="write valid phone number";
        return false;
    }
    phoneError.innerHTML='<i class="fas fa-check-circle"></i>';
    return true;   
}
function validateEmail(){
    var email=document.getElementById("contact-email").value;   

    if(email.length==0){
        emailError.innerHTML="email is required";
        return false;
    }
    if(!email.match(/^\S+@\S+\.\S+$/)){

        emailError.innerHTML="write valid email";
        return false;
    }   
    emailError.innerHTML='<i class="fas fa-check-circle"></i>';
    return true;   
}
function validateMessage(){
    var message=document.getElementById("contact-message").value;
    if(message.length==0){
        messageError.innerHTML="message is required";
        return false;
    }
    messageError.innerHTML='<i class="fas fa-check-circle"></i>';
    return true;
}
function validateForm(){
    if(!validateName() || !validatePhone() || !validateEmail() || !validateMessage()){
        submitError.style.display="block";
        submitError.innerHTML="please fix error to submit";
        setTimeout(function(){submitError.style.display="none";},3000);
        return false;
    }   
    else {
        submitError.style.display="block";
        submitError.style.color="green";
        submitError.innerHTML="form submitted successfully";
        return false;
    }
}