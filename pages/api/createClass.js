import Cors from "cors";
import fs from "fs";

// Initializing the cors middleware
const cors = Cors()

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if(result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(req, res){
    await runMiddleware(req, res, cors)

    if(req.method == "POST"){
        if(fs.existsSync(`${req.body.cssPath}/props.json`)){
            fs.readFile(`${req.body.cssPath}/props.json`, "utf8", (err, data) => {
                if(err) console.log(err);
                let props = JSON.parse(data);
                if(props[`#${req.body.id}`]){
                    props[`.${req.body.class}`] = props[`#${req.body.id}`];
                    let rule = "\n" + `.${req.body.class}` + JSON.stringify(props[`#${req.body.id}`]).replace(/{/g, "{\n\t").replace(/"/g, "").replace(/,/g, ";\n\t").replace(/}/g, ';\n}')
                    fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props), "utf8", (err) => console.log(err));
                    fs.appendFile(`${req.body.cssFile}`, rule, (err) => console.log(err))
                }
            })
        }
    }
}