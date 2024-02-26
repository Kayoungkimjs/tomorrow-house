const sectionHeaderButton = document.querySelector(
  '.product-shipment .product-section-header.sm-only .icon-button'
)

function showFullSection() {
  const section = this.parentNode.parentNode
  console.log(section)
  section.classList.add('is-open')
}

sectionHeaderButton.addEventListener('click', showFullSection)
