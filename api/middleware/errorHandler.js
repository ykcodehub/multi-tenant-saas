//we will expand this to handle jwt, roles etc

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Opps! Something broke"});
};