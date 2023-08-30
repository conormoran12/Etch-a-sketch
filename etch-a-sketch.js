const sketch_Pad = document.querySelector("#sketch_pad")
const slider = document.querySelector("#myRange")
let up = true

let mode = "Normal"

sketch_Pad.onmousedown = () => (up = false)
sketch_Pad.onmouseup = () => (up = true)

function setMode(str) {
    mode = str
}

function getMode() {
    return mode
}

function generateRandomColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function modes(e) {
    if (getMode() == "Normal") {
        e.style.backgroundColor = "rgba(34, 34, 34, 1)";
        e.style.filter = ""
    } else if (getMode() == "Rainbow") {
        e.style.backgroundColor = generateRandomColor()
        e.style.filter = ""
    } else if (getMode() == "Lighten") {
        if (e.style.filter == "") { e.style.filter = "brightness(2.5)"; return;}
            let replacedStr = e.style.filter.replace("brightness(", "");
            let brightnessValue = parseInt(replacedStr.replace(")", ""));
            brightnessValue += 1
            e.style.filter = `brightness(${brightnessValue})`;
    } else if (getMode() == "Eraser") {
        e.style.backgroundColor = "white";
        e.style.filter = ""
    };
};

for (i = 0; i < (slider.value * slider.value); i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    sketch_Pad.append(pixel);
};

document.querySelectorAll(".pixel").forEach((element) => {
    
    element.addEventListener("click", function() {
        modes(element)
    });

    element.addEventListener("mouseover", function() {
        if (!up) {
           modes(element)
        }
    });
});

const buttons = document.querySelectorAll("button")

buttons.forEach((element) => {
    let splitStr = element.innerText.split(" ");
    if (splitStr[0] == "Normal") { 
        element.style.backgroundColor = "#EA638C"
        element.style.color = "#FFD9DA"
    }
    element.addEventListener("mouseup", (event) => {
        for (let i = 0; i < buttons.length; i++) {
            console.log("hello")
            buttons[i].style.backgroundColor = "#89023E"
            buttons[i].style.color = "#FFD9DA"
        }
        setMode(splitStr[0]);
        element.style.backgroundColor = "#EA638C"

    });
});    

document.querySelector("#myRange").addEventListener("change", (event) => {
    let pixels = document.querySelectorAll(".pixel");
    let pixelAmount = pixels.length;
    sketch_Pad.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`
    sketch_Pad.style.gridTemplateRows = `repeat(${slider.value}, 1fr)`
    if (pixelAmount < (slider.value * slider.value)) {
        for (let i = pixelAmount; i < (slider.value * slider.value); i++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            sketch_Pad.append(pixel);
            pixel.addEventListener("click", function() {
                modes(pixel)
            });
        
            pixel.addEventListener("mouseover", function() {
                if (!up) {
                   modes(pixel)
                }
            });
        }
    } else if (pixelAmount > (slider.value * slider.value)) {
        for (let i = (pixelAmount - (slider.value * slider.value)); i > 0; i--) {
            let nowPixels = document.querySelectorAll(".pixel")
            nowPixels[i].remove()
        }
    }
    document.querySelectorAll(".pixel").forEach((pixel) => {
        if (pixel.style.backgroundColor != "" || pixel.style.backgroundColor != "white") { 
            pixel.style.backgroundColor = ""
        }
    })
});

document.querySelector("#myRange").addEventListener("input", (event) => {
    document.querySelector(".value-shower").innerText = document.querySelector("#myRange").value + "x" + document.querySelector("#myRange").value;
});

