import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useState } from "react";
import { useEffect } from 'react';

export default function Styler(){
    const[state, setState] = useState(true);
    const[classes, setClasses] = useState([]);

    function setAllBorder(){
      toTargetFrame(document.getElementById("id").value,"border", document.getElementById("border").value + document.getElementById("borders-unit").value)
      toTargetFrame(document.getElementById("id").value,"border-style", document.getElementById("border-style").value);
      toTargetFrame(document.getElementById("id").value,"border-color", document.getElementById("border-color").value);
      fetch('/api/set', {method: "POST", headers: {'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded'}, body: `catg=border-all&id=${document.getElementById("id").value}&` +
      `cssFile=${localStorage.getItem("cssFile")}&cssPath=${localStorage.getItem("cssPath")}&border=${document.getElementById("border").value}&` +
      `border-style=${document.getElementById("border-style").value}&borders-unit=${document.getElementById("borders-unit").value}&border-color=${document.getElementById("border-color").value}`})
    }

    useEffect(() => {
      fetch('/api/getClasses', {method: "POST", headers: {'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded'}, body: `cssFile=${localStorage.getItem('cssFile')}`}).then(res => res.json()).then(data => setClasses(data))
    },[state])
    

    function toTargetFrame(id, prop, value ){
      let frameWindow = window.frames[0]
      frameWindow.postMessage(["style",id, prop, value ], "*")
    }


    function updateOuter(id){

      if((localStorage.getItem("element")).indexOf("class") != -1){
        try{let element = localStorage.getItem("element")
      element = element.match(/<[A-z0-9\.\-\#\_\n\t\(\)\+\;\@\{\}\:\'\"\=\,\!\$\%\^\&\*\?\|\/\\ ]*[^\/]>/g)[0]
      let addClass = element.replace('class="', `class="${id} `)
      let setClass = element.replace(element, addClass)
      localStorage.setItem("element", setClass)}catch{}
      }
      else{
        let element = localStorage.getItem("element")
        element = element.match(/<[A-z0-9\.\-\#\_\n\t\(\)\+\;\@\{\}\:\'\"\=\,\!\$\%\^\&\*\?\|\/\\ ]*[^\/]>/g)[0]
        let addClass = element.replace(`id="${document.getElementById("id").value}"`, `id="${document.getElementById("id").value}" class="${id}"`)
        let setClass = element.replace(element, addClass)
        localStorage.setItem("element", setClass)
      }
    }

    
    function setClass(name){
      name = name.replace(".", "")
      fetch('/api/setClass', {method: "POST", headers: {'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded'},
       body: `htmlPath=${localStorage.getItem('htmlPath')}&id=${document.getElementById("id").value}&class=${name}&element=${localStorage.getItem("element")}`})
    }

    return (
      <div className="container mx-0 px-0" id="div">
      <Head>
        <title>Motaseq</title>
        <meta name="description" content="Style your web pages easly" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="row g-0" style={{width: "100vw", height: "100vh"}}>
        <div className="col-9" style={{ }}>
            <div className="bg-dark" style={{Height: "38px"}}>
              <div className="row d-flex justify-content-between">
                <div className="col py-1 ps-3" >
                  <div className="text-secondary text-warning"><b className="badge bg-secondary text-dark" style={{fontSize: "12.3px"}}>Server:</b> <code id="server" style={{color: "#00cc99", fontSize: "14.5px"}}></code></div>
                </div>
                <div className="col-auto pe-2">
                  <div className="row g-0 pe-1">
                    <div className="col-auto mt-1 me-1 pb-1" style={{maxWidth: "130px"}}>
                      <div className="input-group input-group-sm ms-0">
                        <span className="input-group-text bg-dark text-secondary fw-bold" style={{width: "40px"}}>Tag</span>
                        <input type="text" id="tag" name="tag" className="form-control bg-dark fw-bold" defaultValue="none" readOnly style={{color: "#00cc99"}}/>                      
                      </div>
                    </div>
                    <div className="col-auto mt-1 pb-1" style={{maxWidth: "140px"}}>
                      <div className="input-group input-group-sm ms-0">
                        <span className="input-group-text bg-dark text-secondary fw-bold"  style={{width: "35px"}} >ID</span>
                        <input type="text" id="id" name="id" className="form-control bg-dark fw-bold" defaultValue="none" readOnly style={{color: "#00cc99"}}/>
                      </div>
                    </div>
                    <div className="col-auto m-1 pb-1 pe-0 d-none" style={{maxWidth: "160px"}}>
                        <button className="badge rounded-1 text-dark mb-2 border-0 h-100" data-bs-toggle="collapse" data-bs-target="#class" style={{backgroundColor: "#00cc99"}}>As class</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <iframe id="iframe" className="w-100 h-100"></iframe>
        </div>
        <iframe name="refreshFrame" src="" hidden/>
        <div className="col-3">
            <div className="bg-dark px-3 pt-1 overflow-auto" style={{width: "auto", height: "100vh"}}>
                <div className="container">
                  <div className="mb-2" id="class">
                    <form method="post" action="/api/createClass" target="refreshFrame" onSubmit={(e)=>{setTimeout(()=>{setState(!state)}, 300)}}>
                      <div className="row g-1">
                        <div className="col-10">
                          <input name="cssPath" className="cssPath" hidden/>
                          <input name="cssFile" className="cssFile" hidden/>
                          <input name="id" className="id" hidden/>
                          <div className="input-group input-group-sm ms-0">
                            <span className="input-group-text bg-secondary text-dark fw-bold " style={{width: "90px"}}>set as class</span>
                            <input type="text" name="class" className="form-control bg-dark text-secondary" />                      
                          </div>
                        </div>
                        <div className="col">
                          <button type="submit" className="btn btn-sm btn-secondary w-100">Set</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div id="classes" className="container border border-secondary rounded px-1 py-1 overflow-auto" style={{minHeight: "55px"}}>
                      {classes.map((i, index) => {
                        return(
                          <span key={index} className="badge bg-light text-dark me-1" onClick={(e)=> {setClass(e.target.textContent); updateOuter(e.target.textContent)}}>{i}</span>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div id="props" className="row g-1 row-cols-lg-3 row-cols-sm-auto d-felx justify-content-center mt-1">
                <div className="col" >
                  <div className="">
                    {/* margin */}
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#margins" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Margin </button>
                  </div>
                </div>
                <div className="col">
                  <div className="">
                    {/* padding */}
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#paddings" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Padding </button>
                  </div>
                </div>
                {/* font */}
                <div className="col">
                  <div className="">
                      <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                        data-bs-target="#font" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Font </button>
                  </div>
                </div>
                {/* Width */}
                <div className="col">
                  <div className="">
                      <button className="btn btn-sm btn-dark border-secondary p-0" data-bs-toggle="collapse" 
                        data-bs-target="#WIDTH" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Width</button>
                    </div>
                </div>
                {/* Height */}
                <div className="col">
                  <div className="">
                      <button className="btn btn-sm btn-dark border-secondary p-0" data-bs-toggle="collapse" 
                        data-bs-target="#HIGHT" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Height</button>
                    </div>
                </div>
                {/* Background */}
                <div className="col">
                  <div className="">
                      <button className="btn btn-sm btn-dark border-secondary p-0" data-bs-toggle="collapse" 
                        data-bs-target="#background" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Background </button>
                  </div>
                </div>
                {/* Borders */}
                <div className="col">
                  <div className="">
                      <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                        data-bs-target="#borders" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Borders </button>
                    </div>
                </div>
                {/* Outline */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#outline" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Outline </button>
                  </div>
                </div>
                {/* Text */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#text" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Text </button>
                  </div>
                </div>
                {/* Display */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#display" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Display </button>
                  </div>
                </div>
                {/* Position */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#position" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Position </button>
                  </div>
                </div>
                {/* z-index */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#z-index" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Z-index </button>
                  </div>
                </div>
                {/* Overflow */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#overflow" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Overflow </button>
                  </div>
                </div>
                {/* Float */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#float" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Float </button>
                  </div>
                </div>
                {/* Opacity */}
                <div className="col">
                  <div className="">
                    <button className="btn btn-sm btn-dark border-secondary" data-bs-toggle="collapse" 
                      data-bs-target="#opacity" style={{width: "96px", height: "30px", fontSize: "13.5px"}}>Opacity </button>
                  </div>
                </div>
              </div>
                <div id="views" className="accordion mt-3 py-2 border-top border-secondary" style={{borderColor: "#00cc99"}}>
                    {/* Margin */}
                    <div className="accordion-collapse collapse" id="margins" data-bs-parent="#views">
                        <div className="py-2">
                          <div className="row my-2 d-flex justify-content-center">
                            <input type="radio" name="margin-all" id="margin-all" className="btn-check" defaultChecked/>
                            <label htmlFor="margin-all" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px", width: "90px"}}>All</label>
                          </div>
                          <form name="margin-all-form" action="/api/set" target="refreshFrame" method="post">
                            <fieldset id="margin-all-field">
                              <input name="catg" value="margin-all" hidden/>
                              <input name="cssPath" className="cssPath" hidden/>
                              <input name="cssFile" className="cssFile" hidden/>
                              <input name="id" className="id" hidden/>
                              <input name="tagName" className="TagName" hidden/>
                              <div className="row mb-3 g-1" id="margins-row">
                                <div className="col">
                                  <div className="input-group input-group-sm ms-0">
                                    <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "64px"}}>Margins</span>
                                    <input type="number" name="margin" id="margin" className="form-control bg-dark text-secondary border-secondary" 
                                      min="0" defaultValue="0" 
                                      onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"margin",
                                        e.target.value + document.getElementById("margins-unit").value); e.target.form.submit()}}/>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="input-group input-group-sm ms-0">
                                    <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "40px"}}>Unit</span>
                                    <select name="margins-unit" id="margins-unit" className="form-select bg-dark text-secondary border-secondary"
                                      onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"margin",
                                        document.getElementById("margin").value + e.target.value); e.target.form.submit()}}>
                                      <option value="px">px</option>
                                      <option value="em">em</option>
                                      <option value="rem">rem</option>
                                      <option value="%">%</option>
                                      <option value="vw">vw</option>
                                      <option value="auto">auto</option>
                                      <option value="initial">initial</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </form>
                          <div className="row mb-2 d-flex justify-content-center">
                            <input type="radio" name="margin-c" id="margin-c" className="btn-check"/>
                            <label htmlFor="margin-c" className="btn btn-sm btn-outline-secondary  py-0 px-1" style={{fontSize: "13px", width: "90px"}}>Custom</label>
                          </div>
                          <form name="margin-c-form" id="margin-c-form" action="/api/set" target="refreshFrame" method="post">
                            <fieldset id="margin-c-field">
                              <input name="catg" value="margin-c" hidden/>
                              <input name="cssPath" className="cssPath" hidden/>
                              <input name="cssFile" className="cssFile" hidden/>
                              <input name="id" className="id" hidden/>
                              <input name="tagName" className="TagName" hidden/>
                              <div className="row mb-2">
                                <div className="input-group input-group-sm  ms-0">
                                    <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Unit</span>
                                    <select name="margin-unit" id="margin-unit" className="form-select bg-dark text-secondary border-secondary" 
                                      onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"margin",
                                        `${document.getElementById("margin-top").value}${e.target.value} ` +
                                        `${document.getElementById("margin-right").value}${e.target.value} ` +
                                        `${document.getElementById("margin-bottom").value}${e.target.value} ` +
                                        `${document.getElementById("margin-left").value}${e.target.value}`
                                        ); e.target.form.submit()}}>
                                      <option value="px">px</option>
                                      <option value="em">em</option>
                                      <option value="rem">rem</option>
                                      <option value="vw">vw</option>
                                      <option value="vh">vh</option>
                                      <option value="%">%</option>
                                    </select>
                                  </div>
                              </div>
                              <div className="row mb-2">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Right</span>
                                      <input type="number" name="margin-right" id="margin-right" className="form-control bg-dark text-secondary border-secondary"
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"margin-right",
                                        e.target.value + document.getElementById("margin-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                              <div className="row mb-2">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Left</span>
                                      <input type="number" name="margin-left" id="margin-left" className="form-control bg-dark text-secondary border-secondary"
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"margin-left",
                                        e.target.value + document.getElementById("margin-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                              <div className="row mb-2">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Top</span>
                                      <input type="number" name="margin-top" id="margin-top" className="form-control bg-dark text-secondary border-secondary" 
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"margin-top",
                                        e.target.value + document.getElementById("margin-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Bottom</span>
                                      <input type="number" name="margin-bottom" id="margin-bottom" className="form-control bg-dark text-secondary border-secondary"
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"margin-bottom",
                                        e.target.value + document.getElementById("margin-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                            </fieldset>
                          </form>
                        </div>
                    </div>
                    {/* { Padding } */}
                    <div className="accordion-collapse collapse" id="paddings" data-bs-parent="#views">
                        <div className="py-2">
                          <div className="row my-2 d-flex justify-content-center">
                            <input type="radio" name="padding-all" id="padding-all" className="btn-check" defaultChecked/>
                            <label htmlFor="padding-all" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px", width: "90px"}}>All</label>
                          </div>
                          <form name="padding-all-form" action="/api/set" target="refreshFrame" method="post">
                            <fieldset id="padding-all-field">
                              <input name="catg" value="padding-all" hidden/>
                              <input name="cssPath" className="cssPath" hidden/>
                              <input name="cssFile" className="cssFile" hidden/>
                              <input name="id" className="id" hidden/>
                              <input name="tagName" className="TagName" hidden/>
                              <div className="row mb-3 g-1" id="paddings-row">
                                <div className="col">
                                  <div className="input-group input-group-sm ms-0">
                                    <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "64px"}}>Padding</span>
                                    <input type="number" name="padding" id="padding" className="form-control bg-dark text-secondary border-secondary" 
                                      min="1" defaultValue="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"padding",
                                        e.target.value + document.getElementById("paddings-unit").value); e.target.form.submit()}}/>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="input-group input-group-sm ms-0">
                                    <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "40px"}}>Unit</span>
                                    <select name="paddings-unit" id="paddings-unit" className="form-select bg-dark text-secondary border-secondary"
                                      onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"padding",
                                        document.getElementById("padding").value + e.target.value); e.target.form.submit()}}>
                                      <option value="px">px</option>
                                      <option value="em">em</option>
                                      <option value="rem">rem</option>
                                      <option value="%">%</option>
                                      <option value="vw">vw</option>
                                      <option value="auto">auto</option>
                                      <option value="initial">initial</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </form>
                          <div className="row mb-2 d-flex justify-content-center">
                            <input type="radio" name="padding-c" id="padding-c" className="btn-check"/>
                            <label htmlFor="padding-c" className="btn btn-sm btn-outline-secondary  py-0 px-1" style={{fontSize: "13px", width: "90px"}}>Custom</label>
                          </div>
                          <form name="padding-c-form" id="padding-c-form" action="/api/set" target="refreshFrame" method="post">
                            <fieldset id="padding-c-field">
                              <input name="catg" value="padding-c" hidden/>
                              <input name="cssPath" className="cssPath" hidden/>
                              <input name="cssFile" className="cssFile" hidden/>
                              <input name="id" className="id" hidden/>
                              <input name="tagName" className="TagName" hidden/>
                              <div className="row mb-2">
                                <div className="input-group input-group-sm  ms-0">
                                    <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Unit</span>
                                    <select name="padding-unit" id="padding-unit" className="form-select bg-dark text-secondary border-secondary" 
                                      onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"padding",
                                        `${document.getElementById("padding-top").value}${e.target.value} ` +
                                        `${document.getElementById("padding-right").value}${e.target.value} ` +
                                        `${document.getElementById("padding-bottom").value}${e.target.value} ` +
                                        `${document.getElementById("padding-left").value}${e.target.value}`
                                        ); e.target.form.submit()}}>
                                      <option value="px">px</option>
                                      <option value="em">em</option>
                                      <option value="rem">rem</option>
                                      <option value="vw">vw</option>
                                      <option value="vh">vh</option>
                                      <option value="%">%</option>
                                    </select>
                                  </div>
                              </div>
                              <div className="row mb-2">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Right</span>
                                      <input type="number" name="padding-right" id="padding-right" className="form-control bg-dark text-secondary border-secondary"
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"padding-right",
                                        e.target.value + document.getElementById("padding-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                              <div className="row mb-2">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Left</span>
                                      <input type="number" name="padding-left" id="padding-left" className="form-control bg-dark text-secondary border-secondary"
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"padding-left",
                                        e.target.value + document.getElementById("padding-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                              <div className="row mb-2">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Top</span>
                                      <input type="number" name="padding-top" id="padding-top" className="form-control bg-dark text-secondary border-secondary" 
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"padding-top",
                                        e.target.value + document.getElementById("padding-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Bottom</span>
                                      <input type="number" name="padding-bottom" id="padding-bottom" className="form-control bg-dark text-secondary border-secondary"
                                        defaultValue="0" min="0" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"padding-bottom",
                                        e.target.value + document.getElementById("padding-unit").value); e.target.form.submit()}}/>
                                    </div>
                                  </div>
                              </div>
                            </fieldset>
                          </form>
                        </div>
                    </div>
                    {/* Font */}
                    <div className="accordion-collapse collapse" id="font" data-bs-parent="#views">
                        <div className="py-2">
                        {/* font style */}
                          <form name="font-style-form"  action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="font-style" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="col">
                                <div className="d-flex justify-content-between">
                                <span className="text-secondary">Style</span>
                                <div className="mx-auto" style={{width: "150px"}}>
                                    <div className="d-flex justify-content-between" >
                                    <input type="radio" name="font-style" id="font-style-normal" value="normal" className="btn-check" defaultChecked
                                      onClick={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"font-style", e.target.value); e.target.form.submit()}} />
                                    <label htmlFor="font-style-normal" className="btn btn-sm btn-outline-secondary  py-0 px-1" style={{fontSize: "13px", width: "60px"}}>Normal</label>
                                    <input type="radio" name="font-style" id="font-style-italic" value="italic" className="btn-check"
                                      onClick={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"font-style", e.target.value); e.target.form.submit()}} />
                                    <label htmlFor="font-style-italic" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px", width: "60px"}}>Italic</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* font weight */}
                          <form name="font-weight-form"  action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="font-weight" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="col">
                                <div className="d-flex justify-content-between">
                                  <span className="text-secondary">Weight</span>
                                  <div className="mx-auto" style={{width: "150px"}}>
                                    <div className="d-flex justify-content-between" >
                                    <input type="radio" name="font-weight" id="fw-normal" value="normal" className="btn-check" defaultChecked 
                                      onClick={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"font-weight", e.target.value); e.target.form.submit()}} />
                                    <label htmlFor="fw-normal" className="btn btn-sm btn-outline-secondary  py-0 px-1" style={{fontSize: "13px", width: "60px"}}>Normal</label>
                                    <input type="radio" name="font-weight" id="bold" value="bold" className="btn-check" onClick={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"font-weight", e.target.value); e.target.form.submit()}} />
                                    <label htmlFor="bold" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px", width: "60px"}}>Bold</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* font size */}
                          <form name="font-size-form"  action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="font-size" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="container border border-secondary rounded mb-2 px-2 pt-1">
                              <span className="text-secondary">Size</span>
                              <div className="row mb-3 mt-2">
                                <div className="col">
                                  <div className="mx-auto" style={{width: "150px"}}>
                                    <div className="d-flex justify-content-between" >
                                    <input type="radio" name="fs-type" id="fs-type-pre" className="btn-check" />
                                    <label htmlFor="fs-type-pre" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px"}} 
                                      >Predefined</label>
                                    <input type="radio" name="fs-type" id="fs-type-c" className="btn-check" defaultChecked />
                                    <label htmlFor="fs-type-c" className="btn btn-sm btn-outline-secondary  py-0 px-1" style={{fontSize: "13px"}} 
                                      onClick={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"font-size", 
                                        document.getElementById("font-size").value + document.getElementById("font-unit").value); e.target.form.submit()}}>Custom</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="row mb-2">
                                  <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Unit</span>
                                      <select name="font-unit" id="font-unit" className="form-select bg-dark text-secondary border-secondary" 
                                        onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"font-size", 
                                        document.getElementById("font-size").value + e.target.value); e.target.form.submit()}}>
                                        <option value="px">px</option>
                                        <option value="em">em</option>
                                        <option value="%">%</option>
                                      </select>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                      <div className="input-group input-group-sm ms-0">
                                        <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Size</span>
                                        <input type="number" name="font-size" id="font-size" className="form-control bg-dark text-secondary border-secondary" min="1" defaultValue="0" 
                                          onChange={(e)=>{
                                          toTargetFrame(document.getElementById("id").value,"font-size", 
                                          e.target.value + document.getElementById("font-unit").value); e.target.form.submit()}}/>
                                      </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                  <form name="font-size-pre-form"  action="/api/set" target="refreshFrame" method="post">
                                    <input name="catg" value="font-size-pre" hidden/>
                                    <input name="cssPath" className="cssPath" hidden/>
                                    <input name="cssFile" className="cssFile" hidden/>
                                    <input name="id" className="id" hidden/>
                                    <input name="tagName" className="TagName" hidden/>
                                    <div className="">
                                      <div className="row mb-2">
                                        <div className="input-group input-group-sm ms-0">
                                          <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Predefined</span>
                                          <select name="font-size-pre" id="font-size-pre" className="form-select bg-dark text-secondary border-secondary" 
                                            onChange={(e)=>{
                                              toTargetFrame(document.getElementById("id").value,"font-size", 
                                              e.target.value); e.target.form.submit()}}>
                                            <option value="xx-small">xx-small</option>
                                            <option value="x-small">x-small</option>
                                            <option value="small">small</option>
                                            <option value="medium">medium</option>
                                            <option value="large">large</option>
                                            <option value="x-large">x-large</option>
                                            <option value="xx-large">xx-large</option>
                                            <option value="smaller">smaller</option>
                                            <option value="larger">larger</option>
                                            <option value="initial">initial</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                            </form>
                          
                          {/* font family */}
                          <form name="font-family-form"  action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="font-family" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Family</span>
                                <select name="font-family" id="font-family" className="form-select bg-dark text-secondary border-secondary" 
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"font-family", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="Verdana, sans-serif">Verdana, sans-serif</option>
                                  <option value="Georgia, serif">Georgia, serif</option>
                                  <option value="Garamond, serif">Garamond, serif</option>
                                  <option value="Helvetica, sans-serif">Helvetica, sans-serif</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Palatino Linotype">Palatino Linotype</option>
                                  <option value="Book Antiqua">Book Antiqua</option>
                                  <option value="Times New Roman">Times New Roman</option>
                                  <option value="Arial">Arial</option>
                                  <option value="Helvetica">Helvetica</option>
                                  <option value="Arial Black">Arial Black</option>
                                  <option value="Impact">Impact</option>
                                  <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                  <option value="Tahoma">Tahoma</option>
                                  <option value="Verdana">Verdana</option>
                                  <option value="Courier New">Courier New</option>
                                  <option value="Lucida Console">Lucida Console</option>
                                  <option value="Merriweather, serif">Merriweather, serif</option>
                                  <option value="Lora, serif">Lora, serif</option>
                                  <option value="Ubuntu, sans-serif">Ubuntu, sans-serif</option>
                                  <option value="Poppins, sans-serif">Poppins, sans-serif</option>
                                  <option value="'Abril Fatface', serif">`&apos;`Abril Fatface`&apos;`, serif</option>
                                  <option value="'Fauna One', serif">`&apos;`Fauna One`&apos;`, serif</option>
                                  <option value="Cinzel, serif">Cinzel, serif</option>
                                  <option value="'Libre Baskerville', serif">`&apos;`Libre Baskerville`&apos;`, serif</option>
                                  <option value="'Fjalla One', sans-serif">`&apos;`Fjalla One`&apos;`, sans-serif</option>
                                  <option value="Muli, sans-serif">Muli, sans-serif</option>
                                  <option value='"Space Mono", monospace'>`&quot;`Space Mono`&quot;`, monospace</option>
                                  <option value="Rubik, sans-serif">Rubik, sans-serif</option>
                                  <option value="Spectral, serif">Spectral, serif</option>
                                  <option value='"Noto Sans", sans-serif'>`&quot;`Noto Sans`&quot;`, sans-serif</option>
                                  <option value="Oswald, sans-serif">Oswald, sans-serif</option>
                                  <option value="initial">initial</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* font color */}
                          <form name="font-color-form"  action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="font-color" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Color</span>
                                  <input type="color" name="color" className="form-control bg-dark text-secondary border-secondary" 
                                    style={{height: "auto"}} onChange={(e)=>{
                                      toTargetFrame(document.getElementById("id").value,"color", 
                                      e.target.value); e.target.form.submit()}}/>
                                </div>
                              </div>
                            </div>                        
                          </form>
                        </div>
                      </div>
                      {/* Width */}
                      <div className="accordion-collapse collapse" id="WIDTH" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="width-form"  action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="width" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2 g-1">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "55px"}}>Width</span>
                                  <input type="number" name="width" id="width" className="form-control bg-dark text-secondary border-secondary" 
                                    min="0" defaultValue="0" onChange={(e)=>{
                                      toTargetFrame(document.getElementById("id").value,"width", 
                                      e.target.value + document.getElementById("width-unit").value); e.target.form.submit()}}/>
                                </div>
                              </div>
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "40px"}}>Unit</span>
                                  <select name="width-unit" id="width-unit" className="form-select bg-dark text-secondary border-secondary" 
                                    onChange={(e)=>{
                                      toTargetFrame(document.getElementById("id").value,"width", 
                                      document.getElementById("width").value + e.target.value); e.target.form.submit()}}>
                                    <option value="px">px</option>
                                    <option value="em">em</option>
                                    <option value="rem">rem</option>
                                    <option value="%">%</option>
                                    <option value="vw">vw</option>
                                    <option value="auto">auto</option>
                                    <option value="initial">initial</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* Height */}
                      <div className="accordion-collapse collapse" id="HIGHT" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="height-form"  action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="height" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2 g-1">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "55px"}}>Height</span>
                                  <input type="number" name="height" id="height" className="form-control bg-dark text-secondary border-secondary" 
                                    min="0" defaultValue="0" onChange={(e)=>{
                                      toTargetFrame(document.getElementById("id").value,"height", 
                                      e.target.value + document.getElementById("height-unit").value); e.target.form.submit()}}/>
                                </div>
                              </div>
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "40px"}}>Unit</span>
                                  <select name="height-unit" id="height-unit" className="form-select bg-dark text-secondary border-secondary" 
                                  onChange={(e)=>{
                                      toTargetFrame(document.getElementById("id").value,"height", 
                                      document.getElementById("height").value + e.target.value); e.target.form.submit()}}>
                                    <option value="px">px</option>
                                    <option value="em">em</option>
                                    <option value="rem">rem</option>
                                    <option value="%">%</option>
                                    <option value="vh">vh</option>
                                    <option value="auto">auto</option>
                                    <option value="initial">initial</option>
                                  </select>
                                </div>
                              </div>
                            </div>                       
                          </form>
                        </div>
                      </div>
                      {/* Background */}
                      <div className="accordion-collapse collapse" id="background" data-bs-parent="#views">
                        <div className="py-2">
                          {/* Background color */}
                          <form name="background-color-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="background-color" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Color</span>
                                  <input type="color" name="background-color" id="background-color" className="form-control bg-dark text-secondary border-secondary" 
                                    defaultValue="#ffffff" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"background-color", e.target.value); 
                                        e.target.form.submit()}} style={{height: "auto"}}/>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* Background image */}
                          <form name="bg-image-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="background-image" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Image</span>
                                  <input type="text" name="background-image" className="form-control bg-dark text-secondary border-secondary" 
                                    placeholder="URL, reative or full path" defaultValue="''" onBlur={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"background-image", `url("${e.target.value}")`); 
                                        e.target.form.submit()}} style={{height: "auto"}}/>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* Background position */}
                          <form name="background-position-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="background-position" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Position</span>
                                <select name="background-position" id="background-position" className="form-select bg-dark text-secondary border-secondary" 
                                  defaultValue="initial" onChange={(e)=>{
                                        toTargetFrame(document.getElementById("id").value,"background-position", e.target.value); 
                                        e.target.form.submit()}}>
                                  <option value="left top">left top</option>
                                  <option value="left center">left center</option>
                                  <option value="left bottom">left bottom</option>
                                  <option value="right top">right top</option>
                                  <option value="right center">right center</option>
                                  <option value="right bottom">right bottom</option>
                                  <option value="center top">center top</option>
                                  <option value="center center">center center</option>
                                  <option value="center bottom">center bottom</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* Background attachment */}
                          <form name="background-attachment-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="background-attachment" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Attachment</span>
                                <select name="background-attachment" id="background-attachment" className="form-select bg-dark text-secondary border-secondary" 
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"background-attachment", e.target.value); 
                                    e.target.form.submit()}}>
                                  <option value="scroll">scroll</option>
                                  <option value="fixed">fixed</option>
                                  <option value="local">local</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div> 
                          </form>
                          {/* Background clip */}
                          <form name="background-clip-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="background-clip" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Clip</span>
                                <select name="background-clip" id="background-clip" className="form-select bg-dark text-secondary border-secondary" 
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"background-clip", e.target.value); 
                                    e.target.form.submit()}}>
                                  <option value="border-box">border-box</option>
                                  <option value="padding-box">padding-box</option>
                                  <option value="content-box">content-box</option>
                                  <option value="initial">initial</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* Background repeat */}
                          <form name="background-repeat-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="background-repeat" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Repeat</span>
                                <select name="background-repeat" id="background-repeat" className="form-select bg-dark text-secondary border-secondary" 
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"background-repeat", e.target.value); 
                                    e.target.form.submit()}}>
                                  <option value="repeat">repeat</option>
                                  <option value="repeat-x">repeat-x</option>
                                  <option value="repeat-y">repeat-y</option>
                                  <option value="no-repeat">no-repeat</option>
                                  <option value="space">space</option>
                                  <option value="round">round</option>
                                  <option value="initial">initial</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* Background origin */}
                          <form name="background-origin-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="background-origin" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Origin</span>
                                <select name="background-origin" id="background-origin" className="form-select bg-dark text-secondary border-secondary" 
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"background-origin", e.target.value); 
                                    e.target.form.submit()}}>
                                  <option value="padding-box">padding-box</option>
                                  <option value="border-box">border-box</option>
                                  <option value="content-box">content-box</option>
                                  <option value="no-repeat">no-repeat</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div> 
                          </form>
                          {/* Background size */}
                          <div className="row my-2 d-flex justify-content-around text-secondary">
                              Size
                              <input type="radio" name="background-size-type-c" id="background-size-type-c" className="btn-check" />
                              <label htmlFor="background-size-type-c" className="btn btn-sm btn-outline-secondary  py-0 px-1" style={{fontSize: "13px", width: "90px"}}>Custom</label>
                              <input type="radio" name="background-size-type-pre" id="background-size-type-pre" className="btn-check" defaultChecked />
                              <label htmlFor="background-size-type-pre" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px", width: "90px"}}>Predefined</label>
                          </div>
                          
                            <form name="background-size-pre-form" action="/api/set" target="refreshFrame" method="post">
                              <fieldset id="background-size-pre-field">
                                <input name="catg" value="background-size-pre" hidden/>
                                <input name="cssPath" className="cssPath" hidden/>
                                <input name="cssFile" className="cssFile" hidden/>
                                <input name="id" className="id" hidden/>
                                <input name="tagName" className="TagName" hidden/>
                                <div className="row mb-3 g-1" id="paddings-row">
                                  <div className="col">
                                    <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "40px"}}>Size</span>
                                      <select name="background-size" id="background-size" className="form-select bg-dark text-secondary border-secondary"
                                        onChange={(e)=>{
                                          toTargetFrame(document.getElementById("id").value,"background-size", 
                                          e.target.value); e.target.form.submit()}}>
                                        <option value="auto">auto</option>
                                        <option value="cover">cover</option>
                                        <option value="contain">contain</option>
                                        <option value="initial">initial</option>
                                        <option value="inherit">inherit</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </form>
                            
                            <form name="background-size-c-form" action="/api/set" target="refreshFrame" method="post">
                              <fieldset id="background-size-c-field">
                                <input name="catg" value="background-size-c" hidden/>
                                <input name="cssPath" className="cssPath" hidden/>
                                <input name="cssFile" className="cssFile" hidden/>
                                <input name="id" className="id" hidden/>
                                <input name="tagName" className="TagName" hidden/>
                                <div className="row mb-2">
                                  <div className="input-group input-group-sm ms-0">
                                      <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Unit</span>
                                      <select name="background-size-c-unit" id="background-size-c-unit" className="form-select bg-dark text-secondary border-secondary" 
                                        onChange={(e)=>{
                                          toTargetFrame(document.getElementById("id").value,"background-size", 
                                          document.getElementById("background-size-c").value + e.target.value); e.target.form.submit()}}>
                                        <option value="px">px</option>
                                        <option value="em">em</option>
                                        <option value="%">%</option>
                                      </select>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                      <div className="input-group input-group-sm ms-0">
                                        <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "60px"}}>Size</span>
                                        <input type="number" name="background-size-c" id="background-size-c" className="form-control bg-dark text-secondary border-secondary"
                                          defaultValue="0" min="0" onChange={(e)=>{
                                          toTargetFrame(document.getElementById("id").value,"background-size", 
                                          e.target.value + document.getElementById("background-size-c-unit").value ); e.target.form.submit()}}/>
                                      </div>
                                    </div>
                                </div>
                              </fieldset>
                            </form>
                          </div>
                        </div>
                    {/* Borders */}
                    <div className="accordion-collapse collapse" id="borders" data-bs-parent="#views">
                        <div className="py-2">
                        <form name="borders-form" action="/api/set" target="refreshFrame" method="post">
                          <input name="catg" id="border-catg" value="borders" hidden/>
                          <input name="cssPath" className="cssPath" hidden/>
                          <input name="cssFile" className="cssFile" hidden/>
                          <input name="id" className="id" hidden/>
                          <input name="tagName" className="TagName" hidden/>
                              <div className="row mb-3 mt-2">
                                <div>
                                  {/* Border width */}
                                    <form name="border-all-form" action="/api/set" target="refreshFrame" method="post">
                                      <fieldset id="border-all-field">
                                        <input name="catg" value="border-all" hidden/>
                                        <input name="cssPath" className="cssPath" hidden/>
                                        <input name="cssFile" className="cssFile" hidden/>
                                        <input name="id" className="id" hidden/>
                                        <input name="tagName" className="TagName" hidden/>
                                        <div className="row mb-3 g-1" id="borders-row">
                                          <div className="col">
                                            <div className="input-group input-group-sm ms-0">
                                              <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "64px"}}>Width</span>
                                              <input type="number" name="border" id="border" className="form-control bg-dark text-secondary border-secondary" 
                                                min="1" defaultValue="0" onChange={(e)=>{
                                                  setAllBorder()}}/>
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="input-group input-group-sm ms-0">
                                              <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "40px"}}>Unit</span>
                                              <select name="borders-unit" id="borders-unit" className="form-select bg-dark text-secondary border-secondary"
                                                onChange={(e)=>{
                                                  toTargetFrame(document.getElementById("id").value,"border", 
                                                  document.getElementById("border").value + e.target.value); e.target.form.submit()}}>
                                                <option value="px">px</option>
                                                <option value="em">em</option>
                                                <option value="rem">rem</option>
                                                <option value="%">%</option>
                                                <option value="vw">vw</option>
                                                <option value="auto">auto</option>
                                                <option value="initial">initial</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </fieldset>
                                    </form>
                                  {/* Border color */}
                                  <form name="border-color-form" action="/api/set" target="refreshFrame" method="post">
                                    <input name="catg" value="border-color" hidden/>
                                    <input name="cssPath" className="cssPath" hidden/>
                                    <input name="cssFile" className="cssFile" hidden/>
                                    <input name="id" className="id" hidden/>
                                    <input name="tagName" className="TagName" hidden/> 
                                    <div className="row mb-2">
                                      <div className="input-group input-group-sm ms-0">
                                        <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "87px"}}>Color</span>
                                        <input type="color" id="border-color" name="border-color" className="form-control bg-dark text-secondary border-secondary" style={{height: "auto"}}
                                          onChange={(e)=>{setAllBorder()}}
                                        />
                                      </div>
                                    </div>
                                  </form>
                                  {/* Border style */}
                                  <form name="border-style-form" action="/api/set" target="refreshFrame" method="post">
                                    <input name="catg" value="border-style" hidden/>
                                    <input name="cssPath" className="cssPath" hidden/>
                                    <input name="cssFile" className="cssFile" hidden/>
                                    <input name="id" className="id" hidden/>
                                    <input name="tagName" className="TagName" hidden/> 
                                    <div className="row mb-2">
                                      <div className="input-group input-group-sm ms-0">
                                          <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Style</span>
                                          <select name="border-style" id="border-style" className="form-select bg-dark text-secondary border-secondary"
                                            onChange={(e)=>{setAllBorder()}}>
                                            <option value="solid">solid</option>
                                            <option value="dotted">dotted</option>
                                            <option value="dashed">dashed</option>
                                            <option value="double">double</option>
                                            <option value="none">none</option>
                                            <option value="hidden">hidden</option>
                                            <option value="groove">groove</option>
                                            <option value="ridge">ridge</option>
                                            <option value="inset">inset</option>
                                            <option value="outset">outset</option>
                                            <option value="initial">initial</option>
                                            <option value="inherit">inherit</option>
                                          </select>
                                      </div>
                                    </div>
                                  </form>
                                  {/* Border radius */}
                                  <form name="border-radius-form" action="/api/set" target="refreshFrame" method="post">
                                    <input name="catg" value="border-radius" hidden/>
                                    <input name="cssPath" className="cssPath" hidden/>
                                    <input name="cssFile" className="cssFile" hidden/>
                                    <input name="id" className="id" hidden/>
                                    <input name="tagName" className="TagName" hidden/> 
                                    <div className="row mb-2 g-1">
                                      <div className="col">
                                        <div className="input-group input-group-sm ms-0">
                                          <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "55px"}}>Radius</span>
                                          <input type="number" name="border-radius" className="form-control bg-dark text-secondary border-secondary" min="1"/>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="input-group input-group-sm ms-0">
                                          <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "40px"}}>Unit</span>
                                          <select name="border-raduis-unit" className="form-select bg-dark text-secondary border-secondary">
                                            <option value="px">px</option>
                                            <option value="%">%</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                  {/* Border spacing x */}
                                  <form name="border-spacing-form" action="/api/set" target="refreshFrame" method="post">
                                    <input name="catg" value="border-spacing" hidden/>
                                    <input name="cssPath" className="cssPath" hidden/>
                                    <input name="cssFile" className="cssFile" hidden/>
                                    <input name="id" className="id" hidden/>
                                    <input name="tagName" className="TagName" hidden/> 
                                    <div className="row mb-2 g-1">
                                      <div className="col">
                                        <div className="input-group input-group-sm ms-0">
                                          <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Space-x (px)</span>
                                          <input type="number" name="border-spacing-x" className="form-control bg-dark text-secondary border-secondary" min="0" defaultValue="0"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mb-2 g-1">
                                      <div className="col">
                                        <div className="input-group input-group-sm ms-0">
                                          <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Space-y (px)</span>
                                          <input type="number" name="border-spacing-y" className="form-control bg-dark text-secondary border-secondary" min="0" defaultValue="0"/>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                  {/* Border collapse */}
                                  <form name="border-collapse-form" action="/api/set" target="refreshFrame" method="post">
                                    <input name="catg" value="border-collapse" hidden/>
                                    <input name="cssPath" className="cssPath" hidden/>
                                    <input name="cssFile" className="cssFile" hidden/>
                                    <input name="id" className="id" hidden/>
                                    <input name="tagName" className="TagName" hidden/> 
                                    <div className="row mb-2">
                                      <div className="input-group input-group-sm ms-0">
                                        <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Collapse</span>
                                        <select name="border-collapse" id="border-collapse" className="form-select bg-dark text-secondary border-secondary">
                                          <option value="separate">separate</option>
                                          <option value="collapse">collapse</option>
                                          <option value="initial">initial</option>
                                          <option value="inherit">inherit</option>
                                        </select>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>          
                        </form>
                        </div>
                      </div>
                      {/* Outline */}
                      <div className="accordion-collapse collapse" id="outline" data-bs-parent="#views">
                        <div className="py-2">
                          {/* Outline width */}
                          <div className="row mb-3 mt-2">
                            <div className="col">
                              <div className="mx-auto" >
                                <div className="d-flex justify-content-around text-secondary" >
                                Width
                                <input type="radio" name="outline-width-type" id="outline-width-type-pre" className="btn-check" defaultChecked/>
                                <label htmlFor="outline-width-type-pre" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px"}}>Predefined</label>
                                <input type="radio" name="outline-width-type" id="outline-width-type-c" className="btn-check" />
                                <label htmlFor="outline-width-type-c" className="btn btn-sm btn-outline-secondary py-0 px-1" style={{fontSize: "13px"}}>Custom</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <form name="outline-width-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="outline-width-pre" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                              <fieldset id="outline-width-pre-field">
                                <div className="row mb-2">
                                    <div className="input-group input-group-sm ms-0">
                                        <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Width</span>
                                        <select name="outline-width-pre" id="outline-width-pre" className="form-select bg-dark text-secondary border-secondary" 
                                          onChange={(e)=>{
                                            toTargetFrame(document.getElementById("id").value,"outline-width", e.target.value); e.target.form.submit()}}>
                                          <option value="medium">medium</option>
                                          <option value="thin">thin</option>
                                          <option value="thick">thick</option>
                                          <option value="initial">initial</option>
                                          <option value="inherit">inherit</option>
                                        </select>
                                    </div>
                                </div>
                              </fieldset>
                          </form>
                          <form name="outline-width-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="outline-width-c" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                              <fieldset id="outline-width-c-field">
                                <div className="row mb-2">
                                    <div className="col">
                                      <div className="input-group input-group-sm ms-0">
                                        <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Width (px)</span>
                                        <input type="number" name="outline-width" id="outline-width" className="form-control bg-dark text-secondary border-secondary" 
                                          min="0" defaultValue="0" onChange={(e)=>{
                                            toTargetFrame(document.getElementById("id").value,"outline-width", 
                                            e.target.value + "px"); e.target.form.submit()}}/>
                                      </div>
                                    </div>
                                </div>
                              </fieldset>
                          </form>
                          {/* outline color */}
                          <form name="outline-color-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="outline-color" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Color</span>
                                  <input type="color" name="outline-color" id="outline-color" className="form-control bg-dark text-secondary border-secondary" 
                                    style={{height: "auto"}} onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"outline-color", 
                                    e.target.value); e.target.form.submit()}}/>
                                </div>
                              </div>
                            </div> 
                          </form>
                          {/* outline style */}
                          <form name="outline-style-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="outline-style" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Style</span>
                                <select name="outline-style" id="outline-style" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"outline-style", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="none">none</option>
                                  <option value="hidden">hidden</option>
                                  <option value="dotted">dotted</option>
                                  <option value="dashed">dashed</option>
                                  <option value="solid">solid</option>
                                  <option value="double">double</option>
                                  <option value="groove">groove</option>
                                  <option value="ridge">ridge</option>
                                  <option value="inset">inset</option>
                                  <option value="outset">outset</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* outline offset */}
                          <form name="outline-offset-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="outline-offset" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/>
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Offset (px)</span>
                                  <input type="number" name="outline-offset" id="outline-offset" className="form-control bg-dark text-secondary border-secondary" 
                                    min="0" defaultValue="0" onChange={(e)=>{
                                      toTargetFrame(document.getElementById("id").value,"outline-offset", 
                                    e.target.value + "px"); (e.target.form.submit())}}/>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                    {/* Text */}
                    <div className="accordion-collapse collapse" id="text" data-bs-parent="#views">
                        <div className="py-2">
                          {/* text align x */}
                          <form name="text-align-x-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-align" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Align-x</span>
                                <select name="text-align" id="text-align" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-align", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="initial">initial</option>
                                  <option value="left">left</option>
                                  <option value="right">right</option>
                                  <option value="center">center</option>
                                  <option value="justify">justify</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* text align y */}
                          <form name="text-align-y-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="vertical-align" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Align-y</span>
                                <select name="vertical-align" id="vertical-align" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"vertical-align", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="baseline">baseline</option>
                                  <option value="sub">sub</option>
                                  <option value="super">super</option>
                                  <option value="top">top</option>
                                  <option value="text-top">text-top</option>
                                  <option value="middle">middle</option>
                                  <option value="bottom">bottom</option>
                                  <option value="text-bottom">text-bottom</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* text align last */}
                          <form name="text-align-last-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-align-last" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Align-last</span>
                                <select name="text-align-last" id="text-align-last" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-align-last", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="auto">auto</option>
                                  <option value="left">left</option>
                                  <option value="right">right</option>
                                  <option value="center">center</option>
                                  <option value="justify">justify</option>
                                  <option value="start">start</option>
                                  <option value="end">end</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* text decoration line */}
                          <form name="text-decoration-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-decoration" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Decoration</span>
                                <select name="text-decoration" id="text-decoration" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-decoration", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="none">none</option>
                                  <option value="underline">underline</option>
                                  <option value="overline">overline</option>
                                  <option value="line-through">line-through</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* text decoration color */}
                          <form name="text-decoration-color-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-decoration-color" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Decor. color</span>
                                  <input type="color" name="text-decoration-color" id="text-decoration-color" className="form-control bg-dark text-secondary border-secondary" 
                                    style={{height: "auto"}} onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-decoration-color", 
                                    e.target.value); e.target.form.submit()}}/>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* text decoration style */}
                          <form name="text-decoration-style-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-decoration-style" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Decor. style</span>
                                <select name="text-decoration-style" id="text-decor-style" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-decoration-style", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="solid">solid</option>
                                  <option value="double">double</option>
                                  <option value="dotted">dotted</option>
                                  <option value="dashed">dashed</option>
                                  <option value="wavy">wavy</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* text indent */}
                          <form name="text-indent-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-indent" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Indent (px)</span>
                                  <input type="number" name="text-indent" id="text-indent" className="form-control bg-dark text-secondary border-secondary" 
                                    min="0" defaultValue="0" onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-indent", 
                                    e.target.value + "px"); e.target.form.submit()}}/>
                                </div>
                              </div>
                            </div>
                          </form>
                          {/* text overflow */}
                          <form name="text-overflow-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-overflow" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Overflow</span>
                                <select name="text-overflow" id="text-overflow" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-overflow", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="clip">clip</option>
                                  <option value="ellipsis">ellipsis</option>
                                  <option value="string">string</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                          {/* text transform */}
                          <form name="text-transform-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="text-transform" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Transform</span>
                                <select name="text-transform" id="text-transform" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"text-transform", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="none">none</option>
                                  <option value="capitalize">capitalize</option>
                                  <option value="uppercase">uppercase</option>
                                  <option value="lowercase">lowercase</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                    {/* Display */}
                    <div className="accordion-collapse collapse" id="display" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="display-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="display" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            {/* display behavior */}
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Behavior</span>
                                <select name="display" id="display-behave" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"display", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="initial">initial</option>
                                  <option value="inline">inline</option>
                                  <option value="block">block</option>
                                  <option value="inline-block">inline-block</option>
                                  <option value="flex">flex</option>
                                  <option value="none">none</option>
                                  <option value="grid">grid</option>
                                  <option value="contents">contents</option>
                                  <option value="inline-flex">inline-flex</option>
                                  <option value="inline-grid">inline-grid</option>
                                  <option value="inline-table">inline-table</option>
                                  <option value="list-item">list-item</option>
                                  <option value="run-in">run-in</option>
                                  <option value="table">table</option>
                                  <option value="table-caption">table-caption</option>
                                  <option value="table-column-group">table-column-group</option>
                                  <option value="table-header-group">table-header-group</option>
                                  <option value="table-footer-group">table-footer-group</option>
                                  <option value="table-row-group">table-row-group</option>
                                  <option value="table-cell">table-cell</option>
                                  <option value="table-column">table-column</option>
                                  <option value="table-row">table-row</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                    {/* Position */}
                    <div className="accordion-collapse collapse" id="position" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="position-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="position" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            {/* position type */}
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Type</span>
                                <select name="position" id="position-type" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"position", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="''"></option>
                                  <option value="static">static</option>
                                  <option value="absolute">absolute</option>
                                  <option value="fixed">fixed</option>
                                  <option value="relative">relative</option>
                                  <option value="sticky">sticky</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                    {/* z-index */}
                    <div className="accordion-collapse collapse" id="z-index" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="zindex-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="z-index" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            {/* stack order */}
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Stack order</span>
                                <input type="number" name="z-index" id="z-index-order" className="form-control bg-dark text-secondary border-secondary" 
                                    min="0" defaultValue="0" onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"z-index", 
                                    e.target.value); e.target.form.submit()}}/>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                    {/* Overflow */}
                    <div className="accordion-collapse collapse" id="overflow" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="overflow-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="overflow" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            {/* overflow type */}
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Overflow</span>
                                <select name="overflow" id="overflow-type" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"overflow", 
                                    e.target.value); e.target.form.submit()}}>
                                  <option value="visible">visible</option>
                                  <option value="hidden">hidden</option>
                                  <option value="scroll">scroll</option>
                                  <option value="auto">auto</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                    {/* Float */}
                    <div className="accordion-collapse collapse" id="float" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="float-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="float" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            {/* float type */}
                            <div className="row mb-2">
                              <div className="input-group input-group-sm ms-0">
                                <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Float</span>
                                <select name="float" id="float-type" className="form-select bg-dark text-secondary border-secondary"
                                  onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"float", 
                                    e.target.value); e.target.form.submit()}} >
                                  <option value="none">none</option>
                                  <option value="left">left</option>
                                  <option value="right">right</option>
                                  <option value="initial">initial</option>
                                  <option value="inherit">inherit</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                    {/* Opacity */}
                    <div className="accordion-collapse collapse" id="opacity" data-bs-parent="#views">
                        <div className="py-2">
                          <form name="opacity-form" action="/api/set" target="refreshFrame" method="post">
                            <input name="catg" value="opacity" hidden/>
                            <input name="cssPath" className="cssPath" hidden/>
                            <input name="cssFile" className="cssFile" hidden/>
                            <input name="id" className="id" hidden/>
                            <input name="tagName" className="TagName" hidden/> 
                            {/* opacity level */}
                            <div className="row mb-2">
                              <div className="col">
                                <div className="input-group input-group-sm ms-0">
                                  <span className="input-group-text bg-dark text-secondary border-secondary" style={{width: "90px"}}>Level</span>
                                  <input type="number" name="opacity" id="opacity-level" className="form-control bg-dark text-secondary border-secondary" 
                                    min="0" max="1" step="0.1" defaultValue="1" onChange={(e)=>{
                                    toTargetFrame(document.getElementById("id").value,"opacity", 
                                    e.target.value); e.target.form.submit()}} onKeyDown={(e)=> {if(e.key == "Enter"){toTargetFrame(document.getElementById("id").value,"opacity", 
                                    e.target.value); e.target.form.submit()}}}/>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                      
                </div>
                <Link href={"/done"}>
                  <a className="btn btn-sm fw-bold w-100 my-3" onClick={()=>{
                    fetch('/api/finish', {method: "POST", headers: {'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'}, body: `htmlPath=${localStorage.getItem('htmlPath')}&cssFile=${localStorage.getItem('cssFile')}&cssPath=${localStorage.getItem('cssPath')}`})
                  }} style={{backgroundColor: "#00cc99"}}>Finish</a>
                </Link>
                <Link href={"/"}>
                  <a className="btn btn-sm text-light fw-bold w-100" style={{minWidth: "70px", backgroundColor: "#b30000"}} onClick={()=>{
                      fetch('/api/discard', {method: "POST", headers: {'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'}, body: `htmlPath=${localStorage.getItem('htmlPath')}&cssFile=${localStorage.getItem('cssFile')}&cssPath=${localStorage.getItem('cssPath')}`})
                    }}>Discard</a>
                </Link>
                <div className="text-light text-center mb-0 mt-2 pb-0">v 0.1.0</div>
            </div>
        </div>
      </div>

      <Script src="/styler_extended.js" />
      <Script src="/bootstrap.bundle.js"/>

    </div>
    )
}