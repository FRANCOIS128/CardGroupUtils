import "./css/style.scss";
import Slider from "./pages/slider";

const body = document.querySelector("body")
const slider = new Slider()
body.appendChild(slider.dom)