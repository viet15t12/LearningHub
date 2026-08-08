(function () {
    const storageKey = "learning-hub-sidebar-collapsed";

    function isCollapsed() {
        try {
            return localStorage.getItem(storageKey) === "true";
        } catch (_) {
            return false;
        }
    }

    function saveState(collapsed) {
        try {
            localStorage.setItem(storageKey, String(collapsed));
        } catch (_) {
            // Trang vẫn hoạt động nếu trình duyệt chặn localStorage.
        }
    }

    function updateButton(button, collapsed) {
        const label = collapsed
            ? "Hiện danh sách bên trái"
            : "Ẩn danh sách bên trái";

        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
        button.setAttribute("aria-expanded", String(!collapsed));
    }

    function setupSidebarToggle() {
        const sidebar = document.querySelector(".md-sidebar--primary");
        const headerTitle = document.querySelector(".md-header__title");
        if (!sidebar || !headerTitle || document.querySelector(".sidebar-toggle")) return;

        const button = document.createElement("button");
        button.className = "sidebar-toggle";
        button.type = "button";
        button.setAttribute("aria-controls", "learning-hub-primary-sidebar");
        button.innerHTML = [
            '<svg viewBox="0 0 24 24" aria-hidden="true">',
            '<path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>',
            "</svg>"
        ].join("");

        sidebar.id = "learning-hub-primary-sidebar";
        document.body.classList.toggle("sidebar-collapsed", isCollapsed());
        updateButton(button, document.body.classList.contains("sidebar-collapsed"));

        button.addEventListener("click", function () {
            const collapsed = document.body.classList.toggle("sidebar-collapsed");
            saveState(collapsed);
            updateButton(button, collapsed);
        });

        headerTitle.insertAdjacentElement("afterend", button);
    }

    if (typeof document$ !== "undefined") {
        document$.subscribe(setupSidebarToggle);
    } else if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupSidebarToggle);
    } else {
        setupSidebarToggle();
    }
})();
