module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
        if(req.user.active === true) {
            return next();
        }
    }
    req.flash('error_msg' , 'please login to use this');
    res.redirect('/profile/login');
    }
    }