import {hello} from './greet'

const register = (registerRequest) => {
    console.log(registerRequest)
}
const foo = "boo";
const registerBtn = document.querySelector('.register');

registerBtn.addEventListener('click', () => {
    register({"name": "Asia", "xyz": 'foo'});
});

(() => {
    hello("Asia");
})();