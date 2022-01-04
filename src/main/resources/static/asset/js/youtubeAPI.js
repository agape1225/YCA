/**
 * Sample JavaScript code for youtube.commentThreads.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

function string_conversion(comments){

    console.log("Response",comments)
    /*for(const elements of comments){

    }*/

}

function loadClient() {
    
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

                for(var idx in body){
                    var commentText = body[idx].snippet.topLevelComment.snippet.textOriginal;
                    comments.push(commentText);
                }

                string_conversion(comments);
                //console.log("Response",comments);

            },
            function(err) { console.error("Execute error", err); });
}

gapi.load("client");
