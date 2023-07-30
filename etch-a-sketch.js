const range_slider = document.getElementById("range_button")
const range_slider_text = document.getElementById("range_text")

for (let i = 256; i > 0; i--) {
    const div = document.createElement("div")
    div.setAttribute("id", "flex_div")
    div.classList.add("flex-item")

    document.getElementById("flex-container").append(div)
}

let grid_items = document.querySelectorAll("#flex_div")

grid_items.forEach(element => {
    element.addEventListener("mousedown", function() {
        element.style.backgroundColor = "#222222"
    })
})

range_slider.onchange = function() {
    range_slider_text.innerHTML = this.value + "x" + this.value
    
    grid_items.forEach(e => {
        e.removeAttribute("id")
        e.remove()
    })

    document.querySelector(".container").style.gridTemplateColumns = "repeat(" + range_slider.value + ", 1fr)"
    for (let i = 0; i < (range_slider.value * range_slider.value); i++) {
        const div = document.createElement("div")
        div.setAttribute("id", "flex_div")
        div.classList.add("flex-item")

        document.getElementById("flex-container").append(div)
    }

    grid_items = document.querySelectorAll("#flex_div")
    
    grid_items.forEach(element => {
        element.addEventListener("mousedown", function() {
            element.style.backgroundColor = "#222222"
        })
    })
}
