$(function() {
    
    
    function countdown() {
        var i = document.getElementById('timeout');
        if (parseInt(i.innerHTML)<=0) {
            location.href = 'index.html';
        }
        if (parseInt(i.innerHTML)!=0) {
            i.innerHTML = parseInt(i.innerHTML)-1;
        }
    }
    setInterval(function(){ countdown(); },1000);

    document.getElementById("timeoutBtn").onclick = function () {
        location.href = "index.html";
      };
});