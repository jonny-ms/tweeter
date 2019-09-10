/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (data) => {
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
    <span>10 days ago</span>
    <div>
      <img src="/images/retweet.svg">
      <img src="/images/like.svg">
    </div>
  </footer>
  </article>`)
}

const renderTweets = data => {
  data.forEach(tweet => {
  $('#tweets-container').append(createTweetElement(tweet))
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
});


// ${(Date.now() - data.created_at) / 86400000}