const SuccessResponse = (code, data, message) => ({
    status: "success",
    code,
    data: data || null, // Đảm bảo luôn có giá trị cho `data`
    message,
});

const ErrorResponse = (code, message) => ({
    status: "error",
    code,
    message,
});
  
module.exports = { SuccessResponse, ErrorResponse };
  