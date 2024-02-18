const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = document.querySelector('.form-input')
const gnbSearchHistory = document.querySelector('.search-history')
const searchHistoryList = gnbSearchHistory.querySelector('.search-history-list')
const deleteAllButton = gnbSearchHistory.querySelector(
  '.search-history-header button'
)
const deleteButtonLists = searchHistoryList.querySelectorAll('.delete-button')

function closeGnbSearchHistory() {
  gnbSearchHistory.classList.remove('is-active')
  window.removeEventListener('click', closeSearchHistory)
}

function closeSearchHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    closeGnbSearchHistory()
  }
}

function toggleSearchHistory() {
  if (searchHistoryList.children.length === 0) {
    return
  }

  if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeSearchHistory)
  }
  gnbSearchHistory.classList.toggle('is-active')
}

function deleteAllHistory() {
  searchHistoryList.innerHTML = ''
  closeGnbSearchHistory()
}

function deleteSearchHistory(e) {
  e.stopPropagation()
  const itemToDelete = this.parentNode
  searchHistoryList.removeChild(itemToDelete)

  if (searchHistoryList.children.length === 0) {
    closeGnbSearchHistory()
  }
}

deleteButtonLists.forEach((button) => {
  button.addEventListener('click', deleteSearchHistory)
})
gnbSearchInput.addEventListener('focus', toggleSearchHistory)
deleteAllButton.addEventListener('click', deleteAllHistory)
