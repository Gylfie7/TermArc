document.addEventListener("DOMContentLoaded", function () {
    const regions = document.querySelectorAll(".map__image [id]");
    const listLinks = document.querySelectorAll(".map__list a");

    function clearActiveStates() {
        // Supprime toutes les classes actives (dans la liste et sur les paths)
        document.querySelectorAll(".region-info").forEach(info => info.classList.remove("active"));
        listLinks.forEach(link => link.classList.remove("is-active"));
        regions.forEach(region => region.classList.remove("is-active"));
    }

    function activateRegion(id) {
        clearActiveStates();

        // Active le lien de la liste
        const activeLink = document.getElementById(id);
        if (!activeLink) return;

        activeLink.classList.add("is-active");

        // Active le contenu info sous le lien
        const regionInfo = activeLink.nextElementSibling;
        if (regionInfo && regionInfo.classList.contains("region-info")) {
            regionInfo.classList.add("active");
        }

        // Active le path SVG correspondant (sans le préfixe 'list-')
        const pathId = id.replace(/^list-/, "");
        const activeRegion = document.getElementById(pathId);
        if (activeRegion) {
            activeRegion.classList.add("is-active");
        }
    }

    // Gérer le clic sur un lien dans la liste
    listLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            activateRegion(this.id);
        });
        // Survol sur lien : active temporairement l'état visuel
        link.addEventListener("mouseenter", function () {
            activateRegion(this.id);
        });
        link.addEventListener("mouseleave", function () {
            clearActiveStates();
        });
    });

    // Gérer le clic sur un path dans SVG
    regions.forEach(region => {
        region.addEventListener("click", function (e) {
            e.preventDefault();
            activateRegion("list-" + this.id);
        });
        // Survol sur path : active temporairement l'état visuel
        region.addEventListener("mouseenter", function () {
            activateRegion("list-" + this.id);
        });
        region.addEventListener("mouseleave", function () {
            clearActiveStates();
        });
    });
});
