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
        
        if(fs.existsSync(`${req.body.cssFile}`)){
            fs.readFile(`${req.body.cssFile}`, "utf8", (err, data) => {
                if(err) console.log(err);
                try{
                    let classes = []
                    classes = data.match(/([.][A-z0-9-_\n]*[ ]{|[.][A-z0-9-_]*{)/g);
                    classes = classes.sort();
                    for(let i=0; i<classes.length; i++){
                        classes[i] = classes[i].replace("{", "").replace(/ /g, "")
                    }
                    
                    for(let i=0; i<classes.length; i++){
                        if(classes[i] == classes[i+1]) delete classes[i]
                    }
                    let classes_list = []
                    for(let i=0; i<classes.length; i++){
                        if(classes[i]) classes_list.push((classes[i]).replace('.', ""))
                    }
                    res.send(classes_list)
                }catch{res.send("")}
            })
        }
    }
}