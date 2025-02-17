
const jwt_lib = require("../lib/jwt");
//////////////////////////////// visitor  -   user    - admin  SAYFA AÇILIŞLARINDA COOKİE DEKİ KONTROL
const permission_check = (permission) => {
    return (req, res, next) => {
        const access_token = req.headers.cookie
        if (access_token) { var access_token_split = access_token.split("Authorization=Bearer ")[1] }
        try {
            const decoded__token = jwt_lib.jwt_verify_access(access_token_split)
            if (decoded__token === false) {
                req.permissions = "visitor"
                const filter_permission = permission.filter(findData => { return findData === req.permissions })
                if (filter_permission.length === 0) return res.redirect("/")
            }
            if (decoded__token !== false) {
                const filter_permission = permission.filter(findData => { return findData === decoded__token.user })
                if (filter_permission.length === 0) return res.redirect("/")
                if(filter_permission.length > 0) {
                    req.permissions = `${decoded__token.user}`
                    req.id = `${decoded__token.id}`
                }
            }

        } catch (error) {
            console.log(error.message, "token_check error")
            req.permissions = "visitor"
        }
        next();
    }
}

//// POSTLARDA AXİOS HEADERS KONTROLÜ
const authorization_check = () => {
    return (req, res, next) => {
        const token = req.headers.authorization
        if (token !== undefined || token) {
            var token_split = token.split("Bearer ")[1]
            try {
                const decoded_token = jwt_lib.jwt_verify_access(token_split)
                if (decoded_token === false) return  res.redirect("/login")
            } catch (error) {
                console.log(error, "token check js catch")
            }
        }

        next()
    }
}
module.exports = { permission_check, authorization_check }