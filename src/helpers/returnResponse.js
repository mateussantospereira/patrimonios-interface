function returnResponse (status, error, message, data = null) {
    return {
        status: status,
        error: error, 
        message: message,
        data: data
    };
}

module.exports = returnResponse;