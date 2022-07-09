var target=document.getElementById('btn');
target.addEventListener('click',function(){
    var tam=document.getElementById('tam').value;
    var eng=document.getElementById('eng').value;
    var mat=document.getElementById('mat').value;
    var sci=document.getElementById('sci').value;
    var soc=document.getElementById('soc').value;

    var total=Number(tam)+Number(eng)+Number(mat)+Number(sci)+Number(soc);

    var per=(total*100)/500;

    if(per>=90 && per<100){
        var grade="A You are PASS"
    }
    else if(per>=80 && per<100){
        var grade="B You are PASS"
    }
    else if(per>=70 && per<100){
        var grade="C You are PASS"
    }
    else if(per>=60 && per<100){
        var grade="D You are PASS"
    }
    else if(per>=50 && per<100){
        var grade="E You are PASS"
    }
    else{
        var grade="You are FAIL"
    }
    
    document.getElementById('total').innerHTML='Your marks '+(total)+' out of 500';
    document.getElementById('per').innerHTML='Your Percentage is '+(per);
    document.getElementById('grade').innerHTML=(grade);
    
})