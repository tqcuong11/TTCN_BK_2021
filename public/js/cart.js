$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
const removeBtns=$$(".remove-btn");
const deleteForm=$("#delete-form");
const selectAll=$('#select-all');
const cartList=$$('.cart-item');
const quantitySelected=$('.quantity-selected');
const selectList=$$(".select-item");
const totalCosts=$('.total-costs');



 removeBtns.forEach(e=>{
   e.addEventListener('click',function(){
    const agreeDelete=confirm("Bạn chắc chắn muốn bỏ khóa học này chứ ?");
    if (agreeDelete){
      const productId=e.getAttribute('data-id');
      if (getCookie('isLoggedIn')==='true'){
        deleteForm.setAttribute('action',`/cart/delete/${productId}`);
        deleteForm.submit();
      }
      else {
        let cartList=JSON.parse(getCookie('cart'));
        cartList=cartList.filter(e=>e!== productId);
        document.cookie=`cart=${JSON.stringify(cartList)}`;
        window.location.reload();
      }
    }
   })
  
});
cartList.forEach(cartItem=>{
  const cartItemId=cartItem.getAttribute('id');
  const minusBtn=$(`#${cartItemId} .minus-btn`);
  const addBtn=$(`#${cartItemId} .add-btn`);
  let quantityItem=$(`#${cartItemId} .quantity-item`);
  const priceProduct=$(`#${cartItemId} .price-item`);
  let priceWithQuantity=$(`#${cartItemId} .price-with-quantity`);
  const selectItem=$(`#${cartItemId} .select-item`);
  let quantity=Number(quantityItem.innerHTML);
  const price=Number(priceProduct.getAttribute('data'));

  if (quantity<=1){
    minusBtn.style.opacity='0.4';
    minusBtn.style.cursor="context-menu";
  }else {
    minusBtn.style.opacity='1';
    minusBtn.style.cursor="pointer";
  }
  
  minusBtn.addEventListener('click',()=>{
    if (quantity>1){
      quantity=quantity-1;
    quantityItem.innerHTML=`${quantity}`;
    const price=Number(priceProduct.getAttribute('data'))*quantity;
    priceWithQuantity.innerHTML=price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    calTotalCost();
    }    
    if (quantity<=1){
      minusBtn.style.opacity='0.4';
      minusBtn.style.cursor="context-menu";
    }else {
      minusBtn.style.opacity='1';
      minusBtn.style.cursor="pointer";
    }
  })
  addBtn.addEventListener('click',()=>{
    quantity=quantity+1;
    quantityItem.innerHTML=`${quantity}`;    
    priceWithQuantity.innerHTML=(price*quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    minusBtn.style.opacity="1";
    calTotalCost();
  }); 
  
})

selectAll.onclick=()=>{ 
  if (selectAll.checked) {
    selectList.forEach(item=>{
      if (!item.checked)
        item.click();
      })
  } else {
    selectList.forEach(item=>{
        item.click();
      })
  }  
  calTotalCost();
}
selectList.forEach(item=>{
  item.onclick=()=>{
    calTotalCost();
    clickSelecteAll();      
  }
})


function clickSelecteAll(element){
  let isAllChecked=true;
  selectList.forEach(item=>{
    if (!item.checked)
      isAllChecked=false;
  })
  if (isAllChecked&&!selectAll.checked)
    selectAll.click();
  else
   if (!isAllChecked&&selectAll.checked){
    selectAll.click();
    selectList.forEach(item=>{
      if (item!==this)
        item.click();
    })
   }

}

function calTotalCost(){
  let totalPrice=0;
  let totalSelect=0;
  selectList.forEach(item=>{
    if (item.checked){
      totalSelect++;
      const id=item.parentElement.parentElement.parentElement.getAttribute('id');
      const  price=Number($(`#${id} .price-with-quantity`).innerHTML.replaceAll('.',''));
      totalPrice+=price;
    }
  })
  quantitySelected.innerHTML=totalSelect.toString();
  totalCosts.innerHTML=totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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