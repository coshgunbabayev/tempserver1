const getIndexPage = (req, res) => {
    res.render("index");
};

const getSignupPage = (req, res) => {
    res.render("signup");
};

const getLoginPage = (req, res) => {
    res.render("login");
};
const getCreatePage = (req, res) => {
    res.render("create");
};

module.exports = {
    getIndexPage,
    getSignupPage,
    getLoginPage,
    getCreatePage
};