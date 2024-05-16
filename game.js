let game = {
    scenes: {
        menu: {
            element: document.createElement('div'),
            buttons: {},
            intervals: [],
            functions: [
                () => {
                    stopMusic();
                    stopMenuMusic();
                    stopFinalMusic();
                    playMenuMusic();
                }
            ],
            beaten: {
                firefoe: false,
                spyBot: false,
                intrusionImp: false
            }
        },
        fightScene1: {
            element: document.createElement('div'),
            buttons: {},
            intervals: [],
            functions: [
                () => {
                    stopMusic();
                    stopMenuMusic();
                    stopFinalMusic();
                    playMusic();
                }
            ]
        },
        fightScene2: {
            element: document.createElement('div'),
            buttons: {},
            intervals: [],
            functions: [
                () => {
                    stopMusic();
                    stopMenuMusic();
                    stopFinalMusic();
                    playMusic();
                }
            ]
        },
        fightScene3: {
            element: document.createElement('div'),
            buttons: {},
            intervals: [],
            functions: [
                () => {
                    stopMusic();
                    stopMenuMusic();
                    stopFinalMusic();
                    playMusic();
                }
            ]
        },
        finalbattle: {
            element: document.createElement('div'),
            buttons: {},
            intervals: [],
            functions: [
                () => {
                    stopMusic();
                    stopMenuMusic();
                    stopFinalMusic();
                    playFinalMusic();
                }
            ]
        },
    },
    loadScene: function (scene) {
        // Clear intervals
        for (let i = 0; i < this.scenes[scene].intervals.length; i++) {
            clearInterval(this.scenes[scene].intervals[i]);
        }

        // Run functions
        for (let i = 0; i < this.scenes[scene].functions.length; i++) {
            this.scenes[scene].functions[i]();
        }

        // Load scene
        document.querySelector('.game').innerHTML = '';
        document.querySelector('.game').appendChild(this.scenes[scene].element);

        // add flash element
        let flash = document.createElement('div');
        flash.classList.add('flash');
        document.querySelector('.game').appendChild(flash);

        //buttons
        document.querySelector('.game-controls').innerHTML = '';
        for (let button in this.scenes[scene].buttons) {
            document.querySelector('.game-controls').appendChild(this.scenes[scene].buttons[button]);
        }

        let fromRight = document.getElementsByClassName('fromRight')
        let fromLeft = document.getElementsByClassName('fromLeft')
        let fromBottom = document.getElementsByClassName('fromBottom')

        for (let i = 0; i < fromRight.length; i++) {
            // animate
            fromRight[i].style.animation = 'fromRight 1s forwards';
        }
        for (let i = 0; i < fromLeft.length; i++) {
            fromLeft[i].style.animation = 'fromLeft 1s forwards';
        }
        for (let i = 0; i < fromBottom.length; i++) {
            fromBottom[i].style.animation = 'fromBottom 1s forwards';
        }
        // play sound
        if (this.scenes[scene].sound) {
            this.scenes[scene].sound();
        }
    }
}

// Menu scene

let menu = {
    container: document.createElement('div'),
}

// pokemon style menu
//title
menu.title = document.createElement('h1');
menu.title.classList.add('ca');
menu.title.textContent = 'Cybercrime Fighters';
menu.title.style = `
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 3em;
    -webkit-text-stroke: 1px #a5a7fc;
    opacity: 1;
    color: white;
`;
// create 3 clones and apply text color white and animation to them with different delays
let titleOutline = menu.title.cloneNode(true);
titleOutline.style.color = 'transparent';
titleOutline.style.animation = 'glow 1s infinite';
titleOutline.style.animationDelay = '0.1s';

let titleOutline2 = menu.title.cloneNode(true);
titleOutline2.style.color = 'transparent';
titleOutline2.style.animation = 'glow 1s infinite';
titleOutline2.style.animationDelay = '0.2s';

let titleOutline3 = menu.title.cloneNode(true);
titleOutline3.style.color = 'transparent';
titleOutline3.style.animation = 'glow 1s infinite';
titleOutline3.style.animationDelay = '0.3s';

// flashing select a fight text
let selectFight = document.createElement('h2');
selectFight.textContent = 'Select a fight!';
selectFight.style = `
    position: absolute;
    top: 75% !important;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1em !important;
    color: red;
    animation: blink 1s infinite;
`;

game.scenes.menu.functions.push(() => {
    // how many enemies have been beaten
    let beaten = {
        count: 0,
    }
    if (game.scenes.menu.beaten.firefoe) beaten.count++;
    if (game.scenes.menu.beaten.spyBot) beaten.count++;
    if (game.scenes.menu.beaten.intrusionImp) beaten.count++;

    // if atleast one enemy has been beaten, but not all, display text
    if (beaten.count > 0 && beaten.count < 3) {
        selectFight.textContent = `Select a fight! (${beaten.count}/3 beaten)`;
    }

    if (beaten.count === 3) {
        selectFight.textContent = `The final battle awaits!`;
        let finalBattle = document.createElement('button');
        finalBattle.textContent = 'Final Battle';
        finalBattle.classList.add('btn', 'btn-danger');
        finalBattle.addEventListener('click', () => {
            game.loadScene('finalbattle');
            playDingSound();
        });
        game.scenes.menu.buttons = {
            finalBattle: finalBattle
        }
    }
});

// stars background layer that will tile and scroll horizontally
// needs png and animation
let stars = document.createElement('div');
stars.style = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(./stars.png);
    background-size: 200% 200%;
    animation: scroll 10s linear infinite;
    image-rendering: pixelated;
    filter: brightness(5);
`;
menu.container.appendChild(stars);

// second copy with offset animation to tile
let stars2 = document.createElement('div');
stars2.style = `
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(./stars.png);
    background-size: 200% 200%;
    animation: scrollOffset 15s linear infinite;
    image-rendering: pixelated;
    filter: brightness(5);
`;
menu.container.appendChild(stars2);

// third copy with offset animation to tile
let stars3 = document.createElement('div');
stars3.style = `
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(./stars.png);
    background-size: 200% 200%;
    animation: scrollOffsetFurther 20s linear infinite;
    image-rendering: pixelated;
    filter: brightness(5);
