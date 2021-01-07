export default info = {
    IP : "10.0.2.2",
    HOST : "2020",
    RO_NEWS : `https://newsapi.org/v2/everything?q=covid&sortBy=publishedAt`+
    `&apiKey=ceb5a8887632471d959280cb3f31fd55&pageSize=100&page=1&language=ro`,
    NEWS : `https://newsapi.org/v2/everything?q=covid&sortBy=publishedAt&apiKey=ceb5a8887632471d959280cb3f31fd55`+
    `&pageSize=100&page=1&language=en&sources=bbc-news,nbc-news,new-scientist`,
    fetchMethod : (url) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json; charset=utf-8"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
};
