document.addEventListener("DOMContentLoaded", async () => {

    /*
     * Ruffleを表示するコンテナ
     */
    const container =
        document.getElementById("ruffle-container");


    /*
     * Ruffle全体を囲むコンテナ
     */
    const wrapper =
        document.getElementById("ruffle-wrapper");


    /*
     * HTML側から読み込むSWFのパスを取得
     *
     * games/index.html
     *     → ./test/cr_miyoco_dw_8.swf
     *
     * games/test/index.html
     *     → ./cr_miyoco_dw_8.swf
     *
     * のようにページごとに指定できます。
     */
    const swfPath =
        container?.dataset.swf;


    /*
     * 必要な要素がない場合は終了
     */
    if (!container || !wrapper || !swfPath) {
        console.error(
            "Ruffle: ruffle-container または data-swf が見つかりません。"
        );
        return;
    }


    /*
     * Ruffleの読み込みを少し待つ
     *
     * GitHub Pagesなどでruffle.jsの読み込みが
     * 少し遅れた場合にも対応します。
     */
    let ruffle = null;

    for (let i = 0; i < 100; i++) {

        if (
            window.RufflePlayer &&
            typeof window.RufflePlayer.newest === "function"
        ) {
            ruffle =
                window.RufflePlayer.newest();

            break;
        }

        await new Promise((resolve) => {
            setTimeout(resolve, 50);
        });
    }


    /*
     * Ruffleそのものが読み込めなかった場合
     */
    if (!ruffle) {

        showError(
            "Ruffleを読み込めませんでした。"
            + "ruffle/ruffle.js が正しく配置されているか確認してください。"
        );

        return;
    }


    /*
     * Ruffleプレイヤーを作成
     */
    const player =
        ruffle.createPlayer();


    /*
     * ゲーム本来のサイズ
     *
     * 800 × 600
     */
    const gameWidth = 800;
    const gameHeight = 600;


    /*
     * 画面端との余白
     */
    const margin = 10;


    /*
     * まずプレイヤーをコンテナへ追加
     */
    container.replaceChildren(player);


    /*
     * ゲームサイズを調整
     */
    function resizeGame() {

        const viewport =
            window.visualViewport;


        /*
         * 現在の画面サイズ
         */
        const screenWidth =
            viewport
                ? viewport.width
                : document.documentElement.clientWidth;

        const screenHeight =
            viewport
                ? viewport.height
                : document.documentElement.clientHeight;


        /*
         * 使用可能なサイズ
         */
        const maxWidth =
            Math.max(
                1,
                screenWidth - margin * 2
            );

        const maxHeight =
            Math.max(
                1,
                screenHeight - margin * 2
            );


        /*
         * 800×600 の比率を維持して、
         * 横幅・高さの両方に収まるサイズを計算
         */
        let width =
            Math.min(
                gameWidth,
                maxWidth,
                maxHeight * gameWidth / gameHeight
            );


        /*
         * 小数点以下を切り捨て
         */
        width =
            Math.max(
                1,
                Math.floor(width)
            );


        /*
         * 4:3比率で高さを計算
         */
        const height =
            Math.max(
                1,
                Math.floor(
                    width * gameHeight / gameWidth
                )
            );


        /*
         * Ruffleプレイヤーのサイズを指定
         */
        player.style.setProperty(
            "width",
            `${width}px`,
            "important"
        );

        player.style.setProperty(
            "height",
            `${height}px`,
            "important"
        );


        /*
         * コンテナのサイズも合わせる
         */
        container.style.width =
            `${width}px`;

        container.style.height =
            `${height}px`;


        /*
         * Ruffle側の属性にもサイズを設定
         */
        player.setAttribute(
            "width",
            String(width)
        );

        player.setAttribute(
            "height",
            String(height)
        );
    }


    /*
     * 最初のサイズを設定
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
     * スマートフォンの縦横回転
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
     * Safariなどの表示領域変更
     */
    if (window.visualViewport) {

        window.visualViewport.addEventListener(
            "resize",
            resizeGame
        );

    }


    /*
     * ページのURLを基準にSWFの絶対URLを作る
     *
     * /games/
     *     → /games/test/cr_miyoco_dw_8.swf
     *
     * /games/test/
     *     → /games/test/cr_miyoco_dw_8.swf
     */
    const swfUrl =
        new URL(
            swfPath,
            document.baseURI
        ).href;


    /*
     * SWFを読み込む
     */
    try {

        await player.ruffle().load(
            swfUrl
        );

    } catch (error) {

        console.error(
            "Ruffle SWF load failed:",
            error
        );

        showError(
            "ゲームを読み込めませんでした。"
            + "\n"
            + swfUrl
        );
    }


    /*
     * エラー表示
     */
    function showError(message) {

        const error =
            document.createElement("p");

        error.textContent =
            message;

        error.style.marginTop =
            "15px";

        error.style.color =
            "#b00020";

        error.style.whiteSpace =
            "pre-wrap";

        container.replaceChildren(
            error
        );
    }

});