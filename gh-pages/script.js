document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const searchInput = document.getElementById('search-input');
    const ideaCountElement = document.getElementById('idea-count');
    const timelineEventsContainer = document.getElementById('timeline-events');
    const filterContainer = document.getElementById('filter-container');

    let currentCategoryFilter = 'All';

    const ideasData = [
        {"createdAt":"2025-08-28T08:23:54Z","number":166,"title":"Interactive Planetary Alignment System","url":"https://github.com/pauldatta/booth-ideas-sg/issues/166", "category": "Education"},
        {"createdAt":"2025-08-28T08:10:49Z","number":164,"title":"Event Crowd Flow Tracker","url":"https://github.com/pauldatta/booth-ideas-sg/issues/164", "category": "Productivity"},
        {"createdAt":"2025-08-28T07:56:45Z","number":162,"title":"Warehouse Material Picking Route Optimizer","url":"https://github.com/pauldatta/booth-ideas-sg/issues/162", "category": "Logistics"},
        {"createdAt":"2025-08-28T07:01:44Z","number":160,"title":"Matchstick Counter App","url":"https://github.com/pauldatta/booth-ideas-sg/issues/160", "category": "Utilities"},
        {"createdAt":"2025-08-28T06:34:00Z","number":158,"title":"Primary Math Learning App","url":"https://github.com/pauldatta/booth-ideas-sg/issues/158", "category": "Education"},
        {"createdAt":"2025-08-28T06:02:36Z","number":156,"title":"E-commerce Delivery Driver App","url":"https://github.com/pauldatta/booth-ideas-sg/issues/156", "category": "Logistics"},
        {"createdAt":"2025-08-28T05:47:55Z","number":154,"title":"Meal Image Nutrition Analyzer","url":"https://github.com/pauldatta/booth-ideas-sg/issues/154", "category": "Health"},
        {"createdAt":"2025-08-28T04:43:31Z","number":152,"title":"Hotel Gym Guest Check-in System","url":"https://github.com/pauldatta/booth-ideas-sg/issues/152", "category": "Productivity"},
        {"createdAt":"2025-08-28T03:51:06Z","number":150,"title":"Language Translation Application","url":"https://github.com/pauldatta/booth-ideas-sg/issues/150", "category": "Utilities"},
        {"createdAt":"2025-08-28T02:48:23Z","number":148,"title":"Weekly Spending Budget Planner","url":"https://github.com/pauldatta/booth-ideas-sg/issues/148", "category": "Finance"},
        {"createdAt":"2025-08-28T02:47:21Z","number":146,"title":"Digital Counter Application","url":"https://github.com/pauldatta/booth-ideas-sg/issues/146", "category": "Utilities"},
        {"createdAt":"2025-08-28T02:23:21Z","number":144,"title":"Scalable Image Chunking Web Platform","url":"https://github.com/pauldatta/booth-ideas-sg/issues/144", "category": "Developer Tools"},
        {"createdAt":"2025-08-28T02:07:01Z","number":142,"title":"Investment Portfolio Management System with Market Trend Dashboard","url":"https://github.com/pauldatta/booth-ideas-sg/issues/142", "category": "Finance"},
        {"createdAt":"2025-08-28T01:59:10Z","number":140,"title":"Car Listing Platform","url":"https://github.com/pauldatta/booth-ideas-sg/issues/140", "category": "E-commerce"},
        {"createdAt":"2025-08-28T01:50:07Z","number":138,"title":"Automated Software Delivery Controls Assurance","url":"https://github.com/pauldatta/booth-ideas-sg/issues/138", "category": "Developer Tools"},
        {"createdAt":"2025-08-28T01:47:31Z","number":136,"title":"Street Interview Question Randomizer","url":"https://github.com/pauldatta/booth-ideas-sg/issues/136", "category": "Lifestyle"},
        {"createdAt":"2025-08-28T01:43:31Z","number":134,"title":"Personalized Financial Playlist Creator","url":"https://github.com/pauldatta/booth-ideas-sg/issues/134", "category": "Finance"},
        {"createdAt":"2025-08-28T01:33:20Z","number":132,"title":"Singapore Single Origin Coffee Roaster Recommendations","url":"https://github.com/pauldatta/booth-ideas-sg/issues/132", "category": "Lifestyle"},
        {"createdAt":"2025-08-28T01:15:49Z","number":130,"title":"Retail Food Waste Redistribution System","url":"https://github.com/pauldatta/booth-ideas-sg/issues/130", "category": "Logistics"},
        {"createdAt":"2025-08-28T00:44:15Z","number":128,"title":"Automated Parking Location Tracker","url":"https://github.com/pauldatta/booth-ideas-sg/issues/128", "category": "Utilities"},
        {"createdAt":"2025-08-28T00:09:53Z","number":126,"title":"Food Logistics Management Platform","url":"https://github.com/pauldatta/booth-ideas-sg/issues/126", "category": "Logistics"}
    ];

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
            info.textContent = `Issue #${idea.number} • Created at ${time}`;
            
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
    galleryContainer.innerHTML = '';
    renderFilters();
    renderCards();
    renderTimeline();
});
