window.onload = () => {
  let initialTab = "automatic"
  routes(initialTab, document.getElementById(`${initialTab}Tab`));
  
};

var currentTab = ""

function routes(route, tab, loadData = false) {
  if (currentTab != route || loadData ) {
    currentTab = route;
    document.querySelectorAll(".list__item").forEach((item) => {
      if (item.classList.contains("active")) item.classList.remove("active")
    })
    
    document.getElementById(tab.id).classList.add("active")
    switch (route) {
      case "home":
        content.innerHTML = home();
        break;
        case "random":
          content.innerHTML = scheme("random");
          loadRandom(false);
          break;
    case "scheduled":
      content.innerHTML = scheme("scheduled");
      loadScheduled(false);
      break;
      case "automatic":
        content.innerHTML = auto();
        loadAuto(false);
        break;
        default:
          routes("home");
      break;
    }
  }
}
