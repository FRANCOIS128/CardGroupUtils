import { createImageUrl } from "../utils/common";

class Card {
  imageSrc
  dom

  constructor(imageSrc) {
    this.createDom()
    this.addImageUrl(imageSrc)
  }

  createDom() {
    this.dom = document.createElement('div')
    this.dom.classList.add('card')
  }

  addImageUrl(imageSrc) {
    this.imageSrc = imageSrc
    this.dom.style.backgroundImage = createImageUrl(imageSrc)
  }

  setDisplay = (display = 'block') => {
    this.dom.style.display = display
  }
}

class CardGroup {
  static instance
  cardList = []
  dom

  constructor() {
    if (CardGroup.instance) {
      return CardGroup.instance
    }
    CardGroup.instance = this

    this.createDom()
  }

  createDom() {
    this.dom = document.createElement('div')
    this.dom.classList.add('card-group')
  }

  add = (card) => {
    if (card && card.dom) {
      this.dom.appendChild(card.dom)
      this.cardList = this.cardList.filter(item => item.dom !== card.dom)
      this.cardList.push(card)
    }
  }

  addFirst = (card) => {
    if (card && card.dom) {
      this.dom.insertBefore(card.dom, this.cardList[0]?.dom)
      this.cardList = this.cardList.filter(item => item.dom !== card.dom)
      this.cardList.unshift(card)
    }
  }

  remove = (card) => {
    if (card && card.dom) {
      this.cardList = this.cardList.filter(item => item.dom !== card.dom)
      this.dom.removeChild(card.dom)
    }
  }

  clear = () => {
    this.cardList.forEach(item => {
      this.dom.removeChild(item.dom)
    })
    this.cardList = []
  }

  setDisplay = (index, display = 'block') => {
    this.cardList[index].setDisplay(display)
  }
}

export {
  Card,
  CardGroup
}