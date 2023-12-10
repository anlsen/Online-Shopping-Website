function getHome(req,res){
    res.redirect("/products");
}

function error401(req,res){
    res.status(401).render("shared/401");

}

function error403(req,res){
    res.status(403).render("shared/403");
}

module.exports={
    getHome:getHome,
    error401:error401,
    error403:error403
}