const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const loadmoreBtn=$('.loadmore');
const featuresItems=$('.features_items');
let startFrom=0;
let html='';
async function getProduct(){
    const limit = 6;
    const url = window.location.href;
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startFrom }),
    };
    try {
        const res=await fetch(url,init);
        const data= await res.json();
        const result=data.products.map(product=>{
            return `
                <div class="col-sm-4">
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <a href="/${product.slug}"><img src="${product.img[0]}.jpg" alt="" /></a>
                                <h2>
                                    ${product.price} <sup>đ</sup></h2>
                                <p>
                                    ${product.name} -
                                        ${product.color} -
                                            ${product.storage}GB</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
        html+=result.join(' ');
        featuresItems.innerHTML=html;
        if (data.end===true){
            loadmoreBtn.style.display="none";
        }
        startFrom+=limit;
        
    } catch (error) {
        console.log(error)
    }

}
getProduct();
loadmoreBtn.onclick=()=>getProduct();