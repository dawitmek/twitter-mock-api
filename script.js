var user1 = {
    userName: '@elonmusk',
    displayName: 'Elon Musk',
    joinedDate: 'June 2009',
    followingCount: 103,
    followerCount: 47900000,
    avatarURL: 'assets/elonmusk.jpg',
    coverPhotoURL: 'assets/elonmusk-cover.jpeg',
    tweets: [
        {
            text: 'I admit to judging books by their cover',
            timestamp: '2/10/2021 00:01:20'
        },
        {
            text: 'Starship to the moon',
            timestamp: '2/09/2021 18:37:12'
        },
        {
            text: 'Out on launch pad, engine swap underway',
            timestamp: '2/09/2021 12:11:51'
        }
    ]
};

var user2 = {
    userName: '@BillGates',
    displayName: 'Bill Gates',
    joinedDate: 'June 2009',
    followingCount: 274,
    followerCount: 53800000,
    avatarURL: 'assets/billgates.jpg',
    coverPhotoURL: 'assets/billgates-cover.jpeg',
    tweets: [
        {
            text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
            timestamp: '2/10/2021 00:01:20'
        },
        {
            text: 'Should I start tweeting memes? Let me know in a comment.',
            timestamp: '2/09/2021 18:37:12'
        },
        {
            text: 'In 2020, I read a book every hour.',
            timestamp: '2/09/2021 12:11:51'
        }
    ]
};

var userNum 
const urlParam = new URLSearchParams(location.search);

if(location.search) {
    userNum = Object.fromEntries(urlParam.entries()).user;
} else {
    userNum = 'user1';
}

var allContentContainer = document.querySelector('.all-content-container');
var header = document.querySelector('.header');
var coverPic = document.querySelector('.cover-pic');
var pfp = document.querySelector('.profile-pic');
var profileDes = document.querySelector('.profile-description');
var tweetContainer = document.querySelector('.tweets-container');


pfp.style= `
    background: url(${window[userNum].avatarURL});
    background-size: cover;
`;

coverPic.style=`
    background: url(${window[userNum].coverPhotoURL});
    background-size: cover;
`

profileDes.innerHTML = `
    <div class='profile-detail'>
        <h1 class='username'>${window[userNum].displayName}</h1>
        <h3 class='handle'>${window[userNum].userName}</h3>
        <h3 class='joined'>Joined ${window[userNum].joinedDate}</h3>
        <span class='following'><strong>${format(window[userNum].followingCount)}</strong> Following</span>
        <span class='followers'><strong>${format(window[userNum].followerCount)}</strong> Followers</span>
    </div>
`
for(var tweets of window[userNum].tweets) {
    var tweetBox = document.createElement('div');
    tweetBox.classList.add('tweet-box');
    tweetContainer.appendChild(tweetBox);
    tweetBox.innerHTML = `
    <span class='small-pfp'><img src=${window[userNum].avatarURL}></span>
    <div class='tweet-body'>
        <div class='tweet-header'>
            <h4 class='user-name'>${window[userNum].displayName}</h4>
            <h4 class='handle'>${window[userNum].userName}</h5>
            <h4 class='date'>${calcTime(tweets.timestamp)} </h4>
        </div>
        <div class='tweet-content'>
            <p>${tweets.text}</p>
        </div>
    </div>
    `;
}

function format(num) {
    if(num > 999 && num < 1000000) {
        return (num = num/1000).toFixed(1) + 'K';
    } else if (num > 999999) {
        return (num = num/1000000).toFixed(1) + 'M';
    } else {
        return num;
    }
}

function calcTime(time) {
    var newTime = Date.now();
    var oldTime = new Date(time).getTime();

    let timeDiff = newTime - oldTime;
    
    if(timeDiff < 60000) { // milli to sec
        return  Math.floor(timeDiff/1000) + 's';

    } else if(timeDiff < 3.6e+6) { // milli to min
        return  Math.floor(timeDiff/(60000)) + ' minutes'

    } else if(timeDiff < 8.64e+7) { // milli to hour
        return Math.floor(timeDiff/3.6e+6) + ' hours';
        
    } else if(timeDiff < 6.048e+8) { // milli to day
        console.log('day was true');
        return Math.floor(timeDiff/8.64e+7) + ' days';

    } else if (timeDiff < 2.628e+9) { // milli to weeks
        return Math.floor(timeDiff/6.048e+8) + ' weeks';

    } else if (timeDiff < 3.154e+10) { // milli to months
        return Math.floor(timeDiff/2.628e+9) + ' months';

    } else {
        return (new Date(time)).toString().split(' ').splice(1, 3).join('/');
    }
}