// Form js with validation and ajax submission

$('.sky-form').validate({
    rules: {
        name: {
            minlength: 3,
            maxlength: 15,
            required: true
        },
        email:{
            minlength: 3,
            maxlength: 255,
            required: true
        },    
        message:{
            minlength: 3,
            maxlength: 255,
            required: true
        }
    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler:function(form, event) {
        event.preventDefault();
        //submit via ajax
            name = $('#name').val(),
            email = $('#email').val(),
            mobile = $('#mobile').val(),
            message = $('#message').val(),        
            rcaptcha = grecaptcha.getResponse();
            if($("#copy").is(':checked')){
                copy='checked';                
            }else{
                copy='unchecked';
            }

        var $btn = $('.r_submit').button('loading');
        if(!rcaptcha){
            $(".recaptchaError").show('fast').delay('10000').hide('fast');
            $btn.button('reset');
            return false;
        }

        $.ajax({
            type: "POST",
            url: "../php/submit.php",
            data: {name: name, email: email, mobile: mobile, message: message, recaptcha: rcaptcha, copy: copy},
            success: function (response) {
                if (response == "success") {
                    $('#name').val('');
                    $('#email').val('');
                    $('#mobile').val('');
                    $('#message').val('');
                    $('#copy').prop('checked',false);
                    $(".success").show('fast').delay('10000').hide('fast');
                }
                // clear the form fields
                grecaptcha.reset();
                //$(".ajxerr").fadeIn(1500, 0).slideUp(1200);
                $btn.button('reset');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert(xhr.status);
                //alert(thrownError);
                grecaptcha.reset();
                $(".ajxerr").show('fast').delay('10000').hide('fast');
                $btn.button('reset');
            }
        });
    }
});

