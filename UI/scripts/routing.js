window.onload = () => {
  checkLocalData()
  routes("home");
};

function routes(route) {
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
    default:
      break;
  }
}
