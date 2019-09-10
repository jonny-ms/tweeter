$(document).ready(() => {
  $(".new-tweet form textarea").on("keyup", function() {

    let remaining = (140 - $(this).val().length);
    $(this).parent().find("span.counter").text(remaining)

    if (remaining < 0) {
      $(this).parent().find("span.counter").text(remaining).css("color", "red")
    } else {
      $(this).parent().find("span.counter").text(remaining).css("color", "#585858")
    }
  });
});