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
         * 横向き・縦向きで使えるサイズを計算
         */
        const availableWidth = screenWidth - 20;
        const availableHeight = screenHeight - 20;

        /*
         * 横幅基準と高さ基準の両方から、
         * 800×600の比率を維持できるサイズを決める
         */
        const widthByWidth = availableWidth;
        const widthByHeight =
            availableHeight * gameWidth / gameHeight;

        const width =
            Math.min(
                gameWidth,
                widthByWidth,
                widthByHeight
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