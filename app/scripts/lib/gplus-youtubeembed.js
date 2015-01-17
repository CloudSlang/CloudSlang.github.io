// gplus-youtubeembed - Makes embedded YouTube video iframes Google+ style to improve page loading speed.
// Copyright (c) 2013 by Arun - http://www.skipser.com
// Licensed under the GNU LGPL license: http://www.gnu.org/copyleft/lesser.html
// For usage details, read - http://www.skipser.com/510
'use strict';

// Call this function at the end of the closing </body> tag.
function optimizeYouTubeEmbeds(imgUrl) {
    // Get all iframes
    var frames = document.getElementsByTagName( 'iframe' );

    // Loop through each iframe in the page.
    for ( var i = 0; i < frames.length; i++ ) {

        // Find out youtube embed iframes.
        if ( frames[ i ].src && frames[ i ].src.length > 0 && frames[ i ].src.match(/http(s)?:\/\/www\.youtube\.com/)) {

            // For Youtube iframe, extract src and id.
            var src=frames[i].src;
            var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            var id=(src.match(p) ? RegExp.$1 : false);
            if(id === false) { continue;}

            // Get width and height.
            if(src === '') {continue;}

            // The image+button overlay code.
            var code=   '<div alt="For this Google+ like YouTube trick, please see http://www.skipser.com/510">' +
                            '<a href="#" onclick="LoadYoutubeVidOnPreviewClick(\''+id+'\');return false;" id="skipser-youtubevid-'+id+'">' +
                                '<img src="' + imgUrl + '" class="img-responsive"></img>' +
                                '<div class="youtube-img-play-button"></div>' +
                            '</a>' +
                        '</div>';

            // Replace the iframe with a the image+button code.
            var div = document.createElement('div');
            div.innerHTML=code;
            div=div.firstChild;
            frames[i].parentNode.replaceChild(div, frames[i]);
			i--;
        }
    }
}
// Replace preview image of a video with it's iframe.
function LoadYoutubeVidOnPreviewClick(id) {
    var code=   '<div class="embed-responsive embed-responsive-16by9">' +
                    '<iframe src="https://www.youtube.com/embed/'+id+'/?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1&fs=1&rel=0" frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen=true" ></iframe>' +
                '</div>';
    var iframe = document.createElement('div');
    iframe.innerHTML=code;
    iframe=iframe.firstChild;
    var div=document.getElementById('skipser-youtubevid-' + id);
    div.parentNode.replaceChild( iframe, div);
}
