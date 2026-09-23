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
        const screenHeight = window.innerHeight;

        /*
         * ゲームの上にあるページ部分を考慮する
         */
        const rect =
            container.getBoundingClientRect();

        const availableWidth =
            screenWidth - 40;

        const availableHeight =
            screenHeight - rect.top - 20;

        /*
         * 800×600の4:3を維持したまま、
         * 横幅・縦幅の両方に収まるサイズを計算
         */
        const scale =
            Math.min(
                1,
                availableWidth / gameWidth,
                availableHeight / gameHeight
            );

        const width =
            Math.floor(gameWidth * scale);

        const height =
            Math.floor(gameHeight * scale);

        player.style.width =
            width + "px";

        player.style.height =
            height + "px";

        container.style.width =
            width + "px";

        container.style.height =
            height + "px";
    }

    window.addEventListener(
        "resize",
        resizeGame
    );

    window.addEventListener(
        "orientationchange",
        () => {
            setTimeout(resizeGame, 100);
        }
    );

    player.ruffle().load(
        "cr_miyoco_dw_8.swf"
    );

    resizeGame();

});