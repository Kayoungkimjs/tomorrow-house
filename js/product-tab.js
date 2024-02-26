const productTab = document.querySelector('.product-tab')
const productTabListButton = productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = null
let disableUpdating = false

function toggleProductTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    disableUpdating = true
    tabItem.classList.add('is-active')

    if (currentActiveTab) {
      currentActiveTab.classList.remove('is-active')
    }
    currentActiveTab = tabItem
  }

  setTimeout(() => {
    disableUpdating = false
  }, 1000)
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  })
}

productTabListButton.forEach((button) => {
  button.addEventListener('click', toggleProductTab)
  button.addEventListener('click', scrollToTabPanel)
})

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommend',
]

const productTabPanelList = productTabPanelIdList.map((panelId) => {
  const tabPanel = document.querySelector(`#${panelId}`)
  return tabPanel
})

const productTabPanelPositionMap = {}

function detectTabPanelPosition() {
  productTabPanelList.forEach((panel) => {
    if (panel) {
      const id = panel.getAttribute('id')
      const position = window.scrollY + panel.getBoundingClientRect().top
      productTabPanelPositionMap[id] = position
    }
  })

  updateActiveTabOnScroll()
}

function updateActiveTabOnScroll() {
  if (disableUpdating) {
    return
  }

  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8)

  let newActiveTab

  if (scrolledAmount >= productTabPanelPositionMap['product-recommend']) {
    newActiveTab = productTabListButton[4]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-shipment']) {
    newActiveTab = productTabListButton[3]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-inquiry']) {
    newActiveTab = productTabListButton[2]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-review']) {
    newActiveTab = productTabListButton[1]
  } else {
    newActiveTab = productTabListButton[0]
  }

  const bodyHeight =
    document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0)

  if (window.scrollY + window.innerHeight === bodyHeight) {
    newActiveTab = productTabListButton[4]
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      currentActiveTab && currentActiveTab.classList.remove('is-active')
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000))
window.addEventListener('scroll', _.throttle(updateActiveTabOnScroll, 300))
