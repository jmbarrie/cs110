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
                // create_elements(data["statuses"][i]["text"])

                // if the id is NOT in our json, then push it into tweet 
                // this presents issues if multiple mentions, hashtags, urls
                if (!(data["statuses"][i]["_id"] in our_data)) {
                    our_data.tweets.push({
                        "_id": data["statuses"][i]["_id"],
                        "text": data["statuses"][i]["text"],
                        "name": data["statuses"][i]["user"]["name"],
                        "screen_name": data["statuses"][i]["user"]["screen_name"],
                        "profile_pic": data["statuses"][i]["user"]["profile_image_url_https"],
                        "hashtags": data["statuses"][i]["entities"]["hashtags"],
                        "mentions": data["statuses"][i]["entities"]["mentions"],
                        "urls": data["statuses"][i]["entities"]["urls"]
                    })
                }
            }
            console.log(our_data)
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        });
}

const api_url = "http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather"
var our_data = {
    "tweets": []
}
get_data(api_url);

// Format is scope(window).setInterval(function, time (in ms), arguments)
// window.setInterval(get_data, 10000, api_url);
