const statusCodes = {0:"ALREADY_ORDERED_TODAY",1:"BAD_LOGIN",2:"INTERNAL_SERVER_ERROR",200:"AUTHENTICATED"};

function getStatusCode(statusCode) {
    return statusCodes[statusCode];
}