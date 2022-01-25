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

    if(req.method === "POST"){
           let files = fs.readdirSync(req.body.htmlPath, "utf8");
           req.body.element = (req.body.element).replace("class", "className")
           files.forEach((file) => {
               if(file.endsWith("js") || file.endsWith("jsx")){
                    fs.readFile(`${req.body.htmlPath}/${file}`, "utf8", (err, data) => {
                        if(err) console.log(err);

                        let element = (req.body.element).match(/data-id=[0-9"']*/g)[0]
                        if(data.indexOf(element) != -1 && (req.body.element).indexOf("className") != -1){
                            let index = data.indexOf("class", data.indexOf(element)) 
                            index = data.indexOf("=", index)+2
                            let part1 = data.slice(0, index) + `${req.body.class} `
                            let part2 = data.slice(index, data.length)
                            part1 = part1 + part2
                            fs.writeFile(`${req.body.htmlPath}/${file}`, part1, "utf8", (err) => console.log(err));
                        }else{
                            let setClass = data.replace(`id="${req.body.id}"`, `id="${req.body.id}" className="${req.body.class}"`)
                            fs.writeFile(`${req.body.htmlPath}/${file}`, setClass, "utf8", (err) => console.log(err));
                        }
                    })
               }
               else if(file.endsWith("html")){
                    fs.readFile(`${req.body.htmlPath}/${file}`, "utf8", (err, data) => {
                        if(err) console.log(err);

                        let element = (req.body.element).match(/data-id=[0-9"']*/g)[0]
                        if(data.indexOf(element) != -1 && (req.body.element).indexOf("class") != -1){
                            let index = data.indexOf("class", data.indexOf(element)) 
                            index = data.indexOf("=", index)+2
                            let part1 = data.slice(0, index) + `${req.body.class} `
                            let part2 = data.slice(index, data.length)
                            part1 = part1 + part2
                            fs.writeFile(`${req.body.htmlPath}/${file}`, part1, "utf8", (err) => console.log(err));
                        }else{
                            let setClass = data.replace(`id="${req.body.id}"`, `id="${req.body.id}" class="${req.body.class}"`)
                            fs.writeFile(`${req.body.htmlPath}/${file}`, setClass, "utf8", (err) => console.log(err));
                        }
                    })
               }
           })
        
    }
}
