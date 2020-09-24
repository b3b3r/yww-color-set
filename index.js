const numberOfGradient = 4;
const COLORS = [
  { name: "pink", hex: "#febbcc" },
  { name: "orange", hex: "#fc5876" },
  { name: "red", hex: "#c81859" },
  { name: "yellow", hex: "#fecb2e" },
  // { name: "green", hex: "#30c322" },
  // { name: "light-blue", hex: "#1fb8f4" },
  // { name: "mid-blue", hex: "#122269" },
  // { name: "dark-blue", hex: "#05052c" },
  // { name: "gray", hex: "#b4b4b4" }
];

const makeColoredBox = hex => {
  const box = document.createElement('div');
  box.style.backgroundColor = hex;
  box.style.width = '100px';
  box.style.height = '50px';
  box.innerText = hex
  return box;
};

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
};

const makeDarkerColors = (mainBox, gradient = 0) => {
  const mainColor = COLORS.find(({ name }) => name === mainBox.getAttribute("id")).hex;
  for (let i = 1; i < numberOfGradient + 1; i++) {
    const hex = shadeColor(mainColor, -(i * gradient))
    const coloredBox = makeColoredBox(hex);
    mainBox.append(coloredBox);
  };
};

const makeLighterColors = (mainBox, gradient = 0) => {
  const mainColor = COLORS.find(({ name }) => name === mainBox.getAttribute("id")).hex;
  for (let i = 1; i < numberOfGradient + 1; i++) {
    const hex = shadeColor(mainColor, i * gradient)
    const coloredBox = makeColoredBox(hex);
    mainBox.prepend(coloredBox);
  };
};

const makeBox = (colors, gradient) => {
  const main = document.querySelector('#main');
  colors.forEach(({ name, hex }) => {
    const box = makeColoredBox(hex);
    box.setAttribute("id", name);
    main.append(box);
    makeLighterColors(box, gradient)
    makeDarkerColors(box, gradient);
  });
};

const deleteBox = () => {
  const main = document.querySelector('#main');
  while (main.firstChild) {
    main.removeChild(main.lastChild);
  }
};

const editGradientLevel = () => {
  const input = document.querySelector('#contrast');
  input.addEventListener("keyup", () => {
    deleteBox();
    gradient = input.value;
    makeBox(COLORS, gradient);
  });
};

editGradientLevel();