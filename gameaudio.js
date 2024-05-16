// return random int between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// play attack sound
let attackSound = document.createElement('audio');
attackSound.src = './attack.wav';
attackSound.volume = 0.2;
document.body.appendChild(attackSound);
function playAttackSound() {
    attackSound.play();
}

// play firefoe sound
let firefoeSound = document.createElement('audio');
firefoeSound.volume = 0.2;
document.body.appendChild(firefoeSound);
function playFirefoeSound() {
    firefoeSound.src = `./firefoe${randomInt(1,5)}.wav`;
    firefoeSound.play();
}

// play hit sound
let hitSound = document.createElement('audio');
hitSound.src = './hit.wav';
hitSound.volume = 0.2;
document.body.appendChild(hitSound);
function playHitSound() {
    hitSound.play();
}

//play fight sound
let fightSound = document.createElement('audio');
fightSound.src = './fight.wav';
fightSound.volume = 0.2;
document.body.appendChild(fightSound);
function playFightSound() {
    fightSound.play();
}

//play ding sound
let dingSound = document.createElement('audio');
dingSound.volume = 0.2;
document.body.appendChild(dingSound);
function playDingSound() {
    dingSound.src = `./ding${randomInt(1,20)}.wav`;
    dingSound.play();
}

//play dead sound
let deadSound = document.createElement('audio');
deadSound.src = './dead.wav';
deadSound.volume = 0.2;
document.body.appendChild(deadSound);
function playDeadSound() {
    deadSound.play();
}

// start game music 'music1.wav'
let music = document.createElement('audio');
music.src = './music2.wav';
music.volume = 0.25;
music.loop = true;
document.body.appendChild(music);
function playMusic() {
    music.play();
}

function stopMusic() {
    music.pause();
}


// menu music
let menuMusic = document.createElement('audio');
menuMusic.src = './menu.wav';
menuMusic.volume = 0.25;
menuMusic.loop = true;
document.body.appendChild(menuMusic);
function playMenuMusic() {
    menuMusic.play();
}

function stopMenuMusic() {
    menuMusic.pause();
}

// final music
let finalMusic = document.createElement('audio');
finalMusic.src = './music3.wav';
finalMusic.volume = 0.25;
finalMusic.loop = true;
document.body.appendChild(finalMusic);
function playFinalMusic() {
    finalMusic.play();
}

function stopFinalMusic() {
    finalMusic.pause();
}