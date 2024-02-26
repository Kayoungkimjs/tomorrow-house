const searchModal = document.querySelector('.search-modal')
const searchOverlay = document.querySelector('.overlay')
const searchButton = document.querySelector(' .gnb-icon-button.is-search')
const closeButton = searchModal.querySelector('.search-modal-form button')

const searchHistory = searchModal.querySelector('.search-history')
const deleteAllHistoryButton = searchHistory.querySelector(
  '.search-history-header button'
)
const searchHistoryContent = searchHistory.querySelector(
  '.search-history-content'
)
const searchHistoryContentList = searchModal.querySelector(
  '.search-history-list'
)

const deleteHistoryItemButton =
  searchHistoryContentList.querySelectorAll('.delete-button')

function openSearchModal() {
  searchModal.classList.add('is-active')
  searchOverlay.classList.add('is-active')
}

searchButton.addEventListener('click', openSearchModal)

function closeSearchModal() {
  searchModal.classList.remove('is-active')
  searchOverlay.classList.remove('is-active')
}

function deleteAllSearchHistory() {
  searchHistoryContentList.innerHTML = ''
  searchHistoryContent.classList.add('no-content')
}

function deleteSearchHistoryItem(e) {
  e.stopPropagation()
  const itemToDelete = this.parentNode
  searchHistoryContentList.removeChild(itemToDelete)

  if (searchHistoryContentList.children.length === 0) {
    searchHistoryContentList.innerHTML = ''
    searchHistoryContent.classList.add('no-content')
  }
}

closeButton.addEventListener('click', closeSearchModal)
deleteAllHistoryButton.addEventListener('click', deleteAllSearchHistory)
deleteHistoryItemButton.forEach((button) => {
  button.addEventListener('click', deleteSearchHistoryItem)
})
