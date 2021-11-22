// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



/* $(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {  
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
}); */

$(function() {
  $('input[name="datetimes"]').daterangepicker({
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 15,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(24, 'hour'),
    minDate: moment().startOf('hour'),
    showDropdowns: true,
    locale: {
      format: 'DD/M/YYYY HH:mm',
      separator: "  −  ",
    }
  });

  if(sessionStorage.getItem("startDate") != null && sessionStorage .getItem("endDate") != null){
    $('#date').data('daterangepicker').setStartDate(sessionStorage .getItem("startDate"));
    $('#date').data('daterangepicker').startDate._d.setHours(sessionStorage .getItem("startHour"));
    $('#date').data('daterangepicker').startDate._d.setMinutes(sessionStorage .getItem("startMin"));
  
    $('#date').data('daterangepicker').setEndDate(sessionStorage .getItem("endDate"));
    $('#date').data('daterangepicker').endDate._d.setHours(sessionStorage .getItem("endHour"));
    $('#date').data('daterangepicker').endDate._d.setMinutes(sessionStorage .getItem("endMin"));
  }

  if(sessionStorage.getItem('days') == null){
    sessionStorage.setItem('days', 1)
  }
  let days = parseInt(sessionStorage.getItem('days'))
  
  let bonus = false
  if(sessionStorage.getItem("zavarovanje") != null){
    bonus = sessionStorage.getItem('bonus').toLowerCase() === 'true'
  }
  console.log(bonus)
  if(bonus){
    document.getElementById('total_price').innerHTML = 'CENA: '+(days*100+days*2)+'€';
  }
  else{
    document.getElementById('total_price').innerHTML = 'CENA: '+days*100+'€';
  }
  $('input[name="datetimes"]').on('change', function(){
    let daysCalendar = Math.ceil((new Date($('#date').data('daterangepicker').endDate._d.valueOf()) - new Date($('#date').data('daterangepicker').startDate._d.valueOf()))/86400000);
    if(bonus){
      document.getElementById('total_price').innerHTML = 'CENA: '+(daysCalendar*100+daysCalendar*2)+'€';
    }
    else{
      document.getElementById('total_price').innerHTML = 'CENA: '+daysCalendar*100+'€';
    }
    sessionStorage.setItem('days', daysCalendar)
  });
  

  $("#prevzem").val(sessionStorage.getItem("locStart")).change();
  $("#vračilo").val(sessionStorage.getItem("locEnd")).change();
  $("#model").val(sessionStorage.getItem("model")).change();

  let radioVelikost = document.getElementsByName("velikost"); // list of radio buttons
  let valVelikost = sessionStorage.getItem('velikost'); // local storage value
  for(let i=0;i<radioVelikost.length;i++){
    if(radioVelikost[i].value == valVelikost){
      radioVelikost[i].checked = true;
    }
  }
  let radioMenjalnik = document.getElementsByName("menjalnik"); 
  let valMenjalnik = sessionStorage.getItem('menjalnik'); 
  for(let i=0;i<radioMenjalnik.length;i++){
    if(radioMenjalnik[i].value == valMenjalnik){
      radioMenjalnik[i].checked = true; 
    }
  }

  let radiopogon = document.getElementsByName("pogon"); 
  let valpogon = sessionStorage.getItem('pogon'); 
  for(let i=0;i<radiopogon.length;i++){
    if(radiopogon[i].value == valpogon){
      radiopogon[i].checked = true; 
    }
  }
});



document.getElementById("myButton").onclick = function () {
  sessionStorage.setItem("locStart", $('#prevzem').val());
  sessionStorage.setItem("locEnd", $('#vračilo').val());
  sessionStorage.setItem("model", $('#model').val());

  sessionStorage.setItem("startMin", $('#date').data('daterangepicker').startDate._d.getMinutes());
  sessionStorage.setItem("startHour", $('#date').data('daterangepicker').startDate._d.getHours());
  let dateStr = $('#date').data('daterangepicker').startDate._d.toLocaleDateString();
  let dateSplit = dateStr.split('/');
  let newStr = dateSplit[1]+'/'+ dateSplit[0]+'/'+dateSplit[2]
  sessionStorage.setItem("startDate", newStr);

  sessionStorage.setItem("endMin", $('#date').data('daterangepicker').endDate._d.getMinutes());
  sessionStorage.setItem("endHour", $('#date').data('daterangepicker').endDate._d.getHours());
  let dateStrEnd = $('#date').data('daterangepicker').endDate._d.toLocaleDateString();
  let dateSplitEnd = dateStrEnd.split('/');
  let newStrEnd = dateSplitEnd[1]+'/'+ dateSplitEnd[0]+'/'+dateSplitEnd[2]
  sessionStorage.setItem("endDate", newStrEnd);
  //console.log($('#prevzem').val(), $('#vračilo').val(), $('#date').data('daterangepicker').startDate._d.toLocaleDateString(), $('#date').data('daterangepicker').endDate)
  location.href = "user_page.html";
};

$('input[name="velikost"]').on('change', function(){
  sessionStorage.setItem('velikost', $(this).val());
});

$('input[name="menjalnik"]').on('change', function(){
  sessionStorage.setItem('menjalnik', $(this).val());
});

$('input[name="pogon"]').on('change', function(){
  sessionStorage.setItem('pogon', $(this).val());
});
