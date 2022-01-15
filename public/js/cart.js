$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)
const removeBtns=$$(".remove-btn");
const deleteForm=$("#delete-form");

 removeBtns.forEach(e=>{
   e.addEventListener('click',function(){
    const agreeDelete=confirm("Bạn chắc chắn muốn bỏ khóa học này chứ ?");
    if (agreeDelete){
      const productId=e.getAttribute('data-id');
      if (getCookie('isLoggedIn')==='true'){
        deleteForm.setAttribute('action',`/cart/delete/${productId}?_method=DELETE`);
        deleteForm.submit();
      }
      else {
        let cartList=JSON.parse(getCookie('cart'));
        cartList=cartList.filter(e=>e!== courseId);
        document.cookie=`cart=${JSON.stringify(cartList)}`;
        window.location.reload();
      }
    }
   })
  
});

      
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}