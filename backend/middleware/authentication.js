
export async function isLoggedIn(req,res,next) {

        if(req.isAuthenticated()){
            res.json({
                success: true,
                username: req.user.username,
                status: req.user.status
            })
        } else {
            res.json({
                success: false,
                username: null,
                status: null
            })
        }
}

export async function isAdmin(req,res,next){
    if(req.user.role === 'admin'){
        return next();
    }
    return res.redirect("/");
}