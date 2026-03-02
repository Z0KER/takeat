'use strict'

function errorHandler(err, req, res, next) {
    // eslint-disable-line no-unused-vars
    const statusCode = err.statusCode || 500

    console.error(
        `[ERROR] ${req.method} ${req.path} → ${statusCode}: ${err.message}`,
    )

    return res.status(statusCode).json({
        error: err.name || 'InternalServerError',
        message: err.message || 'Ocorreu um erro interno no servidor.',
        ...(err.details && { details: err.details }),
    })
}

module.exports = errorHandler
