$ = document.querySelector.bind(document)
   $$ = document.querySelectorAll.bind(document)
   var loginState = getCookie('isLoggedIn')
   if (loginState == 'true') {
    //  var loginSuccessElement = $('#login-success')
    //  var loginBtn = $('#login')
    //  var signupBtn = $('#signup')
    //  var usernameElement = $('#username')
    //  var profileImg = $('.profile-img')
    //  var profileMenu = $('.profile-menu')
    //  var logoutBtn = $('#logout')
    //  var profileImg = $('.profile-img')
    //  var logoutForm = $('#logout-form')
    //  loginSuccessElement.style.display = 'flex'
    //  loginBtn.style.display = 'none'
    //  signupBtn.style.display = 'none'
    //  usernameElement.innerText = '<%= user.full_name %>'
    //  profileImg.setAttribute('src', '/img/profile.png')
    //  profileImg.onclick = () => {
    //    profileMenu.classList.toggle('active')
    //  }
    //  logoutBtn.onclick = (e) => {
    //    e.preventDefault()
    //    loginSuccessElement.style.display = 'none'
    //    loginBtn.style.display = 'flex'
    //    signupBtn.style.display = 'flex'
    //    document.cookie = 'isLoggedIn=;expires=Thu, 21 Sep 1979 00:00:01 UTC;'
    //    loginState == 'false'
    //    logoutForm.submit()
    //  }
   }else{
      const cartQuantityNoUser=$('.cart_quantity.no-user');
      const quantityElement=$('.cart_quantity.no-user>b');
      const cart=getCookie('cart');
      if (cart){
        if((quantity=JSON.parse(cart).length)!==0){
          cartQuantityNoUser.style.display='block';
          quantityElement.innerText=quantity.toString();
        }
      }
      
   }
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