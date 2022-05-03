
$(document).ready(function(){

    
    var imgjson ='{\
        "images": [\
            {\
                "imgPath": "images/carousel/carouselpic1.jpg",\
                "imgDescription": "Sea and Beach"\
            },\
            {\
                "imgPath": "images/carousel/carouselpic2.jpg",\
                "imgDescription": "Sea and Beach"\
            },\
            {\
                "imgPath": "images/carousel/carouselpic3.jpg",\
                "imgDescription": "Sea and Beach"\
            },\
            {\
                "imgPath": "https://www.tripsavvy.com/thmb/0RiozW1csovLqiHsJDl1ROdmMWw=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/illuminated-buildings-and-city-street-at-night-902452584-94fe3f3db5374dbbb82cc2372534be28.jpg",\
                "imgDescription": "Sea and Beach"\
            },\
            {\
                "imgPath": "https://www.roughguides.com/wp-content/uploads/2018/01/Coron-Palawan-Philippines-shutterstock_329793749-1680x1050.jpg",\
                "imgDescription": "Sea and Beach"\
            }\
        ]\
    }';
    
    
    
    var track;
    var slides;
    var slideWidth;
    var time;
    var imgList = JSON.parse(imgjson);


    var setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index +'px';
    }
  
    $.when(
        $.each(imgList.images, function(index){

        
            $('#carousel_track_slider').append('"<li class="carousel_slide" id=imgNo_'+ index +' ><img class="carousel_image" src= "' + this.imgPath + '" alt="' + this.imgDescription + '"></li>');


    })).then( function(){ 

            $('#carousel_track_slider').css({"transition-duration":"1s"});
            $('li.carousel_slide').first().addClass("current_slide");
            setUpVariables();
        });


    function setUpVariables(){
        
        slideWidth = document.getElementById("imgNo_0").getBoundingClientRect().width;
        
        track = document.querySelector('.carousel_track');
    
        slides = Array.from(track.children);
        console.log(slides);
        slides.forEach(setSlidePosition);

        automaticSlide();
        reportWindowSize();

    }
    

    //automatic time slide
    function automaticSlide(){
        time = setInterval(function() {
            currentSlide = track.querySelector('.current_slide');

            nextSlide= currentSlide.nextElementSibling;

            if (nextSlide == null){
                nextSlide = slides[0];
            }
            
            track.style.transitionDuration = "1s";
            moveToSlide(track, currentSlide, nextSlide);
        }, 5000);
     }

     //Moving Slide Function

     var moveToSlide = (track, currentSlide, targetSlide) => {
         const amountToMove = targetSlide.style.left; 
         track.style.transform = 'translateX(-' + amountToMove + ')';
         currentSlide.classList.remove('current_slide');
         targetSlide.classList.add('current_slide');
         clearInterval(time);
         automaticSlide();
     }

     //Carousel Buttons

     $("button#btn_right").click(function(){
        currentSlide = track.querySelector('.current_slide');
        nextSlide= currentSlide.nextElementSibling;
        track.style.transitionDuration = "1s";
        moveToSlide(track, currentSlide, nextSlide);
    });

    $("button#btn_left").click(function(){
        currentSlide = track.querySelector('.current_slide');
        prevSlide= currentSlide.previousElementSibling;
        track.style.transitionDuration = "1s";
        moveToSlide(track, currentSlide, prevSlide);
    });

    // When Changing windows size

     function reportWindowSize() {
         slideWidth = slides[0]. getBoundingClientRect().width;
         slides.forEach(setSlidePosition);
         currentSlide = track.querySelector('.current_slide');
         track.style.transitionDuration = "0s";
         moveToSlide(track, currentSlide, currentSlide);

         //mobile size

         if (window.matchMedia('(max-width: 767px)').matches){

             $("li.service_package").show();
             $("img.pay_extra_ico").attr("src", "images/icons/icodolar.svg");

         } else {

             $("li.active").show();
             $("li.service_package:not(li.active)").hide();
             $("img.pay_extra_ico").attr("src","images/icons/cash.svg");
             

         }

         //dekstop size

         if (window.matchMedia('(min-width: 1500px)').matches){
         
            $("img.faIco").attr("src","images/icons/facebookDesk.svg").css({"filter": "invert(1)"});
            $("img.twIco").attr("src","images/icons/twitterDesk.svg").css({"filter": "invert(1)"});
            $("img.inIco").attr("src","images/icons/instagramDesk.svg").css({"filter": "invert(1)"});
        
        } else {
            $("img.faIco").attr("src","images/icons/facebook.png").css({"filter": "invert(0)"});;
            $("img.twIco").attr("src","images/icons/twitter.png").css({"filter": "invert(0)"});;
            $("img.inIco").attr("src","images/icons/instagram.png").css({"filter": "invert(0)"});;
        
        }

     }

    window.onresize = reportWindowSize;


     // Adding id numbers to offer list
    $("li.offer").each(function(index){
        $(this).attr('id', index );
    });



    $(window).on('load', function() {

        //Carousel fade In
        $("section#carousel_hero").addClass("animate_fadein").css({"visibility": "visible"});

    });






    // Package Buttons Changing Tabs

    $("button#package_button_1").click(function(){

        $(this).css({"border-right":"none"});
        $("button#package_button_3").css({"border-left":"2px solid gray"});

        $("button.package_button:not(#package_button_1)").removeClass("button_active");
        $(this).addClass("button_active");

        $("li#service_package_1").addClass("active").show();
        $("li.service_package:not(#service_package_1)").removeClass("active").hide();
      

    });

    $("button#package_button_2").click(function(){

        $("button#package_button_1").css({"border-right":"none"});
        $("button#package_button_3").css({"border-left":"none"});

        $("button.package_button:not(#package_button_2)").removeClass("button_active");
        $(this).addClass("button_active");

        $("li#service_package_2").addClass("active").show();
        $("li.service_package:not(#service_package_2)").removeClass("active").hide();
 
    });

    $("button#package_button_3").click(function(){

        $(this).css({"border-left":"none"});
        $("button#package_button_1").css({"border-right":"2px solid gray"});

        $("button.package_button:not(#package_button_3)").removeClass("button_active");
        $(this).addClass("button_active");
        
        $("li#service_package_3").addClass("active").show();
        $("li.service_package:not(#service_package_3)").removeClass("active").hide();
        

    });

});


//animation newsletter arrow desktop

function movearrow(){

    $("i#arrow-btn").css({"transform": "translate(10px, 40px) rotate(-45deg)"});

}

function resetarrow(){

    $("i#arrow-btn").css({"transform": "translate(0px, 40px) rotate(-45deg)"});
    
}

//animation offers

function offer_highlight(x){

    x.style.transform = "translateY(-10px)";
    x.style.boxShadow = "0px 10px 10px 10px rgba(0,0,0,0.30)";
    x.style.cursor = "pointer";
    x.style.transitionDuration = "200ms";

}

function offer_reset(x){


    x.style.transform = "translateY(0px)";
    x.style.boxShadow = "0px 5px 5px 5px rgba(0,0,0,0.15)";

    
}
