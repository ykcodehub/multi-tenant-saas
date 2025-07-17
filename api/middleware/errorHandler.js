module.exports = (err, req, res, next) => {
    console.error("[ErrorHandler] Unexpected error:", err.stack);
    res.status(500).json({
        message: "Oops! Something broke.",
        error: process.env.NODE_ENV !== "production" ? err.message : undefined
    });
};
