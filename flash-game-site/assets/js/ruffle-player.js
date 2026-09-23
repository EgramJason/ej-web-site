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
     * 800 × 600 = 4:3
     */
    const gameWidth = 800;
    const gameHeight = 600;


    container.appendChild(player);


    function resizeGame() {

        /*
         * 実際にRuffleを置ける
         * wrapperの横幅を使用する
         *
         * 画面全体の幅ではなく、
         * main・sectionの余白を除いた
         * 実際の領域を基準にする。
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
         * wrapperの画面上での位置を取得
         *
         * 上側にあるコンテンツを考慮して、
         * Ruffleが画面下にはみ出さないようにする。
         */
        const wrapperRect =
            wrapper.getBoundingClientRect();

        const availableHeight =
            screenHeight -
            wrapperRect.top -
            10;


        /*
         * 横幅基準の高さ
         */
        const widthBasedHeight =
            availableWidth *
            gameHeight /
            gameWidth;


        /*
         * 高さ基準の横幅
         */
        const heightBasedWidth =
            availableHeight *
            gameWidth /
            gameHeight;


        /*
         * 横幅・高さの両方に収まる
         * 最大サイズを選択
         */
        let width;

        if (widthBasedHeight <= availableHeight) {

            width = availableWidth;

        } else {

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
         * 念のため0未満にならないようにする
         */
        width =
            Math.max(
                width,
                1
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
         * コンテナのサイズ
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
     * 初回サイズ設定
     */
    resizeGame();


    /*
     * ウィンドウサイズ変更
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
     * Safariの表示領域変更
     */
    if (window.visualViewport) {

        window.visualViewport.addEventListener(
            "resize",
            resizeGame
        );
    }

});