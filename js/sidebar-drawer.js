const drawerButtonList = document.querySelectorAll(
  '.sidebar-nav .drawer-menu-button'
)

function toggleDrawerMenu() {
  const drawerMenu = this.parentNode
  drawerMenu.classList.toggle('is-open')
}

drawerButtonList.forEach((button) => {
  button.addEventListener('click', toggleDrawerMenu)
})
