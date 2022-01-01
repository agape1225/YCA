/**
 * Sample JavaScript code for youtube.commentThreads.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

function loadClient() {
    gapi.client.setApiKey("AIzaSyBJdrY6J-S6nq_Gy6oV1LSc8YMdvOgUuWQ");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { execute(); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded before calling this method.
function execute() {

    //loadClient();

    const videoId = document.getElementById('videoId').value;

    return gapi.client.youtube.commentThreads.list({
        "part": [
            "id,replies,snippet"
        ],
        "maxResults": 100,
        "videoId": videoId
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).

                const comments = [];
                var body = response.result.items;

                for(idx in body){
                    var commentText = body[idx].snippet.topLevelComment.snippet.textOriginal;
                    comments.push(commentText);
                }

                console.log("Response",comments);

            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client");