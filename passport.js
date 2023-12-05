const LocalStrategy=require('passport-local').Strategy

function getuserbyPhone(phone){
    
}

function initialize(passport){
    const authenticateUser = (phone,pwd,done) =>{
        const user=getuserbyPhone(phone);
        if (user==null){
            return done(null,false);
        }
    }

    passport.use(new LocalStrategy({usernameField:'phone', passwordField:'pwd'}),authenticateUser)
    passport.serializeUser((username,done)=>{})
    passport.deserializeUser((username,done)=>{})





}