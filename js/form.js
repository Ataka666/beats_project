const form = document.querySelector('.form');
const button = document.querySelector('#myButton');
button.addEventListener('click', ()=>{
    function validateForm(form) {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.lastName)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }

        return valid;
    }

    function validateField(field) {
        if (!field.checkValidity()) {
            field.nextElementSibling.textContent = field.validationMessage;

            return false;
        } else {
            field.nextElementSibling.textContent = '';

            return true;
        }
    }
    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
    }
if (validateForm(form)){
    const order = {
    name: form.elements.name.value,
    lastName: form.elements.lastName.value,
    comment: form.elements.comment.value}; 
    const xhr=new XMLHttpsRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(order));
    xhr.addEventListener('load', () => {
    console.log(xhr.response)})})