//It's not me, It's you, goodbye my not love, I will always forget you


function encode256(number) {
    var bigString = number.toString();
    var bigOne = BigInt(bigString);

    var base256 = [];
    do {
        base256.unshift(Number(bigOne%256n));
        bigOne = bigOne/256n;
    } while (bigOne)
  
    var encodedNumber = "";
    var base256Len = base256.length;
    for (var i = 0;i < base256Len;i++) {
        encodedNumber += String.fromCharCode(base256[i]);
    }
    return encodedNumber;
}

function decode256(encodedNumber) {
    var decodedNumber = 0;
    var encodedNumberAry = "";
    for (var i = 0;i < encodedNumber.length;i++) {
	    encodedNumberAry += encodedNumber.charCodeAt(i);
    }
    encodedNumber = encodedNumberAry.split("");
    for (var i = 0;i < encodedNumber.length;i++) {
	    if (i == encodedNumber.length - 1) {
    	    decodedNumber = encodedNumber[i];
        } else {
    	    encodedNumber[i - 1] = Number(encodedNumber[i - 1]) + 256 * Number(encodedNumber[i]);
            encodedNumber[i - 1] = encodedNumber[i - 1].toString();
        }
    }

    return decodedNumber;
}