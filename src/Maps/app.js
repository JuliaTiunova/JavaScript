function initMap() {
  const vatnajökulsþjóðgarður = {
    lat: 64.782624152841,
    lng: -17.22404987287358,
  };
  const lviv = { lat: 49.843262, lng: 24.026612 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: vatnajökulsþjóðgarður,
    mapId: "e5a1d1912841e7be",
  });
  const marker = new google.maps.Marker({
    position: lviv,
    map: map,
    icon: "img/location.png",
  });

  const markerIceland = new google.maps.Marker({
    position: vatnajökulsþjóðgarður,
    map: map,
    icon: "img/location.png",
  });

  const icelandPark = new google.maps.InfoWindow({
    content: `<img src='img/park.jpeg'/>`,
  });

  const infoLviv = new google.maps.InfoWindow({
    content: "<span>Ви у Львові!</span>",
  });

  marker.addListener("click", () => {
    infoLviv.open(map, marker);
  });
  markerIceland.addListener("click", () => {
    icelandPark.open(map, markerIceland);
  });

  const origin = document.querySelector(".input--a");
  const destination = document.querySelector(".input--b");
  const type = document.querySelector(".input--c");
  const form = document.querySelector(".form");

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  function showRoute(from, to, type) {
    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: type,
      },
      function (result, status) {
        if (status == "OK") {
          directionsRenderer.setDirections(result);
        }
      }
    );
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showRoute(origin.value, destination.value, type.value);
  });
}
