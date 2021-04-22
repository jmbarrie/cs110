function create_elements(json) {
    var body = document.getElementsByTagName('body')[0]
    var newDiv = document.createElement('div');

    newDiv.id = 'testId';
    newDiv.innerHTML = json;
    body.appendChild(newDiv);
}

function get_data(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data["statuses"].length; i++) {
                // document.write("ID: " + data["statuses"][i]["text"] + "\n")
                // tweets.push(data["statuses"][i]["text"])
                create_elements(data["statuses"][i]["text"])
            }
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        });
}

const api_url = "http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather"
var tweets = [];
get_data(api_url);
console.log(tweets);

// Format is scope(window).setinterval(function, time (in ms), arguments)
window.setInterval(get_data, 10000, api_url);

// document.write(tweets[0]);

// for (let i = 0; i < 5; i++) {
//     create_elements();
// }

/*
Interesting JSON values:
    entities - has some information like links, hashtags, mentions, and "media" idk what that is
        urls - replaces {link}
        hashtags 
        user_mentions

    text - the actual tweet

    user
        name - the display name
        profile_image_url_https - the image
        screen_name - possibly their @ 

*/