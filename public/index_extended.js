function setParams(){
    let cssPath = document.getElementById("cssFile").value.replace(/\\/g, "/").replace(/\/[^/]*.css/, "")
    localStorage.setItem("port", document.getElementById("port").value);
    localStorage.setItem("htmlPath", document.getElementById("htmlPath").value);
    localStorage.setItem("cssPath", cssPath);
    localStorage.setItem("cssFile", document.getElementById("cssFile").value);
}

function loader(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";
}

setTimeout(loader, 1000)

try{
    document.getElementById("directory").textContent = localStorage.getItem("htmlPath");
}catch{}