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

    player.style.width = gameWidth + "px";
    player.style.height = gameHeight + "px";
    player.style.display = "block";
    player.style.transformOrigin = "top left";

    container.appendChild(player);

    function resizeGame() {

        const screenWidth = window.innerWidth;

        if (screenWidth < gameWidth) {

            const scale =
                screenWidth / gameWidth;

            player.style.transform =
                "scale(" + scale + ")";

            container.style.width =
                screenWidth + "px";

            container.style.height =
                (gameHeight * scale) + "px";

        } else {

            player.style.transform =
                "scale(1)";

            container.style.width =
                gameWidth + "px";

            container.style.height =
                gameHeight + "px";
        }
    }

    window.addEventListener("resize", resizeGame);

    player.ruffle().load("cr_miyoco_dw_8.swf");

    resizeGame();

});