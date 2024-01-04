const User = require('../Models/user');
const { setUser } = require('../Services/auth');
const bcrypt = require('bcrypt');


const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
                return res.redirect('/signup');
            }
            const user = await User.create({ name, email, password:hash,role:"Normal" });
            const authTocken = setUser(user);
            res.cookie('authTocken', authTocken);
            return res.redirect("/");   //localhost/ with get method
        });
    });

}
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.render('login', { msg: "invalid credentials" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            const authTocken = setUser(user);
            res.cookie('authTocken', authTocken);
            return res.redirect("/");
        }
        else{
            return res.redirect('/signup');
        }
    });

}
module.exports = { handleUserSignup, handleUserLogin }