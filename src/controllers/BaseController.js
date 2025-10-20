class BaseController {
  constructor() {
    if (new.target === BaseController) {
      throw new Error("Cannot instantiate BaseController directly");
    }
  }

  sendSuccess(res, data, message = "Success") {
    res.status(200).json({
      success: true,
      message,
      data
    });
  }

  sendError(res, error, statusCode = 500) {
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
      error
    });
  }
}

module.exports = BaseController;