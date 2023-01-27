document.querySelector("html").style.Height="100vp";
let score = 0;
const scoreboard = document.createElement('h1');

scoreboard.innerHTML=scoreboard.innerHTML = `<h1>Score: ${score}</h1>`;
document.body.appendChild(scoreboard);




function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const init = () => {
    //get the avatar
    const avatar = document.querySelector("#avatar");
    //get the coin
    const coin = document.querySelector("#coin");

    const stepSound = new Audio("./audio/smw_footstep.wav");
    const scoreSound = new Audio("./audio/smw_coin.wav");  



    moveCoin();
    window.addEventListener('keydown', function(e){
        // if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        //     moveVertical(avatar, 50);
        // }
        switch (e.key) {
            case 'ArrowUp':
                stepSound.play();
                moveVertical(avatar,-50)
                break;
            case 'ArrowDown':
                stepSound.play();
                moveVertical(avatar,50)
                break;
            case 'ArrowLeft':
                stepSound.play();
                moveHorizontal(avatar,-50)
                break;
            case 'ArrowRight':
                stepSound.play();
                moveHorizontal(avatar,50)
                break;
        
            default:
                break;
        }

        if(isTouching(avatar,coin)) {
            moveCoin();
            score++;
            scoreSound.play();
    }
            scoreboard.innerHTML = `<h1>Score: ${score}</h1>`;
            
})
};

const moveVertical = (element, amount) => {
    const currTop = extractPos(element.style.top);
    element.style.top = `${currTop + amount}px`;
}
const moveHorizontal = (element, amount) => {
    const currLeft = extractPos(element.style.left);
    element.style.left = `${currLeft + amount}px`;
}

const extractPos = (position) => {
    if(!position) return 100;
    return parseInt(position.slice(0, -2))
}

const moveCoin = () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    coin.style.top = `${x}px`;
    coin.style.left = `${y}px`;
}

init();