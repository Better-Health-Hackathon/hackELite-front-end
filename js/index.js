$(document).ready(function() {
    $(".address-form").hide();
    $("#info").load("https://www.covid19india.org/state/UT", function(html) {
        $("#info").html(html);
    });
    $(".zipCode").on("blur", function() {
        $(".error").hide();
        if($(this).val().length < 6) {
            $(".error").show().text("Postal Code must be of 6 digits");
            return;
        }
        let that = $(this);
        $.get("https://api.postalpincode.in/pincode/"+$(this).val(), function(data){
            console.log(data);
            $(".state").val(data[0].PostOffice[0].State);
            $(".city").val(data[0].PostOffice[0].District);
            $(".address-form-"+that[0].id).show();

        });
    });
});