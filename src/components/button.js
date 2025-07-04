export class Button {
  static isWorking = false
  classList = []
  dom
  constructor(classList = []) {
    this.classList = classList
    this.createDom()
  }

  createDom() {
    this.dom = document.createElement('div')
    this.dom.classList.add('btn', ...this.classList)
  }
}

export class ButtonGroup {
  static instance
  buttonList = []
  dom

  constructor() {
    if (ButtonGroup.instance) { // 单例模式
      return ButtonGroup.instance
    }
    ButtonGroup.instance = this

    this.createDom()
  }

  createDom() {
    this.dom = document.createElement('div')
    this.dom.classList.add('btn-grp')
  }

  add = (button) => {
    if (button && button.dom) {
      this.dom.appendChild(button.dom)
      this.buttonList.push(button)
    }
  }

  remove = (button) => {
    if (button && button.dom) {
      this.dom.removeChild(button.dom)
      this.buttonList = this.buttonList.filter((item) => item !== button)
    }
  }

  clear = () => {
    this.buttonList.forEach((button) => {
      this.dom.removeChild(button.dom)
    })
    this.buttonList = []
  }
}