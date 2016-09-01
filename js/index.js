// the JSON array of images
const pictures = require('../public/PictureArray.json')

// a few placeholder variables that will remain within this modules scope
let dragStartImage, dragStartIndex, borderSide

const initialize = () => {
  // iterate over urls in JSON array
  pictures.urls.forEach(appendImage)
  appendInput()
}

const appendImage = (url) => {
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
    src: url
  }

  // create an img DOM node
  const img = document.createElement('img')
  // assign all the necessary attributes/handlers to the node
  Object.assign(img, attrs)

  // append the node to the designated parent container
  document.getElementById('gallery-container').appendChild(img)
}

const appendInput = () => {
  const attrs = {
    className: 'url-input',
    type: 'text',
    placeholder: 'http://placekitten.com/350/250',
    onkeydown: addImageUrl
  }

  const input = document.createElement('input')
  // assign all the necessary attributes/handlers to the node
  Object.assign(input, attrs)

  // append the node to the designated parent container
  document.getElementById('input-container').appendChild(input)
}

const addImageUrl = (e) => {
  if (e.keyCode !== 13) return

  // would normally take the time to sanitize this user input, but I'm trusting y'all for this example 😉
  appendImage(e.target.value)
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

// initialize the module's functionality
initialize()
