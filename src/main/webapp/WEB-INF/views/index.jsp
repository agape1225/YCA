<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">

<script>
    const https = require('https');
    const url = encodeURIComponent('https://www.quora.com/search?q=proxycrawl');
    const options = {
        hostname: 'api.proxycrawl.com',
        path: '/?token=JS_TOKEN&scraper=quora-serp&scroll=true&url=' + url,
    };
</script>

<head>
    <title>View Test Page</title>
</head>
<body>
main page
</body>

</html>