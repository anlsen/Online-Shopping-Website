function createAuthSession(req,user,res){
    req.session.uid=user._id.toString();

    if(user.isAdmin){
        req.session.isAdmin=true;
    }

    req.session.save(function(){
        res.redirect("/");
    });
}

function removeAuthSession(req,res){
    req.session.uid=null;
    req.session.isAdmin=null;
    req.session.cart=null;

    req.session.save(function(){
        res.redirect("/login")
    });
}

module.exports={
    createAuthSession:createAuthSession,
    removeAuthSession:removeAuthSession
}