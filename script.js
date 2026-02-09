const tabs = document.querySelectorAll('[data-tab]');

if (tabs.length) {
    tabs.forEach(tab => {
        const header = tab.querySelector('[data-tab-button]');
        if (!header) return;

        header.addEventListener('click', () => {
            const isOpen = tab.getAttribute('data-open') === 'true';

            tabs.forEach(otherTab => {
                otherTab.setAttribute('data-open', 'false');
                const otherHeader = otherTab.querySelector('[data-tab-button]');
                if (otherHeader) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                }
            });

            if (!isOpen) {
                tab.setAttribute('data-open', 'true');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
    revealItems.forEach(item => item.classList.add('is-visible'));
} else {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
}
