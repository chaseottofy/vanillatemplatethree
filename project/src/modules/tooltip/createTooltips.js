// Render Tooltips for All Elements with the data-tooltip Attribute
/**
 * wrap any single element inside relative__wrapper <div> and give that element the following data attributes:
 * 
 *    data-tooltip
 *    data-tooltip-direction
 */
export default function createTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');

  const create = (el) => {
    const tooltipText = el.getAttribute('data-tooltip');
    if (tooltipText === "") return;


    let tooltipDirection;
    !el.getAttribute('data-tooltip-direction') 
      ? tooltipDirection = 'top' 
      : tooltipDirection = el.getAttribute('data-tooltip-direction');


    const tooltip = document.createElement('span');
    tooltip.setAttribute("class", `tooltip tooltip--${tooltipDirection}`);
    tooltip.textContent = tooltipText;


    const tooltipArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tooltipArrow.setAttribute("class", "tooltip__arrow");
    tooltipArrow.setAttribute("width", "12")
    tooltipArrow.setAttribute("height", "12")

    const tooltipArrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const tooltipArrowPathData = {
      top: "M0 0 L6 6 L12 0",
      bottom: "M0 6 L6 0 L12 6",
      left: "M0 0 L6 6 L0 12",
      right: "M6 0 L0 6 L6 12"
    }

    tooltipArrowPath.setAttribute("d", tooltipArrowPathData[tooltipDirection])


    tooltipArrow.appendChild(tooltipArrowPath);
    tooltip.appendChild(tooltipArrow)


    el.onmouseover = () => { tooltip.classList.add("tooltip--active") }
    el.onmouseout = () => { tooltip.classList.remove("tooltip--active") }




    tooltipDirection !== "left"
      ? el.closest(".relative__wrapper").appendChild(tooltip)
      : el.closest(".relative__wrapper").insertBefore(tooltip, el)
  }

  const init = () => { 
    if (tooltipElements.length > 0) {
      tooltipElements.forEach((el) => { create(el) }) 
    } else {
      return;
    }
  }

  
  init()
}
