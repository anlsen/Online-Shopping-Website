const updateFormElements=document.querySelectorAll("#admin-update-form");



for(const updateFormElement of updateFormElements){
    updateFormElement.addEventListener("submit",async function(event){
        
        event.preventDefault();


        // we can also do formData= new FormData(event.target)

        // and have access through formData.get("orderid"),formData.get("status") and so on 

        const orderId=event.target.querySelector("#orderid").value;
        const csrfToken=event.target.firstElementChild.value;
        const status=event.target.querySelector("#status").value;
        
        let response;
        
        try{
            
            response=await fetch(`/admin/update?_csrf=${csrfToken}`,{
                method:"PATCH",
                body:JSON.stringify({
                    orderId:orderId,
                    status:status
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            
        }catch(error){
            
            throw new Error();
        }
    
    
        const statusElement=event.target.parentElement.parentElement.querySelector(".order-status");
    
        statusElement.textContent=status;
    });

}