/**
 * CrystalClean - Blog Details Dynamic Handler
 * Ensures each of the 18 blog articles has a unique author, role, avatar, bio, and content.
 */

const blogArticlesData = [
  {
    id: 1,
    title: "How Often Should You Wash Residential Windows?",
    category: "residential-care",
    categoryLabel: "Residential Care",
    date: "12 October 2026",
    readTime: "5 min read",
    author: "Hana Sato",
    authorRole: "Residential Quality Lead",
    authorAvatar: "assets/images/team/team-03.webp",
    authorBio: "Hana has audited more than 6,000 residential window jobs and specializes in pure water filtration and delicate glass care.",
    image: "assets/images/blog/blog-residential-schedule.jpg",
    lead: "From pollen season to coastal salt spray, find the ideal cleaning frequency to prevent irreversible mineral etching on glass.",
    heading1: "1. The Difference Between Weather Soil and Mineral Etching",
    p1: "Windblown dust and raindrops contain micro-particles of calcium, silica, and airborne pollutants. When left in direct sunlight, the heat of the sun bakes these minerals into the microscopic pores of the glass. Over 6 to 12 months, this process causes stage-two corrosion known as glass etching.",
    heading2: "2. Recommended Cleaning Frequency",
    p2: "Suburban homes should receive professional exterior cleans every 8-12 weeks, urban lofts every 6-8 weeks due to traffic soot, and coastal beachfront properties every 4-6 weeks to prevent corrosive salt glazing."
  },
  {
    id: 2,
    title: "Hard Water Stains vs. Mineral Etching: Restoration Guide",
    category: "residential-care",
    categoryLabel: "Residential Care",
    date: "05 October 2026",
    readTime: "7 min read",
    author: "Dr. Julian Ward",
    authorRole: "Glass Materials Scientist",
    authorAvatar: "assets/images/team/team-01.webp",
    authorBio: "Dr. Ward holds a doctorate in materials chemistry and specializes in architectural glass silica porosity, alkaline surface breakdown, and restoration.",
    image: "assets/images/services/mineral-scale-transformation.jpg",
    lead: "Discover the critical difference between surface calcium scale and permanent silica etching, plus safe commercial restoration methods.",
    heading1: "1. Stage-1 Mineral Scale vs. Stage-2 Glass Etching",
    p1: "Stage-1 mineral stains are topical deposits of calcium carbonate and magnesium left behind by sprinkler overspray. They sit atop the glass and can be dissolved with acidic chelating agents. Stage-2 etching occurs when alkaline minerals leach into the silica structure itself, requiring sub-micron cerium oxide polishing.",
    heading2: "2. Why Household Vinegar Fails on Deep Etching",
    p2: "While mild acetic acid dissolves light hard water spots, baked-on silica requires mechanical compounding with rotary felt pads to re-level the optical clarity of the pane without causing distortion."
  },
  {
    id: 3,
    title: "Mastering the S-Method Squeegee Glide for Flawless Glass",
    category: "residential-care",
    categoryLabel: "Residential Care",
    date: "28 September 2026",
    readTime: "6 min read",
    author: "Chloe Bennett",
    authorRole: "Master Squeegee Instructor",
    authorAvatar: "assets/images/avatars/team-02.webp",
    authorBio: "Chloe is a championship speed window cleaner and instructor with 12 years of field experience training technicians in single-pass squeegee ergonomics.",
    image: "assets/images/blog/blog-squeegee-technique.jpg",
    lead: "Professional squeegee techniques used by veteran window cleaners to eliminate edge bleeding, streaks, and rag marks.",
    heading1: "1. The Mechanics of the Continuous S-Glide",
    p1: "The continuous S-stroke keeps the leading edge of the squeegee channeled downward, preventing dirty wash solution from bleeding back across already cleaned glass. The key is consistent 45-degree angle contact with the glass.",
    heading2: "2. Blade Rubber Hardness & Seasonal Temperature",
    p2: "Professional window cleaners switch between soft rubber blades in cool weather and hard vulcanized rubber in summer to prevent blade chatter and friction drag across hot glass surfaces."
  },
  {
    id: 4,
    title: "The Science of Pure Water: Why Zero TDS Prevents Spots",
    category: "technology",
    categoryLabel: "Pure Water Tech",
    date: "22 September 2026",
    readTime: "7 min read",
    author: "Marcus Vance",
    authorRole: "Water Chemistry Specialist",
    authorAvatar: "assets/images/team/team-02.webp",
    authorBio: "Marcus oversees CrystalClean's mobile purification van fleet, calibrating reverse osmosis membranes and dual-bed mixed resins to absolute 000 PPM.",
    image: "assets/images/blog/blog-pure-water.jpg",
    lead: "Discover why mineral-free deionised water lifts stubborn grime without detergents and dries 100% streak-free.",
    heading1: "1. Total Dissolved Solids (TDS) and Evaporation Spots",
    p1: "Municipal tap water contains 150 to 400 parts per million of dissolved minerals like calcium, lime, and sodium. When tap water evaporates on glass, these minerals are left behind as white spots. Water purified to 000 PPM TDS evaporates 100% cleanly without leaving any residue.",
    heading2: "2. The Aggressive Solvent Nature of Pure H2O",
    p2: "Without dissolved ions, pure water acts as a natural magnet for dirt, dust, and organic grime, breaking surface tension and washing away impurities without soaps or surfactant films."
  },
  {
    id: 5,
    title: "Reverse Osmosis vs. Deionization: Inside Our Mobile Filtration Van",
    category: "technology",
    categoryLabel: "Pure Water Tech",
    date: "15 September 2026",
    readTime: "6 min read",
    author: "Owen Sterling",
    authorRole: "Filtration Systems Engineer",
    authorAvatar: "assets/images/team/team-04.webp",
    authorBio: "Owen designs custom van-mounted multi-stage water purification systems and flow-regulated delivery pumps for commercial exterior cleaning.",
    image: "assets/images/blog/blog-pure-water-van.jpg",
    lead: "Explore the multi-stage resin filters and sediment membranes our technicians use to create 99.99% pure laboratory-grade rinse water.",
    heading1: "1. The 4-Stage Onboard Van Filtration Process",
    p1: "Water passes through a 5-micron sediment pre-filter, a carbon block to remove chlorine, an industrial reverse osmosis membrane removing 98% of minerals, and finally a nuclear-grade mixed bed deionizing resin polish.",
    heading2: "2. Flow Rates and Pressure Management",
    p2: "Electronic telemetry monitors van tank levels and pump pressures in real time, delivering consistent 2.5 litres per minute of laboratory-pure water directly to technician brush heads."
  },
  {
    id: 6,
    title: "Carbon Fiber Water-Fed Poles: Reaching 60 Feet Safely",
    category: "technology",
    categoryLabel: "Pure Water Tech",
    date: "08 September 2026",
    readTime: "5 min read",
    author: "Sophie Laurent",
    authorRole: "High-Reach Equipment Specialist",
    authorAvatar: "assets/images/avatars/team-04.webp",
    authorBio: "Sophie specializes in ergonomic composite pole engineering and lightweight high-modulus carbon fiber systems that protect technician joints during 60-foot washes.",
    image: "assets/images/services/interior-exterior-glass.jpg",
    lead: "How ultra-light composite telescopic poles eliminate dangerous ladder setups while delivering spotless finishes to third-story windows.",
    heading1: "1. Modulus Carbon Fiber vs. Aluminum Poles",
    p1: "High-modulus carbon fiber provides exceptional stiffness with virtually zero pole whip even when extended to four storeys, allowing technicians to apply controlled brush scrubbing pressure safely from the ground.",
    heading2: "2. Ladderless Safety Standards",
    p2: "Working ground-based with water-fed telescopic poles eliminates over 95% of ladder fall hazards in residential and low-rise commercial cleaning operations."
  },
  {
    id: 7,
    title: "High-Rise Window Cleaning: Rigging, Safety & Standards",
    category: "commercial",
    categoryLabel: "Commercial High-Rise",
    date: "02 September 2026",
    readTime: "8 min read",
    author: "Elena Rostova",
    authorRole: "IRATA Level 3 Safety Supervisor",
    authorAvatar: "assets/images/team/team-02.webp",
    authorBio: "Elena holds IRATA and SPRAT Level 3 certifications, with over 11 years commanding rope access operations and authoring RAMS safety documentation.",
    image: "assets/images/services/high-rise-window-cleaning.jpg",
    lead: "An inside look at how IRATA certified rope technicians safely maintain curtain wall glass on skyscrapers.",
    heading1: "1. Dual-Rope Redundancy and Anchor Testing",
    p1: "Every technician hangs suspended from an independent working line with a secondary backup line equipped with an automatic fall arrestor. Rooftop anchors undergo annual pull-testing to 15kN before deployment.",
    heading2: "2. Wind Speed Limits and Drop Zones",
    p2: "Rope drops are strictly suspended if rooftop wind speeds exceed 25 knots. Street-level exclusion zones are barricaded with safety marshals to protect pedestrians below."
  },
  {
    id: 8,
    title: "Commercial Facade Maintenance: Preserving Architectural Glass",
    category: "commercial",
    categoryLabel: "Commercial High-Rise",
    date: "25 August 2026",
    readTime: "6 min read",
    author: "Devon Miller",
    authorRole: "Facade Operations Director",
    authorAvatar: "assets/images/team/team-01.webp",
    authorBio: "Devon has managed exterior glass maintenance programmes for over 80 high-rise office towers and commercial developments across California.",
    image: "assets/images/services/commercial-window-cleaning.jpg",
    lead: "Curtain wall facades require scheduled maintenance to prevent sealant breakdown and sulfur degradation on Low-E glass coatings.",
    heading1: "1. Protecting Pyrolytic and Sputtered Low-E Coatings",
    p1: "Architectural energy-saving glass relies on microscopic metallic coatings that can be permanently ruined by harsh abrasive cleansers or metal scraper blades. Non-marking monofilament brushes protect these coatings.",
    heading2: "2. Gasket and Silicone Seal Inspection",
    p2: "Regular commercial cleaning allows technicians to spot gasket dry rot, sealant shrinking, and glass weeping channels before costly interior water infiltration occurs."
  },
  {
    id: 9,
    title: "Retail Storefront Glass Maintenance: First Impressions Matter",
    category: "commercial",
    categoryLabel: "Commercial High-Rise",
    date: "18 August 2026",
    readTime: "5 min read",
    author: "Diego Alvarez",
    authorRole: "Commercial Facade Operations Lead",
    authorAvatar: "assets/images/avatars/team-04.webp",
    authorBio: "Diego coordinates pre-opening commercial storefront window rounds for luxury boutiques, automotive showrooms, and financial institutions.",
    image: "assets/images/blog/blog-storefront-window.jpg",
    lead: "Why retail boutique display windows require bi-weekly morning cleans to eliminate traffic exhaust film and hand smudges.",
    heading1: "1. Curb Appeal and Conversion Rates",
    p1: "Consumer psychology shows that customers perceive retail merchandise as 20% higher quality when showcased behind crystal clear, reflection-free storefront glass.",
    heading2: "2. Traffic Exhaust and Fingerprint Removal",
    p2: "Storefront glass gathers heavy diesel soot from passing vehicles and greasy skin oils from pedestrian touch. Specialized anti-static rinses keep glass cleaner between service cycles."
  },
  {
    id: 10,
    title: "Spring Conservatory & Skylight Glass Care Guide",
    category: "specialist",
    categoryLabel: "Specialist & Sunrooms",
    date: "11 August 2026",
    readTime: "8 min read",
    author: "Liam Chen",
    authorRole: "Specialist Glass Restoration Lead",
    authorAvatar: "assets/images/team/team-04.webp",
    authorBio: "Liam heads CrystalClean's architectural division, focusing on historical conservatory roofs, heritage glazing, and delicate lantern glass care.",
    image: "assets/images/services/skylight-conservatory-cleaning.jpg",
    lead: "How to safely clear moss, lichen, and baked-on pollen from sunrooms and roof lanterns to restore natural light.",
    heading1: "1. Dealing with Organic Lichen and Moss Infiltration",
    p1: "Conservatory roof bars trap moisture where moss and lichen root into rubber gaskets. We use bio-safe neutral foaming washes that loosen fungal spores without damaging structural seals.",
    heading2: "2. Safely Reaching Sloped Overhead Panes",
    p2: "Walking directly on conservatory roof panels is extremely dangerous. Technicians utilize swan-neck carbon water-fed brushes to reach awkward angles from stable ground or perimeter platforms."
  },
  {
    id: 11,
    title: "Window Track & Screen Detailing: Protecting Air Quality",
    category: "specialist",
    categoryLabel: "Specialist & Sunrooms",
    date: "03 August 2026",
    readTime: "6 min read",
    author: "Maya Patel",
    authorRole: "Indoor Air Quality & Screen Detailing Tech",
    authorAvatar: "assets/images/team/team-03.webp",
    authorBio: "Maya specializes in indoor particulate allergen extraction, acoustic slider lubrication, and screen frame restoration for allergen-sensitive homes.",
    image: "assets/images/services/frame-screen-cleaning.jpg",
    lead: "Dirty flyscreens and window sliders trap allergens and mold spores that circulate indoors. Here is our deep detailing protocol.",
    heading1: "1. Window Sliders as Dust and Mold Traps",
    p1: "Moisture condensation inside window weep holes creates an ideal breeding ground for mold and trapped dust mites, which blow into rooms whenever windows are opened.",
    heading2: "2. Ultrasonic and Micro-Vacuum Detailing",
    p2: "Using HEPA micro-vacuums and dry-glide silicone lubricant ensures window tracks slide effortlessly without attracting sticky dirt."
  },
  {
    id: 12,
    title: "Overhead Glass Lanterns & Sunroom Roof Cleaning Protocols",
    category: "specialist",
    categoryLabel: "Specialist & Sunrooms",
    date: "27 July 2026",
    readTime: "7 min read",
    author: "Gareth Hughes",
    authorRole: "Glazing & Silicone Sealant Specialist",
    authorAvatar: "assets/images/team/team-01.webp",
    authorBio: "Gareth brings 16 years of glazing engineering experience inspecting architectural roof lantern seals, flashings, and self-cleaning glass coatings.",
    image: "assets/images/blog/blog-sunroom-roof.jpg",
    lead: "Overhead sloped glazing requires specialized non-abrasive soft brushes and zero-TDS pure water to protect silicone seals.",
    heading1: "1. The Truth About Self-Cleaning Glass",
    p1: "Titanium dioxide photocatalytic coatings break down organic grime when exposed to UV light, but they still require periodic pure water flushes to wash away inorganic dirt and mineral residue.",
    heading2: "2. Protecting Ridge Caps and Flashing",
    p2: "Gentle low-pressure rinses prevent water from forcing past lead roof flashings or structural silicone beads on modern flat-roof lanterns."
  },
  {
    id: 13,
    title: "Solar Panel Cleaning: How Pure Water Maximizes PV Output",
    category: "solar-exterior",
    categoryLabel: "Solar & Exterior",
    date: "19 July 2026",
    readTime: "6 min read",
    author: "Lucas Reed",
    authorRole: "Renewables & PV Washing Lead",
    authorAvatar: "assets/images/team/team-02.webp",
    authorBio: "Lucas conducts solar efficiency telemetry audits, developing zero-chemical pure water wash cycles that restore up to 25% lost energy output.",
    image: "assets/images/blog/blog-solar-panel-cleaning.jpg",
    lead: "Dust, bird droppings, and baked minerals can reduce solar panel output by up to 25%. Learn why deionized water is required.",
    heading1: "1. The Soiling Ratio and Energy Production Loss",
    p1: "Dust and agricultural fallout block sunlight from hitting photovoltaic cells. Over 3 months of dry weather, this 'soiling factor' degrades system efficiency by 15% to 25%.",
    heading2: "2. Why Tap Water and Soaps Void Panel Warranties",
    p2: "Tap water leaves mineral scale on anti-reflective solar coatings, and chemical detergents leave sticky residues. Manufacturers mandate 100% deionized water and soft bristles."
  },
  {
    id: 14,
    title: "Glass Balustrade & Pool Fence Maintenance in Coastal Climates",
    category: "solar-exterior",
    categoryLabel: "Solar & Exterior",
    date: "12 July 2026",
    readTime: "5 min read",
    author: "Amelia Hart",
    authorRole: "Founder & Coastal Glass Consultant",
    authorAvatar: "assets/images/avatars/team-02.webp",
    authorBio: "Founder of CrystalClean with 18 years in exterior property care, consulting on marine glass protection, pool balustrades, and coastal salt defense.",
    image: "assets/images/blog/blog-glass-balustrade.jpg",
    lead: "How maritime salt mist, chlorine splashes, and sunscreen residues etch outdoor glass, and how hydrophobic sealants protect them.",
    heading1: "1. The Triple Threat: Salt, Chlorine, and Sunscreen",
    p1: "Pool fences face airborne pool chemicals, aerosolized sunscreens, and ocean salt. Sunscreen lipids bond strongly to glass and bake under intense UV, forming stubborn haze.",
    heading2: "2. Hydrophobic Nano-Ceramic Coatings",
    p2: "Applying a silica nano-shield fills the microscopic peaks and valleys of outdoor tempered glass, making pool splashes and sea mist sheet off without staining."
  },
  {
    id: 15,
    title: "Exterior Architectural Glass Detailing: Canopies & Atriums",
    category: "solar-exterior",
    categoryLabel: "Solar & Exterior",
    date: "04 July 2026",
    readTime: "6 min read",
    author: "Carlos Mendez",
    authorRole: "Atrium & Canopy Operations Supervisor",
    authorAvatar: "assets/images/avatars/team-04.webp",
    authorBio: "Carlos directs boom lift and mobile scaffold operations for grand entrance glass canopies, vaulted transit hubs, and corporate atriums.",
    image: "assets/images/blog/blog-conservatory.jpg",
    lead: "How external entrance canopies and glass walkways accumulate environmental pollution and how scheduled deionized rinses restore clarity.",
    heading1: "1. Urban Soot and Spider Web Accumulation",
    p1: "Atrium glass canopies trap rising heat from building doorways, attracting insects and spiders that create heavy webs and staining across overhead panels.",
    heading2: "2. Specialized Boom Lift Access",
    p2: "Articulated knuckle booms and lightweight spider lifts allow technicians to reach overhead exterior glass without putting load on sensitive structural walkways."
  },
  {
    id: 16,
    title: "Autumn & Winter Glass Care: Protecting Panes from Frost & Salts",
    category: "seasonal-care",
    categoryLabel: "Seasonal Glass Care",
    date: "26 June 2026",
    readTime: "5 min read",
    author: "Brooke Holloway",
    authorRole: "Hydrophobic Coating Specialist",
    authorAvatar: "assets/images/team/team-03.webp",
    authorBio: "Brooke formulates silicon dioxide ceramic glass sealants that prevent winter frost adhesion, road brine pitting, and mineral water etching.",
    image: "assets/images/blog/blog-residential.jpg",
    lead: "Cold weather road salts and acidic winter rains accelerate frame corrosion. Here is how hydrophobic treatments preserve glass brilliance.",
    heading1: "1. Road Brine and Airborne Salt Aerosols",
    p1: "Winter highway de-icing trucks spray calcium chloride brine that becomes aerosolized by traffic, drifting onto nearby residential windows and pitting exterior seals.",
    heading2: "2. Preventing Freeze-Thaw Seal Degradation",
    p2: "Moisture trapped in dirty window frame tracks expands when freezing, cracking perimeter sealants and causing insulated double-pane unit failure."
  },
  {
    id: 17,
    title: "Spring Pollen Defense: Keeping Windows Clear During Peak Bloom",
    category: "seasonal-care",
    categoryLabel: "Seasonal Glass Care",
    date: "18 June 2026",
    readTime: "6 min read",
    author: "Tara Washington",
    authorRole: "Seasonal Environmental Glazing Lead",
    authorAvatar: "assets/images/avatars/team-02.webp",
    authorBio: "Tara leads seasonal glass remediation during heavy pine and tree pollination seasons, implementing enzyme-based pre-soaks and pure water flushes.",
    image: "assets/images/services/window-cleaning.webp",
    lead: "Pine and tree pollen create a sticky yellow film that bakes into hot glass. Learn early-season preventive rinse techniques.",
    heading1: "1. The Sticky Chemistry of Tree Pollen",
    p1: "Pollen grains possess natural waxes and microscopic spikes designed to cling tenaciously to surfaces. In spring sunlight, this yellow resin bakes into glass within 48 hours.",
    heading2: "2. Pre-Soaking vs. Dry Wiping",
    p2: "Dry wiping pollen scratches glass with abrasive microscopic particulates. We use pure water flooding to encapsulate and rinse pollen cleanly away."
  },
  {
    id: 18,
    title: "Summer Window Cleaning Rules: Why Direct Sunlight Causes Streaks",
    category: "seasonal-care",
    categoryLabel: "Seasonal Glass Care",
    date: "10 June 2026",
    readTime: "5 min read",
    author: "Nathaniel Cole",
    authorRole: "Thermal Shock & Sunlight Operations Manager",
    authorAvatar: "assets/images/team/team-04.webp",
    authorBio: "Nathaniel plans operational dispatch schedules around sun angles and building orientation to prevent rapid evaporation and thermal stress on glass.",
    image: "assets/images/blog/blog-high-rise.jpg",
    lead: "Washing glass under intense midday heat causes water to evaporate prematurely, leaving mineral lines. Here are optimal cleaning hours.",
    heading1: "1. The Evaporation Race on Hot Summer Glass",
    p1: "When glass temperature exceeds 35°C (95°F), cleaning solution evaporates before the squeegee can wipe it away, flashing into streak lines and baked water stains.",
    heading2: "2. Working with the Sun's Path",
    p2: "Professional cleaning crews always chase the shade—cleaning east-facing glass in the late afternoon and west-facing windows in the early morning for optimal optical clarity."
  }
];

