const visual = document.querySelector(".input-screen p")
let math_str = ""; 
function math(method_type, visual_type){
    const types = {
        AC: ()=>{visual.textContent="0";
            math_str = ""; 
        },
        m: ()=>{//minus the last thing in the text content
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
