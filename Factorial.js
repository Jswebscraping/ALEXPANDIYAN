var fact = 1,n;
n = prompt("Enter sny Value");
while(n >= 1)
{
    fact = fact*n;
    n=n-1;
}
document.getElementById('fact').innerHTML='Factorial of given Number Is : '+(fact);
//alert("Factorial of given Number Is : " + fact);