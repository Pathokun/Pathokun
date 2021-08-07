import jwt from "jsonwebtoken"

export const fetchAuthorize = (req, res, next) => {
    let token = req.headers.Authorization || req.headers.authorization;
    if (!token) {
        req.auth = false 
        next()
    }

    if (token.startsWith('Bearer ')) token = token.substr('Bearer '.length)

    jwt.verify(token, process.env.SECRET_KEY, err => {
        if (err) {
            throw err
        }
        req.auth = true
        next();
    });
}