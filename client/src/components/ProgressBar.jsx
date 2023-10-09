import {useEffect} from "react";

function ProgressBar({goal, amount, instance}) {
    useEffect(() => {

    if (instance) {
        var svg = document.getElementById(instance);
    } else {
        var svg = document.querySelector('svg');
        instance = 'svg'
    }
    
    
    // variable for the namespace 
    const svgns = "http://www.w3.org/2000/svg";

    // creates bg vector
    let bgRect = document.createElementNS(svgns, "rect");

    bgRect.setAttribute("x", "0");
    bgRect.setAttribute("y", "0");
    bgRect.setAttribute("width", "250");
    bgRect.setAttribute("height", "8");
    bgRect.setAttribute("fill", "#FFEBE9");

    svg.appendChild(bgRect);

    //creates progress vector
    let fgRect = document.createElementNS(svgns, "rect");

    let widthVar = amount/goal * 250
    if (widthVar > 250) {
        widthVar = 250;
    }
    if (widthVar < 1) {
        widthVar = 1;
    }

    fgRect.setAttribute("x", "0");
    fgRect.setAttribute("y", "0");
    fgRect.setAttribute("width", widthVar);
    fgRect.setAttribute("height", "8");
    fgRect.setAttribute("fill", "#FF7067");

    // append the new rectangle to the svg
    svg.appendChild(fgRect);

    
    });

  return (
    <>
        
      <svg className="w-full"
      id={instance} xmlns="http://www.w3.org/2000/svg" width="250" height="30" viewBox="0 0 250 15" />
    </>
  );
}

export default ProgressBar;