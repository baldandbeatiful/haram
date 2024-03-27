const speed = 1; // pixels par frame
const gap = getComputedStyle(document.querySelector("body"))
  .getPropertyValue("--gap");

const marquee1 = document.querySelector(".marquee-1");
const marquee2 = document.querySelector(".marquee-2");

const newItem = () => {
  const newItem = document.createElement("div");
  newItem.textContent = "HARAMBASE";
  return newItem;
};

const numerify = str => +str.replaceAll(/[^\d-]/g, "");

const fillMarquee = (marquee) => {
  while (
    marquee.querySelectorAll("div").length < 2 ||
    (marquee.querySelector("div").clientWidth + numerify(gap)) *
      marquee.querySelectorAll("div").length -
      numerify(gap) <
      window.innerWidth * 1.5
  ) {
    marquee.append(newItem());
  }

  marquee.querySelectorAll("div").forEach(item => {
    if (item.style.position !== "absolute") {
      item.style.position = "relative";
    }
  });
};

fillMarquee(marquee1);
fillMarquee(marquee2);

const render = (marquee) => {
  marquee.querySelectorAll("div").forEach(item => {
    const offsetLeft = item.offsetLeft;
    if (offsetLeft < 0 && offsetLeft < -item.offsetWidth) {
      marquee.querySelectorAll("div").forEach(e => {
        e.style.left = numerify(gap) / 2 - 1 + "px";
      });
      item.remove();
      marquee.append(newItem());
    }
    item.style.left = `${numerify(item.style.left) - speed}px`;
  });
  
  requestAnimationFrame(() => {
    render(marquee);
  });
};

render(marquee1);
render(marquee2);
