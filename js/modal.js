const validateFields=(form, Array)=>{
    Array.forEach((field) => {
        field.removeClass('input--error');
        
        if (field.val().trim()==''){
        field.addClass('input--error')}
    })

    const errorFields=form.find('.input--error');
    return errorFields.length==0;
}

$(".form").submit(e=>{
    e.preventDefault();
    const form=$(e.currentTarget);
    const name= form.find("[name='name']");
    const phone=form.find("[name='phone']");
    const comment=form.find("[name='comment']");
    const to=form.find("[name='to']");
    const isValid=validateFields(form, [name,phone,comment]);
    const modal=$('#modal');
    const content=modal.find(".modal__content");
    modal.css('color', 'black');

   if (isValid){ 
    $.ajax({
    url:"https://webdev-api.loftschool.com/sendmail",
    method:"post",
    data: {
        name:name.val(),
        phone:phone.val(),
        comment:comment.val(),
        to:to.val(),
    },
    success: data=>{
        content.text(data.message);
        $.fancybox.open({
            src:"#modal",
            class:"inline"
        })
    },
    error: data=>{
        console.log(data)
        const message = data.responseJSON.message;
        content.text(message);
        modal.css('color', 'red');
        $.fancybox.open({
        src:"#modal",
        class:"inline"
        })
    }
})
   }
})
$(".app-close-modal").click(e=>{
    e.preventDefault();
    $.fancybox.close()
})