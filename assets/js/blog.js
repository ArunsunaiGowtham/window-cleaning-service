document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(window.location.search);
    let currentCategory = params.get('category');
    let currentTag = params.get('tag');
    let currentSearch = params.get('search') || '';

    const postCards = document.querySelectorAll('.post-card');

    // Search Inputs (Top Reference Filter bar search + Sidebar search if present)
    const filterSearchInput = document.getElementById('blogFilterSearch');
    const sideSearchInput = document.getElementById('blogSearch');
    const searchInputs = [filterSearchInput, sideSearchInput].filter(Boolean);

    // Initial search input value
    if (currentSearch) {
        searchInputs.forEach(input => input.value = currentSearch);
    }

    const allBlogs = [
        // Category 1: Residential Care (3)
        {
            url: 'blog-details.html?id=1',
            title: 'How Often Should You Wash Residential Windows?',
            category: 'residential-care',
            categoryLabel: 'Residential Care',
            author: 'Hana Sato',
            tags: 'residential pure-water glass-care maintenance',
            excerpt: 'From pollen season to coastal salt spray, find the ideal cleaning frequency to prevent irreversible mineral etching on glass.'
        },
        {
            url: 'blog-details.html?id=2',
            title: 'Hard Water Stains vs. Mineral Etching: Restoration Guide',
            category: 'residential-care',
            categoryLabel: 'Residential Care',
            author: 'Dr. Julian Ward',
            tags: 'hard-water mineral-etching glass-restoration residential',
            excerpt: 'Discover the difference between surface calcium scale and permanent silica etching, plus safe commercial restoration methods.'
        },
        {
            url: 'blog-details.html?id=3',
            title: 'Mastering the S-Method Squeegee Glide for Flawless Glass',
            category: 'residential-care',
            categoryLabel: 'Residential Care',
            author: 'Chloe Bennett',
            tags: 'squeegee-technique streak-free window-tools residential',
            excerpt: 'Professional squeegee techniques used by veteran window cleaners to eliminate edge bleeding, streaks, and rag marks.'
        },

        // Category 2: Pure Water Tech (3)
        {
            url: 'blog-details.html?id=4',
            title: 'The Science of Pure Water: Why Zero TDS Prevents Spots',
            category: 'technology',
            categoryLabel: 'Pure Water Tech',
            author: 'Marcus Vance',
            tags: 'pure-water mineral-free zero-tds streak-free',
            excerpt: 'Discover why mineral-free deionised water lifts stubborn grime without detergents and dries 100% streak-free.'
        },
        {
            url: 'blog-details.html?id=5',
            title: 'Reverse Osmosis vs. Deionization: Inside Our Mobile Filtration Van',
            category: 'technology',
            categoryLabel: 'Pure Water Tech',
            author: 'Owen Sterling',
            tags: 'reverse-osmosis deionization eco-friendly water-fed-pole',
            excerpt: 'Explore the multi-stage resin filters and sediment membranes our technicians use to create 99.99% pure laboratory-grade rinse water.'
        },
        {
            url: 'blog-details.html?id=6',
            title: 'Carbon Fiber Water-Fed Poles: Reaching 60 Feet Safely',
            category: 'technology',
            categoryLabel: 'Pure Water Tech',
            author: 'Sophie Laurent',
            tags: 'carbon-fiber pole-reach safety eco-cleaning',
            excerpt: 'How ultra-light composite telescopic poles eliminate dangerous ladder setups while delivering spotless finishes to third-story windows.'
        },

        // Category 3: Commercial High-Rise (3)
        {
            url: 'blog-details.html?id=7',
            title: 'High-Rise Window Cleaning: Rigging, Safety & Standards',
            category: 'commercial',
            categoryLabel: 'Commercial High-Rise',
            author: 'Elena Rostova',
            tags: 'high-rise irata safety commercial facade',
            excerpt: 'An inside look at how IRATA certified rope technicians safely maintain curtain wall glass on skyscrapers.'
        },
        {
            url: 'blog-details.html?id=8',
            title: 'Commercial Facade Maintenance: Preserving Architectural Glass',
            category: 'commercial',
            categoryLabel: 'Commercial High-Rise',
            author: 'Devon Miller',
            tags: 'commercial curtain-wall architectural-glass corporate-facility',
            excerpt: 'Curtain wall facades require scheduled maintenance to prevent sealant breakdown and sulfur degradation on Low-E glass coatings.'
        },
        {
            url: 'blog-details.html?id=9',
            title: 'Retail Storefront Glass Maintenance: First Impressions Matter',
            category: 'commercial',
            categoryLabel: 'Commercial High-Rise',
            author: 'Diego Alvarez',
            tags: 'storefront retail-glass display-window commercial',
            excerpt: 'Why retail boutique display windows require bi-weekly morning cleans to eliminate traffic exhaust film and hand smudges.'
        },

        // Category 4: Specialist & Sunrooms (3)
        {
            url: 'blog-details.html?id=10',
            title: 'Spring Conservatory & Skylight Glass Care Guide',
            category: 'specialist',
            categoryLabel: 'Specialist & Sunrooms',
            author: 'Liam Chen',
            tags: 'skylight conservatory moss-removal sunroom',
            excerpt: 'How to safely clear moss, lichen, and baked-on pollen from sunrooms and roof lanterns to restore natural light.'
        },
        {
            url: 'blog-details.html?id=11',
            title: 'Window Track & Screen Detailing: Protecting Air Quality',
            category: 'specialist',
            categoryLabel: 'Specialist & Sunrooms',
            author: 'Maya Patel',
            tags: 'screen-cleaning track-vacuuming indoor-air pollen-removal',
            excerpt: 'Dirty flyscreens and window sliders trap allergens and mold spores that circulate indoors. Here is our deep detailing protocol.'
        },
        {
            url: 'blog-details.html?id=12',
            title: 'Overhead Glass Lanterns & Sunroom Roof Cleaning Protocols',
            category: 'specialist',
            categoryLabel: 'Specialist & Sunrooms',
            author: 'Gareth Hughes',
            tags: 'roof-lanterns overhead-glass sunroom-cleaning pure-water',
            excerpt: 'Overhead sloped glazing requires specialized non-abrasive soft brushes and zero-TDS pure water to protect silicone seals.'
        },

        // Category 5: Solar & Exterior (3)
        {
            url: 'blog-details.html?id=13',
            title: 'Solar Panel Cleaning: How Pure Water Maximizes PV Output',
            category: 'solar-exterior',
            categoryLabel: 'Solar & Exterior',
            author: 'Lucas Reed',
            tags: 'solar-panel pure-water pv-efficiency energy-saving',
            excerpt: 'Dust, bird droppings, and baked minerals can reduce solar panel output by up to 25%. Learn why deionized water is required.'
        },
        {
            url: 'blog-details.html?id=14',
            title: 'Glass Balustrade & Pool Fence Maintenance in Coastal Climates',
            category: 'solar-exterior',
            categoryLabel: 'Solar & Exterior',
            author: 'Amelia Hart',
            tags: 'glass-balustrades pool-fencing salt-air exterior',
            excerpt: 'How maritime salt mist, chlorine splashes, and sunscreen residues etch outdoor glass, and how hydrophobic sealants protect them.'
        },
        {
            url: 'blog-details.html?id=15',
            title: 'Exterior Architectural Glass Detailing: Canopies & Atriums',
            category: 'solar-exterior',
            categoryLabel: 'Solar & Exterior',
            author: 'Carlos Mendez',
            tags: 'glass-canopy exterior-glass architecture pure-water',
            excerpt: 'How external entrance canopies and glass walkways accumulate environmental pollution and how scheduled deionized rinses restore clarity.'
        },

        // Category 6: Seasonal Glass Care (3)
        {
            url: 'blog-details.html?id=16',
            title: 'Autumn & Winter Glass Care: Protecting Panes from Frost & Salts',
            category: 'seasonal-care',
            categoryLabel: 'Seasonal Glass Care',
            author: 'Brooke Holloway',
            tags: 'winter-care frost-protection rain-repellent seasonal-care',
            excerpt: 'Cold weather road salts and acidic winter rains accelerate frame corrosion. Here is how hydrophobic treatments preserve glass brilliance.'
        },
        {
            url: 'blog-details.html?id=17',
            title: 'Spring Pollen Defense: Keeping Windows Clear During Peak Bloom',
            category: 'seasonal-care',
            categoryLabel: 'Seasonal Glass Care',
            author: 'Tara Washington',
            tags: 'spring-cleaning pollen-removal allergen-reduction daylight',
            excerpt: 'Pine and tree pollen create a sticky yellow film that bakes into hot glass. Learn early-season preventive rinse techniques.'
        },
        {
            url: 'blog-details.html?id=18',
            title: 'Summer Window Cleaning Rules: Why Direct Sunlight Causes Streaks',
            category: 'seasonal-care',
            categoryLabel: 'Seasonal Glass Care',
            author: 'Nathaniel Cole',
            tags: 'summer-heat direct-sun baking-residue cleaning-timing',
            excerpt: 'Washing glass under intense midday heat causes water to evaporate prematurely, leaving mineral lines. Here are optimal cleaning hours.'
        }
    ];

    // Search events
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            currentSearch = this.value.trim();
            // Sync other inputs
            searchInputs.forEach(other => {
                if (other !== input) other.value = this.value;
            });
            applyFilters();
            updateURL();
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                currentSearch = this.value.trim();
                applyFilters();
                updateURL();
            }
        });
    });

    // Pill click events (Category filter buttons/links)
    const categoryPills = document.querySelectorAll('.ref-filter-pill, .blog-cat-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            const cat = this.getAttribute('data-category') || '';
            currentCategory = cat || null;
            currentTag = null;
            applyFilters();
            updateURL();
        });
    });

    // Reset filters button
    const clearTagsBtn = document.getElementById('clearTagsBtn');
    if (clearTagsBtn) {
        clearTagsBtn.addEventListener('click', function() {
            resetAllFilters();
        });
    }

    function resetAllFilters() {
        currentTag = null;
        currentCategory = null;
        currentSearch = '';
        searchInputs.forEach(input => input.value = '');
        applyFilters();
        updateURL();
    }

    function applyFilters() {
        let visibleCount = 0;
        const searchLower = currentSearch.toLowerCase();

        postCards.forEach(card => {
            const wrapper = card.closest('.col-lg-4, .col-md-6, .col-12');
            const cardCategory = card.getAttribute('data-category') || '';
            const cardTags = card.getAttribute('data-tags') || '';
            const cardTitle = card.querySelector('.h5, h3')?.textContent.toLowerCase() || '';
            const cardExcerpt = card.querySelector('p')?.textContent.toLowerCase() || '';
            const cardAuthor = card.getAttribute('data-author') || '';

            const searchableText = `${cardTitle} ${cardCategory} ${cardExcerpt} ${cardTags} ${cardAuthor}`.toLowerCase();

            let show = true;

            if (currentCategory && cardCategory !== currentCategory) {
                show = false;
            }

            if (currentTag && !cardTags.split(' ').includes(currentTag)) {
                show = false;
            }

            if (currentSearch && !searchableText.includes(searchLower)) {
                show = false;
            }

            if (show) {
                if (wrapper) {
                    wrapper.classList.remove('d-none');
                    wrapper.classList.add('d-flex');
                }
                visibleCount++;
            } else {
                if (wrapper) {
                    wrapper.classList.add('d-none');
                    wrapper.classList.remove('d-flex');
                }
            }
        });

        // Update active category pill
        categoryPills.forEach(pill => {
            const cat = pill.getAttribute('data-category') || '';
            if (!currentCategory && !cat) {
                pill.classList.add('active');
            } else if (currentCategory && cat === currentCategory) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        // Update active filter feedback bar
        const activeBar = document.getElementById('blogActiveFilterBar');
        const filterText = document.getElementById('blogFilterText');
        if (activeBar && filterText) {
            const filterParts = [];
            if (currentCategory) {
                const activePill = Array.from(categoryPills).find(p => (p.getAttribute('data-category') || '') === currentCategory);
                const label = activePill ? activePill.textContent.replace(/\(\s*\d+\s*\)/, '').trim() : currentCategory;
                filterParts.push(`Category: <strong>${label}</strong>`);
            }
            if (currentSearch) {
                filterParts.push(`Search: &ldquo;<strong>${escapeHtml(currentSearch)}</strong>&rdquo;`);
            }
            if (currentTag) {
                filterParts.push(`Tag: <strong>#${escapeHtml(currentTag)}</strong>`);
            }

            if (filterParts.length > 0) {
                activeBar.classList.remove('d-none');
                activeBar.classList.add('d-flex');
                filterText.innerHTML = `Showing ${visibleCount} article${visibleCount === 1 ? '' : 's'} &bull; ${filterParts.join(' &bull; ')}`;
            } else {
                activeBar.classList.add('d-none');
                activeBar.classList.remove('d-flex');
            }
        }

        handleEmptyState(visibleCount);
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function updateURL() {
        const newParams = new URLSearchParams();
        if (currentCategory) newParams.set('category', currentCategory);
        if (currentTag) newParams.set('tag', currentTag);
        if (currentSearch) newParams.set('search', currentSearch);

        const newUrl = window.location.pathname + (newParams.toString() ? '?' + newParams.toString() : '');
        window.history.replaceState({}, '', newUrl);
    }

    function handleEmptyState(visibleCount) {
        if (postCards.length > 0) {
            const gridRow = postCards[0].closest('.row');
            if (gridRow) {
                let emptyState = document.getElementById('blogEmptyState');
                if (visibleCount === 0) {
                    if (!emptyState) {
                        emptyState = document.createElement('div');
                        emptyState.id = 'blogEmptyState';
                        emptyState.className = 'col-12 text-center py-5';
                        emptyState.innerHTML = '<div class="p-5 rounded-4 bg-light border"><i class="bi bi-search display-6 text-muted mb-3 d-block"></i><h3 class="h4 text-dark mb-2">No matching articles found</h3><p class="text-muted mb-4">Try adjusting your category filter or keyword search terms.</p><button class="btn btn-brand" type="button" id="clearBlogEmptyBtn">Show All Articles ( 18 )</button></div>';
                        gridRow.appendChild(emptyState);
                        document.getElementById('clearBlogEmptyBtn').addEventListener('click', resetAllFilters);
                    }
                    emptyState.style.display = '';
                } else if (emptyState) {
                    emptyState.style.display = 'none';
                }
            }
        }
    }

    // Initial run
    applyFilters();
});

