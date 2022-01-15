window.onload = () => {
  routes("home");
  
};

function routes(route) {
  switch (route) {
    case "home":
      content.innerHTML = home();
      setTimeout(() => {content.innerHTML = home();}, 1000); 
      break;
    case "random":
      content.innerHTML = scheme("random");
      loadRandom(false);
      break;
    case "scheduled":
      content.innerHTML = scheme("scheduled");
      loadScheduled(false);
      break;
    case "auto":
    content.innerHTML = auto();
    loadAuto(false);
    break;
    default:
      routes("home");
      break;
  }
}