function renderBlogArticle() {
  const params = new URLSearchParams(window.location.search);
  let id = parseInt(params.get('id'), 10);

  // If no ID param, check if the filename itself implies an ID or fallback
  if (isNaN(id) || id < 1 || id > 18) {
    const path = window.location.pathname;
    if (path.includes('blog-details-2')) id = 4;
    else if (path.includes('blog-details-3')) id = 7;
    else if (path.includes('blog-details-4')) id = 10;
    else id = 1;
  }

  const article = blogArticlesData.find(a => a.id === id) || blogArticlesData[0];

  // Update Page Title
  document.title = `${article.title} | CrystalClean`;

  // Update Hero Section
  const eyebrow = document.querySelector('.page-hero .eyebrow');
  if (eyebrow) eyebrow.textContent = article.categoryLabel;

  const heroTitle = document.querySelector('.blog-detail-hero-title');
  if (heroTitle) heroTitle.textContent = article.title;

  const heroMeta = document.querySelector('.blog-detail-hero-meta');
  if (heroMeta) {
    heroMeta.innerHTML = `
      <li class="list-inline-item me-3"><i class="bi bi-person-circle"></i> ${article.author} (${article.authorRole})</li>
      <li class="list-inline-item me-3"><i class="bi bi-calendar3"></i> ${article.date}</li>
      <li class="list-inline-item"><i class="bi bi-clock"></i> ${article.readTime}</li>
    `;
  }

  // Update Breadcrumb
  const breadcrumbActive = document.querySelector('.breadcrumb .breadcrumb-item.active');
  if (breadcrumbActive) breadcrumbActive.textContent = article.title;

  // Update Hero Background & Main Article Image
  const heroBgImg = document.querySelector('.page-hero-bg img');
  if (heroBgImg && article.image) heroBgImg.src = article.image;

  const articleImg = document.querySelector('.article-body img');
  if (articleImg && article.image) {
    articleImg.src = article.image;
    articleImg.alt = article.title;
  }

  // Update Article Lead
  const lead = document.querySelector('.article-body .lead');
  if (lead && article.lead) lead.textContent = article.lead;

  // Update Main Article Headings and Paragraphs if present
  const h2List = document.querySelectorAll('.article-body h2');
  if (h2List.length >= 2) {
    if (article.heading1) h2List[0].textContent = article.heading1;
    if (h2List[0].nextElementSibling && article.p1) h2List[0].nextElementSibling.textContent = article.p1;
    if (article.heading2) h2List[1].textContent = article.heading2;
  }

  // Update "About the Author" Sidebar Widget
  let authorWidget = document.getElementById('blogAuthorWidget');
  if (!authorWidget) {
    const widgets = document.querySelectorAll('.sidebar-widget');
    for (const w of widgets) {
      if (w.textContent && w.textContent.includes('About the Author')) {
        authorWidget = w;
        break;
      }
    }
    if (!authorWidget && widgets.length > 0) authorWidget = widgets[0];
  }

  const authorImg = document.getElementById('blogAuthorImg') || (authorWidget && authorWidget.querySelector('img'));
  const authorName = document.getElementById('blogAuthorName') || (authorWidget && (authorWidget.querySelector('h3.h6') || authorWidget.querySelector('.h6') || authorWidget.querySelector('h3')));
  const authorRole = document.getElementById('blogAuthorRole') || (authorWidget && (authorWidget.querySelector('small.text-primary') || authorWidget.querySelector('small')));
  const authorBio = document.getElementById('blogAuthorBio') || (authorWidget && (authorWidget.querySelector('p.small.text-muted') || authorWidget.querySelector('p.small') || authorWidget.querySelector('p')));

  if (authorImg && article.authorAvatar) {
    authorImg.src = article.authorAvatar;
    authorImg.alt = article.author;
  }
  if (authorName && article.author) {
    authorName.textContent = article.author;
  }
  if (authorRole && article.authorRole) {
    authorRole.textContent = article.authorRole;
  }
  if (authorBio && article.authorBio) {
    authorBio.textContent = article.authorBio;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderBlogArticle);
} else {
  renderBlogArticle();
}

