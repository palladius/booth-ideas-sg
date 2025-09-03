document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const searchInput = document.getElementById('search-input');
    const ideaCountElement = document.getElementById('idea-count');
    const timelineEventsContainer = document.getElementById('timeline-events');
    const filterContainer = document.getElementById('filter-container');

    let currentCategoryFilter = 'All';

    let eventName = '';
    let ideasData = [];

    async function loadIdeasData() {
        const urlParams = new URLSearchParams(window.location.search);
        const dataSource = urlParams.get('data') || 'pauldatta'; // Default to pauldatta
        try {
            const response = await fetch(`${dataSource}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            eventName = data.eventName;
            ideasData = data.ideas;
            ideasData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } catch (error) {
            console.error("Could not load ideas data:", error);
            galleryContainer.innerHTML = '<p>Error loading ideas. Please try a different data source or check the console.</p>';
        }
    }

    ideasData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    function renderCards() {
        galleryContainer.innerHTML = '';
        const filterText = searchInput.value.toLowerCase();

        const filteredIdeas = ideasData.filter(idea => {
            const matchesCategory = currentCategoryFilter === 'All' || idea.category === currentCategoryFilter;
            const matchesSearch = idea.title.toLowerCase().includes(filterText);
            return matchesCategory && matchesSearch;
        });

        ideaCountElement.textContent = `Displaying ${filteredIdeas.length} of ${ideasData.length} ideas.`;

        if (filteredIdeas.length === 0) {
            galleryContainer.innerHTML = '<p>No matching ideas found.</p>';
            return;
        }

        filteredIdeas.forEach(idea => {
            const card = document.createElement('div');
            const categoryClass = `category-${idea.category.toLowerCase().replace(/\s+/g, '-')}`;
            card.className = `card ${categoryClass}`;
            card.id = `idea-card-${idea.number}`;

            const title = document.createElement('h2');
            title.textContent = idea.title;

            const categoryTag = document.createElement('p');
            categoryTag.className = 'category-tag';
            categoryTag.textContent = idea.category;

            const info = document.createElement('p');
            info.className = 'info';
            const time = new Date(idea.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            info.textContent = `${eventName} • Issue #${idea.number} • Created at ${time}`;

            const links = document.createElement('div');
            links.className = 'links';
            const issueLink = document.createElement('a');
            issueLink.href = idea.url;
            issueLink.textContent = 'View Details';
            issueLink.target = '_blank';
            issueLink.rel = 'noopener noreferrer';

            links.appendChild(issueLink);
            card.appendChild(title);
            card.appendChild(categoryTag);
            card.appendChild(info);
            card.appendChild(links);
            galleryContainer.appendChild(card);
        });
    }

    function renderFilters() {
        const categories = ['All', ...new Set(ideasData.map(idea => idea.category))];
        filterContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = category;
            if (category === currentCategoryFilter) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                currentCategoryFilter = category;
                renderFilters(); // Re-render to update active state
                renderCards();
            });
            filterContainer.appendChild(btn);
        });
    }

    function renderTimeline() {
        const dayStart = new Date('2025-08-28T09:00:00+08:00').getTime();
        const dayEnd = new Date('2025-08-28T18:00:00+08:00').getTime();
        const totalDuration = dayEnd - dayStart;

        ideasData.forEach(idea => {
            const ideaTime = new Date(idea.createdAt).getTime();
            const elapsedTime = ideaTime - dayStart;
            const positionPercent = (elapsedTime / totalDuration) * 100;

            if (positionPercent >= 0 && positionPercent <= 100) {
                const dot = document.createElement('div');
                dot.className = 'timeline-dot';
                dot.style.left = `${positionPercent}%`;
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                const time = new Date(idea.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                tooltip.textContent = `${idea.title} (${time})`;
                dot.appendChild(tooltip);
                dot.addEventListener('click', () => {
                    searchInput.value = idea.title;
                    currentCategoryFilter = 'All';
                    renderFilters();
                    renderCards();
                    const cardElement = document.getElementById(`idea-card-${idea.number}`);
                    if (cardElement) {
                        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
                timelineEventsContainer.appendChild(dot);
            }
        });
    }

    searchInput.addEventListener('input', renderCards);

    // Initial render
    async function init() {
        await loadIdeasData();
        if (ideasData.length > 0) {
            galleryContainer.innerHTML = '';
            renderFilters();
            renderCards();
            renderTimeline();
        }
    }

    init();
});
