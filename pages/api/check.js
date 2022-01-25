import Cors from "cors";
import fs from "fs";

const cors = Cors();

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn){
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error){
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(req, res){
    await runMiddleware(req, res, cors)

    if(req.method === "GET"){
        fs.readFile("pages/api/appData/paths.json","utf8", (err, data) => {
            if(data){ res.send(data)}
            else{res.send({})}
        })
    }
}