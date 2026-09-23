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

    container.appendChild(player);

    function resizeGame() {

        /*
         * 現在のブラウザ表示領域
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
         * ゲームを画面端ギリギリにしないための余白
         */
        const margin = 10;


        /*
         * 横幅として使える最大値
         */
        const maxWidth =
            screenWidth - (margin * 2);


        /*
         * 高さとして使える最大値
         */
        const maxHeight =
            screenHeight - (margin * 2);


        /*
         * 800×600 = 4:3
         *
         * 横幅基準で収めた場合
         */
        const widthBasedHeight =
            maxWidth * gameHeight / gameWidth;


        /*
         * 高さ基準で収めた場合
         */
        const heightBasedWidth =
            maxHeight * gameWidth / gameHeight;


        /*
         * 横幅・高さの両方に収まる方を採用
         */
        let width;

        if (widthBasedHeight <= maxHeight) {

            /*
             * 横幅に合わせても高さに収まる
             */
            width = maxWidth;

        } else {

            /*
             * 横幅に合わせると高さを超えるので
             * 高さに合わせる
             */
            width = heightBasedWidth;
        }


        /*
         * PCでは最大800px
         */
        width =
            Math.min(width, gameWidth);


        const height =
            width * gameHeight / gameWidth;


        const finalWidth =
            Math.floor(width);

        const finalHeight =
            Math.floor(height);


        /*
         * Ruffle本体のサイズ
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
         * 親コンテナのサイズ
         */
        container.style.width =
            finalWidth + "px";

        container.style.height =
            finalHeight + "px";


        /*
         * 念のためRuffleの属性にも設定
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
     * 初回サイズ設定
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
     * iPhoneの縦横回転
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
     * Safariの表示領域変更
     */
    if (window.visualViewport) {

        window.visualViewport.addEventListener(
            "resize",
            resizeGame
        );

    }

});