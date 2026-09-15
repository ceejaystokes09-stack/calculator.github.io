const visual = document.querySelector(".input-screen p")
let math_str = ""; 

document.addEventListener("keydown",(e)=>{
    const key = e.key;

    if (/^[0-9.]$/.test(key) || ["+", "-", "/", "%"].includes(key)) {
        e.preventDefault();
        math(key);
    } else if (key === "*" || key.toLowerCase() === "x") {
        e.preventDefault();
        math("*", "X");
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        math("=");
    } else if (key === "Backspace") {
        e.preventDefault();
        math("m");
    } else if (key === "Escape") {
        e.preventDefault();
        math("AC");
    } else if (["c", "C", "n", "N"].includes(key)) {
        e.preventDefault();
        math("c");
    }
})

function math(method_type, visual_type){
    const types = {
        AC: ()=>{visual.textContent="0";
            math_str = ""; 
        },
        m: ()=>{
            if (math_str) {
                math_str = math_str.slice(0, -1);
                visual.textContent = math_str.replaceAll("*", "X") || "0";
                return;
            }

            if (visual.textContent !== "0" && visual.textContent !== "Math error") {
                visual.textContent = visual.textContent.slice(0, -1) || "0";
            }
        },
        "=": ()=>{
            try {
                const result = eval(math_str);
                visual.textContent = Number.isNaN(result) ? "Math error" : result;
            } catch {
                visual.textContent = "Math error";
            }
            math_str=""; 
        },
        x: ()=>{visual.textContent+="X";
            math_str+="*"
        },
        "%": ()=>{
            visual.textContent = Number(visual.textContent)/100
        },
        c: () =>{
            const expression = math_str || visual.textContent;
            const lastNumber = expression.match(/-?\d*\.?\d+$/);

            if (!lastNumber || /[+\-*/]$/.test(expression)) {
                return;
            }

            const numberStart = lastNumber.index;
            const number = lastNumber[0];
            const toggledNumber = number.startsWith("-")
                ? number.slice(1)
                : `-${number}`;

            math_str = expression.slice(0, numberStart) + toggledNumber;
            visual.textContent = math_str.replaceAll("*", "X");
        }
    }
    
    if (Object.hasOwn(types, method_type)){
        
        types[method_type]()
        
        return;
    }
    if(visual.textContent === "0"){
        visual.textContent ="";
    }

    math_str+= method_type; 
    if(visual_type){
        visual.textContent += visual_type;
        return;
    }
    visual.textContent += method_type;

}
