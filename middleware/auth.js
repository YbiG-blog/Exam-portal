module.exports= async(req,res,next)=>{
try{const token=req.cookies.jwt_csi;
console.log(token);
if(!token)
{
return res.status(401).send({"msg":"Access Denied"});

}

const token_verify=jwt.verify(token, process.env.TOKEN_SECRET_KEY);
if(token_verify)
{res.status(201).send({"msg":"Token verified"});}
else{
    res.status(400).send({"msg":"Token not verified"});
}
req.user=token_verify;
next();
}

catch(err){
    res.status(501).send({"msg": err});
}
}
