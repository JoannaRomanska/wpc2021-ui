import {hello} from './greet'
import {aws_config} from './aws_export'
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
    UserPoolId: aws_config.userPoolId,
    ClientId: aws_config.clientId,
})
const register = (registerRequest) => {
    //@ToDo introduce promise instead of callbacks
    const attributeList = [
        new CognitoUserAttribute({
            Name: 'website',
            Value: registerRequest.website,
        })
    ]
    userPool.signUp(registerRequest.email, registerRequest.password, attributeList, null, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    })
}

const confirmAccount = (confirmRequest) => {
    const user = new CognitoUser({
        Username: confirmRequest.email,
        Pool: userPool
    });

    user.confirmRegistration(confirmRequest.code, true, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}

const login = (loginRequest) => {
    const authDetails = new AuthenticationDetails({
        Username: loginRequest.email,
        Password: loginRequest.password,
    });
    const user = new CognitoUser({
        Username: loginRequest.email,
        Pool: userPool
    });
    user.authenticateUser(authDetails, {
        onSuccess: (result) => {
            console.log(result);
        },
        onFailure: (err) => {
            console.log(err);
        }
    });
}
const registerBtn = document.querySelector('button.register');
const registerRequestPayLoad = {
    email: "asiarom@poczta.fm",
    password: "1234qwer",
    website: 'jkan.pl'
}
registerBtn.addEventListener('click', () => {
    register(registerRequestPayLoad);
});

const confirmAccountBtn = document.querySelector('button.confirmAccount');
const confirmAccountRequest = {
    code: '497954',
    email: registerRequestPayLoad.email,
}

confirmAccountBtn.addEventListener('click', () => {
    confirmAccount(confirmAccountRequest)
});

const loginBtn = document.querySelector('button.login');
const loginRequestPayload = {
    email: registerRequestPayLoad.email,
    password: registerRequestPayLoad.password,
};

loginBtn.addEventListener('click', () => {
    login(loginRequestPayload);
});

(() => {
    hello("Asia");
})();