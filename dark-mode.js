const toggle = document.getElementById('darkModeToggle');
    const icon = document.getElementById('darkModeIcon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function getEffectiveMode() {
        if (document.body.classList.contains('force-dark')) return 'dark';
        if (document.body.classList.contains('force-light')) return 'light';
        return prefersDark ? 'dark' : 'light';
    }

    function updateToggleIcon() {
        const mode = getEffectiveMode();
        icon.src = mode === 'dark' ? '/images/general/light-mode.png' : '/images/general/dark-mode.png';
        icon.alt = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }

    function applyModeFromStorage() {
        document.body.classList.remove('force-dark', 'force-light');
        const saved = localStorage.getItem('darkMode');
        if (saved === 'dark') {
            document.body.classList.add('force-dark');
        } else if (saved === 'light') {
            document.body.classList.add('force-light');
        }
        updateToggleIcon();
    }

    applyModeFromStorage();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('darkMode')) {
            applyModeFromStorage();
        }
    });

    toggle.onclick = () => {
        const mode = getEffectiveMode();
        if (mode === 'dark') {
            localStorage.setItem('darkMode', 'light');
        } else {
            localStorage.setItem('darkMode', 'dark');
        }
        applyModeFromStorage();
    };