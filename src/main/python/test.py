
def testFunc():



    url = 'https://www.youtube.com/watch?v=pSI4S3iE-5k'
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        print(soup)

    return response
