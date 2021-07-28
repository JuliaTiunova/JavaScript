const $li = $(".menu__item");
const $card = $(".card");

const $cardInfo = $(".card-information");
const $cardRatings = $(".card-rating");
const $cardBuy = $(".card-buy");

$card.hide();
$("#info").on("click", () => {
  $li.siblings().removeClass("item--active");
  $("#info").addClass("item--active");
  $card.fadeOut(0);
  $cardInfo.fadeIn(400);
});

$("#ratings").on("click", () => {
  $li.siblings().removeClass("item--active");

  $("#ratings").addClass("item--active");
  $card.fadeOut(0);
  $cardRatings.fadeIn(400);
});

$("#buy").on("click", () => {
  $li.siblings().removeClass("item--active");

  $("#buy").addClass("item--active");
  $card.fadeOut(0);
  $cardBuy.fadeIn(400);
});

$("button").on("click", () => {
  alert("Woa, why'd you push me?");
});