`;
menu.container.appendChild(stars3);

menu.container.appendChild(selectFight);

menu.container.appendChild(titleOutline);
menu.container.appendChild(titleOutline2);
menu.container.appendChild(titleOutline3);

menu.container.appendChild(menu.title);

game.scenes.menu.element.appendChild(menu.container);

// buttons
game.scenes.menu.buttons = {
    fightScene1: document.createElement('button'),
    fightScene2: document.createElement('button'),
    fightScene3: document.createElement('button')
}

game.scenes.menu.buttons.fightScene1.textContent = 'Fight Firefoe';
game.scenes.menu.buttons.fightScene1.classList.add('btn', 'btn-primary');
game.scenes.menu.buttons.fightScene1.addEventListener('click', () => {
    game.loadScene('fightScene1');
    playDingSound();
});

game.scenes.menu.buttons.fightScene2.textContent = 'Fight spyBot';
game.scenes.menu.buttons.fightScene2.classList.add('btn', 'btn-primary');
game.scenes.menu.buttons.fightScene2.addEventListener('click', () => {
    game.loadScene('fightScene2');
    playDingSound();
});

game.scenes.menu.buttons.fightScene3.textContent = 'Fight IntrusionImp';
game.scenes.menu.buttons.fightScene3.classList.add('btn', 'btn-primary');
game.scenes.menu.buttons.fightScene3.addEventListener('click', () => {
    game.loadScene('fightScene3');
    playDingSound();
});

game.loadScene('menu');

// program fight scene 1

let fightScene1 = {
    background: document.createElement('div'),
    title: document.createElement('h1'),
    playerHP: document.createElement('div'),
    enemy: document.createElement('div'),
    player: document.createElement('div'),
    attackButton1: document.createElement('button'),
    attackButton2: document.createElement('button'),
    attackButton3: document.createElement('button'),
    attackButton4: document.createElement('button'),
    textBox: document.createElement('div'),
    container: document.createElement('div')
}
fightScene1.container.id = 'fight';
fightScene1.background.id = 'background';


fightScene1.title.id = 'title';
fightScene1.enemy.classList.add('enemy', 'fromRight');
fightScene1.player.classList.add('player', 'fromLeft');

fightScene1.playerHP.classList.add('playerHP');
fightScene1.player.appendChild(fightScene1.playerHP);

game.scenes.fightScene1.functions.push(() => {
    fightScene1.container.id = 'fight';
    fightScene1.background.id = 'background';


    fightScene1.title.id = 'title';
    fightScene1.enemy.classList.add('enemy', 'fromRight');
    fightScene1.player.classList.add('player', 'fromLeft');

    fightScene1.playerHP.classList.add('playerHP');
    fightScene1.player.appendChild(fightScene1.playerHP);
});

game.scenes.fightScene1.functions.push(() => {

    fightScene1.title.innerHTML = 'Firefoe<br>HP 64/64';
    fightScene1.title.style.color = 'black';

    fightScene1.playerHP.innerHTML = 'HP 100/100';
    fightScene1.playerHP.style.color = 'black';

    setTimeout(() => {
        game.scenes.fightScene1.intervals.push(setInterval(() => {
            fightScene1.title.innerHTML = `Firefoe<br>HP ${enemy.HP}/${enemy.MaxHP}`;
            // if half hp, change color to yellow
            if (enemy.HP <= 32) {
                fightScene1.title.style.color = 'orange';
            }
            // if low hp, change color to red
            if (enemy.HP <= 10) {
                fightScene1.title.style.color = 'red';
            }
            if (enemy.HP <= 0) {
                fightScene1.title.innerHTML = 'Firefoe<br>HP 0/64';
                fightScene1.title.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    fightScene1.title.style.animation = 'none';
                }, 500);
                clearInterval(game.scenes.fightScene1.intervals[0]);
                setTimeout(() => {
                    game.loadScene('playerVictory');
                    game.scenes.menu.beaten.firefoe = true;
                }, 2000);
            }
        }, 100));
    }, 100);

    setTimeout(() => {
        game.scenes.fightScene1.intervals.push(setInterval(() => {
            fightScene1.playerHP.innerHTML = `HP ${player.HP}/${player.MaxHP}`;
            if (player.HP <= 0) {
                //set player sprite to dead
                player.sprite.style.backgroundImage = 'url(./dead.png)';
                fightScene1.playerHP.innerHTML = 'HP 0/100';
                fightScene1.playerHP.style.color = 'red';
                fightScene1.playerHP.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    fightScene1.playerHP.style.animation = 'none';
                }, 500);
                clearInterval(game.scenes.fightScene1.intervals[1]);
                setTimeout(() => {
                    game.loadScene('firefoeVictory');
                }, 2000);
            }
        }, 100));
    }, 100);
});

// add div with class entityShadow inside enemy and player
let entityShadow = document.createElement('div');
entityShadow.classList.add('entityShadow');
fightScene1.enemy.appendChild(entityShadow.cloneNode());
fightScene1.player.appendChild(entityShadow.cloneNode());

// add sprite to enemy 
let enemyElement = document.createElement('div');
enemyElement.classList.add('sprite');
fightScene1.enemy.appendChild(enemyElement.cloneNode());

let enemy = {
    sprite: null,
    HP: 64,
    MaxHP: 64,
    vulnerableTo: {
        counterAttack: false,
        patch: false,
        purge: false
    }
}

enemy.sprite = fightScene1.enemy.querySelector('.sprite')
enemy.sprite.style.backgroundImage = 'url(./firefoe.png)';
// css animation
enemy.sprite.style.animation = 'idle 1s infinite';

// add sprite to player
let playerSprite = document.createElement('div');
playerSprite.classList.add('sprite');
fightScene1.player.appendChild(playerSprite.cloneNode());
let player = {
    sprite: null,
    HP: 100,
    MaxHP: 100,
    vulnerableTo: {
        firewall: true,
        patch: true,
        malware: true
    }
}
player.sprite = fightScene1.player.querySelector('.sprite')

game.scenes.fightScene1.functions.push(() => {
    enemy.HP = 64;
    player.HP = 100;
});

player.sprite.style.backgroundImage = 'url(./idle.png)';
// css animation
player.sprite.style.animation = 'idle 0.5s infinite';

let playerAttackAnimation = (instantkill) => {
    player.sprite.classList.add('attack');
    player.sprite.style.backgroundImage = 'url(./attack.png)';
    // css animation
    player.sprite.style.animation = 'playerAttack .75s';
    setTimeout(() => {
        enemy.sprite.style.backgroundImage = 'url(./firefoeHit.png)';
        enemy.sprite.style.animation = 'hit 0.5s';
        playAttackSound();
    }, 500);
    setTimeout(() => {
        enemy.sprite.style.backgroundImage = 'url(./firefoeHit2.png)';
        playFirefoeSound();
        let damage = instantkill ? 99 : randomInt(10, 15);
        enemy.HP -= damage;
        text.innerHTML += instantkill ? `<p>You dealt <span style="color: red">${damage}</span> damage!</p>` : `<p>You dealt ${damage} damage!</p>`;
    }, 750);
    setTimeout(() => {
        player.sprite.style.backgroundImage = 'url(./idle.png)';
        player.sprite.style.animation = 'idle 0.5s infinite';
        enemy.sprite.style.backgroundImage = 'url(./firefoe.png)';
        enemy.sprite.style.animation = 'idle 1s infinite';
    }, 1000);
    player.sprite.classList.remove('attack');
}

fightScene1.container.appendChild(fightScene1.background);
fightScene1.container.appendChild(fightScene1.title);
fightScene1.container.appendChild(fightScene1.enemy);
fightScene1.container.appendChild(fightScene1.player);

let loadDefaultButtons = () => {
    document.querySelector('.game-controls').innerHTML = '';
    for (let button in fightScene1.buttons) {
        document.querySelector('.game-controls').appendChild(fightScene1.buttons[button]);
    }
}

let attack = {
    button1: document.createElement('button'),
    button2: document.createElement('button'),
    button3: document.createElement('button'),
    button4: document.createElement('button')
}

let defend = {
    button1: document.createElement('button'),
    button2: document.createElement('button'),
    button3: document.createElement('button'),
    button4: document.createElement('button')
}


attack.button1.textContent = 'Back';
attack.button1.classList.add('btn', 'btn-secondary');
attack.button1.addEventListener('click', () => {
    playDingSound();
    loadDefaultButtons();
});

attack.button2.textContent = 'Counter-Attack';
attack.button2.classList.add('btn', 'btn-danger');
attack.button2.addEventListener('click', () => {
    playDingSound();
    playerAttackAnimation();
    // text for player attack
    text.innerHTML = `<p>You used Counter-Attack!</p>`;
    document.querySelector('.game-controls').innerHTML = '';
    setTimeout(() => {
        enemyTurn();
    }, 2000);
});

attack.button3.textContent = 'Patch';
attack.button3.classList.add('btn', 'btn-danger');
attack.button3.addEventListener('click', () => {
    playDingSound();
    patch();
});
function patch() {

}

attack.button4.textContent = 'Purge Malware';
attack.button4.classList.add('btn', 'btn-danger');
attack.button4.addEventListener('click', () => {
    playDingSound();
    purgeMalware();
});
function purgeMalware() {
    // is enemy vulnerable to purge?
    if (enemy.vulnerableTo.purge) {
        // text for player attack
        text.innerHTML = `<p>You used Purge Malware!</p>`;
        playerAttackAnimation(true);
    } else {
        text.innerHTML = `<p>Firefoe was too strong to be affected by Purge Malware!</p>`;
        document.querySelector('.game-controls').innerHTML = '';
        setTimeout(() => {
            enemyTurn();
        }, 2000);
    }
}

defend.button1.textContent = 'Back';
defend.button1.classList.add('btn', 'btn-secondary');
defend.button1.addEventListener('click', () => {
    playDingSound();
    loadDefaultButtons();
});

defend.button2.textContent = 'Secure Firewall';
defend.button2.classList.add('btn', 'btn-primary');
defend.button2.addEventListener('click', () => {
    playDingSound();
    SecureFirewall();
});
function SecureFirewall() {
    if (player.vulnerableTo.firewall) {
        // text for player attack
        text.innerHTML = `<p>You used Secure Firewall!</p>
        <p>You gained resistance to Firefoe's attacks!</p>`;
        player.vulnerableTo.firewall = false;
        document.querySelector('.game-controls').innerHTML = '';
        setTimeout(() => {
            enemyTurn();
        }, 2000);
    } else {
        text.innerHTML = `<p>Your firewall was already secure!</p>`;
        document.querySelector('.game-controls').innerHTML = '';
        setTimeout(() => {
            enemyTurn();
        }, 2000);
    }
}

defend.button3.textContent = 'Patch';
defend.button3.classList.add('btn', 'btn-primary');
defend.button3.addEventListener('click', () => {
    playDingSound();
    patch();
});
function patch() {
    // is player vulnerable to patch?
    if (player.vulnerableTo.patch) {
        // text for player attack
        text.innerHTML = `<p>You used Patch!</p>
        <p>You gained resistance to Firefoe's attacks!</p>`;
        player.vulnerableTo.patch = false;
        document.querySelector('.game-controls').innerHTML = '';
        setTimeout(() => {
            enemyTurn();
        }, 2000);
    } else {
        text.innerHTML = `<p>You have already patched your system!</p>`;
        document.querySelector('.game-controls').innerHTML = '';
        setTimeout(() => {
            enemyTurn();
        }, 2000);
    }
}

