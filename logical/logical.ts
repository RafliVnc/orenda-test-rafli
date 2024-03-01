/**
 * @param {number} x
 * @return {boolean}  
 */

const isPalindrome = (x: number)=>{
    const xString = String(x);
    let rev = ""
    for(let i = xString.length - 1; i>= 0; i--){
        rev += xString[i];
    }
    if(rev == xString){
        return true 
    }else{
        return false 
    }
}

let x1= 121;
let x2 = -121;
let x3 = 10;

console.log(isPalindrome(x1));
console.log(isPalindrome(x2));
console.log(isPalindrome(x3));