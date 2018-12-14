function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

function showNotifcation(title, message){
    let notficationOptions = {
        type: "basic",
        iconUrl: '/icons/icon.png',
        title: title,
        message: message
    };
    chrome.notifications.create(notficationOptions);
}

function sendVideo(videoURL, user) {
    let url = 'https://api.floob.club/addVideo';
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            console.log(response);
        }
        if(xhr.readyState === 4 && xhr.status != 200){
            showNotifcation("Error", "Error connecting to server.");
        }
    };
    let data = {
        "videoURL": videoURL,
        "user": "Chrome-Extension"
    }
    xhr.send(JSON.stringify(data));
}


//Define Right-Click button
let contextMenuItem = {
    "id": "AddVideo",
    "title": "Add Video",
    "contexts": ["link", "video"]
};

//Create Right-Click option
chrome.contextMenus.create(contextMenuItem);
//Listen for when option is clicked.
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (tab.url.includes("youtube")) {
        if (info.linkUrl) {
            sendVideo(info.linkUrl);
        }
        if (info.pageUrl) {
            sendVideo(info.pageUrl);
            return;
        }
    }
})