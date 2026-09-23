document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById("ruffle-container");

    const wrapper =
        document.getElementById("ruffle-wrapper");

    if (!container || !wrapper) {
        return;
    }


    /*
     * Ruffleを作成
     */
    const ruffle =
        window.RufflePlayer.newest();

    const player =
        ruffle.createPlayer();


    /*
     * SWF本来のサイズ
     */
    const gameWidth = 800;
    const gameHeight = 600;


    /*
     * Ruffleをcontainerに追加
     */
    container.appendChild(player);


    function resizeGame() {

        /*
         * SafariではvisualViewportのほうが
         * 実際に見えている領域を取得しやすい
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
         * 横向きかどうか
         */
        const isLandscape =
            screenWidth > screenHeight;


        /*
         * 画面端との余白
         *
         * 縦向き：10px
         * 横向き：5px
         *
         * 横向きは少しだけ大きくする
         */
        const margin =
            isLandscape ? 5 : 10;


        /*
         * ゲームに使用できる最大幅
         */
        const maxWidth =
            screenWidth - (margin * 2);


        /*
         * ゲームに使用できる最大高さ
         */
        const maxHeight =
            screenHeight - (margin * 2);


        /*
         * 800×600 = 4:3
         *
         * 横幅いっぱいにした場合の高さ
         */
        const widthBasedHeight =
            maxWidth *
            gameHeight /
            gameWidth;


        /*
         * 高さいっぱいにした場合の幅
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

        }

        /*
         * 横幅に合わせると
         * 高さからはみ出す場合
         */
        else {

            width = heightBasedWidth;

        }


        /*
         * PCなどでは800pxを上限にする
         */
        width =
            Math.min(
                width,
                gameWidth
            );


        /*
         * 4:3を維持して高さを計算
         */
        const height =
            width *
            gameHeight /
            gameWidth;


        /*
         * 小数点以下を切り捨て
         */
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
         * Ruffleの属性にもサイズを指定
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
     * SWFを読み込む
     */
    player.ruffle().load(
        "cr_miyoco_dw_8.swf"
    );


    /*
     * 初回サイズ設定
     */
    resizeGame();


    /*
     * ブラウザのサイズ変更
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
     * SafariのvisualViewport変更
     */
    if (window.visualViewport) {

        window.visualViewport.addEventListener(
            "resize",
            resizeGame
        );

    }

});