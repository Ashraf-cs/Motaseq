import fs from "fs"
import path from "path";
try{
    fs.rmdirSync("pages/api/appData/backup", {recursive: true});
}catch{}

function htmlFile(path){
    if(fs.existsSync(path)){
        let files = fs.readdirSync(path, "utf8")
        files.forEach((file) => {
            if(file.endsWith("htm") || file.endsWith("html")){
                fs.readFile(`${path}/${file}`, "utf8", (err, res) => {
                    if(err) console.log(err)
                    fs.mkdirSync("pages/api/appData/backup", {recursive: true});
                    fs.copyFile(`${path}/${file}`, `pages/api/appData/backup/${file}`, (err) => console.log(err))
                    if(res.search(/data-id=[0-9"']*/) == -1){
                        let e = []
                        let slice = ""
                        let Res = res
                        while(res.search(/<[A-z0-9 ]*/) != -1){
                            slice = res.slice(res.search(/<[A-z0-9 ]*/), 
                            res.search(/[A-z0-9\"\>\/{} ]>/)+2)
                            e.push(slice)
                            res = res.replace(slice, "")
                            res = res.replace("/>","")
                        }
                        let ee = e.slice(0, e.length)
                        let arr = []
                        for(let i=0; i<ee.length; i++){
                            ee[i].match(/<[A-z0-9<>\/"'={}\n ]*/g).forEach((i)=>{
                                arr.push(i)
                            })
                        }

                        let arr2= arr.slice(0, arr.length)
                        for(let i=0; i<arr2.length; i++){
                            if(arr2[i].indexOf(" ") != -1 && !arr2[i].startsWith("</") && arr2[i].search(/data-id=[0-9"']*/) == -1){
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">')
                                .replace(" ", ` data-id="${Math.random().toString().slice(2,10)}" `)
                            }
                            else if(arr2[i].indexOf(" ") == -1 && !arr2[i].startsWith("</") && arr2[i].search(/data-id=[0-9"']*/) == -1){
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">')
                                .replace(">", ` data-id="${Math.random().toString().slice(2,10)}">`)
                            }
                            else{
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">').replace(arr2[i], arr2[i])
                            }
                        }

                        for(let i=0; i<arr.length; i++){
                            Res = Res.replace(arr[i], arr2[i])
                        }

                        let selector = `<script>function selector(e){const cssObj = window.getComputedStyle(e.target, null);let style = {};for (let x in cssObj) {let cssObjProp = cssObj.item(x);style[cssObjProp] = cssObj.getPropertyValue(cssObjProp);}let createdId = "";if(!e.target.id){createdId = "id"+Math.random().toString().slice(2,10);let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style, createdId], "*");e.target.setAttribute("id", createdId);}else{let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style], "*");}}document.body.addEventListener('click', selector);window.addEventListener("message", (event) => {if(event.data[0] == "style"){try{document.querySelector("#"+event.data[1]).style[(event.data[2])] = (event.data[3])}catch{}   }else if(event.data[0] == "outerHTML"){try{let outer = document.getElementById(event.data[1]).outerHTML;let parentWindow = window.parent;parentWindow.postMessage(["updatedOuter", outer], "*")}catch{}}})</script></body>`

                        let inject = Res.replace("</body>", selector);
                        fs.writeFile(`${path}/${file}`, inject, 'utf8', err => console.log(err));
                }
                })
            }
        })
    }
}

function reactFile(path){
    if(fs.existsSync(path)){
        let files = fs.readdirSync(path, "utf8");
        files.forEach((file) => {
            if(file.endsWith("js") || file.endsWith("jsx")){
                fs.readFile(`${path}/${file}`, "utf8", (err, res) => {
                    if(err) console.log(err)
                    if(res.search(/<[A-z0-9\.\-\#\_\n\t\(\)\+\;\@\{\}\:\'\"\=\,\!\$\%\^\&\*\?\|\/\\ ]*[^\/]>/) != -1 && res.search(/data-id=[0-9"']*/) == -1){
                        fs.mkdirSync("pages/api/appData/backup", {recursive: true});
                        fs.writeFile( `pages/api/appData/backup/${file}`,res, "utf8", (err) => console.log(err))
                        let e = []
                        let slice = ""
                        let Res = res
                        while(res.search(/<[A-z0-9 ]*/) != -1){
                            slice = res.slice(res.search(/<[A-z0-9 ]*/), 
                            res.search(/[A-z0-9\"\>\/{} ]>/)+2)
                            e.push(slice)
                            res = res.replace(slice, "")
                            res = res.replace("/>","")
                        }
                        let ee = e.slice(0, e.length)
                        let arr = []
                        for(let i=0; i<ee.length; i++){
                            ee[i].match(/<[A-z0-9<>\/"'={}\n ]*/g).forEach((i)=>{
                                arr.push(i)
                            })
                        }

                        let arr2= arr.slice(0, arr.length)
                        for(let i=0; i<arr2.length; i++){
                            if(arr2[i].indexOf(" ") != -1 && !arr2[i].startsWith("</") && arr2[i].search(/data-id=[0-9"']*/) == -1){
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">')
                                .replace(" ", ` data-id="${Math.random().toString().slice(2,10)}" `)
                            }
                            else if(arr2[i].indexOf(" ") == -1 && !arr2[i].startsWith("</") && arr2[i].search(/data-id=[0-9"']*/) == -1){
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">')
                                .replace(">", ` data-id="${Math.random().toString().slice(2,10)}">`)
                            }
                            else{
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">').replace(arr2[i], arr2[i])
                            }
                        }


                        for(let i=0; i<arr.length; i++){
                            Res = Res.replace(arr[i], arr2[i])
                        }
                        
                        let selector = ` onClick={(e)=>{const cssObj = window.getComputedStyle(e.target, null);let style = {};for (let x in cssObj) {let cssObjProp = cssObj.item(x);style[cssObjProp] = cssObj.getPropertyValue(cssObjProp);}let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style], "*");}}`

                        let script = `{window.addEventListener("message", (event) => {if(event.data[0] == "style"){try{document.querySelector("#"+event.data[1]).style[(event.data[2])] = (event.data[3])}catch{}}else if(event.data[0] == "outerHTML"){try{let outer = document.getElementById(event.data[1]).outerHTML;let parentWindow = window.parent;parentWindow.postMessage(["updatedOuter", outer], "*")}catch{}}})}`

                        let match = Res.match(/<[A-z0-9\.\-\#\_\n\t\(\)\+\;\@\{\}\:\'\"\=\,\!\$\%\^\&\*\?\|\/\\ ]*[^\/]>/g)[0]
                        let match2 = match.slice(0, match.length - 1)
                        let inject = Res.replace(match, match + `\n${script}\n`)
                        let inject2 = inject.replace(match2, match2 + selector);
                        
                        fs.writeFile(`${path}/${file}`, inject2, "utf8", err => console.log(err))
                    }
                })
            }
        })
    }
}

function nextjsFile(path){
    
    if(fs.existsSync(path)){
        
        let files = fs.readdirSync(path, "utf8");
        files.forEach((file) => {
            if(file.endsWith("js")){
                fs.readFile(`${path}/${file}`, "utf8", (err, res) => {
                    if(err) console.log(err)
                    if(res.search(/<[A-z0-9\.\-\#\_\n\t\(\)\+\;\@\{\}\:\'\"\=\,\!\$\%\^\&\*\?\|\/\\ ]*[^\/]>/) != -1 && res.search(/data-id=[0-9"']*/) == -1){
                        fs.mkdirSync("pages/api/appData/backup", {recursive: true});
                        fs.writeFile( `pages/api/appData/backup/${file}`,res, "utf8", (err) => console.log(err))
                        let e = []
                        let slice = ""
                        let Res = res
                        while(res.search(/<[A-z0-9 ]*/) != -1){
                            slice = res.slice(res.search(/<[A-z0-9 ]*/), 
                            res.search(/[A-z0-9\"\>\/{} ]>/)+2)
                            e.push(slice)
                            res = res.replace(slice, "")
                            res = res.replace("/>","")
                        }
                        let ee = e.slice(0, e.length)
                        let arr = []
                        for(let i=0; i<ee.length; i++){
                            ee[i].match(/<[A-z0-9<>\/"'={}\n ]*/g).forEach((i)=>{
                                arr.push(i)
                            })
                        }

                        let arr2= arr.slice(0, arr.length)
                        for(let i=0; i<arr2.length; i++){
                            if(arr2[i].indexOf(" ") != -1 && !arr2[i].startsWith("</")){
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">').
                                replace(" ", ` data-id="${Math.random().toString().slice(2,10)}" `)
                            }
                            else if(arr2[i].indexOf(" ") == -1 && !arr2[i].startsWith("</")){
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">')
                                .replace(">", ` data-id="${Math.random().toString().slice(2,10)}">`)
                            }
                            else{
                                arr2[i] = arr2[i].replace(/='/g, '="').replace(/' /g, '" ').replace(/'>/g, '">').replace(arr2[i], arr2[i])
                            }
                        }

                        for(let i=0; i<arr.length; i++){
                            Res = Res.replace(arr[i], arr2[i])
                        }
                        let selector = ` onClick={(e)=>{const cssObj = window.getComputedStyle(e.target, null);let style = {};for (let x in cssObj) {let cssObjProp = cssObj.item(x);style[cssObjProp] = cssObj.getPropertyValue(cssObjProp);}let parentWindow = window.parent;parentWindow.postMessage(["element",e.target.id, e.target.tagName, e.target.outerHTML, style], "*");}}`

                        let script = "<Script>{`"+`window.addEventListener("message", (event) => {if(event.data[0] == "style"){try{document.querySelector("#"+event.data[1]).style[(event.data[2])] = (event.data[3])}catch{}}else if(event.data[0] == "outerHTML"){try{let outer = document.getElementById(event.data[1]).outerHTML;let parentWindow = window.parent;parentWindow.postMessage(["updatedOuter", outer], "*")}catch{}}});`+"`}</Script>"
                        
                        let firstChar = Res.match(/./g)[0]
                        let match = Res.match(/<[A-z0-9\.\-\#\_\n\t\(\)\+\;\@\{\}\:\'\"\=\,\!\$\%\^\&\*\?\|\/\\ ]*[^\/]>/g)[0]
                        let match2 = match.slice(0, match.length - 1)
                        let inject = Res.replace(match, match + `\n${script}\n`)
                        let inject2 = inject.replace(match2, match2 + selector);
                        if(inject2.indexOf("import Script from") == -1){
                            let inject3 =  inject2.replace(firstChar, `import Script from 'next/script'\n${firstChar}`)
                            fs.writeFile(`${path}/${file}`, inject3, "utf8", err => console.log(err))
                        }
                        else{
                            fs.writeFile(`${path}/${file}`, inject2, "utf8", err => console.log(err))
                        }
                    }

                })
                
            }
        })
        
    }
}

function cssFile(path){
    if(fs.existsSync(path)){
        let selector = `\n*:hover{border: 1px solid black;}`
        fs.appendFile(`${path}`, selector, "utf8", err => console.log(err))
    }
}


export default function handler(req, res){
    if(req.method === "POST"){
        let cssPath = (req.body.cssFile).replace(/\\/g, "/").replace(/\/[^/]*.css/, "")
        if(req.body.type == "html"){
            htmlFile(req.body.htmlPath);
            cssFile(req.body.cssFile);
            fs.writeFile(`${cssPath}/props.json`,"{}", "utf8", (err) => console.log(err)); 
            let paths = {
                "htmlPath": req.body.htmlPath,
                "cssFile": req.body.cssFile,
                "cssPath": cssPath
            }
            fs.writeFile("pages/api/appData/paths.json", JSON.stringify(paths), "utf8", (err) => console.log(err));
            res.redirect('/styler');
        }
        else if(req.body.type == "react"){
            reactFile(req.body.htmlPath);
            cssFile(req.body.cssFile);
            fs.writeFile(`${cssPath}/props.json`,"{}", "utf8", (err) => console.log(err)); 
            let paths = {
                "htmlPath": req.body.htmlPath,
                "cssFile": req.body.cssFile,
                "cssPath": cssPath
            }
            fs.writeFile("pages/api/appData/paths.json", JSON.stringify(paths), "utf8", (err) => console.log(err));
            res.redirect('/styler');
        }
        else if(req.body.type == "nextjs"){
            nextjsFile(req.body.htmlPath);
            cssFile(req.body.cssFile);
            fs.writeFile(`${cssPath}/props.json`,"{}", "utf8", (err) => console.log(err));
            let paths = {
                "htmlPath": req.body.htmlPath,
                "cssFile": req.body.cssFile,
                "cssPath": cssPath
            }
            fs.writeFile("pages/api/appData/paths.json", JSON.stringify(paths), "utf8", (err) => console.log(err));
            res.redirect('/styler');
        }
        
    }else{
        res.send("Page doesn't exist")
    }
}

