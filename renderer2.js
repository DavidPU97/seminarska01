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
    $("#cardNoSafe").val(sessionStorage.getItem("cardNoSafe"))

    $("#ccv").val(sessionStorage.getItem("ccv"))

    let bonus = false
    if(sessionStorage.getItem("zavarovanje") != null){
        bonus = sessionStorage.getItem("zavarovanje").toLowerCase() === 'true'
        $("#zavarovanje").prop('checked', bonus);
    }
    if($('#placilo1').is(':checked')){
        //$('#cardnumber').hide()
        $('#ccv').prop( "disabled", true );
        $('#cardnumber').prop( "disabled", true );
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
        saveData(bonus);
    
        console.log($('#zavarovanje').is(':checked'))
        location.href = "index.html";
    };

    document.getElementById("submitBtn").onclick = function () {
        let valid = true
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
        
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                valid = false
                }
        
                form.classList.add('was-validated')
            })
      
        if(valid){
            //sessionStorage.clear()
            saveData();
            location.href = "data_overview.html";
        }
    };
});


$('input[name="placilo"]').on('change', function(){
    sessionStorage.setItem('placilo', $(this).val());
});

var saveData = function(bonus){
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
    sessionStorage.setItem("cardNoSafe", $('#cardNoSafe').val());
    sessionStorage.setItem("ccv", $('#ccv').val());
}

document.getElementById("phone").onkeypress = function (event) {
    let element = document.getElementById("phone")
    /*if (isNaN(event.key) && !isAllowedKey(event)) {
		event.preventDefault();
	}*/
	
    //limit(event, element, 9)	
}

// CREDIT CARD FORMAT

document.getElementById("cardnumber").onfocus = function () {
    document.getElementById("cardnumber").value = document.getElementById("cardNoSafe").value;
}

document.getElementById("cardnumber").onblur = function () {
    let val = document.getElementById("cardnumber").value
    document.getElementById("cardNoSafe").value = val;
	var len = val.length;
	if (len >= 14) {
		const regex = /\d{4}(?= \d{1})/g;
		const substr = "xxxx";
		document.getElementById("cardnumber").value = val.replace(regex, substr);
	}
}

document.getElementById("cardnumber").onkeypress = function (event) {
    let element = document.getElementById("cardnumber")
    if (isNaN(event.key) && !isAllowedKey(event)) {
		event.preventDefault();
	} else {
		if (event.keyCode != 8) {
			if(element.value.length > 14) {
				var position = element.selectionStart;
				element.value = element.value.replace(/\W/gi, '').replace(/^(.{4})(.{4})(.{4})(.*)$/, "$1 $2 $3 $4");
				if(element.value.length != 19) {
					element.setSelectionRange(position, position);
				}
			}
			else {
				element.value = element.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
			}
		}
	}
    limit(event, element, 19)	
}

document.getElementById("cardnumber").onpaste = function (el) {
    return false
}

document.getElementById("cardnumber").oncut = function (el) {
    return false
}

function isAllowedKey(event) {
	var allowed = false;
	if (event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 37 || event.keyCode === 39) {
		allowed = true;
	}
	return allowed;
}

function limit(event, element, max_chars) {
	if(isTextSelected(element)){																		//
		max_chars += 1;
	}
	if (element.value.length >= max_chars && !isAllowedKey(event)) {
		event.preventDefault();
	}
}

function isTextSelected(input) {
	var startPosition = input.selectionStart;
	var endPosition = input.selectionEnd;

	var selObj = document.getSelection();
	var selectedText = selObj.toString();

	if (selectedText.length != 0) {
		input.focus();
		input.setSelectionRange(startPosition, endPosition);
		return true;
	} else if (input.value.substring(startPosition, endPosition).length != 0) {
		input.focus();
		input.setSelectionRange(startPosition, endPosition);
		return true;
	}
	return false;
}

function hideCardValue(val) {

}