export function errorHandler(err, req, res, next){
    if (err){
        res.status(500).json({message: 'error in the server', err})
    }
}