defend.button4.textContent = 'Isolate Malware';
defend.button4.classList.add('btn', 'btn-primary');
defend.button4.addEventListener('click', () => {
    playDingSound();
    isolateMalware();
});
function isolateMalware() {
    // is player vulnerable to malware?
    if (player.vulnerableTo.malware) {
        // is enemy health less than 50%?
        if (enemy.HP <= 32) {
            // text for player attack
            // text for player attack
            text.innerHTML = `<p>You used Isolate Malware!</p>
        <p>You gained resistance to Firefoe's attacks!</p>`;
            enemy.vulnerableTo.purge = true;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        } else {
            text.innerHTML = `<p>Firefoe was too strong to be affected by Isolate Malware!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    } else {
        text.innerHTML = `<p>You have already isolated Malware!</p>`;
        document.querySelector('.game-controls').innerHTML = '';
        setTimeout(() => {
            enemyTurn();
        }, 2000);
    }
}

// buttons
fightScene1.attackButton1.textContent = 'Attacks';
fightScene1.attackButton1.classList.add('btn', 'btn-danger');
fightScene1.attackButton1.addEventListener('click', () => {
    playDingSound();
    document.querySelector('.game-controls').innerHTML = '';
    for (let button in attack) {
        if (typeof attack[button] === 'function') continue;
        document.querySelector('.game-controls').appendChild(attack[button]);
    }
});

fightScene1.attackButton2.textContent = 'Defend';
fightScene1.attackButton2.classList.add('btn', 'btn-primary');
fightScene1.attackButton2.addEventListener('click', () => {
    playDingSound();
    document.querySelector('.game-controls').innerHTML = '';
    for (let button in defend) {
        if (typeof defend[button] === 'function') continue;
        document.querySelector('.game-controls').appendChild(defend[button]);
    }
});

fightScene1.attackButton3.textContent = 'Scan';
fightScene1.attackButton3.classList.add('btn', 'btn-warning');
fightScene1.attackButton3.addEventListener('click', () => {
    playDingSound();
});

fightScene1.attackButton4.textContent = 'Skip Turn';
fightScene1.attackButton4.classList.add('btn', 'btn-secondary');
fightScene1.attackButton4.addEventListener('click', () => {
    playDingSound();
});

fightScene1.buttons = {
    attack1: fightScene1.attackButton1,
    attack2: fightScene1.attackButton2,
    attack3: fightScene1.attackButton3,
    attack4: fightScene1.attackButton4
}

// add text box
fightScene1.textBox.classList.add('textBox', 'fromBottom');
fightScene1.container.appendChild(fightScene1.textBox);

// innerTextBox
let innerTextBox = document.createElement('div');
innerTextBox.classList.add('innerTextBox');
fightScene1.textBox.appendChild(innerTextBox);

// add text to innerTextBox
let text = document.createElement('div');
text.innerHTML = `
    <p>Strengthen the network to prevent FirewallFoe’s breach!</p>`;
innerTextBox.appendChild(text);

game.scenes.fightScene1.buttons = fightScene1.buttons;

game.scenes.fightScene1.element.appendChild(fightScene1.container);

function enemyTurn() {
    if (enemy.HP > 0) {
        enemyAttackAnimation();
    }
}

function enemyAttackAnimation() {
    let damage = randomInt(1, 9);
    if (player.vulnerableTo.firewall) {
        damage += randomInt(20, 50);
    }
    // text for enemy attack
    text.innerHTML = `<p>Firefoe used Attack!</p>`
    // css animation
    enemy.sprite.style.animation = 'enemyAttack .75s';
    setTimeout(() => {
        playAttackSound();
    }, 250);
    setTimeout(() => {
        player.sprite.style.backgroundImage = 'url(./hit.png)';
        player.sprite.style.animation = 'hit 0.5s';
        playHitSound();
        player.HP -= damage;
        text.innerHTML += `<p>Firefoe dealt ${damage} damage!</p>`;
    }, 500);
    setTimeout(() => {
        enemy.sprite.style.animation = 'idle 1s infinite';
        player.sprite.style.backgroundImage = 'url(./idle.png)';
        player.sprite.style.animation = 'idle 0.5s infinite';
    }, 1000);
    setTimeout(() => {
        text.innerHTML = `<p>Strengthen the network to prevent FirewallFoe’s breach!</p>`;
        // check if player is dead
        if (player.HP > 0) {
            loadDefaultButtons();
        }
    }, 2000);
}

// firefoe victory scene
let firefoeVictory = {
    container: document.createElement('div'),
    title: document.createElement('h1'),
    text: document.createElement('div')
}

firefoeVictory.title.textContent = 'Firefoe wins!';
firefoeVictory.text.innerHTML = '<p>Firefoe has breached your network!</p>';

firefoeVictory.container.appendChild(firefoeVictory.title);
firefoeVictory.container.appendChild(firefoeVictory.text);

game.scenes.firefoeVictory = {
    element: firefoeVictory.container,
    buttons: {
        menu: document.createElement('button')
    },
    sound: playDingSound,
    intervals: [],
    functions: []
}

game.scenes.firefoeVictory.buttons.menu.textContent = 'Main Menu';
game.scenes.firefoeVictory.buttons.menu.classList.add('btn', 'btn-primary');
game.scenes.firefoeVictory.buttons.menu.addEventListener('click', () => {
    game.loadScene('menu');
    playDingSound();
});

// player victory scene
let playerVictory = {
    container: document.createElement('div'),
    title: document.createElement('h1'),
    text: document.createElement('div')
}

playerVictory.title.textContent = 'You win!';
playerVictory.text.innerHTML = '<p>You have successfully defended your network!</p>';

playerVictory.container.appendChild(playerVictory.title);
playerVictory.container.appendChild(playerVictory.text);

game.scenes.playerVictory = {
    element: playerVictory.container,
    buttons: {
        menu: document.createElement('button')
    },
    sound: playDingSound,
    intervals: [],
    functions: []
}

game.scenes.playerVictory.buttons.menu.textContent = 'Main Menu';
game.scenes.playerVictory.buttons.menu.classList.add('btn', 'btn-primary');
game.scenes.playerVictory.buttons.menu.addEventListener('click', () => {
    game.loadScene('menu');
    playDingSound();
});

// reuse everything for fight scene 2 other than the enemy sprite
let fightScene2 = {
    background: fightScene1.background.cloneNode(true),
    title: fightScene1.title.cloneNode(true),
    playerHP: fightScene1.playerHP.cloneNode(true),
    enemy: fightScene1.enemy.cloneNode(true),
    player: fightScene1.player.cloneNode(true),
    attackButton1: fightScene1.attackButton1,
    attackButton2: fightScene1.attackButton2,
    attackButton3: fightScene1.attackButton3,
    attackButton4: fightScene1.attackButton4,
    textBox: fightScene1.textBox.cloneNode(true),
    container: document.createElement('div')
}

game.scenes.fightScene2.functions.push(() => {
    purgeMalware = () => {
        // is player vulnerable to malware?
        if (player.vulnerableTo.malware) {
            // is enemy health less than 50%?
            if (enemy.HP <= 32) {
                // text for player attack
                // text for player attack
                text.innerHTML = `<p>You used Purge Malware!</p>
            <p>You gained resistance to SpyBot's attacks!</p>`;
                enemy.vulnerableTo.purge = true;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            } else {
                text.innerHTML = `<p>SpyBot was too strong to be affected by Purge Malware!</p>`;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            }
        } else {
            text.innerHTML = `<p>You have already purged Malware!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }

    SecureFirewall = () => {
        if (player.vulnerableTo.firewall) {
            // text for player attack
            text.innerHTML = `<p>You used Secure Firewall!</p>
            <p>You gained resistance to SpyBot's attacks!</p>`;
            player.vulnerableTo.firewall = false;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        } else {
            text.innerHTML = `<p>Your firewall was already secure!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }

    patch = () => {
        // is player vulnerable to patch?
        if (player.vulnerableTo.patch) {
            // text for player attack
            text.innerHTML = `<p>You used Patch!</p>
            <p>You gained resistance to SpyBot's attacks!</p>`;
            player.vulnerableTo.patch = false;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        } else {
            text.innerHTML = `<p>You have already patched your system!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }

    isolateMalware = () => {
        // is player vulnerable to malware?
        if (player.vulnerableTo.malware) {
            // is enemy health less than 50%?
            if (enemy.HP <= 32) {
                // text for player attack
                // text for player attack
                text.innerHTML = `<p>You used Isolate Malware!</p>
            <p>You gained resistance to SpyBot's attacks!</p>`;
                enemy.vulnerableTo.purge = true;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            } else {
                text.innerHTML = `<p>SpyBot was too strong to be affected by Isolate Malware!</p>`;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            }
        } else {
            text.innerHTML = `<p>You have already isolated Malware!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }
});

game.scenes.fightScene2.functions.push(() => {

    fightScene2.container.id = 'fight';
    fightScene2.background.id = 'background';

    fightScene2.container.appendChild(fightScene2.background);
    fightScene2.container.appendChild(fightScene2.title);
    fightScene2.container.appendChild(fightScene2.enemy);
    fightScene2.container.appendChild(fightScene2.player);
    fightScene2.container.appendChild(fightScene2.textBox);

    fightScene2.buttons = fightScene1.buttons;
});

game.scenes.fightScene2.functions.push(() => {
    enemy.HP = 64;
    player.HP = 100;

    enemy.vulnerableTo = {
        counterAttack: false,
        patch: false,
        purge: false
    }

    player.vulnerableTo = {
        firewall: true,
        patch: true,
        malware: true
    }
});

game.scenes.fightScene2.functions.push(() => {

    game.scenes.fightScene2.buttons = fightScene2.buttons;

    game.scenes.fightScene2.element = fightScene2.container;

    // change enemy sprite
    enemy.sprite = fightScene2.enemy.querySelector('.sprite')
    enemy.sprite.style.backgroundImage = 'url(./spybot.png)';

    // get text box
    text = fightScene2.textBox.querySelector('.innerTextBox');

    // add text to innerTextBox
    text.innerHTML = `
        <p>A SpyBot’s been found in your system!</p>
        <p>Defend your network to prevent data theft!</p>
    `;

    // add titles for player and enemy
    fightScene2.title.innerHTML = 'SpyBot<br>HP 64/64';
    fightScene2.title.style.color = 'black';

    fightScene2.player.appendChild(fightScene2.playerHP);
    fightScene2.playerHP.classList.add('playerHP');

    fightScene2.playerHP.innerHTML = 'HP 100/100';
    fightScene2.playerHP.style.color = 'black';

    // intervals
    game.scenes.fightScene2.functions.push(() => {
        setTimeout(() => {
            game.scenes.fightScene2.intervals.push(setInterval(() => {
                fightScene2.title.innerHTML = `SpyBot<br>HP ${enemy.HP}/${enemy.MaxHP}`;
                // if half hp, change color to yellow
                if (enemy.HP <= 32) {
                    fightScene2.title.style.color = 'orange';
                }
                // if low hp, change color to red
                if (enemy.HP <= 10) {
                    fightScene2.title.style.color = 'red';
                }
                if (enemy.HP <= 0) {
                    playDeadSound();
                    fightScene2.title.innerHTML = 'SpyBot<br>HP 0/64';
                    fightScene2.title.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        fightScene2.title.style.animation = 'none';
                    }, 500);
                    clearInterval(game.scenes.fightScene2.intervals[0]);
                    setTimeout(() => {
                        game.loadScene('playerVictory');
                        game.scenes.menu.beaten.spyBot = true;
                    }, 2000);
                }
            }, 100));
        }, 100);

        setTimeout(() => {
            game.scenes.fightScene2.intervals.push(setInterval(() => {
                fightScene2.playerHP.innerHTML = `HP ${player.HP}/${player.MaxHP}`;
                if (player.HP <= 0) {
                    //set player sprite to dead
                    player.sprite.style.backgroundImage = 'url(./dead.png)';
                    fightScene2.playerHP.innerHTML = 'HP 0/100';
                    fightScene2.playerHP.style.color = 'red';
                    fightScene2.playerHP.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        fightScene2.playerHP.style.animation = 'none';
                    }, 500);
                    clearInterval(game.scenes.fightScene2.intervals[1]);
                    setTimeout(() => {
                        game.loadScene('spyBotVictory');
                    }, 2000);
                }
            }, 100));
        }, 100);
    });

    player.sprite = fightScene2.player.querySelector('.sprite')

    playerAttackAnimation = (instantkill) => {
        player.sprite.classList.add('attack');
        player.sprite.style.backgroundImage = 'url(./attack.png)';
        // css animation
        player.sprite.style.animation = 'playerAttack .75s';
        setTimeout(() => {
            enemy.sprite.style.backgroundImage = 'url(./spybotHit1.png)';
            enemy.sprite.style.animation = 'hit 0.5s';
            playAttackSound();
        }, 500);
        setTimeout(() => {
            enemy.sprite.style.backgroundImage = 'url(./spybotHit2.png)';
            playFirefoeSound();
            let damage = instantkill ? 99 : randomInt(10, 15);
            enemy.HP -= damage;
            text.innerHTML += instantkill ? `<p>You dealt <span style="color: red">${damage}</span> damage!</p>` : `<p>You dealt ${damage} damage!</p>`;
        }, 750);
        setTimeout(() => {
            player.sprite.style.backgroundImage = 'url(./idle.png)';
            player.sprite.style.animation = 'idle 0.5s infinite';
            enemy.sprite.style.backgroundImage = 'url(./spybot.png)';
            enemy.sprite.style.animation = 'idle 1s infinite';
        }, 1000);
        player.sprite.classList.remove('attack');
    }

    enemyAttackAnimation = () => {
        let damage = randomInt(1, 25);
        // image for enemy attack
        enemy.sprite.style.backgroundImage = 'url(./spybotAttack.png)';
        // text for enemy attack
        text.innerHTML = `<p>SpyBot used Attack!</p>`
        // css animation
        enemy.sprite.style.animation = 'enemyAttack .75s';
        setTimeout(() => {
            playAttackSound();
        }, 250);
        setTimeout(() => {
            player.sprite.style.backgroundImage = 'url(./hit.png)';
            player.sprite.style.animation = 'hit 0.4s';
            playHitSound();
            player.HP -= damage;
            text.innerHTML += `<p>SpyBot dealt ${damage} damage!</p>`;
        }, 500);
        // has player secured firewall?
        if (player.vulnerableTo.firewall) {
            // css animation
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.animation = 'idle 0.5s infinite';
            }, 1000);
            setTimeout(() => {
                enemy.sprite.style.animation = 'enemyAttack .75s';
            }, 1500);
            setTimeout(() => {
                playAttackSound();
            }, 1750);
            setTimeout(() => {
                player.sprite.style.backgroundImage = 'url(./hit.png)';
                player.sprite.style.animation = 'hit 0.5s';
                playHitSound();
                player.HP -= damage;
                text.innerHTML = `
                    <p>Data leak!</p>
                    <p>Spybot dealt <span style="color: red">${randomInt(5, 20)*2}</span> additional damage!</p>
                `;
            }, 2000);
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.backgroundImage = 'url(./idle.png)';
                player.sprite.style.animation = 'idle 0.5s infinite';

                text.innerHTML = `
                <p>A SpyBot’s been found in your system!</p>
                <p>Defend your network to prevent data theft!</p>
            `;
                // check if player is dead
                if (player.HP > 0) {
                    loadDefaultButtons();
                }
            }, 3000);
        } else {
            setTimeout(() => {
                enemy.sprite.style.backgroundImage = 'url(./spybot.png)';
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.backgroundImage = 'url(./idle.png)';
                player.sprite.style.animation = 'idle 0.5s infinite';
            }, 1000);
            setTimeout(() => {
                text.innerHTML = `
                <p>A SpyBot’s been found in your system!</p>
                <p>Defend your network to prevent data theft!</p>
            `;
                // check if player is dead
                if (player.HP > 0) {
                    loadDefaultButtons();
                }
            }, 2000);
        }
    }
});

game.scenes.spyBotVictory = {
    element: firefoeVictory.container,
    buttons: {
        menu: document.createElement('button')
    },
    sound: playDingSound,
    intervals: [],
    functions: []
}

game.scenes.spyBotVictory.buttons.menu.textContent = 'Main Menu';
game.scenes.spyBotVictory.buttons.menu.classList.add('btn', 'btn-primary');
game.scenes.spyBotVictory.buttons.menu.addEventListener('click', () => {
    game.loadScene('menu');
    playDingSound();
});

let spyBotVictory = {
    container: document.createElement('div'),
    title: document.createElement('h1'),
    text: document.createElement('div')
}

spyBotVictory.title.textContent = 'SpyBot wins!';
spyBotVictory.text.innerHTML = '<p>SpyBot has stolen your data!</p>';

spyBotVictory.container.appendChild(spyBotVictory.title);
spyBotVictory.container.appendChild(spyBotVictory.text);

game.scenes.spyBotVictory.element = spyBotVictory.container;

// fight scene 3, IntrusionImp 

let fightScene3 = {
    background: fightScene1.background,
    title: fightScene1.title,
    playerHP: fightScene1.playerHP,
    enemy: fightScene1.enemy.cloneNode(true),
    player: fightScene1.player.cloneNode(true),
    attackButton1: fightScene1.attackButton1,
    attackButton2: fightScene1.attackButton2,
    attackButton3: fightScene1.attackButton3,
    attackButton4: fightScene1.attackButton4,
    textBox: fightScene1.textBox,
    container: document.createElement('div')
}

game.scenes.fightScene3.functions.push(() => {

    fightScene3.container.id = 'fight';
    fightScene3.background.id = 'background';

    fightScene3.container.appendChild(fightScene3.background);
    fightScene3.container.appendChild(fightScene3.title);
    fightScene3.container.appendChild(fightScene3.enemy);
    fightScene3.container.appendChild(fightScene3.player);
    fightScene3.container.appendChild(fightScene3.textBox);

    fightScene3.buttons = fightScene1.buttons;
});

game.scenes.fightScene3.functions.push(() => {
    purgeMalware = () => {
        // is player vulnerable to malware?
        if (player.vulnerableTo.malware) {
            // is enemy health less than 50%?
            if (enemy.HP <= 32) {
                // text for player attack
                // text for player attack
                text.innerHTML = `<p>You used Purge Malware!</p>
            <p>You gained resistance to IntrusionImp's attacks!</p>`;
                enemy.vulnerableTo.purge = true;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            } else {
                text.innerHTML = `<p>IntrusionImp was too strong to be affected by Purge Malware!</p>`;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            }
        } else {
            text.innerHTML = `<p>You have already purged Malware!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }

    SecureFirewall = () => {
        if (player.vulnerableTo.firewall) {
            // text for player attack
            text.innerHTML = `<p>You used Secure Firewall!</p>
            <p>You gained resistance to IntrusionImp's attacks!</p>`;
            player.vulnerableTo.firewall = false;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        } else {
            text.innerHTML = `<p>Your firewall was already secure!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }

    patch = () => {
        // is player vulnerable to patch?
        if (player.vulnerableTo.patch) {
            // text for player attack
            text.innerHTML = `<p>You used Patch!</p>
            <p>You gained resistance to IntrusionImp's attacks!</p>`;
            player.vulnerableTo.patch = false;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        } else {
            text.innerHTML = `<p>You have already patched your system!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }

    isolateMalware = () => {
        // is player vulnerable to malware?
        if (player.vulnerableTo.malware) {
            // is enemy health less than 50%?
            if (enemy.HP <= 32) {
                // text for player attack
                // text for player attack
                text.innerHTML = `<p>You used Isolate Malware!</p>
            <p>You gained resistance to IntrusionImp's attacks!</p>`;
                enemy.vulnerableTo.purge = true;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            } else {
                text.innerHTML = `<p>IntrusionImp was too strong to be affected by Isolate Malware!</p>`;
                document.querySelector('.game-controls').innerHTML = '';
                setTimeout(() => {
                    enemyTurn();
                }, 2000);
            }
        } else {
            text.innerHTML = `<p>You have already isolated Malware!</p>`;
            document.querySelector('.game-controls').innerHTML = '';
            setTimeout(() => {
                enemyTurn();
            }, 2000);
        }
    }
});

