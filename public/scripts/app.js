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
  <p>${data.content.text}</p>
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
  const feed = $('#tweets-container')
  data.forEach(tweet => {
  feed.append(createTweetElement(tweet))
  })
}

// Test / driver code (temporary)

const tweetData = [
  
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(() => {
  renderTweets(tweetData);

  loadTweets()

  
});




$(function() {
  $('#post-tweet').submit(function (event) {
  event.preventDefault()
  const input = $(this).serialize()
    $.ajax({ 
      url: "/tweets",
      method: 'POST',
      data: input
     })
      .then(response => {
        console.log(response, input)
      })
  });
})

const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "JSON"
  }).then(response => {
    renderTweets(response)
  })
}


const postTweet = function() {
};

  



