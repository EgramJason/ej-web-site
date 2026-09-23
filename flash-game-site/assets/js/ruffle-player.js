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

    player.config = {
        scale: "showAll",
        forceScale: true
    };

    player.style.width = "100%";
    player.style.height = "auto";
    player.style.aspectRatio = "4 / 3";
    player.style.display = "block";

    container.appendChild(player);

    player.ruffle().load("cr_miyoco_dw_8.swf");

});