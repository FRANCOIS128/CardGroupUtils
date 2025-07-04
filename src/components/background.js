import { createImageUrl } from "../utils/common"

export default class Background {
  imageUrl
  dom

  constructor(imageSrc = "", dom = 'div') {
    this.createDom(dom)
    this.addImageUrl(imageSrc)
  }

  createDom(dom) {
    this.dom = document.createElement(dom)
    this.dom.classList.add('background')
  }

  addImageUrl(imageSrc) {
    this.imageUrl = createImageUrl(imageSrc)
    this.dom.style.backgroundImage = this.imageUrl
  }
}