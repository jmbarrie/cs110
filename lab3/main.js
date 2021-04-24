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

function processDate(pre_date) {
    // 2021-04-24T20:59:23+00:00
    let post_date = pre_date.split('T');

    return post_date[0];
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function create_elements(json) {
    /*
    Uses the JSON data from API to dynamically create tweet elements. 
    This might be an issue when considering updating the feed because it might
    duplicate tweets. I think it is at this point we create a set to manage
    what tweets are in. 
    */
    let body = document.getElementsByClassName('flex-child content-center')[0];

    
    let tweetDiv = document.createElement('div');
    let profilePic = document.createElement('img');
    let userName = document.createElement('p');
    let displayName = document.createElement('p');
    let tweetText = document.createElement('p');

    tweetDiv.className = 'tweet';
    tweetDiv.id = json._id;

    profilePic.src = json.profile_pic;
    profilePic.className = 'pfp_post';

    tweetText.innerHTML = json.text;

    userName.className = 'name';
    userName.innerHTML = json.name;

    displayName.className = 'grey';
    
    displayName.innerHTML = '@' + json.screen_name + ' ' + processDate(json.creation_date);

    // TODO: Figure out what is going on with userName and displayName in html
    // There might be some playing we have to do with 'gray' and 'name' classes
    tweetText.appendChild(userName);
    tweetText.appendChild(displayName);
    tweetDiv.appendChild(profilePic);
    tweetDiv.appendChild(tweetText);
    body.appendChild(tweetDiv);
}

function get_data(url) {
    if (!(document.getElementById("pause_button").checked)) {
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
                    our_data.push({
                        "_id": data["statuses"][i]["_id"],  
                        "text": data["statuses"][i]["text"],
                        "name": data["statuses"][i]["user"]["name"],
                        "screen_name": data["statuses"][i]["user"]["screen_name"],
                        "profile_pic": data["statuses"][i]["user"]["profile_image_url_https"],
                        "hashtags": data["statuses"][i]["entities"]["hashtags"],
                        "mentions": data["statuses"][i]["entities"]["user_mentions"],
                        "urls": data["statuses"][i]["entities"]["urls"],
                        "creation_date": data["statuses"][i]["created_at"],
                        "tweeted": false
                    })
                }
            }
            our_data.sort((a, b) => (a.creation_date > b.creation_date) ? 1 : -1);
            for (let i = 0; i < our_data.length; ++i) {
                if (!(our_data[i].tweeted)) {
                    create_elements(our_data[i]);
                    our_data[i].tweeted = true;
                }
            }
            console.log(id_list);
            console.log(our_data);
            console.log(data);
        })
        .catch(err => {
            console.log(err)
        });
    }
}

const api_url = "http://twitterfeedserverrails-env.eba-xmqy8ybh.us-east-1.elasticbeanstalk.com/feed/random?q=weather"
var our_data = []
get_data(api_url);

// Format is scope(window).setInterval(function, time (in ms), arguments)
window.setInterval(get_data, 5000, api_url);


// Search Bar Implementation
let searchString = "" // here we use a global variable

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase();
    // 1. match all tweets containing search values 'live' OR after user hits enter
    removeAllChildNodes(document.getElementsByClassName("flex-child content-center")[0]);
    
    for (let i = 0; i < our_data.length; ++i) {
        if (our_data[i].text.toLowerCase().includes(searchString)) {
            create_elements(our_data[i]);
        }
    }
}
document.getElementById("searchBar").addEventListener("input", handleSearch)