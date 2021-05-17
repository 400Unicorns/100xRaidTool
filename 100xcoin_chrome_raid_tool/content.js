//alert('works')
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    allComments = document.documentElement.querySelectorAll("#sections #contents ytd-comment-thread-renderer")
    console.log("All comments below")
    let numCommentsLiked = 0

    allComments.forEach((element) => {
            let numberOfSpanChildren = element.querySelectorAll("#content-text > span").length
            let isLongComment = (numberOfSpanChildren == 0) ? false : true
            
            let rawComment = element.querySelector("#content-text").innerHTML;
            if(isLongComment){
                rawComment = ""
                element.querySelectorAll("#content-text > span").forEach((commentChild) => {
                    rawComment += commentChild.innerHTML;
                });
            }

            if(element.querySelector("#content-text > a") != null){
                rawComment += element.querySelector("#content-text > a").innerHTML;
            }

            if(rawComment.replace(/\s+/, "").toLowerCase().includes('100xcoin')){
                console.log(rawComment);
                let likeButton = element.querySelector("#button");
                let likeButtonStatus = likeButton.querySelector("#button").getAttribute("aria-label");
                
                if(likeButtonStatus != "Unlike")
                    likeButton.click();
                numCommentsLiked += 1;
            }
        });
    sendResponse({count: numCommentsLiked})
})
