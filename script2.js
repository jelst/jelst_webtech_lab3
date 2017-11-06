function textEntered(event) {
    
    var date = new Date();
    
    if (event.which == 13 || event.keyCode == 13) {
        
        if (document.getElementById("newWebtechMsg").value != ""){
            
            var httpRequest = new XMLHttpRequest();
            var params = "msg=" + document.getElementById("newWebtechMsg").value + "&time=" + date + "&code=SE3313";
            httpRequest.open("POST", "https://jelst-3316-lab3-jelst.c9users.io:8080/api/messages", true);
            
            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    console.log(httpRequest.responseText);
                }
            };
            
            httpRequest.send(params);

        }
        
        if (document.getElementById("newNetworkingMsg").value != ""){
            
            var httpRequest = new XMLHttpRequest();
            var params = "msg=" + document.getElementById("newNetworkingMsg").value + "&time=" + date + "&code=SE3313";
            httpRequest.open("POST", "https://jelst-3316-lab3-jelst.c9users.io:8080/api/messages", true);
            
            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    console.log(httpRequest.responseText);
                }
            };
            
            httpRequest.send(params);
        }
    }
}