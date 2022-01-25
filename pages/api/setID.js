import Cors from 'cors'
import path from 'path'
import fs, { writeFile } from 'fs'

// Initializing the cors middleware
const cors = Cors()

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res){
    await runMiddleware(req, res, cors)
    
    if(req.method == "POST"){
      let files = fs.readdirSync(req.body.htmlPath, "utf8");
      files.forEach((file) => {
        if(file.endsWith("js") || file.endsWith("jsx") || file.endsWith("html")){
          fs.readFile(`${req.body.htmlPath}\\${file}`, "utf8", (err, res) => {
            if(err) console.log(err)

            let match = ""
            try{
              match = (req.body.element).match(/data-id=[0-9\'\"]*/g)[0]
              //match = match.replace(/"/g, "'")
              let setId = res.replace(match, match + ` id="${req.body.id}"`)
            fs.writeFile(`${req.body.htmlPath}\\${file}`, setId, "utf8", err => console.log(err));
            }catch{}
          })  
        }
      })

    }
    else{
      res.send("Page doesn't exist")
    }

    res.end()
}