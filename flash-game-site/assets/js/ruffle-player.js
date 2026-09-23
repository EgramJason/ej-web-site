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
         * 実際にRuffleを置ける横幅
         */
        const availableWidth =
            wrapper.clientWidth;


        /*
         * 画面の高さ
         */
        const viewport =
            window.visualViewport;

        const screenHeight =
            viewport
                ? viewport.height
                : document.documentElement.clientHeight;


        /*
         * 縦方向の余裕
         *
         * wrapperの位置から画面下まで
         */
        const wrapperRect =
            wrapper.getBoundingClientRect();

        const availableHeight =
            screenHeight -
            wrapperRect.top -
            10;


        /*
         * 横幅から計算した高さ
         */
        const widthBasedHeight =
            availableWidth *
            gameHeight /
            gameWidth;


        /*
         * 高さから計算した横幅
         */
        const heightBasedWidth =
            availableHeight *
            gameWidth /
            gameHeight;


        /*
         * 画面内に収まる方を使用
         */
        let width;

        if (
            widthBasedHeight <= availableHeight &&
            availableWidth > 0
        ) {

            width = availableWidth;

        } else if (
            heightBasedWidth > 0
        ) {

            width = heightBasedWidth;

        } else {

            /*
             * 高さが取得できない場合は
             * 横幅をそのまま使用
             */
            width = availableWidth;
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
     * 画面サイズ変更
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