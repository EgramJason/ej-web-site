document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById("ruffle-container");

    const wrapper =
        document.getElementById("ruffle-wrapper");

    if (!container || !wrapper) {
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

    container.appendChild(player);

    function resizeGame() {

        const availableWidth = wrapper.clientWidth;

        const scale =
            Math.min(1, availableWidth / gameWidth);

        player.style.transform =
            "scale(" + scale + ")";

        player.style.transformOrigin =
            "top left";

        wrapper.style.height =
            (gameHeight * scale) + "px";
    }

    window.addEventListener("resize", resizeGame);

    player.ruffle().load("cr_miyoco_dw_8.swf");

    resizeGame();

});