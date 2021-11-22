/* USER PAGE */

$(function() {
    let radioPlacilo = document.getElementsByName("placilo"); // list of radio buttons
    let valPlacilo = sessionStorage.getItem('placilo'); // local storage value
    for(let i=0;i<radioPlacilo.length;i++){
      if(radioPlacilo[i].value == valPlacilo){
        radioPlacilo[i].checked = true;
      }
    }
    

    $("#name").val(sessionStorage.getItem("name"))
    $("#surname").val(sessionStorage.getItem("surname"))
    $("#address").val(sessionStorage.getItem("address"))
    $("#city").val(sessionStorage.getItem("city"))
    $("#postcode").val(sessionStorage.getItem("postcode"))
    $("#email").val(sessionStorage.getItem("email"))
    $("#phone").val(sessionStorage.getItem("phone"))
    $("#age").val(sessionStorage.getItem("age"))
    $("#car_license").val(sessionStorage.getItem("car_license"))
    $("#cardnumber").val(sessionStorage.getItem("cardnumber"))
    $("#ccv").val(sessionStorage.getItem("ccv"))

    let bonus = false
    if(sessionStorage.getItem("zavarovanje") != null){
        bonus = sessionStorage.getItem("zavarovanje").toLowerCase() === 'true'
        $("#zavarovanje").prop('checked', bonus);
    }
    
    

    $('input[name="placilo"]').on('change', function(){
        if($('#placilo1').is(':checked')){
            //$('#cardnumber').hide()
            $('#ccv').prop( "disabled", true );
            $('#cardnumber').prop( "disabled", true );
        }
        else{
            //$('#cardnumber').show()
            $('#ccv').prop( "disabled", false );
            $('#cardnumber').prop( "disabled", false );
        }
    });
    let days = parseInt(sessionStorage.getItem('days'))
    
    if(bonus){
        document.getElementById('total_price').innerHTML = 'CENA: '+(days*100+days*2)+'€';
    }
    else{
        document.getElementById('total_price').innerHTML = 'CENA: '+days*100+'€';
    }
    $('#zavarovanje').on('change', function(){
       if($('#zavarovanje').is(':checked')){
            bonus = true
            document.getElementById('total_price').innerHTML = 'CENA: '+(days*100+days*2)+'€';
       }
       else{
            bonus = false
            document.getElementById('total_price').innerHTML = 'CENA: '+days*100+'€';
       }
    });

    document.getElementById("backBtn").onclick = function () {
        sessionStorage.setItem("name", $('#name').val());
        sessionStorage.setItem("surname", $('#surname').val());
        sessionStorage.setItem("address", $('#address').val());
        sessionStorage.setItem("city", $('#city').val());
        sessionStorage.setItem("postcode", $('#postcode').val());
        sessionStorage.setItem("email", $('#email').val());
        sessionStorage.setItem("phone", $('#phone').val());
        sessionStorage.setItem("age", $('#age').val());
        sessionStorage.setItem("car_license", $('#car_license').val());
        sessionStorage.setItem("zavarovanje", $('#zavarovanje').is(':checked'));
        sessionStorage.setItem("bonus", bonus);
        sessionStorage.setItem("cardnumber", $('#cardnumber').val());
        sessionStorage.setItem("ccv", $('#ccv').val());
    
        console.log($('#zavarovanje').is(':checked'))
        location.href = "index.html";
    };
});


$('input[name="placilo"]').on('change', function(){
    sessionStorage.setItem('placilo', $(this).val());
});