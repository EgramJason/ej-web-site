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
        const screenHeight = window.innerHeight;

        /*
         * 横方向・縦方向の両方に収まる縮小率を計算
         * さらに5%ほど余裕を持たせる
         */
        const widthScale =
            screenWidth / gameWidth;

        const heightScale =
            screenHeight / gameHeight;

        const scale =
            Math.min(1, widthScale, heightScale) * 0.95;

        player.style.transform =
            "scale(" + scale + ")";

        container.style.width =
            (gameWidth * scale) + "px";

        container.style.height =
            (gameHeight * scale) + "px";
    }

    window.addEventListener("resize", resizeGame);

    player.ruffle().load("cr_miyoco_dw_8.swf");

    resizeGame();

});