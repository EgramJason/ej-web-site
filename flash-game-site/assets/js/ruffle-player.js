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


    /*
     * SWF本来のサイズ
     */
    const gameWidth = 800;
    const gameHeight = 600;


    container.appendChild(player);


    function resizeGame() {

        /*
         * Safari / iPhoneでは
         * visualViewportを優先
         */
        const viewport =
            window.visualViewport;

        const screenWidth =
            viewport
                ? viewport.width
                : document.documentElement.clientWidth;

        const screenHeight =
            viewport
                ? viewport.height
                : document.documentElement.clientHeight;


        /*
         * 横向き判定
         */
        const isLandscape =
            screenWidth > screenHeight;


        /*
         * 画面端との余白
         *
         * 横向きは5px
         * 縦向きは10px
         */
        const margin =
            isLandscape ? 5 : 10;


        /*
         * 使用可能な画面サイズ
         */
        const maxWidth =
            screenWidth - margin * 2;

        const maxHeight =
            screenHeight - margin * 2;


        /*
         * 800×600 = 4:3
         *
         * 横幅を最大まで使った場合の高さ
         */
        const widthBasedHeight =
            maxWidth *
            gameHeight /
            gameWidth;


        /*
         * 高さを最大まで使った場合の幅
         */
        const heightBasedWidth =
            maxHeight *
            gameWidth /
            gameHeight;


        let width;


        /*
         * 横幅に合わせても
         * 高さに収まる場合
         */
        if (widthBasedHeight <= maxHeight) {

            width = maxWidth;

        } else {

            /*
             * 高さに合わせる
             */
            width = heightBasedWidth;
        }


        /*
         * PCでは800pxを上限
         */
        width =
            Math.min(
                width,
                gameWidth
            );


        /*
         * 4:3を維持
         */
        const height =
            width *
            gameHeight /
            gameWidth;


        const finalWidth =
            Math.floor(width);

        const finalHeight =
            Math.floor(height);


        /*
         * Ruffle本体
         */
        player.style.setProperty(
            "width",
            finalWidth + "px",
            "important"
        );

        player.style.setProperty(
            "height",
            finalHeight + "px",
            "important"
        );


        /*
         * コンテナ
         */
        container.style.width =
            finalWidth + "px";

        container.style.height =
            finalHeight + "px";


        /*
         * Ruffleの属性
         */
        player.setAttribute(
            "width",
            finalWidth
        );

        player.setAttribute(
            "height",
            finalHeight
        );
    }


    /*
     * SWF読み込み
     */
    player.ruffle().load(
        "cr_miyoco_dw_8.swf"
    );


    /*
     * 初回サイズ
     */
    resizeGame();


    /*
     * ブラウザサイズ変更
     */
    window.addEventListener(
        "resize",
        resizeGame
    );


    /*
     * iPhone回転
     */
    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                resizeGame,
                300
            );

        }
    );


    /*
     * Safari visualViewport変更
     */
    if (window.visualViewport) {

        window.visualViewport.addEventListener(
            "resize",
            resizeGame
        );
    }

});