<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>View Test Page</title>
</head>
<body>
<input type="text" id="ImgUrl">
<input type="button" onclick="getImgApi()" value="클릭!">
<br>
<img id="Img">
</body>
<script>
    function getImgApi(){
        imgUrl = $("#ImgUrl").val();
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
</script>
</html>