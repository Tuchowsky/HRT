$(window).ready(function(){

    let playlistCont = $('.p-container')[1];
    let hamburger = $('.song-top-navigation .fa-bars');
    let imageCont = $('.song-content-image');
    let closePlaylist = $('.close-playlist');
    let playStopBtn = $('.btn-play-stop');
    let songList = $('.song-list');
    let playerSongContent = $('.song-content-info');
    let getNextSong = $('.btn-forward');
    let getPreviousSong = $('.btn-back');
    let btnSmall = $('.btn-small');
    let btnBig = $('.btn-big');

    let chosenSongIndex = 0;
//draw playlist
    songs.forEach(function(element, index){
        if(index === 0){
            playerSongContent[0].innerHTML = `
            <a href="#" title="${element.artist}">${element.artist}</a>
            <a href="#" title="${element.title}">${element.title}</a>
            `;
            imageCont.css('background-image', `url(../../assets/jpg/songs-bg/${element.image})`);
            chosenSongIndex = 0;
        }
        songList[0].innerHTML += `
        <div class="song-list-item vertical-center">
            <div class="song-info">
                <span>${element.duration} | <a href="#" title="${element.artist}">${element.artist}</a></span>
                <a href="#" title="${element.title}">${element.title}</a></span>
            </div>
            <div class="song-extras vertical-center">
                <div class="btn-song-share">
                    <i class="fas fa-share-alt"></i>
                </div>
                <div class="btn-song-favourite"></div>
            </div>
        </div>
        `;
    });

    function showContainer(container){
        container.classList.remove('hidden');
        container.classList.add('visible');
    }

    function hideContainer(container){
        container.classList.remove('visible');
        container.classList.add('hidden');
    }

    hamburger.on('click', ()=>{
        showContainer(playlistCont);
    });

    closePlaylist.on('click', ()=>{
        hideContainer(playlistCont);
    });
// changing icon in play/stop button
    let playStopBtnCount = 0;
    playStopBtn.on('click', ()=>{
        if(playStopBtnCount === 0){
            playStopBtn.children()[0].classList.remove('fa-play');        
            playStopBtn.children()[0].classList.add('fa-pause');      
            playStopBtnCount = 1;      
        } else {
            playStopBtn.children()[0].classList.remove('fa-pause');        
            playStopBtn.children()[0].classList.add('fa-play');
            playStopBtnCount = 0;
        }
    });
//change song when click on playlist
    $('.song-info').click(function(){
        let songIndex = $('.song-info').index(this);
        playerSongContent[0].innerHTML = `
            <a href="#" title="${songs[songIndex].artist}">${songs[songIndex].artist}</a>
            <a href="#" title="${songs[songIndex].title}">${songs[songIndex].title}</a>
        `;
        imageCont.css('background-image', `url(../../assets/jpg/songs-bg/${songs[songIndex].image})`);
        chosenSongIndex = songIndex;
        hideContainer(playlistCont);
    });  

//get next and previous song
    getNextSong.click(function(){
        if(chosenSongIndex === songs.length - 1){
            chosenSongIndex = 0;
            playerSongContent[0].innerHTML = `
                <a href="#" title="${songs[chosenSongIndex].artist}">${songs[chosenSongIndex].artist}</a>
                <a href="#" title="${songs[chosenSongIndex].title}">${songs[chosenSongIndex].title}</a>
            `;
            imageCont.css('background-image', `url(../../assets/jpg/songs-bg/${songs[chosenSongIndex].image})`);
        }
        else{
            playerSongContent[0].innerHTML = `
                <a href="#" title="${songs[chosenSongIndex+1].artist}">${songs[chosenSongIndex+1].artist}</a>
                <a href="#" title="${songs[chosenSongIndex+1].title}">${songs[chosenSongIndex+1].title}</a>
            `;
            imageCont.css('background-image', `url(../../assets/jpg/songs-bg/${songs[chosenSongIndex+1].image})`);
            chosenSongIndex = chosenSongIndex + 1;   
        }       
    });

    getPreviousSong.click(function(){
        if(chosenSongIndex === 0){
            chosenSongIndex = songs.length - 1;
            playerSongContent[0].innerHTML = `
            <a href="#" title="${songs[chosenSongIndex].artist}">${songs[chosenSongIndex].artist}</a>
            <a href="#" title="${songs[chosenSongIndex].title}">${songs[chosenSongIndex].title}</a>
            `;
            imageCont.css('background-image', `url(../../assets/jpg/songs-bg/${songs[chosenSongIndex].image})`);
        }else{
            playerSongContent[0].innerHTML = `
            <a href="#" title="${songs[chosenSongIndex-1].artist}">${songs[chosenSongIndex-1].artist}</a>
            <a href="#" title="${songs[chosenSongIndex-1].title}">${songs[chosenSongIndex-1].title}</a>
            `;
            imageCont.css('background-image', `url(../../assets/jpg/songs-bg/${songs[chosenSongIndex-1].image})`);
            chosenSongIndex = chosenSongIndex - 1;
        }
    });

//animating clicked buttons
    function scaleUp(t){
        t.attr('id', 'scale-up');

        setTimeout(function(){
            t.removeAttr('id', 'scale-up');
        }, 200);
    }

    btnSmall.on('click', function(){
        let $this = $(this);
        scaleUp($this);
    });

    btnBig.on('click', function(){
        let $this = $(this);
        scaleUp($this);
    });

//welcome animation
    setTimeout(welcomeLogoFadeOut, 6500);
    function welcomeLogoFadeOut() {
        var welcome = $('.welcome-logo');
        welcome.fadeOut('slow');
    }
});   
