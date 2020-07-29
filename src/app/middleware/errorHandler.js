const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        result: err.message || 'Server Error'
    })
};

module.exports = errorHandler;
