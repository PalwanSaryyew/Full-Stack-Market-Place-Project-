import jwt from 'express-jwt';

export const authJwt = ()=>{
    const secret = process.env.JWT_SECRET
    const api = process.env.API_URL
    return jwt.expressjwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    })
    .unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methotds: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/ , methotds: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ , methotds: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/orders(.*)/ , methotds: ['GET', 'OPTIONS']},
            { url: /\/api\/v1\/users/, methods: ['POST', 'DELETE'] },
        ]
    })
}


async function isRevoked(req, payload, done){
    if(!payload.payload.isAdmin) {
        return Promise.resolve(true)
    }
    return Promise.resolve();
};
/* 
async function isRevoked(req, payload, done) {
    if (!payload.payload.isAdmin) {
      return true;
    }
    return false;
}
   */
