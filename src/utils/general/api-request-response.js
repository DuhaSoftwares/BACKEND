// Middleware to preprocess reqData for POST and PUT requests
function apiRequest(body) {
  if (!body || !body.reqData) {
    throw new Error("reqData is missing in the request body");
  }
  return body.reqData;
}
function apiResponse(
  data,
  statusCode = 200,
  isError = false,
  errorData = null,
  displayMessage = ""
) {
  return {
    responseStatusCode: statusCode,
    successData: isError ? null : data,
    isError,
    errorData,
    displayMessage,
    additionalProps: {},
  };
}


module.exports = { apiRequest,apiResponse};
