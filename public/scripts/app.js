//Takes a duration in minutes. Depending on its length, rounds and returns a string for "minutes ago", "hours ago", "days ago", "years ago".
const printDate = (minutes) => {
  if (minutes < 60 ) {
    return `${Math.round(minutes)} minutes ago`;
  } else if (minutes < 2880) {
    return `${Math.round(minutes/60)} hours ago`;
  } else if (minutes < 525600) {
    return `${Math.round(minutes/1440)} days ago`;
  } else return `${Math.round(minutes/525600)} years ago`
}

//XSS escape function
const escape = (text) => {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(text));
  return p.innerHTML;
}

const createTweetElement = (data) => {
  let minutes = Math.round((Date.now() - data.created_at) / 60000);
    return(
    `<article id="tweets">
      <header>
      <div class="tweet-avatar">
        <img src=${data.user.avatars}>
        <span class="username">${data.user.name}</span>
      </div>
      <span class="handle">${data.user.handle}</span>
      </header>

      <p>${escape(data.content.text)}</p>

      <footer>
        <span>${printDate(minutes)}</span>
        <div>
          <img src="/images/retweet.svg">
          <img src="/images/like.svg">
        </div>
      </footer>
      </article>`)
}

const renderTweets = data => {  
  const feed = $('#tweets-container');
  data.reverse().forEach(tweet => {
    feed.append(createTweetElement(tweet));
  });
}

const loadTweets = () => {
  $("#tweets-container").empty();
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "JSON",
  })
  .then(response => {
    renderTweets(response);
  })
}

$(document).ready(() => {
  loadTweets();
});


$(function() {
  $('#post-tweet').submit(function (event) {
  event.preventDefault();
  const input = $(this).serialize();
  const tweetLength = $(this).find("textarea").val().length;

    if (tweetLength > 140) {
      $("section.new-tweet .error.too-long").slideDown();
    } else if (tweetLength === 0) {
      $("section.new-tweet .error.no-input").slideDown();
    } else {
      $("section.new-tweet .error").slideUp();
      $(this).find("textarea").val("")
      $(this).find(".counter").text(140)

      $.ajax({ 
        url: "/tweets",
        method: 'POST',
        data: input
      })
      .then(() => {
        loadTweets();
      })
    }
  })
})

//"Write a new tweet" button functionality. On click, toggle slides form up and down"
$(function() {
  $("nav button").click(() => {
    $(".new-tweet").slideToggle();
    $("section.new-tweet .error").slideUp();
  })
})



$(function() {
  $("#scroll-to-top").click(() => {
    $("html, body").scrollTop(0);
  })
})

$(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 600) {
      $("#scroll-to-top").show();
    } else{
      $("#scroll-to-top").hide();
    }
  })
})