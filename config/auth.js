function ensureAuthenticatedInternal(req,res,next) {
    if(req.isAuthenticated()) {
        if(req.user.active === true) {
            return next();
        }
    }
    req.flash('error_msg' , 'You need to login to use this page');
    res.redirect('/profile/login');
    }

function HasPermInternal(perm) {
    console.log(`hasPerm run with perm: ${perm}`)
    return HasPermInternal[perm] || (HasPermInternal[perm] = function(req, res, next) {
        if (true == req.user.permissions.perm) next();
        else {
            req.flash('error_msg' , `You need to login as an account that has the ${perm} permission.`)
        }
    })
    }

module.exports = {
    ensureAuthenticated : ensureAuthenticatedInternal,
    hasPerm : HasPermInternal
    }