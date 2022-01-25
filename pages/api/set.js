import Cors from 'cors'
import fs from 'fs'

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
    
    if(req.method === "POST"){
      // read current properities from props.json file
      fs.readFile(`${req.body.cssPath}/props.json`, "utf8", (err, data) => {
        if(err) console.log(err)
        let props = JSON.parse(data)
        if(req.body.catg == "margin-all"){
          let rule = `\n#${req.body.id}{
            margin:${req.body.margin}${req.body['margins-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].margin = `${req.body.margin}${req.body['margins-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "margin-c"){
          let rule = `\n#${req.body.id}{
            margin-top:${req.body["margin-top"]}${req.body['margin-unit']};
            margin-right:${req.body["margin-right"]}${req.body['margin-unit']};
            margin-bottom:${req.body["margin-bottom"]}${req.body['margin-unit']};
            margin-left:${req.body["margin-left"]}${req.body['margin-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['margin-top'] = `${req.body['margin-top']}${req.body['margin-unit']}`;
          props[`#${req.body.id}`]['margin-right'] = `${req.body['margin-right']}${req.body['margin-unit']}`;
          props[`#${req.body.id}`]['margin-bottom'] = `${req.body['margin-bottom']}${req.body['margin-unit']}`;
          props[`#${req.body.id}`]['margin-left'] = `${req.body['margin-left']}${req.body['margin-unit']}`;

          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "padding-all"){
          let rule = `\n#${req.body.id}{
            padding:${req.body.padding}${req.body['paddings-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].padding = `${req.body.padding}${req.body['paddings-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "padding-c"){
          let rule = `\n#${req.body.id}{
            padding-top:${req.body["padding-top"]}${req.body['padding-unit']};
            padding-right:${req.body["padding-right"]}${req.body['padding-unit']};
            padding-bottom:${req.body["padding-bottom"]}${req.body['padding-unit']};
            padding-left:${req.body["padding-left"]}${req.body['padding-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['padding-top'] = `${req.body['padding-top']}${req.body['padding-unit']}`;
          props[`#${req.body.id}`]['padding-right'] = `${req.body['padding-right']}${req.body['padding-unit']}`;
          props[`#${req.body.id}`]['padding-bottom'] = `${req.body['padding-bottom']}${req.body['padding-unit']}`;
          props[`#${req.body.id}`]['padding-left'] = `${req.body['padding-left']}${req.body['padding-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "font-style"){
          let rule = `\n#${req.body.id}{
            font-style:${req.body['font-style']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['font-style'] = `${req.body['font-style']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "font-weight"){
          let rule = `\n#${req.body.id}{
            font-weight:${req.body['font-weight']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['font-weight'] = `${req.body['font-weight']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "font-size"){
          let rule = `\n#${req.body.id}{
            font-size:${req.body['font-size']}${req.body['font-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['font-size'] = `${req.body['font-size']}${req.body['font-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "font-size-pre"){
          let rule = `\n#${req.body.id}{
            font-size:${req.body['font-size-pre']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['font-size'] = `${req.body['font-size-pre']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "font-family"){
          let rule = `\n#${req.body.id}{
            font-family:${req.body['font-family']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['font-family'] = `${req.body['font-family']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "font-color"){
          let rule = `\n#${req.body.id}{
            color:${req.body.color};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].color = `${req.body.color}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "width"){
          let rule = `\n#${req.body.id}{
            width:${req.body.width}${req.body['width-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].width = `${req.body.width}${req.body['width-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "height"){
          let rule = `\n#${req.body.id}{
            height:${req.body.height}${req.body['height-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].height = `${req.body.height}${req.body['height-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-color"){
          let rule = `\n#${req.body.id}{
            background-color:${req.body['background-color']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-color'] = `${req.body['background-color']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-image"){
          let rule = `\n#${req.body.id}{
            background-image:url('${req.body['background-image']}');
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-image'] = `url('${req.body['background-image']}')`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-position"){
          let rule = `\n#${req.body.id}{
            background-position:${req.body['background-position']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-position'] = `${req.body['background-position']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-attachment"){
          let rule = `\n#${req.body.id}{
            background-attachment:${req.body['background-attachment']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-attachment'] = `${req.body['background-attachment']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-clip"){
          let rule = `\n#${req.body.id}{
            background-clip:${req.body['background-clip']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-clip'] = `${req.body['background-clip']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-repeat"){
          let rule = `\n#${req.body.id}{
            background-repeat:${req.body['background-repeat']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-repeat'] = `${req.body['background-repeat']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-origin"){
          let rule = `\n#${req.body.id}{
            background-origin:${req.body['background-origin']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-origin'] = `${req.body['background-origin']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-size-pre"){
          let rule = `\n#${req.body.id}{
            background-size:${req.body['background-size']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['background-size'] = `${req.body['background-size']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "background-size-c"){
          let rule = `\n#${req.body.id}{
            background-size:${req.body['background-size-c']}${req.body['background-size-c-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]["background-size"] = `${req.body['background-size-c']}${req.body['background-size-c-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "border-all"){
          let rule = `\n#${req.body.id}{
            border:${req.body.border}${req.body['borders-unit']} ${req.body['border-style']} ${req.body['border-color']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]["border"] = `${req.body.border}${req.body['borders-unit']} ${req.body['border-style']} ${req.body['border-color']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "border-c"){
          let rule = `\n#${req.body.id}{
            border-top-width:${req.body['border-top-width']}${req.body['border-unit']};
            border-right-width:${req.body['border-right-width']}${req.body['border-unit']};
            border-bottom-width:${req.body['border-bottom-width']}${req.body['border-unit']};
            border-left-width:${req.body['border-left-width']}${req.body['border-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]["border-width"] = 
          `${req.body['border-top-width']}${req.body['border-unit']}` + 
          `${req.body['border-right-width']}${req.body['border-unit']}` + 
          `${req.body['border-bottom-width']}${req.body['border-unit']}` +
          `${req.body['border-left-width']}${req.body['border-unit']}`;

          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "border-color"){
          let rule = `\n#${req.body.id}{
            border-color:${req.body['border-color']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['border-color'] = `${req.body['border-color']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "border-style"){
          let rule = `\n#${req.body.id}{
            border-style:${req.body['border-style']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['border-style'] = `${req.body['border-style']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "border-radius"){
          let rule = `\n#${req.body.id}{
            border-radius:${req.body['border-radius']}${req.body['border-raduis-unit']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['border-radius'] = `${req.body['border-radius']}${req.body['border-raduis-unit']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "border-spacing"){
          let rule = `\n#${req.body.id}{
            border-spacing:${req.body['border-spacing-x']}px ${req.body['border-spacing-y']}px;
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['border-spacing'] = `${req.body['border-spacing-x']}px ${req.body['border-spacing-y']}px`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "border-collapse"){
          let rule = `\n#${req.body.id}{
            border-collapse:${req.body['border-collapse']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['border-collapse'] = `${req.body['border-collapse']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "outline-width-pre"){
          let rule = `\n#${req.body.id}{
            outline-width:${req.body['outline-width-pre']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['outline-width'] = `${req.body['outline-width-pre']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "outline-width-c"){
          let rule = `\n#${req.body.id}{
            outline-width:${req.body['outline-width']}px;
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['outline-width'] = `${req.body['outline-width']}px`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "outline-color"){
          let rule = `\n#${req.body.id}{
            outline-color:${req.body['outline-color']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['outline-color'] = `${req.body['outline-color']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "outline-style"){
          let rule = `\n#${req.body.id}{
            outline-style:${req.body['outline-style']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['outline-style'] = `${req.body['outline-style']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "outline-offset"){
          let rule = `\n#${req.body.id}{
            outline-offset:${req.body['outline-offset']}px;
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['outline-offset'] = `${req.body['outline-offset']}px`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-align"){
          let rule = `\n#${req.body.id}{
            text-align:${req.body['text-align']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-align'] = `${req.body['text-align']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "vertical-align"){
          let rule = `\n#${req.body.id}{
            vertical-align:${req.body['vertical-align']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['vertical-align'] = `${req.body['vertical-align']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "aaa"){
          let rule = `\n#${req.body.id}{
            aaa:${req.body['aaa']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['aaa'] = `${req.body['aaa']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-align-last"){
          let rule = `\n#${req.body.id}{
            text-align-last:${req.body['text-align-last']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-align-last'] = `${req.body['text-align-last']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-decoration"){
          let rule = `\n#${req.body.id}{
            text-decoration:${req.body['text-decoration']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-decoration'] = `${req.body['text-decoration']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-decoration-color"){
          let rule = `\n#${req.body.id}{
            text-decoration-color:${req.body['text-decoration-color']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-decoration-color'] = `${req.body['text-decoration-color']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-decoration-style"){
          let rule = `\n#${req.body.id}{
            text-decoration-style:${req.body['text-decoration-style']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-decoration-style'] = `${req.body['text-decoration-style']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-indent"){
          let rule = `\n#${req.body.id}{
            text-indent:${req.body['text-indent']}px;
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-indent'] = `${req.body['text-indent']}px`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-overflow"){
          let rule = `\n#${req.body.id}{
            text-overflow:${req.body['text-overflow']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-overflow'] = `${req.body['text-overflow']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "text-transform"){
          let rule = `\n#${req.body.id}{
            text-transform:${req.body['text-transform']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['text-transform'] = `${req.body['text-transform']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "display"){
          let rule = `\n#${req.body.id}{
            display:${req.body.display};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].display = `${req.body.display}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "position"){
          let rule = `\n#${req.body.id}{
            position:${req.body.position};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].position = `${req.body.position}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "z-index"){
          let rule = `\n#${req.body.id}{
            z-index:${req.body['z-index']};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`]['z-index'] = `${req.body['z-index']}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "overflow"){
          let rule = `\n#${req.body.id}{
            overflow:${req.body.overflow};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].overflow = `${req.body.overflow}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "float"){
          let rule = `\n#${req.body.id}{
            float:${req.body.float};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].float = `${req.body.float}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        else if(req.body.catg == "opacity"){
          let rule = `\n#${req.body.id}{
            opacity:${req.body.opacity};
          }`
          if(!props[`#${req.body.id}`]){
            props[`#${req.body.id}`] = {}
          }
          props[`#${req.body.id}`].opacity = `${req.body.opacity}`;
          fs.writeFile(`${req.body.cssPath}/props.json`, JSON.stringify(props) ,"utf8", (err) => console.log(err))
          fs.appendFile(`${req.body.cssFile}`, rule, err => console.log(err))
        }
        
      })
    }
    else{
      res.send("Page doesn't exist")
    }
    res.end()
}