document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("ruffle-container");

    if (!container) {
        return;
    }

    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();

    const gameWidth = 800;
    const gameHeight = 600;

    container.appendChild(player);

    function resizeGame() {

        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        // HTMLの余白やsectionの左右paddingを考慮
        const maxWidth = vw - 40;
        const maxHeight = vh - 40;

        // 横幅・高さの両方に収まるサイズ
        let scale = Math.min(
            maxWidth / gameWidth,
            maxHeight / gameHeight,
            1
        );

        // iPhone縦向きでも小さくなりすぎないようにする
        if (scale < 0.1) {
            scale = 0.1;
        }

        const width = Math.floor(gameWidth * scale);
        const height = Math.floor(gameHeight * scale);

        // container
        container.style.width = width + "px";
        container.style.height = height + "px";

        // Ruffle本体
        player.style.width = width + "px";
        player.style.height = height + "px";
        player.style.maxWidth = "none";
        player.style.maxHeight = "none";
        player.style.display = "block";

        console.log(
            "viewport:",
            vw,
            "x",
            vh,
            "game:",
            width,
            "x",
            height
        );
    }

    player.ruffle().load("cr_miyoco_dw_8.swf");

    // 最初のサイズ設定
    resizeGame();

    // 画面サイズ変更
    window.addEventListener("resize", resizeGame);

    window.addEventListener("orientationchange", () => {
        setTimeout(resizeGame, 300);
    });

});