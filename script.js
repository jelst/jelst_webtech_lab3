var httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "http://https://jelst-3316-lab3-jelst.c9users.io:8080/api/messages", true);
httpRequest.send();

httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        var res = httpRequest.responseText.split("\{");

        var webtechArr = new Array(20);
        var networkingArr = new Array(20);
        
        for (var i = 0, i13 = 0, i16 = 0; i < 40; i++) {
            if (res[i].includes('SE3313')) {
                webtechArr[i13] = res[i].split('","text":')[1].split("\"")[0];
                i13++;
            }
            else {
                networkingArr[i16] = res[i].split('","text":')[1].split("\"")[0];
                i16++;
            }
        }
        
        for (var i = 0; i < webtechArr.length; i++) {
            var node1 = document.createElement("LI");
            var textNode1 = document.createTextNode(webtechArr[i]);
            node1.appendChild(textNode1);
            document.getElementById("webtech").appendChild(node1);
        }
        
        for (var i = 0; i < networkingArr.length; i++) {
            var node2 = document.createElement("LI");
            var textNode2 = document.createTextNode(networkingArr[i]);
            node2.appendChild(textNode2);
            document.getElementById("networking").appendChild(node2);
        }
    }
};