//send email for confirmation of registration
//and check if user is authentic or not 
//import emailjs from "emailjs";

import creds from "../json/credentials.json";
import registeredUsers from "../json/registeredUsers.json";

const signInButton = document.querySelector(".usernameField");
const username = "bcd-kushal";
const email = "am.kushal02@gmail.com";
const password = "iamkushal02"; 

function verifyEmailID(){
    
    const secureVerificationCode = generateSecureRandomCode(6);
    
    const templateParams = {
        to_name: "Kushal Kumar",
        verification_code: String(secureVerificationCode),
        from_name: creds.EMAIL_SUBJECT
    };

    var formData = new FormData(this);
    formData.append('service_id', creds.EMAILJS_SERVICE_ID );
    formData.append('template_id', creds.EMAILJS_TEMPLATE_ID );
    formData.append('user_id', creds.EMAILJS_PUBLIC_KEY );
    formData.append('verification_code', templateParams.verification_code );
    formData.append('from_name', templateParams.from_name );
    formData.append('to_name', templateParams.to_name );


    const sendTypes = {
        type: "POST",
        data: formData,
        contentType: false,
        //templateParams: templateParams
        processData: false
    }


    $.ajax( creds.EMAILJS_API, sendTypes ).done(() => {
    
        const VERIFICATION_TOTAL_TIME_ALLOWED = 5*60*1000;
        const timer = setTimeout(() => { 
            alert("Verification code expired");
        }, VERIFICATION_TOTAL_TIME_ALLOWED );
    
        const responseCode = prompt("Enter code here...");
        if( responseCode ){
            clearTimeout( timer ); //dont fire this event
            if( String(responseCode) == String(templateParams.verification_code) ){
                alert("User registered");
                return true; //user verified
            }
            else{ 
                alert("Incorrect code entered");
                return false; //user not authentic
            }
        }


    }).fail(( err ) => { 
        alert( JSON.stringify(err) ); 
    });




    //===== CREATE SECURE KEY =======================================

    function generateSecureRandomCode(length) {
        const chars = '0123456789';
        const charLength = chars.length;
        let code = '';

        if (window.crypto && window.crypto.getRandomValues) {
            const values = new Uint32Array(length);
            window.crypto.getRandomValues(values);
            for (let i = 0; i < length; i++) {
                code += chars[values[i] % charLength];
            }
        } else {
            // Fallback to Math.random (less secure)
            for (let i = 0; i < length; i++) {
                code += chars[Math.floor(Math.random() * charLength)];
            }
        }

        return code;
    }

}

/* async function registerAuthenticUser(){

    const isUserAuthentic = await verifyEmailID();
    if( isUserAuthentic ){

        const users = JSON.parse( registeredUsers );
        users[email] = {
            username: username,
            password: password
        };

        alert("User registered");

    } else {
        alert("User not registered with us.");
    }

} */

signInButton.addEventListener( "click", () => {

    const isAuthenticUser = verifyEmailID();

    if( !isAuthenticUser ){
        alert( " User was not registered. " );
        return;
    }

    alert(" user is registered.");

    const userField = document.querySelector(".username");
    userField.innerHTML = username;
    console.log("HERE: ", username);

});