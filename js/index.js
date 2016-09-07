// the JSON array of images
const pictures = require('../public/PictureArray.json')

// a few placeholder variables that will remain within this modules scope
let dragStartImage, dragStartIndex, borderSide

const initialize = () => {
  // iterate over urls in JSON array
  pictures.urls.forEach(appendImage)
  appendInput()
}

const appendImage = (src) => {
  const attrs = {
    className: 'image-box',
    id: `imageBox_${randomNumber()}`,
    ondragover: dragOver,
    ondrop: drop,
    ondragstart: dragStart,
    ondragstop: removeHighlight,
    ondragenter: addHighlight,
    ondragleave: removeHighlight,
    draggable: true,
    src
  }

  // create an img DOM node with the necessary attributes
  const img = createElementWithAttrs('img', attrs)

  // append the node to the designated parent container
  document.getElementById('gallery-container').appendChild(img)
}

const appendInput = () => {
  const attrs = {
    className: 'url-input',
    type: 'text',
    placeholder: 'http://placekitten.com/350/250',
    onkeydown: appendImageAndNotifyUser
  }

  // create the input DOM node with the necessary attributes
  const input = createElementWithAttrs('input', attrs)

  // append the node to the designated parent container
  document.getElementById('input-container').appendChild(input)
}

const appendImageAndNotifyUser = (e) => {
  if (e.keyCode !== 13) return

  // would normally take the time to sanitize this user input, but I'm trusting y'all for this example 😉
  appendImage(e.target.value)

  notifyUser('Image was added - scroll down to the bottom of the gallery to check it out!')
}

const notifyUser = (msg) => {
  const attrs = {
    id: 'user-alert',
    innerHTML: msg
  }

  // create a new label with the nexessary attributes
  const label = createElementWithAttrs('label', attrs)

  const alertNode = document.getElementById('user-alert')
  // by replacing nodes we can avoid ever having multiple alerts crowding the UI
  alertNode.parentNode.replaceChild(label, alertNode)

  // apply the hidden classname after half a second to fad out the alert
  setTimeout(() => { label.className = 'hidden' }, 500)
}

const createElementWithAttrs = (elemType, attrs) => {
  // create the element of the passed in type
  const element = document.createElement(elemType)

  // assign all the necessary attributes/handlers to the node
  Object.assign(element, attrs)

  // return the element
  return element
}

const randomNumber = () => Math.floor(Math.random() * 100000)

const drop = (e) => {
  e.preventDefault()
  removeHighlight(e)

  const elemIndex = getElementIndex(e.target)
  // The context node serves as a reference of which node is to be inserted before.
  const context = (elemIndex > dragStartIndex) ? e.target.nextElementSibling : e.target

  // In the case of nextElementSibling being null, the insertBefore method operates
  // in the same manner as appendChild would.
  e.target.parentNode.insertBefore(dragStartImage, context)
}

const dragOver = (e) => {
  e.preventDefault()
}

const allowDrop = (e) => {
  e.preventDefault()
}

const dragStart = (e) => {
  dragStartIndex = getElementIndex(e.target)
  dragStartImage = e.target
}

const getElementIndex = (node) => {
  const array = []
  const children = node.parentNode.children

  return array.indexOf.call(children, node)
}


const addHighlight = (e) => {
  const elemIndex = getElementIndex(e.target)

  // don't show highlights for the image being dragged
  if (elemIndex === dragStartIndex) return

  // the border side highlighting is meant to signal to which side
  // of the image the currently dragged image will be inserted.
  borderSide = (elemIndex > dragStartIndex) ? 'border-right' : 'border-left'
  e.target.style[borderSide] = '5px solid MediumOrchid'
}

const removeHighlight = (e) => {
  e.target.style[borderSide] = ''
}

// initialize this module's functionality
initialize()
