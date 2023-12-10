const filePicker=document.getElementById("image");
const imageElement=document.querySelector(".form-control img");


filePicker.addEventListener("change",function(event){
    const files=event.target.files;

    if(!files || files.length===0){
        imageElement.style.display="none";
        return;
    }
    imageElement.src=URL.createObjectURL(files[0]);
    imageElement.style.display="block";
})