game.scenes.fightScene3.functions.push(() => {
    enemy.HP = 64;
    player.HP = 100;

    enemy.vulnerableTo = {
        counterAttack: false,
        patch: false,
        purge: false
    }

    player.vulnerableTo = {
        firewall: true,
        patch: true,
        malware: true
    }
});

game.scenes.fightScene3.functions.push(() => {
    game.scenes.fightScene3.buttons = fightScene3.buttons;
    game.scenes.fightScene3.element = fightScene3.container;
    // change enemy sprite
    enemy.sprite = fightScene3.enemy.querySelector('.sprite')
    enemy.sprite.style.backgroundImage = 'url(./Imp.png)';
    // get text box
    text = fightScene3.textBox.querySelector('.innerTextBox');
    // add text to innerTextBox
    text.innerHTML = `
        <p>An IntrusionImp has been detected!</p>
        <p>Defend your network to prevent data theft!</p>
    `;
    // add titles for player and enemy
    fightScene3.title.innerHTML = 'IntrusionImp<br>HP 64/64';
    fightScene3.title.style.color = 'black';
    fightScene3.player.appendChild(fightScene3.playerHP);
    fightScene3.playerHP.classList.add('playerHP');
    fightScene3.playerHP.innerHTML = 'HP 100/100';
    fightScene3.playerHP.style.color = 'black';
    // intervals
    game.scenes.fightScene3.functions.push(() => {
        setTimeout(() => {
            game.scenes.fightScene3.intervals.push(setInterval(() => {
                fightScene3.title.innerHTML = `IntrusionImp<br>HP ${enemy.HP}/${enemy.MaxHP}`;
                // if half hp, change color to yellow
                if (enemy.HP <= 32) {
                    fightScene3.title.style.color = 'orange';
                }
                // if low hp, change color to red
                if (enemy.HP <= 10) {
                    fightScene3.title.style.color = 'red';
                }
                if (enemy.HP <= 0) {
                    playDeadSound();
                    fightScene3.title.innerHTML = 'IntrusionImp<br>HP 0/64';
                    fightScene3.title.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        fightScene3.title.style.animation = 'none';
                    }, 500);
                    clearInterval(game.scenes.fightScene3.intervals[0]);
                    setTimeout(() => {
                        game.loadScene('playerVictory');
                        game.scenes.menu.beaten.intrusionImp = true;
                    }, 2000);
                }
            }, 100));
        }, 100);
        setTimeout(() => {
            game.scenes.fightScene3.intervals.push(setInterval(() => {
                fightScene3.playerHP.innerHTML = `HP ${player.HP}/${player.MaxHP}`;
                if (player.HP <= 0) {
                    //set player sprite to dead
                    player.sprite.style.backgroundImage = 'url(./dead.png)';
                    fightScene3.playerHP.innerHTML = 'HP 0/100';
                    fightScene3.playerHP.style.color = 'red';
                    fightScene3.playerHP.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        fightScene3.playerHP.style.animation = 'none';
                    }, 500);
                    clearInterval(game.scenes.fightScene3.intervals[1]);
                    setTimeout(() => {
                        game.loadScene('intrusionImpVictory');
                    }, 2000);
                }
            }, 100));
        }, 100);
    });
    player.sprite = fightScene3.player.querySelector('.sprite')
    playerAttackAnimation = (instantkill) => {
        player.sprite.classList.add('attack');
        player.sprite.style.backgroundImage = 'url(./attack.png)';
        // css animation
        player.sprite.style.animation = 'playerAttack .75s';
        setTimeout(() => {
            enemy.sprite.style.backgroundImage = 'url(./ImpHit1.png)';
            enemy.sprite.style.animation = 'hit 0.5s';
            playAttackSound();
        }, 500);
        setTimeout(() => {
            enemy.sprite.style.backgroundImage = 'url(./ImpHit2.png)';
        }, 625);
        setTimeout(() => {
            enemy.sprite.style.backgroundImage = 'url(./ImpHit3.png)';
            playFirefoeSound();
            let damage = instantkill ? 99 : randomInt(10, 15);
            enemy.HP -= damage;
            text.innerHTML += instantkill ? `<p>You dealt <span style="color: red">${damage}</span> damage!</p>` : `<p>You dealt ${damage} damage!</p>`;
        }, 750);
        setTimeout(() => {
            player.sprite.style.backgroundImage = 'url(./idle.png)';
            player.sprite.style.animation = 'idle 0.5s infinite';
            enemy.sprite.style.backgroundImage = 'url(./Imp.png)';
            enemy.sprite.style.animation = 'idle 1s infinite';
        }, 1000);
        player.sprite.classList.remove('attack');
    }

    enemyAttackAnimation = () => {
        let damage = randomInt(1, 25);
        // text for enemy attack
        text.innerHTML = `<p>IntrusionImp used Attack!</p>`
        // css animation
        enemy.sprite.style.animation = 'enemyAttack .75s';
        setTimeout(() => {
            playAttackSound();
        }, 250);
        setTimeout(() => {
            player.sprite.style.backgroundImage = 'url(./hit.png)';
            player.sprite.style.animation = 'hit 0.4s';
            playHitSound();
            player.HP -= damage;
            text.innerHTML += `<p>IntrusionImp dealt ${damage} damage!</p>`;
        }, 500);
        // has player secured firewall?
        if (player.vulnerableTo.firewall) {
            // css animation
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.animation = 'idle 0.5s infinite';
            }, 1000);
            setTimeout(() => {
                enemy.sprite.style.animation = 'enemyAttack .75s';
            }, 1500);
            setTimeout(() => {
                playAttackSound();
            }, 1750);
            setTimeout(() => {
                player.sprite.style.backgroundImage = 'url(./hit.png)';
                player.sprite.style.animation = 'hit 0.5s';
                playHitSound();
                player.HP -= damage;
                text.innerHTML = `
                    <p>Data leak!</p>
                    <p>IntrusionImp dealt <span style="color: red">${randomInt(5, 20)*2}</span> additional damage!</p>
                `;
            }, 2000);
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.backgroundImage = 'url(./idle.png)';
                player.sprite.style.animation = 'idle 0.5s infinite';

                text.innerHTML = `
                <p>An IntrusionImp has been detected!</p>
                <p>Defend your network to prevent data theft!</p>
            `;
                // check if player is dead
                if (player.HP > 0) {
                    loadDefaultButtons();
                }
            }, 3000);
        } else {
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.backgroundImage = 'url(./idle.png)';
                player.sprite.style.animation = 'idle 0.5s infinite';
            }, 1000);
            setTimeout(() => {
                text.innerHTML = `
                <p>An IntrusionImp has been detected!</p>
                <p>Defend your network to prevent data theft!</p>
            `;
                // check if player is dead
                if (player.HP > 0) {
                    loadDefaultButtons();
                }
            }, 2000);
        }
    }
});

