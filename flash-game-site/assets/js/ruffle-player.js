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

    player.style.width = "800px";
    player.style.height = "600px";
    player.style.display = "block";

    container.appendChild(player);

    player.ruffle().load("cr_miyoco_dw_8.swf");

});