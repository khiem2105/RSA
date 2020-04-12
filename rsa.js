var isEncrypted = false;
var n,p,q,e,d;
var crypt = [];
var encryptBtn = document.querySelector("#encrypt");
var decryptBtn = document.querySelector("#decrypt");
var content = document.querySelector("h1");
function findRemainder(m,e,n){
    var remainder = 1;
    for(var i = 1; i <= e; i++){
        remainder = (remainder*m) % n;
    }
    return remainder;
};
function encrypt(str){
    var strEncrypted = []
    for(var i = 0; i < str.length; i++){
        strEncrypted[i] = findRemainder(str.charCodeAt(i),13,2537);
    }
    return strEncrypted;
};
function findPrivateKey(e,p,q){
    for(var i = 1; i < (p-1)*(q-1); i++){
        if((1+i*(p-1)*(q-1)) % e === 0) return (1+i*(p-1)*(q-1))/e;
    }
};
d = findPrivateKey(13,43,59);
function decrypt(crypt){
    var strDecrypted = "";
    for(var i = 0; i < crypt.length; i++){
        strDecrypted = strDecrypted + String.fromCharCode(findRemainder(crypt[i],d,2537));
    }
    return strDecrypted;
};

encryptBtn.addEventListener("click",function(){
    if(!isEncrypted){
        crypt = encrypt(content.textContent);
        content.textContent = "";
        for(var i = 0; i < crypt.length; i++){
            content.textContent = content.textContent + crypt[i];
        }
    }
    isEncrypted = true;
});
decryptBtn.addEventListener("click",function(){
    if(isEncrypted){
        content.textContent = decrypt(crypt);
    }
    isEncrypted = false;
});