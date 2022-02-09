$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const fullname=$('#fullname');
const email=$('#email');
const password=$('#password');
const passwordConfirm=$('#password_confirmation');
const formBtn=$('.btn.form_btn');
const registerForm=$('#form');
const formMessage=$(`.form-message`);
const regexName =/[A-Za-z]/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexStrengthPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/

formBtn.addEventListener('click',()=>{
    if (ValidateFromRegister()){
        registerForm.setAttribute('action','/register');
        registerForm.submit();
        setTimeout(isSuccess(),5000);
    }
})


function ValidateFromRegister(){
    if (check(fullname,regexName,"tên",'')&&check(email,regexEmail,'email','')&&
    check(password,regexStrengthPassword,'mật khẩu','Mật khẩu phải bao gồm ít nhất 8 chữ cái, có chứa chữ hoa, chữ thường , số và kí tự đặc biệt.')&&
    checkConfirmPassword())
    return true;
    else return false;
}
function check(element,regex,string1,string2){    
    const value=element.value;
    if (!value.length){
        formMessage.innerHTML=`Vui lòng không được để trống ${string1} `;  
    }
    else if (!regex.test(value)){
        formMessage.innerHTML=`Vui lòng nhập ${string1}  hợp lệ. ${string2}`;
    } else return true;
}
function checkConfirmPassword(){
    const value=passwordConfirm.value;
    if (!value.length){
        formMessage.innerHTML="Nhập lại mật khẩu không được để trống";
    } else if (value!==password.value){
        formMessage.innerHTML="Mật khẩu không trùng khớp. Vui lòng nhập lại";
    } else return true;
}

