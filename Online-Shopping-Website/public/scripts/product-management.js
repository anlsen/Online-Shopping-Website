const deleteButtons=document.querySelectorAll(".product-item button");



for (const deleteButton of deleteButtons){
    deleteButton.addEventListener("click", async function(event){
        btn=event.target;
    
        productId=btn.dataset.productid;
        csrfToken=btn.dataset.csrf;
        
        const response=await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`,{
            method:"DELETE"
        })

        console.log(await response.json());

        if(!response.ok){
            alert("Something went wrong on server");
            return;
        }

        const listItem=btn.parentElement.parentElement.parentElement.parentElement;
        listItem.remove();
    })
}