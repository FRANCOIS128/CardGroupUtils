import data from "../../data/db.json"
import Background from "../components/background"
import { ButtonGroup, Button } from "../components/button"
import { Card, CardGroup } from "../components/card"

export default class Slider {
  dom // 整个slider的dom
  imagesInfo = data.images // 图片信息
  buttonsInfo = data.buttons // 按钮信息
  buttonGroup // 按钮组
  left // 左按钮
  right // 右按钮
  doubleLeft // 循环左按钮
  doubleRight // 循环右按钮
  cardGroup // 卡片组
  background1 // 背景1
  background2 // 背景2
  buttonTransition = 500 // 按钮过渡时间
  buttonInterval // 按钮间隔
  buttonIntervalDuration = 4000 // 按钮间隔时间
  defaultFunc = () => { } // 默认按钮事件
  static instance // 单例模式

  constructor() {
    if (Slider.instance) { // 单例模式
      return Slider.instance
    }
    Slider.instance = this
    this.createDom() // 初始化dom
    this.createBackground() // 初始化背景
    this.createButtonGroup() // 初始化按钮
    this.createCardGroup() // 初始化卡片
    this.addEvent() // 初始化事件
    this.defaultFunc = this.btnRightFunc // 初始化默认按钮事件
    this.setInterval() // 初始化循环效果
  }

  createDom = () => {
    this.dom = document.createElement('div')
    this.dom.classList.add('slider')
  }

  createBackground = () => {
    this.background1 = new Background(this.imagesInfo[1].address)
    this.background2 = new Background(this.imagesInfo[0].address)
    this.dom.appendChild(this.background1.dom)
    this.dom.appendChild(this.background2.dom)
  }

  createButtonGroup = () => {
    this.buttonGroup = new ButtonGroup()
    this.dom.appendChild(this.buttonGroup.dom)
    this.buttonsInfo.forEach(buttonInfo => {
      const button = new Button(buttonInfo.classList)
      if (buttonInfo.classList.includes('left')) {
        this.left = button.dom
      }
      if (buttonInfo.classList.includes('right')) {
        this.right = button.dom
      }
      if (buttonInfo.classList.includes('double-left')) {
        this.doubleLeft = button.dom
      }
      if (buttonInfo.classList.includes('double-right')) {
        this.doubleRight = button.dom
      }
      this.buttonGroup.add(button)
    })
  }

  createCardGroup = () => {
    this.cardGroup = new CardGroup()
    this.dom.appendChild(this.cardGroup.dom)
    this.imagesInfo.forEach(imgInfo => {
      const card = new Card(imgInfo.address)
      this.cardGroup.add(card)
    })
  }

  backgroundChange = () => {
    this.dom.insertBefore(this.background2.dom, this.background1.dom)
    this.backgroundCover()
    this.background2.dom.classList.remove('backgroundIn')
    this.background1.dom.classList.remove('backgroundOut')
    this.background1.addImageUrl(this.cardGroup.cardList[1].imageSrc)
    this.background2.addImageUrl(this.cardGroup.cardList[0].imageSrc)
  }

  backgroundCover = () => {
    let middleBackground = this.background2
    this.background2 = this.background1
    this.background1 = middleBackground
  }

  btnLeftFunc = () => {
    if (Button.isWorking) { return }
    Button.isWorking = true
    this.background2.dom.classList.add('backgroundOut')
    this.background1.dom.classList.add('backgroundIn')
    this.cardGroup.add(this.cardGroup.cardList[0])
    setTimeout(() => {
      this.backgroundChange()
      Button.isWorking = false
    }, this.buttonTransition)
  }

  btnRightFunc = () => {
    if (Button.isWorking) { return }
    Button.isWorking = true
    this.background1.addImageUrl(this.cardGroup.cardList[this.cardGroup.cardList.length - 1].imageSrc)
    this.background2.dom.classList.add('backgroundOut')
    this.background1.dom.classList.add('backgroundIn')
    this.cardGroup.addFirst(this.cardGroup.cardList[this.cardGroup.cardList.length - 1])
    setTimeout(() => {
      this.backgroundChange()
      Button.isWorking = false
    }, this.buttonTransition)
  }

  clearInterval = () => {
    clearInterval(this.buttonInterval)
  }

  setInterval = (func = this.defaultFunc) => {
    this.buttonInterval = setInterval(() => {
      func()
    }, this.buttonIntervalDuration)
  }

  doubleLeftFunc = () => { 
    this.clearInterval()
    this.btnLeftFunc()
    this.setInterval(this.btnLeftFunc)
  }

  doubleRightFunc = () => {
    this.clearInterval()
    this.btnRightFunc()
    this.setInterval(this.btnRightFunc)
  }

  addEvent = () => {
    this.left.addEventListener('click', this.btnLeftFunc)
    this.right.addEventListener('click', this.btnRightFunc)
    this.doubleLeft.addEventListener('click', this.doubleLeftFunc)
    this.doubleRight.addEventListener('click', this.doubleRightFunc)
  }
}