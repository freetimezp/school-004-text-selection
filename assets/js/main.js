(() => {
    const palettes = {
        plum: {
            name: "Plum & Coral",
            text: "#FFFFFF",
            background: "#6C3B65",
        },
        ocean: {
            name: "Ocean & Ice",
            text: "#FFFFFF",
            background: "#164E63",
        },
        citrus: {
            name: "Citrus & Ink",
            text: "#28212C",
            background: "#E5B94F",
        },
        rose: {
            name: "Rose & Wine",
            text: "#FFFFFF",
            background: "#9F3458",
        },
    };

    const root = document.documentElement;
    const buttons = document.querySelectorAll(".palette-button");
    const textColorValue = document.querySelector("#textColorValue");
    const selectionColorValue = document.querySelector("#selectionColorValue");
    const cssOutput = document.querySelector("#cssOutput");
    const copyButton = document.querySelector("#copyCode");
    const copyStatus = document.querySelector("#copyStatus");

    function selectPalette(name) {
        const palette = palettes[name];

        if (!palette) return;

        // Update the CSS custom properties used by ::selection.
        root.style.setProperty("--selection-text", palette.text);
        root.style.setProperty("--selection-bg", palette.background);

        // Update the visible color values.
        textColorValue.textContent = palette.text;
        selectionColorValue.textContent = palette.background;

        // Show the matching CSS for this palette.
        cssOutput.textContent = `::selection {
    color: ${palette.text.toLowerCase()};
    background-color: ${palette.background.toLowerCase()};
}`;

        // Keep selected state accessible for keyboard and screen-reader users.
        buttons.forEach((button) => {
            const isActive = button.dataset.palette === name;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        // Clear any previous copy message when the palette changes.
        copyStatus.textContent = "";
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            selectPalette(button.dataset.palette);
        });
    });

    copyButton.addEventListener("click", async () => {
        const code = cssOutput.textContent;

        try {
            await navigator.clipboard.writeText(code);
            copyStatus.textContent = "CSS copied!";
        } catch {
            // Clipboard API may require HTTPS or localhost.
            copyStatus.textContent =
                "Copy unavailable here — select the CSS and copy it manually.";
        }
    });

    // Initialize the page with the plum palette.
    selectPalette("plum");
})();
