

// INSERT INTO `orders` (`ID`, `OrderCode`, `Time`, `Notes`) VALUES ('1234568098', '28956', NOW(), 'Hello World test')

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
    var encodedNumberLen = encodedNumber.length;
    for (var i = 0;i < encodedNumberLen;i++) {
	    encodedNumberAry += encodedNumber.charCodeAt(i);
    }
    encodedNumber = encodedNumberAry.split("");
    encodedNumberLen = encodedNumber.length;
    for (var i = 0;i < encodedNumberLen;i++) {
	    if (i == encodedNumberLen - 1) {
    	    decodedNumber = encodedNumber[i];
        } else {
    	    encodedNumber[i + 1] = Number(encodedNumber[i + 1]) + 256 * Number(encodedNumber[i]);
            encodedNumber[i + 1] = encodedNumber[i + 1].toString();
        }
    }

    return decodedNumber;
}


