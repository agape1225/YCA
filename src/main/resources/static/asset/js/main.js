function getImgApi(){
    imgUrl = $("#search").val();
    $("#Img").attr("src", imgUrl);
    $.ajax({
        method: "POST",
        url: "https://dapi.kakao.com/v2/vision/adult/detect",
        data: {
            image_url: imgUrl
        },
        headers: {
            Authorization: "KakaoAK 7d1041ba77ea467f493d4283bd6262a9"
        }



    }).done(function(msg){
        console.log(msg["result"]);
    });
}