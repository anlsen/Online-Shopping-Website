const updateButtons=document.querySelectorAll(".cart-item-management button");
const buyingPriceText=document.querySelector("#cart-total p");
const quantitySpanBadge=document.querySelector(".badge");

const mainDiv=document.querySelector("main");


for (const updateButton of updateButtons){
    updateButton.addEventListener("click",async function(event){
        
        const productId=event.target.dataset.productid;
        const csrfToken=event.target.dataset.csrf;
        const enteredQuantity=+event.target.parentElement.firstElementChild.value;
        
        
        let response;
        try{
            
            response=await fetch(`/cart/items?_csrf=${csrfToken}`,{
                method:"PATCH",
                body:JSON.stringify({
                    productId:productId,
                    newQuantity:enteredQuantity
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }catch(error){
            alert("Something went wrong");
            return;
        }

        if(!response.ok){
            alert("Something went wrong");
            return;
        }
        
        const returnData=await response.json();
        const {message , newTotalQuantity, newTotalPrice,newUpdatedItemTotalPrice}=returnData;

        // console.log(newTotalQuantity, newTotalPrice,newUpdatedItemTotalPrice);
        const totalPriceSpan=event.target.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild;
        
        
        quantitySpanBadge.textContent=newTotalQuantity;
        buyingPriceText.textContent=`Total: $${newTotalPrice.toFixed(2)}`;


        if(newUpdatedItemTotalPrice===0){
            event.target.parentElement.parentElement.parentElement.remove();
            if(newTotalQuantity===0){
                mainDiv.innerHTML=`<h1>Cart is empty</h1>
                <a href="/" class="btn btn-alt">Click to add items to your cart!</a>`
            }
        }else{

            totalPriceSpan.textContent=newUpdatedItemTotalPrice.toFixed(2);
        }
    })
}