game.scenes.intrusionImpVictory = {
    element: firefoeVictory.container,
    buttons: {
        menu: document.createElement('button')
    },
    sound: playDingSound,
    intervals: [],
    functions: []
}

game.scenes.intrusionImpVictory.buttons.menu.textContent = 'Main Menu';
game.scenes.intrusionImpVictory.buttons.menu.classList.add('btn', 'btn-primary');
game.scenes.intrusionImpVictory.buttons.menu.addEventListener('click', () => {
    game.loadScene('menu');
    playDingSound();
});

let intrusionImpVictory = {
    container: document.createElement('div'),
    title: document.createElement('h1'),
    text: document.createElement('div')
}

intrusionImpVictory.title.textContent = 'IntrusionImp wins!';
intrusionImpVictory.text.innerHTML = '<p>IntrusionImp has stolen your data!</p>';

intrusionImpVictory.container.appendChild(intrusionImpVictory.title);
intrusionImpVictory.container.appendChild(intrusionImpVictory.text);

game.scenes.intrusionImpVictory.element = intrusionImpVictory.container;

// final battle, firefoe then spybot then intrusionimp

let finalbattle = {
    background: fightScene1.background.cloneNode(true),
    title: fightScene1.title.cloneNode(true),
    playerHP: fightScene1.playerHP.cloneNode(true),
    enemy: fightScene1.enemy.cloneNode(true),
    player: fightScene1.player.cloneNode(true),
    attackButton1: fightScene1.attackButton1,
    attackButton2: fightScene1.attackButton2,
    attackButton3: fightScene1.attackButton3,
    attackButton4: fightScene1.attackButton4,
    textBox: fightScene1.textBox.cloneNode(true),
    container: document.createElement('div'),
    enemies: {
        firefoe: {
            HP: 64,
            MaxHP: 64,
            vulnerableTo: {
                counterAttack: false,
                patch: false,
                purge: false
            }
        },
        spyBot: {
            HP: 64,
            MaxHP: 64,
            vulnerableTo: {
                counterAttack: false,
                patch: false,
                purge: false
            }
        },
        intrusionImp: {
            HP: 64,
            MaxHP: 64,
            vulnerableTo: {
                counterAttack: false,
                patch: false,
                purge: false
            }
        }

    },
    intervals: {}
}

