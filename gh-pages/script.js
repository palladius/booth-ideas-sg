document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const searchInput = document.getElementById('search-input');
    const ideaCountElement = document.getElementById('idea-count');
    const timelineEventsContainer = document.getElementById('timeline-events');
    const filterContainer = document.getElementById('filter-container');
    const eventSelectorContainer = document.getElementById('event-selector-container');

    let currentCategoryFilter = 'All';
    let eventName = '';
    let ideasData = [];

    function renderEventSelector() {
        const urlParams = new URLSearchParams(window.location.search);
        const dataSource = urlParams.get('data') || 'palladius';

        const events = [
            { id: 'palladius', name: '🇨🇭 Zurich' },
            { id: 'pauldatta', name: '🇸🇬 Singapore' }
        ];

        eventSelectorContainer.innerHTML = '<h3>Select Event:</h3>';
        events.forEach(event => {
            const btn = document.createElement('a');
            btn.href = `?data=${event.id}`;
            btn.className = 'event-btn';
            if (dataSource === event.id) {
                btn.classList.add('active');
            }
            btn.textContent = event.name;
            eventSelectorContainer.appendChild(btn);
        });
    }

    async function loadIdeasData() {
        const urlParams = new URLSearchParams(window.location.search);
        const dataSource = urlParams.get('data') || 'palladius'; // Default to palladius
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

        const eventDate = new Date(ideasData[0].createdAt);
        eventDate.setHours(0, 0, 0, 0); // Normalize to the start of the day

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

            const ideaDate = new Date(idea.createdAt);
            const ideaDateNormalized = new Date(idea.createdAt);
            ideaDateNormalized.setHours(0, 0, 0, 0);

            let dateString;
            if (ideaDateNormalized.getTime() === eventDate.getTime()) {
                dateString = `at ${ideaDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
            } else {
                dateString = `on ${ideaDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}`;
            }
            info.textContent = `Issue #${idea.number} • Created ${dateString}`;

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
        if (ideasData.length === 0) return;

        // Dynamically set the day based on the first idea
        const firstIdeaDate = new Date(ideasData[0].createdAt);
        const timelineTitle = document.querySelector('.timeline-container h3');
        const eventDate = firstIdeaDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        timelineTitle.textContent = `Timeline of Ideas (${eventDate})`;

        const dayStart = new Date(firstIdeaDate);
        dayStart.setHours(9, 0, 0, 0);

        const dayEnd = new Date(firstIdeaDate);
        dayEnd.setHours(18, 0, 0, 0);

        const totalDuration = dayEnd.getTime() - dayStart.getTime();
        timelineEventsContainer.innerHTML = ''; // Clear previous timeline events

        ideasData.forEach(idea => {
            const ideaTime = new Date(idea.createdAt).getTime();
            const elapsedTime = ideaTime - dayStart;
            const positionPercent = (elapsedTime / totalDuration) * 100;

            if (positionPercent >= 0 && positionPercent <= 100) {
                const dot = document.createElement('div');
                dot.className = 'timeline-dot';

                // Add class based on date
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const ideaDate = new Date(idea.createdAt);
                ideaDate.setHours(0, 0, 0, 0);

                if (ideaDate.getTime() < today.getTime()) {
                    dot.classList.add('past');
                } else if (ideaDate.getTime() > today.getTime()) {
                    dot.classList.add('future');
                } else {
                    dot.classList.add('today');
                }

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
        // Clear all dynamic content
        galleryContainer.innerHTML = '';
        timelineEventsContainer.innerHTML = '';
        filterContainer.innerHTML = '';
        
        renderEventSelector();
        await loadIdeasData();

        if (ideasData.length > 0) {
            renderFilters();
            renderCards();
            renderTimeline();
            renderMultiDayTimeline();
        }
    }

    init();
});

function renderMultiDayTimeline() {
    if (ideasData.length === 0) return;

    const timelineContainer = document.getElementById('multi-day-timeline-container');
    const eventsContainer = document.getElementById('multi-day-timeline-events');
    const labelsContainer = document.getElementById('multi-day-timeline-labels');
    eventsContainer.innerHTML = '';
    labelsContainer.innerHTML = '';

    const dates = ideasData.map(idea => new Date(idea.createdAt));
    const minDate = new Date(Math.min.apply(null, dates));
    const maxDate = new Date(Math.max.apply(null, dates));

    minDate.setHours(0, 0, 0, 0);
    maxDate.setHours(23, 59, 59, 999);

    const totalDuration = maxDate.getTime() - minDate.getTime();

    // Add day labels
    let currentDate = new Date(minDate);
    while (currentDate <= maxDate) {
        const dayPosition = (currentDate.getTime() - minDate.getTime()) / totalDuration * 100;
        const label = document.createElement('span');
        label.textContent = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        label.style.left = `${dayPosition}%`;
        label.style.position = 'absolute';
        labelsContainer.appendChild(label);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    ideasData.forEach(idea => {
        const ideaTime = new Date(idea.createdAt).getTime();
        const positionPercent = (ideaTime - minDate.getTime()) / totalDuration * 100;

        if (positionPercent >= 0 && positionPercent <= 100) {
            const dot = document.createElement('div');
            dot.className = 'timeline-dot';
            dot.style.left = `${positionPercent}%`;

            // Add class based on date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const ideaDate = new Date(idea.createdAt);
            ideaDate.setHours(0, 0, 0, 0);

            if (ideaDate.getTime() < today.getTime()) {
                dot.classList.add('past');
            } else if (ideaDate.getTime() > today.getTime()) {
                dot.classList.add('future');
            } else {
                dot.classList.add('today');
            }

            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            const time = new Date(idea.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
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
            eventsContainer.appendChild(dot);
        }
    });
}