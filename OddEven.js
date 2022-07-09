function get(){

    var number = document.getElementById('num').value;
    var even = 0;
    var odd = 0;


    for (let i = 0; i < number.length; i++){
        if (number[i]%2==0){
            even++;
            Even.innerHTML = "There are " + even + " number";

        }else{
            odd++;
            Odd.innerHTML = "There are " + odd + " number";
        }
    }
}