game.scenes.finalbattle.functions.push(() => {

    finalbattle.container.id = 'fight';
    finalbattle.background.id = 'background';

    finalbattle.container.appendChild(finalbattle.background);
    finalbattle.container.appendChild(finalbattle.title);
    finalbattle.container.appendChild(finalbattle.enemy);
    finalbattle.container.appendChild(finalbattle.player);
    finalbattle.container.appendChild(finalbattle.textBox);

    finalbattle.buttons = fightScene1.buttons;
});

game.scenes.finalbattle.functions.push(() => {
    finalbattle.enemies.firefoe.HP = 64;
    finalbattle.enemies.spyBot.HP = 64;
    finalbattle.enemies.intrusionImp.HP = 64;
    player.HP = 100;

    finalbattle.enemies.firefoe.vulnerableTo = {
        counterAttack: false,
        patch: false,
        purge: false
    }

    finalbattle.enemies.spyBot.vulnerableTo = {
        counterAttack: false,
        patch: false,
        purge: false
    }

    finalbattle.enemies.intrusionImp.vulnerableTo = {
        counterAttack: false,
        patch: false,
        purge: false
    }

    player.vulnerableTo = {
        firewall: true,
        patch: true,
        malware: true
    }
});


game.scenes.finalbattle.functions.push(() => {

    game.scenes.finalbattle.buttons = finalbattle.buttons;

    game.scenes.finalbattle.element = finalbattle.container;

    // change enemy sprite
    enemy.sprite = finalbattle.enemy.querySelector('.sprite')
    enemy.sprite.style.backgroundImage = 'url(./firefoe.png)';

    // get text box
    text = finalbattle.textBox.querySelector('.innerTextBox');

    // add text to innerTextBox
    text.innerHTML = `
        <p>Your network is overwhelmed!</p>
        <p>All the malware is attacking at once!</p>
    `;

    // add titles for player and enemy
    finalbattle.title.innerHTML = 'Firefoe LV2<br>HP 64/64';
    finalbattle.title.style.color = 'black';

    finalbattle.player.appendChild(finalbattle.playerHP);
    finalbattle.playerHP.classList.add('playerHP');

    finalbattle.playerHP.innerHTML = 'HP 100/100';
    finalbattle.playerHP.style.color = 'black';

    // intervals
    game.scenes.finalbattle.functions.push(() => {
        setTimeout(() => {
            finalbattle.intervals.firefoehealth=setInterval(() => {
                finalbattle.title.innerHTML = `Firefoe LV2<br>HP ${finalbattle.enemies.firefoe.HP}/${finalbattle.enemies.firefoe.MaxHP}`;
                // if half hp, change color to yellow
                if (finalbattle.enemies.firefoe.HP <= 32) {
                    finalbattle.title.style.color = 'orange';
                }
                // if low hp, change color to red
                if (finalbattle.enemies.firefoe.HP <= 10) {
                    finalbattle.title.style.color = 'red';
                }
                if (finalbattle.enemies.firefoe.HP <= 0) {
                    playDeadSound();
                    finalbattle.title.innerHTML = 'Firefoe LV2<br>HP 0/64';
                    finalbattle.title.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        finalbattle.title.style.animation = 'none';
                    }, 500);
                }
            }, 100);
        }, 100);

        setTimeout(() => {
            finalbattle.intervals.playerhealth=setInterval(() => {
                finalbattle.playerHP.innerHTML = `HP ${player.HP}/${player.MaxHP}`;
                if (player.HP <= 0) {
                    //set player sprite to dead
                    player.sprite.style.backgroundImage = 'url(./dead.png)';
                    clearInterval(finalbattle.intervals.firefoehealth);
                    clearInterval(finalbattle.intervals.spybothealth);
                    clearInterval(finalbattle.intervals.intrusionImphealth);
                    clearInterval(finalbattle.intervals.playerhealth);
                    finalbattle.playerHP.innerHTML = 'HP 0/100';
                    finalbattle.playerHP.style.color = 'red';
                    finalbattle.playerHP.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        finalbattle.playerHP.style.animation = 'none';
                    }, 500);
                    clearInterval(game.scenes.finalbattle.intervals[1]);
                    setTimeout(() => {
                        game.loadScene('firefoeVictory');
                    }, 2000);
                }
            }, 100);
        }, 100);
    });

    player.sprite = finalbattle.player.querySelector('.sprite')

    playerAttackAnimation = (instantkill) => {
        player.sprite.classList.add('attack');
        player.sprite.style.backgroundImage = 'url(./attack.png)';
        // css animation
        player.sprite.style.animation = 'playerAttack .75s';
        setTimeout(() => {
            enemy.sprite.style.backgroundImage = 'url(./firefoeHit.png)';
            enemy.sprite.style.animation = 'hit 0.5s';
            playAttackSound();
        }, 500);
        setTimeout(() => {
            enemy.sprite.style.backgroundImage = 'url(./firefoeHit2.png)';
            playFirefoeSound();
            let damage = instantkill ? 99 : randomInt(10, 15);
            finalbattle.enemies.firefoe.HP -= damage;
            text.innerHTML += instantkill ? `<p>You dealt <span style="color: red">${damage}</span> damage!</p>` : `<p>You dealt ${damage} damage!</p>`;
        }, 750);
        setTimeout(() => {
            player.sprite.style.backgroundImage = 'url(./idle.png)';
            player.sprite.style.animation = 'idle 0.5s infinite';
            enemy.sprite.style.backgroundImage = 'url(./firefoe.png)';
            enemy.sprite.style.animation = 'idle 1s infinite';
        }, 1000);
        player.sprite.classList.remove('attack');
    }

    enemyTurn = () => {
        if (finalbattle.enemies.firefoe.HP > 0) {
            enemyAttackAnimation();
        }
        else if (finalbattle.enemies.spyBot.HP > 0) {

            purgeMalware = () => {
                // is player vulnerable to malware?
                if (player.vulnerableTo.malware) {
                    // is enemy health less than 50%?
                    if (enemy.HP <= 32) {
                        // text for player attack
                        // text for player attack
                        text.innerHTML = `<p>You used Purge Malware!</p>
                    <p>You gained resistance to SpyBot's attacks!</p>`;
                        enemy.vulnerableTo.purge = true;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    } else {
                        text.innerHTML = `<p>SpyBot was too strong to be affected by Purge Malware!</p>`;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    }
                } else {
                    text.innerHTML = `<p>You have already purged Malware!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            SecureFirewall = () => {
                if (player.vulnerableTo.firewall) {
                    // text for player attack
                    text.innerHTML = `<p>You used Secure Firewall!</p>
                    <p>You gained resistance to SpyBot's attacks!</p>`;
                    player.vulnerableTo.firewall = false;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                } else {
                    text.innerHTML = `<p>Your firewall was already secure!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            patch = () => {
                // is player vulnerable to patch?
                if (player.vulnerableTo.patch) {
                    // text for player attack
                    text.innerHTML = `<p>You used Patch!</p>
                    <p>You gained resistance to SpyBot's attacks!</p>`;
                    player.vulnerableTo.patch = false;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                } else {
                    text.innerHTML = `<p>You have already patched your system!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            isolateMalware = () => {
                // is player vulnerable to malware?
                if (player.vulnerableTo.malware) {
                    // is enemy health less than 50%?
                    if (enemy.HP <= 32) {
                        // text for player attack
                        // text for player attack
                        text.innerHTML = `<p>You used Isolate Malware!</p>
                    <p>You gained resistance to SpyBot's attacks!</p>`;
                        enemy.vulnerableTo.purge = true;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    } else {
                        text.innerHTML = `<p>SpyBot was too strong to be affected by Isolate Malware!</p>`;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    }
                } else {
                    text.innerHTML = `<p>You have already isolated Malware!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            // switch enemy sprite and update text
            enemy.sprite.style.backgroundImage = 'url(./spybot.png)';
            text.innerHTML = `
                <p>Your network is overwhelmed!</p>
                <p>All the malware is attacking at once!</p>
            `;
            finalbattle.title.style.color = 'black';
            // change enemy sprite
            enemy.sprite = finalbattle.enemy.querySelector('.sprite')
            enemy.sprite.style.backgroundImage = 'url(./spybot.png)';
            
            // intervals
            clearInterval(finalbattle.intervals.firefoehealth);
            finalbattle.intervals.spybothealth=setInterval(() => {
                finalbattle.title.innerHTML = `SpyBot<br>HP ${finalbattle.enemies.spyBot.HP}/${finalbattle.enemies.spyBot.MaxHP}`;
                // if half hp, change color to yellow
                if (finalbattle.enemies.spyBot.HP <= 32) {
                    finalbattle.title.style.color = 'orange';
                }
                // if low hp, change color to red
                if (finalbattle.enemies.spyBot.HP <= 10) {
                    finalbattle.title.style.color = 'red';
                }
                if (finalbattle.enemies.spyBot.HP <= 0) {
                    playDeadSound();
                    finalbattle.title.innerHTML = 'SpyBot LV2<br>HP 0/64';
                    finalbattle.title.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        finalbattle.title.style.animation = 'none';
                    }, 500);
                }
            }, 100);

            player.sprite = finalbattle.player.querySelector('.sprite')

            playerAttackAnimation = (instantkill) => {
                player.sprite.classList.add('attack');
                player.sprite.style.backgroundImage = 'url(./attack.png)';
                // css animation
                player.sprite.style.animation = 'playerAttack .75s';
                setTimeout(() => {
                    enemy.sprite.style.backgroundImage = 'url(./spybotHit1.png)';
                    enemy.sprite.style.animation = 'hit 0.5s';
                    playAttackSound();
                }, 500);
                setTimeout(() => {
                    enemy.sprite.style.backgroundImage = 'url(./spybotHit2.png)';
                    playFirefoeSound();
                    let damage = instantkill ? 99 : randomInt(10, 15);
                    finalbattle.enemies.spyBot.HP -= damage;
                    text.innerHTML += instantkill ? `<p>You dealt <span style="color: red">${damage}</span> damage!</p>` : `<p>You dealt ${damage} damage!</p>`;
                }, 750);
                setTimeout(() => {
                    player.sprite.style.backgroundImage = 'url(./idle.png)';
                    player.sprite.style.animation = 'idle 0.5s infinite';
                    enemy.sprite.style.backgroundImage = 'url(./spybot.png)';
                    enemy.sprite.style.animation = 'idle 1s infinite';
                }
                , 1000);
                player.sprite.classList.remove('attack');
            }
            
            enemyAttackAnimation = () => {
                let damage = randomInt(1, 25);
                // text for enemy attack
                text.innerHTML = `<p>SpyBot used Attack!</p>`
                // enemy attack sprite
                enemy.sprite.style.backgroundImage = 'url(./spybotAttack.png)';
                // css animation
                enemy.sprite.style.animation = 'enemyAttack .75s';
                setTimeout(() => {
                    playAttackSound();
                }, 250);
                setTimeout(() => {
                    player.sprite.style.backgroundImage = 'url(./hit.png)';
                    player.sprite.style.animation = 'hit 0.4s';
                    playHitSound();
                    player.HP -= damage;
                    text.innerHTML += `<p>SpyBot dealt ${damage} damage!</p>`;
                }, 500);
                // has player secured firewall?
                if (player.vulnerableTo.firewall) {
                    // css animation
                    setTimeout(() => {
                        enemy.sprite.style.animation = 'idle 1s infinite';
                        player.sprite.style.animation = 'idle 0.5s infinite';
                    }, 1000);
                    setTimeout(() => {
                        enemy.sprite.style.animation = 'enemyAttack .75s';
                    }, 1500);
                    setTimeout(() => {
                        playAttackSound();
                    }, 1750);
                    setTimeout(() => {
                        player.sprite.style.backgroundImage = 'url(./hit.png)';
                        player.sprite.style.animation = 'hit 0.5s';
                        playHitSound();
                        player.HP -= damage;
                        text.innerHTML = `
                            <p>Data leak!</p>
                            <p>SpyBot dealt <span style="color: red">${randomInt(5, 20)*2}</span> additional damage!</p>
                        `;
                    }, 2000);
                    setTimeout(() => {
                        enemy.sprite.style.backgroundImage = 'url(./spybot.png)';
                        enemy.sprite.style.animation = 'idle 1s infinite';
                        player.sprite.style.backgroundImage = 'url(./idle.png)';
                        player.sprite.style.animation = 'idle 0.5s infinite';

                        text.innerHTML = `
                        <p>Your network is overwhelmed!</p>
                        <p>All the malware is attacking at once!</p>
                    `;
                        // check if player is dead
                        if (player.HP > 0) {
                            loadDefaultButtons();
                        }
                    }, 3000);
                } else {
                    setTimeout(() => {
                        enemy.sprite.style.animation = 'idle 1s infinite';
                        player.sprite.style.backgroundImage = 'url(./idle.png)';
                        player.sprite.style.animation = 'idle 0.5s infinite';
                    }, 1000);
                    setTimeout(() => {
                        text.innerHTML = `
                        <p>Your network is overwhelmed!</p>
                        <p>All the malware is attacking at once!</p>
                    `;
                        // check if player is dead
                        if (player.HP > 0) {
                            loadDefaultButtons();
                        }
                    }, 2000);
                }
            }

            enemyAttackAnimation();
        }
        else if (finalbattle.enemies.intrusionImp.HP > 0) {

            purgeMalware = () => {
                // is player vulnerable to malware?
                if (player.vulnerableTo.malware) {
                    // is enemy health less than 50%?
                    if (enemy.HP <= 32) {
                        // text for player attack
                        // text for player attack
                        text.innerHTML = `<p>You used Purge Malware!</p>
                    <p>You gained resistance to IntrusionImp's attacks!</p>`;
                        enemy.vulnerableTo.purge = true;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    } else {
                        text.innerHTML = `<p>IntrusionImp was too strong to be affected by Purge Malware!</p>`;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    }
                } else {
                    text.innerHTML = `<p>You have already purged Malware!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            SecureFirewall = () => {
                if (player.vulnerableTo.firewall) {
                    // text for player attack
                    text.innerHTML = `<p>You used Secure Firewall!</p>
                    <p>You gained resistance to IntrusionImp's attacks!</p>`;
                    player.vulnerableTo.firewall = false;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                } else {
                    text.innerHTML = `<p>Your firewall was already secure!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            patch = () => {
                // is player vulnerable to patch?
                if (player.vulnerableTo.patch) {
                    // text for player attack
                    text.innerHTML = `<p>You used Patch!</p>
                    <p>You gained resistance to IntrusionImp's attacks!</p>`;
                    player.vulnerableTo.patch = false;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                } else {
                    text.innerHTML = `<p>You have already patched your system!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            isolateMalware = () => {
                // is player vulnerable to malware?
                if (player.vulnerableTo.malware) {
                    // is enemy health less than 50%?
                    if (enemy.HP <= 32) {
                        // text for player attack
                        // text for player attack
                        text.innerHTML = `<p>You used Isolate Malware!</p>
                    <p>You gained resistance to IntrusionImp's attacks!</p>`;
                        enemy.vulnerableTo.purge = true;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    } else {
                        text.innerHTML = `<p>IntrusionImp was too strong to be affected by Isolate Malware!</p>`;
                        document.querySelector('.game-controls').innerHTML = '';
                        setTimeout(() => {
                            enemyTurn();
                        }, 2000);
                    }
                } else {
                    text.innerHTML = `<p>You have already isolated Malware!</p>`;
                    document.querySelector('.game-controls').innerHTML = '';
                    setTimeout(() => {
                        enemyTurn();
                    }, 2000);
                }
            }

            // switch enemy sprite and update text
            enemy.sprite.style.backgroundImage = 'url(./Imp.png)';
            text.innerHTML = `
                <p>Your network is overwhelmed!</p>
                <p>All the malware is attacking at once!</p>
            `;
            finalbattle.title.innerHTML = 'IntrusionImp LV2<br>HP 64/64';
            finalbattle.title.style.color = 'black';
            // change enemy sprite
            enemy.sprite = finalbattle.enemy.querySelector('.sprite')
            enemy.sprite.style.backgroundImage = 'url(./Imp.png)';
            
            // intervals
            clearInterval(finalbattle.intervals.spybothealth);
            finalbattle.intervals.intrusionImphealth=setInterval(() => {
                finalbattle.title.innerHTML = `IntrusionImp LV2<br>HP ${finalbattle.enemies.intrusionImp.HP}/${finalbattle.enemies.intrusionImp.MaxHP}`;
                // if half hp, change color to yellow
                if (finalbattle.enemies.intrusionImp.HP <= 32) {
                    finalbattle.title.style.color = 'orange';
                }
                // if low hp, change color to red
                if (finalbattle.enemies.intrusionImp.HP <= 10) {
                    finalbattle.title.style.color = 'red';
                }
                if (finalbattle.enemies.intrusionImp.HP <= 0) {
                    clearInterval(finalbattle.intervals.intrusionImphealth);
                    playDeadSound();
                    finalbattle.title.innerHTML = 'IntrusionImp LV2<br>HP 0/64';
                    finalbattle.title.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        finalbattle.title.style.animation = 'none';
                    }, 500);
                    clearInterval(game.scenes.finalbattle.intervals[0]);
                    setTimeout(() => {
                        game.loadScene('playerVictory');
                        game.scenes.menu.beaten.intrusionImp = true;
                    }, 2000);
                }
            }, 100);

            player.sprite = finalbattle.player.querySelector('.sprite')

            playerAttackAnimation = (instantkill) => {
                player.sprite.classList.add('attack');
                player.sprite.style.backgroundImage = 'url(./attack.png)';
                // css animation
                player.sprite.style.animation = 'playerAttack .75s';
                setTimeout(() => {
                    enemy.sprite.style.backgroundImage = 'url(./ImpHit1.png)';
                    enemy.sprite.style.animation = 'hit 0.5s';
                    playAttackSound();
                }, 500);
                setTimeout(() => {
                    enemy.sprite.style.backgroundImage = 'url(./ImpHit2.png)';
                    playFirefoeSound();
                    let damage = instantkill ? 99 : randomInt(10, 15);
                    finalbattle.enemies.intrusionImp.HP -= damage;
                    text.innerHTML += instantkill ? `<p>You dealt <span style="color: red">${damage}</span> damage!</p>` : `<p>You dealt ${damage} damage!</p>`;
                }, 750);
                setTimeout(() => {
                    player.sprite.style.backgroundImage = 'url(./idle.png)';
                    player.sprite.style.animation = 'idle 0.5s infinite';
                    enemy.sprite.style.backgroundImage = 'url(./Imp.png)';
                    enemy.sprite.style.animation = 'idle 1s infinite';
                }, 1000);
                player.sprite.classList.remove('attack');
            }

            enemyAttackAnimation = () => {
                let damage = randomInt(1, 15);
                // text for enemy attack
                text.innerHTML = `<p>IntrusionImp used Attack!</p>`
                // css animation
                enemy.sprite.style.animation = 'enemyAttack .75s';
                setTimeout(() => {
                    playAttackSound();
                }, 250);
                setTimeout(() => {
                    player.sprite.style.backgroundImage = 'url(./hit.png)';
                    player.sprite.style.animation = 'hit 0.4s';
                    playHitSound();
                    player.HP -= damage;
                    text.innerHTML += `<p>IntrusionImp dealt ${damage} damage!</p>`;
                }, 500);
                // has player secured firewall?
                if (player.vulnerableTo.firewall) {
                    // css animation
                    setTimeout(() => {
                        enemy.sprite.style.animation = 'idle 1s infinite';
                        player.sprite.style.animation = 'idle 0.5s infinite';
                    }, 1000);
                    setTimeout(() => {
                        enemy.sprite.style.animation = 'enemyAttack .75s';
                    }, 1500);
                    setTimeout(() => {
                        playAttackSound();
                    }, 1750);
                    setTimeout(() => {
                        player.sprite.style.backgroundImage = 'url(./hit.png)';
                        player.sprite.style.animation = 'hit 0.5s';
                        playHitSound();
                        player.HP -= damage;
                        text.innerHTML = `
                            <p>Data leak!</p>
                            <p>IntrusionImp dealt <span style="color: red">${randomInt(5, 20)*2}</span> additional damage!</p>
                        `;
                    }, 2000);
                    setTimeout(() => {
                        enemy.sprite.style.animation = 'idle 1s infinite';
                        player.sprite.style.backgroundImage = 'url(./idle.png)';
                        player.sprite.style.animation = 'idle 0.5s infinite';

                        text.innerHTML = `
                        <p>An IntrusionImp has been detected!</p>
                        <p>Defend your network to prevent data theft!</p>
                    `;
                        // check if player is dead
                        if (player.HP > 0) {
                            loadDefaultButtons();
                        }
                    }, 3000);
                } else {
                    setTimeout(() => {
                        enemy.sprite.style.animation = 'idle 1s infinite';
                        player.sprite.style.backgroundImage = 'url(./idle.png)';
                        player.sprite.style.animation = 'idle 0.5s infinite';

                        text.innerHTML = `
                        <p>An IntrusionImp has been detected!</p>
                        <p>Defend your network to prevent data theft!</p>
                    `;
                        // check if player is dead
                        if (player.HP > 0) {
                            loadDefaultButtons();
                        }
                    }, 2000);
                }
            }

            enemyAttackAnimation();

        }
                    
    }

    enemyAttackAnimation = () => {
        let damage = randomInt(1, 25);
        // text for enemy attack
        text.innerHTML = `<p>Firefoe used Attack!</p>`
        // css animation
        enemy.sprite.style.animation = 'enemyAttack .75s';
        setTimeout(() => {
            playAttackSound();
        }, 250);
        setTimeout(() => {
            player.sprite.style.backgroundImage = 'url(./hit.png)';
            player.sprite.style.animation = 'hit 0.4s';
            playHitSound();
            player.HP -= damage;
            text.innerHTML += `<p>Firefoe dealt ${damage} damage!</p>`;
        }, 500);
        // has player secured firewall?
        if (player.vulnerableTo.firewall) {
            // css animation
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.animation = 'idle 0.5s infinite';
            }, 1000);
            setTimeout(() => {
                enemy.sprite.style.animation = 'enemyAttack .75s';
            }, 1500);
            setTimeout(() => {
                playAttackSound();
            }, 1750);
            setTimeout(() => {
                player.sprite.style.backgroundImage = 'url(./hit.png)';
                player.sprite.style.animation = 'hit 0.5s';
                playHitSound();
                player.HP -= damage;
                text.innerHTML = `
                    <p>Data leak!</p>
                    <p>Firefoe dealt <span style="color: red">${randomInt(5, 20)*2}</span> additional damage!</p>
                `;
            }, 2000);
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.backgroundImage = 'url(./idle.png)';
                player.sprite.style.animation = 'idle 0.5s infinite';

                text.innerHTML = `
                <p>Your network is overwhelmed!</p>
                <p>All the malware is attacking at once!</p>
            `;
                // check if player is dead
                if (player.HP > 0) {
                    loadDefaultButtons();
                }
            }, 3000);
        } else {
            setTimeout(() => {
                enemy.sprite.style.animation = 'idle 1s infinite';
                player.sprite.style.backgroundImage = 'url(./idle.png)';
                player.sprite.style.animation = 'idle 0.5s infinite';
            }, 1000);
            setTimeout(() => {
                text.innerHTML = `
                <p>Your network is overwhelmed!</p>
                <p>All the malware is attacking at once!</p>
            `;
                // check if player is dead
                if (player.HP > 0) {
                    loadDefaultButtons();
                }
            }, 2000);
        }
    }
});