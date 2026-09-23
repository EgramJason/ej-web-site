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

    player.style.width = "100%";
    player.style.maxWidth = "800px";
    player.style.aspectRatio = "4 / 3";
    player.style.height = "auto";
    player.style.display = "block";
    player.style.margin = "0 auto";

    container.appendChild(player);

    player.ruffle().load("cr_miyoco_dw_8.swf");
});