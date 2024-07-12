const reqWrite = (req, res, next) => {
    console.log(`method => ${req.method}, url => "${req.originalUrl}"`)
    next();
};

module.exports = { reqWrite };