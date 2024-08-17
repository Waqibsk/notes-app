document.addEventListener('DOMContentLoaded', function(){

    document.querySelector("form").onsubmit = function (){
        const note =document.querySelector('#textbar').value;
        let a=document.createElement("li");
    a.innerHTML=note;
    document.querySelector("#notelist").append(a);
    
    return false;
}
    
})