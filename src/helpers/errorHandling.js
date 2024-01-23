const notFoundHandler = (req, res, next) => {
    res
    .status(404)
    .json({
        error: 404,
        message: "Route not found."
    });
}
class requiredBodyError extends Error {
    constructor(notIncludedFields) {
        super();
        this.status = 400;
        this.message = `Request must include the fields: ${notIncludedFields.join(', ')}.`;
    }
}

module.exports = {
    requiredBodyError,
    notFoundHandler
};