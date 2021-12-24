window.onload = () => {
  routes("random");
};

function routes(route) {
  switch (route) {
    case "home":
      content.innerHTML = home();
      break;
    case "random":
      content.innerHTML = random();
      loadRandom();
      break;
    case "scheduled":
      content.innerHTML = scheduled();
      break;
    default:
      break;
  }
}
