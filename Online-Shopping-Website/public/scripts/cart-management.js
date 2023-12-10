const addButton=document.querySelector("#product-details button");
const spanElement=document.querySelector(".nav-item .badge");


addButton.addEventListener("click",async function(){
    
    const productId=addButton.dataset.productid;
    const csrfToken=addButton.dataset.csrf;
    

    let response;
    try{
        response=await fetch(`/cart/items?_csrf=${csrfToken}`,{
            method:"POST",
            body:JSON.stringify({
                productId:productId
            }),
            headers:{
                "Content-Type":"application/json"
            }
            
        });

    }catch(error){
        alert("Something went wrong!");
        return;
    }

    if(!response.ok){
        alert("Something went wrong!");
        return;
    }

    const returnedObj=await response.json();

    spanElement.textContent=returnedObj.newTotalItems;


})