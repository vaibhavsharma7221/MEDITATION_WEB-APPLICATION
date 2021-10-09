const app=()=>{

	const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video=document.querySelector('.vid-container video')

    //Sounds
    const sounds=document.querySelectorAll('.sound-picker button');

   //Time Display
   const timeDisplay=document.querySelector('.time-display');
   const timeSelect=document.querySelectorAll(".time-select button");

   //get the length of the outline
   const outlineLength = outline.getTotalLength();
   console.log(outlineLength);

   //duration
   let fakeduration=600;


   outline.style.strokeDasharray=outlineLength;
   outline.style.strokeDashoffset=outlineLength;

   //pick different sounds
   sounds.forEach(sound=>{
   	sound.addEventListener('click',function(){
   		song.src = this.getAttribute('data-sound');
   		video.src = this.getAttribute('data-video');
   		checkPlaying(song);
   	});
   });

   //play sound
       play.addEventListener('click',()=>{
       	checkPlaying(song);
       });

       //Select sound
       timeSelect.forEach(option =>{
       	option.addEventListener("click",function(){
              fakeduration=this.getAttribute("data-time");
              timeDisplay.textContent=`${Math.floor(fakeduration/60)} : ${Math.floor(fakeduration%60)}`;
       	});
       });

       //Creating fxn specific to stop and play the sounds.

       const checkPlaying=song=>{
       	if(song.paused){
       		song.play();
       		video.play();
       		play.src="pause.svg";
       	}else{
       		song.pause();
       		video.pause();
       		play.src="play.svg";
       	}
       };

       //animating the circle
       song.ontimeupdate = () =>{
       	let currentTime=song.currentTime;
       	let elapsed=fakeduration-currentTime;
       	let seconds=Math.floor(elapsed%60);
       	let minutes=Math.floor(elapsed/60);

       	//animating circle
       	let progress=outlineLength-(currentTime/fakeduration)*outlineLength;
       	outline.style.strokeDashoffset=progress;

       	//Animate the text
       	timeDisplay.textContent=`${minutes}:${seconds}`;

       	if(currentTime >= fakeduration){
       		song.pause();
       		song.currentTime=0;
       		play.src='play.svg';
       		video.pause();
       	}
       };
};


app();