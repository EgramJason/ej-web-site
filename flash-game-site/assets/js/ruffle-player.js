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
    player.style.transformOrigin = "top left";

    container.appendChild(player);

    function resizeGame() {

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        /*
         * ページ上部のヘッダーやタイトルなどを考慮して、
         * ゲームに使える高さを計算
         */
        const availableHeight = screenHeight - 180;

        const widthScale =
            screenWidth / gameWidth;

        const heightScale =
            availableHeight / gameHeight;

        /*
         * 画面に収まる範囲で縮小
         */
        const scale =
            Math.min(1, widthScale, heightScale) * 0.9;

        const displayWidth =
            gameWidth * scale;

        const displayHeight =
            gameHeight * scale;

        /*
         * Ruffle本体そのもののサイズを変更
         */
        player.style.width =
            displayWidth + "px";

        player.style.height =
            displayHeight + "px";

        container.style.width =
            displayWidth + "px";

        container.style.height =
            displayHeight + "px";
    }

    window.addEventListener("resize", resizeGame);

    player.ruffle().load("cr_miyoco_dw_8.swf");

    resizeGame();

});