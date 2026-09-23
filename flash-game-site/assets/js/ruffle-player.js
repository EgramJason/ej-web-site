document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById("ruffle-container");

    if (!container) {
        return;
    }

    const ruffle =
        window.RufflePlayer.newest();

    const player =
        ruffle.createPlayer();

    const gameWidth = 800;
    const gameHeight = 600;

    player.style.display = "block";

    container.appendChild(player);

    function resizeGame() {

        const screenWidth = window.innerWidth;

        const availableWidth =
            screenWidth - 40;

        const width =
            Math.min(
                gameWidth,
                availableWidth
            );

        const height =
            width * gameHeight / gameWidth;

        player.style.width =
            Math.floor(width) + "px";

        player.style.height =
            Math.floor(height) + "px";

        container.style.width =
            Math.floor(width) + "px";

        container.style.height =
            Math.floor(height) + "px";
    }

    window.addEventListener(
        "resize",
        resizeGame
    );

    window.addEventListener(
        "orientationchange",
        () => {
            setTimeout(resizeGame, 200);
        }
    );

    player.ruffle().load(
        "cr_miyoco_dw_8.swf"
    );

    resizeGame();

});