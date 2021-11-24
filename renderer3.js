$(function() {
    $("#prevzem").html(sessionStorage.getItem("locStart"))
    $("#vračilo").html(sessionStorage.getItem("locEnd"))
    let dateStr = sessionStorage.getItem("startDate")
    let startHr = sessionStorage.getItem("startHour")
    let startMin = sessionStorage.getItem("startMin")
    if(startHr.length == 1){
        startHr = "0"+startHr
    }
    if(startMin.length == 1){
        startMin = "0"+startMin
    }
    $("#zacetekIzposoje").html(dateStr+" "+startHr+":"+startMin)

    let dateStrEnd = sessionStorage.getItem("endDate")
    let startHrEnd = sessionStorage.getItem("endHour")
    let startMinEnd = sessionStorage.getItem("endMin")
    if(startHrEnd.length == 1){
        startHrEnd = "0"+startHrEnd
    }
    if(startMinEnd.length == 1){
        startMinEnd = "0"+startMinEnd
    }
    $("#konecIzposoje").html(dateStrEnd+" "+startHrEnd+":"+startMinEnd)
    $("#velikost").html(sessionStorage.getItem("velikost"))
    $("#model").html(sessionStorage.getItem("model"))
    $("#menjalnik").html(sessionStorage.getItem("menjalnik"))
    $("#pogon").html(sessionStorage.getItem("pogon"))
    
    $("#name").html(sessionStorage.getItem("name"))
    $("#surname").html(sessionStorage.getItem("surname"))
    $("#address").html(sessionStorage.getItem("address"))
    $("#city").html(sessionStorage.getItem("city"))
    $("#postcode").html(sessionStorage.getItem("postcode"))
    $("#email").html(sessionStorage.getItem("email"))
    $("#phone").html(sessionStorage.getItem("phone"))
    $("#age").html(sessionStorage.getItem("age")+" let")
    $("#car_license").html(sessionStorage.getItem("car_license")+" let")
    let zavarovanje = "DA"
    if(sessionStorage.getItem("zavarovanje")){
        zavarovanje = "NE"
    }
    $("#zavarovanje").html(zavarovanje)
    $("#placilo").html(sessionStorage.getItem("placilo"))
    $("#cardnumber").html(sessionStorage.getItem("cardnumber"))
    $("#ccv").html(sessionStorage.getItem("ccv"))

    let bonus = sessionStorage.getItem("zavarovanje").toLowerCase() === 'true'
    let days = parseInt(sessionStorage.getItem('days'))
    if(bonus){
        document.getElementById('total_price').innerHTML = 'CENA: '+(days*100+days*2)+'€';
    }
    else{
        document.getElementById('total_price').innerHTML = 'CENA: '+days*100+'€';
    }


    document.getElementById("backBtn2").onclick = function () {
        location.href = "user_page.html";
      };
});