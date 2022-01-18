$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const email=$('#email');
const password=$('.password');
const form=$('#form');
const formBtn=$('.btn.form_btn');
const formMessage=$('.form-message');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

formBtn.addEventListener('click',()=>{
    if (!email.value.length){
        formMessage.innerHTML=`Vui lòng nhập email! `;  
    }
    else if (!regexEmail.test(email.value)){
        formMessage.innerHTML=`Vui lòng nhập email hợp lệ!`;
    } else if (!password.value.length){
        formMessage.innerHTML=`Vui lòng nhập mật khẩu! `;
    } else {
        form.setAttribute('action','/login');
        form.submit();
    }
})

