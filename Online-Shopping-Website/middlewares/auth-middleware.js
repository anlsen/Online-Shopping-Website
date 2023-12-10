function setAuthLocals(req,res,next){
    if(req.session.uid){
        res.locals.uid=req.session.uid;
        res.locals.isAuth=true;
        if(req.session.isAdmin){
            
            res.locals.isAdmin=req.session.isAdmin;
        }
        next();
    }else{
        next();
    }
}

module.exports=setAuthLocals;