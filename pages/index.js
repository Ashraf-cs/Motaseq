import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react'
import Script from 'next/script'

export default function Home() {
  const[state, setState] = useState(false);
  fetch('/api/check').then(res => res.json()).then(data => {
    if(data.htmlPath){
      try{
        localStorage.setItem("htmlPath", data.htmlPath);
        localStorage.setItem("cssFile", data.cssFile);
        localStorage.setItem("cssPath", data.cssPath);
        setState(true);
      }catch{}
    }
    else{
      try{localStorage.clear()}catch{}
    }
  })

  if(!state){

    return (
      <div className="container mt-2 pt-1">
        <Head>
          <title>Motaseq</title>
          <meta name="description" content="Style your web pages easly" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        
        <div id="loader"></div>

        <div id="main" style={{display: "none"}}>
          <div className="d-flex justify-content-center">
            <Image src="/Motaseq2.png" width={300} height={130} alt="Motaseq logo"/>
          </div>
          <div className="container rounded shadow-lg p-3 w-75 bg-light">
            <div className="container mt-3 pt-3">
              <form id="init" method="post" action="/api/init" onSubmit={() => setParams()}>
                <div className="d-flex justify-content-center">
                  <div className="form-check form-check-inline">
                    <input type="radio" name="type" value="html" className="form-check-input" required/>
                    <label htmlFor="html" className="form-label fw-bold">Regular HTML</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" name="type" value="react" className="form-check-input" />
                    <label htmlFor="react" className="form-label fw-bold">Reactjs (JSX)</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" name="type" value="nextjs" className="form-check-input"/>
                    <label htmlFor="nextjs" className="form-label fw-bold">Nextjs</label>
                  </div>
                </div>
                <label htmlFor="port" className="form-label mt-4 fw-bold">Server port number</label>
                <input type="text" id="port" name="port" className="form-control" pattern="[0-9]{}" title="Please enter a valid number" required/>
                <label htmlFor="htmlPath" className="form-label mt-4 fw-bold">Type or paste the full path of pages folder</label>
                <input type="text" id="htmlPath" name="htmlPath" className="form-control" required placeholder="e.g. C:\Users\user1\web_dev\myProject\pages "/>
                <label htmlFor="cssFile" className="form-label mt-3 fw-bold">Type or paste the full path of CSS file</label>
                <input type="text" id="cssFile" name="cssFile" className="form-control" required 
                  placeholder="e.g. C:\Users\user1\web_dev\myProject\style\style.css"/>
                <div className="d-flex justify-content-end">
                  <input type="submit" value="Start" className="btn mt-4 fw-bold" style={{backgroundColor: "#00cc99"}}/>
                </div>
              </form>
              <div className="text-dark text-center mb-0 pb-0">v 0.1.0</div>
            </div>
          </div>
        </div>
  
        <Script src="/index_extended.js" />

      </div>  
    )
  }else{

    return (
      <div className="container mt-5 pt-2">
        <Head>
          <title>Motaseq</title>
          <meta name="description" content="Style your web pages easly" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <div id="loader"></div>
        
        <div id="main" style={{display: "none"}}>
          <div className="d-flex justify-content-center">
            <Image src="/Motaseq2.png" width={300} height={130} alt="Motaseq logo"/>
          </div>
          <div className="container rounded shadow-lg p-3 w-75 bg-light">
            <h4 className="text-center">You have opened project</h4>
            <div className="container mt-3 pt-3">
            <h6>Project directory:</h6>
            <div className="card mt-3">
              <div className="card-body py-2">
              <span id="directory"></span>
              </div>
            </div>
            <div className="mt-5 text-center">
              <h5>What do you want to do?</h5>
              <div className="mt-3 d-flex justify-content-center">
                <Link href={"/styler"}><a className="btn btn-sm mx-2 fw-bold" style={{backgroundColor: "#00cc99"}}>Continue</a></Link>
                <Link href={"/"}>
                  <a className="btn btn-sm text-light fw-bold mx-2" onClick={() => {
                    fetch('/api/finish', {method: "POST", headers: {'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'}, body: `htmlPath=${localStorage.getItem('htmlPath')}&cssFile=${localStorage.getItem('cssFile')}&cssPath=${localStorage.getItem('cssPath')}`});
                    setTimeout(()=> {setState(false)}, 400)
                  }} style={{backgroundColor: "#404040"}}>Fininsh</a>
                </Link>
                  <button className="btn btn-sm btn-danger fw-bold mx-2" onClick={() => {
                    fetch('/api/discard', {method: "POST", headers: {'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'}, body: `htmlPath=${localStorage.getItem('htmlPath')}&cssFile=${localStorage.getItem('cssFile')}&cssPath=${localStorage.getItem('cssPath')}`});
                    setTimeout(()=> {setState(false)}, 400)
                  }}>Discard</button>
              </div>
            </div>
            <div className="text-dark text-center mb-0 mt-3 pb-0">v 0.1.0</div>
            </div>
          </div>
        </div>
  
        <Script src="/index_extended.js" />

      </div>
    )
  }
}
