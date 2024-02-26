const orderCta = document.querySelector('.order-cta')
const orderModal = document.querySelector('.order-form-modal')
const orderOverlay = document.querySelector('.overlay')
const [bookmarkButton, orderButton] = orderCta.children

function openOrderModal() {
  orderModal.classList.add('is-open')
  orderOverlay.classList.add('is-active')
}

orderButton.addEventListener('click', openOrderModal)

function closeOrderModal() {
  orderModal.classList.remove('is-open')
  orderOverlay.classList.remove('is-acive')
}

orderOverlay.addEventListener('click', closeOrderModal)

function toggleBookmark() {
  const [icon, countSpan] = this.children
  const count = Number(countSpan.innerHTML.replaceAll(',', ''))
  let newCount = count

  if (this.classList.contains('is-active')) {
    icon.setAttribute('class', 'ic-bookmark')
    newCount--
  } else {
    icon.setAttribute('class', 'ic-bookmark-filled')
    newCount++
  }

  countSpan.innerHTML = newCount.toLocaleString()
  countSpan.setAttribute('aria-label', `북마크 ${newCount.toLocaleString()}회`)
  this.classList.toggle('is-active')
}

bookmarkButton.addEventListener('click', toggleBookmark)
