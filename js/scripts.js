$(function() {

    //Enter text to be read in this email.
    text = "Hi & Welcome to speedReader. It is similar to spritzinc.com but this is for web & you can pause it using spacebar and use arrow keys, Up and down to increase and decrease reading speed, by the way unlike spritzinc this reading mechanisum will pause longer for bigger words i.e FJdlsajfkdgsjakfldsjakqf  fdsaf dsafdsa fdsa fdsafadsfdsafdsafdsa and wont pause at all for blank spaces               like that. Go ahead and click the top left button and add text you want to read. Enjoy!!";

    $('#menu-trigger').click(function () {
        $(this).toggleClass('active');
        $('#menu').toggleClass('active');
    });

    $('#start-reading').click(function () {
        text = $('#readthis').val();

        $('#menu-trigger').toggleClass('active');
        $('#menu').toggleClass('active');

        clearTimeout(timeoutId);
        startReading();
    });

    //For Loop that can pause it self
    i = 0;
    stopLoop = 0;
    delayValue = 0;
    alphabatesLength = [1];

    var words = text.split(" ");
    var carouselHtml='';

    startReading();

    function startReading () {

        $('#carousel').html('');

        words = text.split(" ");
        carouselHtml='';

        //Fill top 5 items as empty
        for (var z = 0; z < 5; z++) {
            carouselHtml = '<div class="item">';
            carouselHtml += '<div class="word">';
            carouselHtml += '</div>';
            carouselHtml += '</div>';
            $('#carousel').append(carouselHtml);
        }

        //To have las word in center
        words.push('');
        words.push('');
        words.push('');
        words.push('');

        i = 0;
        stopLoop = 0;
        delayValue = 0;
        alphabatesLength = [1];

        carouselLoop();
    }

    function carouselLoop(){
        timeoutId = setTimeout(function () {
            if(i < words.length){
               
                    if(i>4){
                        $('#carousel > .item:first-child').remove();
                    }

                    carouselHtml = '<div class="item">';
                    carouselHtml += '<div class="word">';
                    carouselHtml += '<div class="word-wrap">';

                    //Breaking words in to char
                    var alphabates = words[i];
                    alphabatesLength[i] = alphabates.length;
                    var addClassIsCenter = '';

                    for (var x = 0; x < alphabates.length; x++) {
                        if(x == Math.round(alphabates.length/2)-1){
                            addClassIsCenter = 'is-center';
                        }
                        carouselHtml += '<div class="char char--'+alphabates[x]+' '+addClassIsCenter+'">';
                        carouselHtml += alphabates[x];
                        carouselHtml += '</div>';   
                        addClassIsCenter = '';                     
                    }

                    carouselHtml += '</div>';
                    carouselHtml += '</div>';
                    carouselHtml += '</div>';

                    $('#carousel').append(carouselHtml);                    
            }else{
                stopLoop = 1;
            }

            i++;

            if(stopLoop == 0 ){
                carouselLoop();
            }
           centerAlign(); 
        }, 100+(alphabatesLength[i-5]*50)+(delayValue*2));
    }
    
    var isPaused = 0;

    //Increase/Decrease Speed on Up/Down arrows
    $(document).keydown(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 40) {
            delayValue +=10;
            console.log(100+(delayValue*2));
        } else if (code == 38) {
            delayValue -=10;
            console.log(100+(delayValue*2));
        } else if (code == 32) {
            // Pause/Resume on Spacebar
            if(isPaused==0){
                isPaused=1;
                stopLoop = 1;
                clearTimeout(timeoutId);
            }else{
                isPaused=0;
                stopLoop = 0;
                carouselLoop();
            }
            
        }
    });
});


function centerAlign(){  
    

    //Cal char width to perfectly center align center word
    $('#carousel > .item').each(function () {
        var reachedCenter = 0;
        var widthBeforeCenter = 0;
        
        $('.word-wrap .char', this).each(function () {
            if(reachedCenter==0){
                if($(this).hasClass('is-center')){
                    reachedCenter=1;
                    widthBeforeCenter = widthBeforeCenter + ($(this).width()/2);
                    console.log(widthBeforeCenter);
                }else{
                    widthBeforeCenter = widthBeforeCenter + $(this).width();
                    console.log(widthBeforeCenter);
                }
            }
        });

        var leftValue = ($(window).width()/2)-widthBeforeCenter;
        $('.word-wrap', this).css('left', leftValue+'px');

    });
}