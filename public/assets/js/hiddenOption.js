function optional(){
    var checkBox = document.getElementById("defaultCheck1");
    var x = document.getElementById("hiddenLogo");
    if(checkBox.checked == true){
        x.style.display = "block";
    } else{
        x.style.display = "none";
    }
}