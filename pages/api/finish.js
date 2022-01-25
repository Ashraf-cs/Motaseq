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

    let inject1 =`<script>function selector(e){const cssObj = window.getComputedStyle(e.target, null);let style = {};for (let x in cssObj) {let cssObjProp = cssObj.item(x);style[cssObjProp] = cssObj.getPropertyValue(cssObjProp);}let createdId = "";if(!e.target.id){createdId = "id"+Math.random().toString().slice(2,10);let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style, createdId], "*");e.target.setAttribute("id", createdId);}else{let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style], "*");}}document.body.addEventListener('click', selector);window.addEventListener("message", (event) => {if(event.data[0] == "style"){try{document.querySelector("#"+event.data[1]).style[(event.data[2])] = (event.data[3])}catch{}   }else if(event.data[0] == "outerHTML"){try{let outer = document.getElementById(event.data[1]).outerHTML;let parentWindow = window.parent;parentWindow.postMessage(["updatedOuter", outer], "*")}catch{}}})</script></body>`;
    
    let inject2 = ` onClick={(e)=>{const cssObj = window.getComputedStyle(e.target, null);let style = {};for (let x in cssObj) {let cssObjProp = cssObj.item(x);style[cssObjProp] = cssObj.getPropertyValue(cssObjProp);}let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style], "*");}}`;
    
    let inject3 = `{window.addEventListener("message", (event) => {if(event.data[0] == "style"){try{document.querySelector("#"+event.data[1]).style[(event.data[2])] = (event.data[3])}catch{}}else if(event.data[0] == "outerHTML"){try{let outer = document.getElementById(event.data[1]).outerHTML;let parentWindow = window.parent;parentWindow.postMessage(["updatedOuter", outer], "*")}catch{}}})}`;


    let inject4 = ` onClick={(e)=>{const cssObj = window.getComputedStyle(e.target, null);let style = {};for (let x in cssObj) {let cssObjProp = cssObj.item(x);style[cssObjProp] = cssObj.getPropertyValue(cssObjProp);}let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style], "*");}}`;

    
    let inject5 = "<Script>{`"+`window.addEventListener("message", (event) => {if(event.data[0] == "style"){try{document.querySelector("#"+event.data[1]).style[(event.data[2])] = (event.data[3])}catch{}}else if(event.data[0] == "outerHTML"){try{let outer = document.getElementById(event.data[1]).outerHTML;let parentWindow = window.parent;parentWindow.postMessage(["updatedOuter", outer], "*")}catch{}}});`+"`}</Script>";

    if(req.method === "POST"){
        let files = fs.readdirSync(req.body.htmlPath, "utf8");
        files.forEach((file) => {
            if(file.endsWith("js") || file.endsWith("jsx") || file.endsWith("html")){
                fs.readFile(`${req.body.htmlPath}/${file}`, "utf8", (err, data) => {
                    if(err) console.log(err);

                    data = data.replace(/[ ]data-id=[0-9"']*/g, "").replace(inject1, "</body>").replace(inject2, "").replace(inject3, "").replace(inject4, "").replace(inject5, "")
                    fs.writeFile(`${req.body.htmlPath}/${file}`, data, "utf8", err => console.log(err))
                })
            }
        })


        fs.readFile(`${req.body.cssFile}`, "utf8", (err, data) => {
            if(err) console.log(err);

            data = data.slice(0, data.indexOf(`*:hover{border: 1px solid black;}`))
            fs.writeFile(`${req.body.cssFile}`, data, "utf8", err => console.log(err))
            fs.readFile(`${req.body.cssPath}/props.json`, "utf8", (err, data) => {
                if(err) console.log(err);
    
                data = JSON.parse(data)
                let style =""
                for(let selector in data){
                if(selector != "#" && selector != "."){style += `\n${selector}{`
                for(let prop in data[selector]){
                    style +=`\n\t${prop}:${data[selector][prop]};`
                }
                style += "\n}"}
                }
                
                fs.appendFile(`${req.body.cssFile}`, style, "utf8", err => console.log(err))
                fs.rm(`${req.body.cssPath}/props.json`, (err) => console.log(err));
                fs.rm("pages/api/appData/paths.json", (err) => console.log(err));
                fs.rmdirSync("pages/api/appData/backup", {recursive: true});
            })
        })

        

    }
}

