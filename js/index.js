$(document).ready(function () {
    function success(pos) {
        $.get("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + pos.coords.latitude + "&longitude=" + pos.coords.longitude + "&localityLanguage=en", function (data) {
            //console.log(data);
            $("#covid-status").show();
            $("#covid-status")[0].src = "https://www.covid19india.org/state/" + data.principalSubdivisionCode.split("-")[1];
        });
    }
    function error() {
        console.log("error");

        $("#covid-status").show();
        $("#covid-status")[0].src = "https://www.covid19india.org/";
    }
    if (!navigator.geolocation) {
        // status.textContent = 'Geolocation is not supported by your browser';
    } else {
        // status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
        });
    }
    $(".modal-btn").on("click", function(e) {
        e.preventDefault();
        $("#" + $(this).data("form") + "-container").hide();

        $("#" + $(this).data("form") + "-success").show();


        if($(this)[0].id === "customer") {
            $("#modalproviderLabel").text("Register yourself to avail a service.");
        }
        else {
            $("#modalproviderLabel").text("Register yourself to provide a service.");
        }
    });
    function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }
    $(".submit").on("click", function (e) {
        e.preventDefault();
        var $form = $("#" + $(this).data("form"));
        $.ajax({
            url: API_URL,
            data: getFormData($form),
            method: "POST",
            success: function () {
                $("#" + $(this).data("form") + "-container").hide();

                $("#" + $(this).data("form") + "-success").show();
            }
        })
    });

    $(".address-form").hide();
    $(".zipCode").on("blur", function () {
        $(".error").hide();
        if ($(this).val().length < 6) {
            $(".error").show().text("Postal Code must be of 6 digits");
            return;
        }
        let that = $(this);
        $.get("https://api.postalpincode.in/pincode/" + $(this).val(), function (data) {
            console.log(data);
            $(".state").val(data[0].PostOffice[0].State);
            $(".city").val(data[0].PostOffice[0].District);
            $(".address-form-" + that[0].id).show();
            $(".address1").focus();

        });
    });
});