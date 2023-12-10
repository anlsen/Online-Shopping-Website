function protectAdminRoutes(req,res,next){
    

    if(!res.locals.isAdmin){
        res.redirect("/403");
    }else{
        next();
    }
}


function protectAuthenticationRoutes(req,res,next){
    
    if(!req.path.startsWith("/orders") && !req.path.startsWith("/admin")){ //when a totally random path is defined assuming that no other route folder will be under the admin routes.
        res.status(404).render("shared/404")
    }else if(!res.locals.isAuth){
        res.redirect("/401")
    }else{
        next();
    }
}



module.exports={
    protectAdminRoutes:protectAdminRoutes,
    protectAuthenticationRoutes:protectAuthenticationRoutes
}