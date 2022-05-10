function ensureAuthenticatedInternal(req,res,next) {
    if(req.isAuthenticated()) {
        if(req.user.active === true) {
            return next();
        } else {
            req.flash('error_msg' , 'You need to confirm your email to use this page');
            res.redirect('/profile/login');
        }
    } else {
        req.flash('error_msg' , 'You need to login to use this page');
        res.redirect('/profile/login');
    }
}

function HasPermInternal(perm) {
    return function(req, res, next) {
        console.log(`hasPermInternal run with perm: ${perm}`);
        if (true == req.user.permissions[perm]) next();
        else {
            req.flash('error_msg' , `You need to login as an account that has the ${perm} permission.`);
            res.redirect('/profile/login');
        }
    }
    }

module.exports = {
    ensureAuthenticated : ensureAuthenticatedInternal,
    hasPerm : HasPermInternal
    }