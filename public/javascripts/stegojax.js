$(document).ready(function(){
    var encode_options = {
      beforeSubmit: show_request,
      success: process_encode,
      dataType: 'json'
    };

    var decode_options = {
      beforeSubmit: show_request,
      success: process_decode,
      dataType: 'json'
    };

    $('#encode_form').ajaxForm(encode_options);
    $('#decode_form').ajaxForm(decode_options);

    //Pre-submit callack
    function show_request(){
      var spin_options = {
        lines: 12,
        length: 7,
        width: 4,
        radius: 10,
        color: '#111',
        speed: 1,
        trail: 60,
        shadow: false
      };
      var target = document.getElementById('spinner');
      spinner = new Spinner(spin_options).spin(target);
      return true;
    }
    //Success callbacks
    function process_decode(data){
      spinner.stop();
      $('div #response_container').html('Extracted '+data.length+' bytes. Download <a href=\'data/'+data.path+'\'>Here</a>');
      window.open('data/'+data.path, 'Download');
    }

    function process_encode(data){
      spinner.stop();
      $('div #response_container').html('Decode offset: <strong>'+data.offset +
        '</strong><br/>Steganographic:<img id=\'stego_bmp\' src=\'images/'+data.stego_bmp+'\' />');
    }
});
