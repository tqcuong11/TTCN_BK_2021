$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const brand = $("#brand");
const name = $("#name");
const storage = $("#storage");
const color = $("#color");
const price = $("#price");
const image1 = $("#image1");
const image2 = $("#image2");
const image3 = $("#image3");
const formBtn = $(".btn.form_btn");
const registerForm = $("#form");
const formMessage = $(`.form-message`);
const regexBrand = /[A-Za-z]/;
const regexNameProduct = /[A-Za-z0-9]/;
const regexColor = /[A-Za-z]/;

formBtn.addEventListener("click", () => {
  if (ValidateFromRegister()) {
    registerForm.setAttribute("action", "/admin/addProduct");
    registerForm.submit();
    setTimeout(isSuccess(), 5000);
  }
});

function ValidateFromRegister() {
  if (
    check(brand, regexBrand, "hãng", "") &&
    check(name, regexNameProduct, "tên sản phẩm", "") &&
    checkNumberInput(storage, "dung lượng") &&
    check(color, regexBrand, "màu", "") &&
    checkNumberInput(price, "giá")
  )
    return true;
  else return false;
}
function check(element, regex, string1, string2) {
  const value = element.value;
  if (!value.length) {
    formMessage.innerHTML = `Vui lòng không được để trống ${string1} `;
  } else if (!regex.test(value)) {
    formMessage.innerHTML = `Vui lòng nhập ${string1}  hợp lệ. ${string2}`;
  } else return true;
}
function checkNumberInput(element, string1) {
  const value = element.value;
  if (!value.length) {
    formMessage.innerHTML = `Vui lòng không được để trống ${string1} `;
  } else return true;
}
