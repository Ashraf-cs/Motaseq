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

    if(req.method === "POST"){
        let original_files = fs.readdirSync("pages/api/appData/backup", "utf-8");
        original_files.forEach((file) => {
            fs.copyFile(`pages/api/appData/backup/${file}`, `${req.body.htmlPath}/${file}`, (err) => console.log(err));
        })
        
        fs.readFile(`${req.body.cssFile}`, "utf8", (err, data) => {
            if(err) console.log(err);

            try{
                data = data.slice(0, data.indexOf(`*:hover{border: 1px solid black;}`))
                fs.writeFile(`${req.body.cssFile}`, data, "utf8", err => console.log(err))
            }catch{}
        })

        fs.rm(`${req.body.cssPath}/props.json`, (err) => console.log(err));
        fs.rm("pages/api/appData/paths.json", (err) => console.log(err));
        fs.rmdirSync("pages/api/appData/backup", {recursive: true});

    }

}