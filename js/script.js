let hint = document.querySelector(".preloader");
window.onload = function () {
  //hide the preloader
  setTimeout(function () {
    hint.style.display = "none";
  }, 700);
};
$(document).ready(function () {});
$('[data-toggle="tooltip"]').tooltip();
const selectExists = document.getElementsByClassName("select_input").length > 0;
if (selectExists) {
  const $select2 = $(".select_input");
  $select2.select2();
}
//showPass
function showPass(showPass) {
  sibling = showPass.parentElement.nextElementSibling;
  // sibling.focus();
  if (showPass.checked) {
    sibling.setAttribute("type", "text");
  } else {
    sibling.setAttribute("type", "password");
  }
}

//form wizard
function activeStep(ele, stepId) {
  var nextStep = "#step_" + stepId;
  $(".step").not(nextStep).hide();
  $(nextStep).show();
  if ($(ele).hasClass("btn-irv-default")) {
    var activeHead = stepId;
    var activeStep = "#activeStep-" + activeHead;
    $(activeStep).removeClass("active");
  } else if (stepId == 6) {
    var activeHead = stepId - 1;
    var lastHead = stepId;
    var activeStep = "#activeStep-" + activeHead;
    var activelast = "#activeStep-" + lastHead;
    $(activeStep).addClass("active");
    $(activelast).addClass("active");
  } else {
    var activeHead = stepId - 1;
    var activeStep = "#activeStep-" + activeHead;
    $(activeStep).addClass("active");
  }
}
//otp code animation
$(".otp-form *:input[type!=hidden]:first").focus();
let otp_fields = $(".otp-form .otp-field"),
  otp_value_field = $(".otp-form .otp-value");
otp_fields
  .on("input", function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, "")
    );
    let opt_value = "";
    otp_fields.each(function () {
      let field_value = $(this).val();
      if (field_value != "") opt_value += field_value;
    });
    otp_value_field.val(opt_value);
  })
  .on("keyup", function (e) {
    let key = e.keyCode || e.charCode;
    if (key == 8 || key == 46 || key == 37 || key == 40) {
      // Backspace or Delete or Left Arrow or Down Arrow
      $(this).prev().focus();
    } else if (key == 38 || key == 39 || $(this).val() != "") {
      // Right Arrow or Top Arrow or Value not empty
      $(this).next().focus();
    }
  })
  .on("paste", function (e) {
    let paste_data = e.originalEvent.clipboardData.getData("text");
    let paste_data_splitted = paste_data.split("");
    $.each(paste_data_splitted, function (index, value) {
      otp_fields.eq(index).val(value);
    });
  });
//otp timer
const classExists =
  document.getElementsByClassName("countDown-cont").length > 0;
if (classExists) {
  startTimer();
  function startTimer() {
    var presentTime = document.getElementById("counter").innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond(timeArray[1] - 1);
    if (s == 59) {
      m = m - 1;
    }
    if ((m + "").length == 1) {
      m = "0" + m;
    }
    if (m < 0) {
      m = "59";
    }
    document.getElementById("counter").innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
  }

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    } // add zero in front of numbers < 10
    if (sec < 0) {
      sec = "59";
    }
    return sec;
  }
}
