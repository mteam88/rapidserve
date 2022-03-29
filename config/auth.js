module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
        if(req.user.active === true) {
            return next();
        }
    }
    req.flash('error_msg' , 'You need to login to use this page');
    res.redirect('/profile/login');
    }
    }