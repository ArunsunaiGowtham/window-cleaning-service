/* CrystalClean - auth.js : front-end authentication (localStorage only, no backend). */
(() => {
  "use strict";

  const USERS_KEY = "sp_users";
  const SESSION_KEY = "sp_session";
  const CURRENT_USER_KEY = "currentUser";

  /* ---------------------------------------------------------- */
  /* Storage helpers                                             */
  /* ---------------------------------------------------------- */

  const genId = () => "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  };

  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const seedUsers = () => {
    let users = getUsers();
    const seeds = [
      {
        id: "seed_customer_01",
        email: "customer@crystalclean.com", password: "customer123", role: "customer",
        firstName: "Jordan", lastName: "Blake", phone: "+1 800 555 0142",
        address: "42 Willow Lane, Riverside", schedule: "Bi-Weekly Pure-Water Care",
        notes: "Key safe code shared with office. Upper conservatory roof care requested.",
        avatar: "assets/images/avatars/customer-01.webp"
      },
      {
        id: "seed_customer_02",
        email: "customer@crystalclean.com", password: "customer123", role: "customer",
        firstName: "Jordan", lastName: "Blake", phone: "+1 800 555 0142",
        address: "42 Willow Lane, Riverside", schedule: "Bi-Weekly Pure-Water Care",
        notes: "Key safe code shared with office. Upper conservatory roof care requested.",
        avatar: "assets/images/avatars/customer-01.webp"
      },
      {
        id: "seed_admin_01",
        email: "admin@crystalclean.com", password: "admin123", role: "admin",
        firstName: "Marcus", lastName: "Vance", phone: "+1 800 555 0199",
        address: "CrystalClean Operations HQ, Suite 400", schedule: "Operations Director",
        notes: "System Administrator",
        avatar: "assets/images/avatars/team-01.webp"
      },
      {
        id: "seed_admin_02",
        email: "admin@crystalclean.com", password: "admin123", role: "admin",
        firstName: "Marcus", lastName: "Vance", phone: "+1 800 555 0199",
        address: "CrystalClean Operations HQ, Suite 400", schedule: "Operations Director",
        notes: "System Administrator",
        avatar: "assets/images/avatars/team-01.webp"
      }
    ];

    if (!users.length) {
      saveUsers(seeds);
    } else {
      let modified = false;
      seeds.forEach((seed) => {
        if (!users.some((u) => u.email.toLowerCase() === seed.email.toLowerCase())) {
          users.push(seed);
          modified = true;
        }
      });
      if (modified) saveUsers(users);
    }
  };

  /* ---------------------------------------------------------- */
  /* currentUser - canonical, page-agnostic snapshot of whoever  */
  /* is signed in. Every page reads this instead of hard-coded   */
  /* demo values. Mirrors whichever storage the session lives in */
  /* (localStorage when "remember me" was checked, otherwise     */
  /* sessionStorage) so a refresh always keeps it in sync.       */
  /* ---------------------------------------------------------- */

  const buildCurrentUser = (user) => ({
    id: user.id,
    role: user.role,
    fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    email: user.email,
    phone: user.phone || "",
    avatar: user.avatar || "",
    address: user.address || ""
  });

  const persistCurrentUser = (user, remember) => {
    const currentUser = buildCurrentUser(user);
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    (remember ? localStorage : sessionStorage).setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    return currentUser;
  };

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) ||
        JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY)) || null;
    } catch (e) { return null; }
  };

  const getSession = () => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) ||
        JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
    } catch (e) { return null; }
  };

  const setSession = (user, remember) => {
    const session = {
      loggedIn: true, id: user.id, role: user.role, email: user.email,
      firstName: user.firstName, lastName: user.lastName, avatar: user.avatar,
      phone: user.phone || "", address: user.address || "",
      schedule: user.schedule || "", notes: user.notes || ""
    };
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
    persistCurrentUser(user, remember);
    return session;
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
  };

  /* ---------------------------------------------------------- */
  /* Path helpers - template pages live at root or in /admin/    */
  /* ---------------------------------------------------------- */

  const isAdminPage = () => /\/admin\//.test(window.location.pathname);
  const rootPrefix = () => (isAdminPage() ? "../" : "");
  const CUSTOMER_PROTECTED = [];

  const currentFile = () => {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  };

  /* ---------------------------------------------------------- */
  /* Core auth actions                                           */
  /* ---------------------------------------------------------- */

  const login = (email, password, role, remember) => {
    const user = getUsers().find((u) =>
      u.email.toLowerCase() === String(email).toLowerCase() &&
      u.password === password && u.role === role);
    if (!user) return { ok: false };
    setSession(user, remember);
    return { ok: true, user };
  };

  const registerCustomer = (data) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, message: "An account with this email already exists." };
    }
    const user = {
      id: genId(),
      email: data.email, password: data.password, role: "customer",
      firstName: data.firstName, lastName: data.lastName, fullName: data.firstName + " " + data.lastName, phone: data.phone,
      address: "", schedule: "", notes: "",
      avatar: "assets/images/avatars/customer-02.webp"
    };
    users.push(user);
    saveUsers(users);
    setSession(user, true);
    return { ok: true, user };
  };

  const registerAdmin = (data) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, message: "An account with this email already exists." };
    }
    const [firstName, ...lastName] = data.fullName.trim().split(/\s+/);
    const user = {
      id: genId(), email: data.email, password: data.password, role: "admin",
      firstName, lastName: lastName.join(" "), phone: "",
      avatar: "assets/images/avatars/team-01.webp"
    };
    users.push(user);
    saveUsers(users);
    return { ok: true, user };
  };

  const logout = () => {
    clearSession();
    window.location.href = rootPrefix() + "login.html";
  };

  const updateProfile = (email, changes) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) return null;
    users[idx] = Object.assign({}, users[idx], changes);
    saveUsers(users);
    const session = getSession();
    if (session) {
      const remembered = !!localStorage.getItem(SESSION_KEY);
      setSession(users[idx], remembered);
    }
    return users[idx];
  };

  /* ---------------------------------------------------------- */
  /* Route guard - runs immediately (script is deferred, so the  */
  /* DOM already exists, minimising any flash of protected UI).  */
  /* ---------------------------------------------------------- */

  const requireAuth = () => {
    let session = getSession();
    const file = currentFile();

    if (isAdminPage()) {
      if (!session || !session.loggedIn) { window.location.replace("../login.html"); return; }
      if (session.role !== "admin") { window.location.replace("../customer-dashboard.html"); return; }
      return;
    }

    if (CUSTOMER_PROTECTED.includes(file)) {
      if (!session || !session.loggedIn) { window.location.replace("login.html"); return; }
      return;
    }
  };


  /* ---------------------------------------------------------- */
  /* Navbar - keep standard Login button linking to login.html */
  /* ---------------------------------------------------------- */

  const updateNavbar = () => {
    const prefix = rootPrefix();
    // Ensure the public navbar shows the standard Login button linking to login.html
    document.querySelectorAll(".site-header [data-auth-nav]").forEach((wrap) => {
      const loginLink = document.createElement("a");
      loginLink.className = "btn btn-brand";
      loginLink.href = prefix + "login.html";
      loginLink.textContent = "Login";
      wrap.replaceWith(loginLink);
    });
  };

  /* ---------------------------------------------------------- */
  /* Existing admin dashboard chrome (sidebar + topbar dropdown) */
  /* already ships in the template - wire it to the real session */
  /* instead of duplicating the markup.                          */
  /* ---------------------------------------------------------- */

  const initAdminChrome = () => {
    if (!isAdminPage()) return;
    const session = getSession();
    if (!session) return;

    const topbarToggle = document.querySelector(".dash-topbar .dropdown .dropdown-toggle");
    if (topbarToggle) {
      const img = topbarToggle.querySelector("img");
      const nameSpan = topbarToggle.querySelector("span");
      if (img) { img.src = "../" + (session.avatar || "assets/images/avatars/team-01.webp"); img.alt = session.firstName || session.email; }
      if (nameSpan) nameSpan.textContent = `${session.firstName || ""} ${(session.lastName || "").charAt(0)}.`.trim();
    }

    document.querySelectorAll(".dash-topbar .dropdown-item, .dash-nav a").forEach((el) => {
      const label = el.textContent.trim().toLowerCase();
      if (label === "sign out" || label === "logout") {
        el.addEventListener("click", (e) => { e.preventDefault(); logout(); });
      }
    });
  };

  const DASH_TAB_KEY = "sp_dashboard_tab";
  const DASH_TAB_IDS = [
    "#tabViewDashboard", "#tabViewCrew", "#tabViewPipeline",
    "#tabViewTelemetry", "#tabViewGuarantee", "#tabViewEmergency",
    "#tabViewCarrier", "#tabViewEstimates", "#tabViewProfile",
    "#tabOverview", "#tabBookings", "#tabInvoices", "#tabMessages", "#tabProfile", "#tabInventory", "#tabInspection"
  ];

  const TAB_ALIAS_MAP = {
    "#tabOverview": "#tabViewDashboard",
    "#tabBookings": "#tabViewCrew",
    "#tabInvoices": "#tabViewCarrier",
    "#tabMessages": "#tabViewEmergency",
    "#tabProfile": "#tabViewProfile",
    "#tabInventory": "#tabViewTelemetry",
    "#tabInspection": "#tabViewPipeline"
  };

  const activateDashTab = (hash) => {
    if (!hash) return false;
    const targetHash = TAB_ALIAS_MAP[hash] || hash;
    if (typeof window.switchDashboardTab === "function") {
      window.switchDashboardTab(targetHash);
      return true;
    }
    const trigger = document.querySelector(`[data-bs-target="${targetHash}"]`);
    if (trigger && window.bootstrap && typeof bootstrap.Tab !== "undefined") {
      try {
        bootstrap.Tab.getOrCreateInstance(trigger).show();
        return true;
      } catch (e) {}
    }
    const pane = document.querySelector(targetHash);
    if (pane) {
      document.querySelectorAll(".ref-content-area .tab-pane, .tab-content .tab-pane").forEach((p) => {
        p.classList.remove("show", "active");
      });
      pane.classList.add("show", "active");
      return true;
    }
    return false;
  };

  const initCustomerDashboardChrome = () => {
    if (isAdminPage() || currentFile() !== "customer-dashboard.html") return;

    const rawHash = window.location.hash;
    const hashIsValidTab = DASH_TAB_IDS.includes(rawHash);
    const storedHash = sessionStorage.getItem(DASH_TAB_KEY);
    const resolvedHash = hashIsValidTab ? (TAB_ALIAS_MAP[rawHash] || rawHash)
      : (storedHash && DASH_TAB_IDS.includes(storedHash) ? (TAB_ALIAS_MAP[storedHash] || storedHash) : "#tabViewDashboard");

    if (resolvedHash && resolvedHash !== "#tabViewDashboard") {
      activateDashTab(resolvedHash);
    }

    const tabButtons = document.querySelectorAll('.ref-nav-btn[data-bs-target], [data-bs-toggle="tab"]');
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const hash = btn.getAttribute("data-bs-target");
        if (!hash) return;
        try { sessionStorage.setItem(DASH_TAB_KEY, hash); } catch (e) {}
      });
    });

    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;
      if (DASH_TAB_IDS.includes(hash)) {
        activateDashTab(hash);
      }
    });
  };

  /* ---------------------------------------------------------- */
  /* Login page & Dummy Simulation Mode                         */
  /* ---------------------------------------------------------- */

  const initPasswordToggles = () => {
    document.querySelectorAll(".auth-toggle-pass").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const group = btn.closest(".auth-input-group") || btn.closest(".auth-input");
        const input = group?.querySelector("input[type='password'], input[type='text']");
        if (!input) return;
        const isPass = input.type === "password";
        input.type = isPass ? "text" : "password";
        const icon = btn.querySelector("i");
        if (icon) {
          icon.className = isPass ? "bi bi-eye-slash" : "bi bi-eye";
        }
      });
    });
  };

  const initLoginPage = () => {
    const heading = document.getElementById("authHeading");
    const sub = document.getElementById("authSub");
    const customerTab = document.getElementById("customerTabBtn");
    const signupTab = document.getElementById("signupTabBtn");

    initPasswordToggles();

    if (customerTab && heading) {
      customerTab.addEventListener("shown.bs.tab", () => {
        heading.textContent = "Customer Login";
        sub.textContent = "Enter your credentials to access your window cleaning dashboard.";
      });
    }
    if (signupTab && heading) {
      signupTab.addEventListener("shown.bs.tab", () => {
        heading.textContent = "Customer Sign Up";
        sub.textContent = "Register as a customer to track your window cleaning bookings and book specialist sessions.";
      });
    }

    const switchToTab = (tabBtnId) => {
      const tabEl = document.getElementById(tabBtnId);
      if (tabEl && window.bootstrap) {
        bootstrap.Tab.getOrCreateInstance(tabEl).show();
      }
    };

    const goToSignup = document.getElementById("goToSignupLink");
    if (goToSignup) {
      goToSignup.addEventListener("click", (e) => {
        e.preventDefault();
        switchToTab("signupTabBtn");
      });
    }

    const goToLogin = document.getElementById("goToLoginLink");
    if (goToLogin) {
      goToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        switchToTab("customerTabBtn");
      });
    }

    // Demo Fill button matching user reference values
    const fillDemoSignupBtn = document.getElementById("fillDemoSignupBtn");
    if (fillDemoSignupBtn) {
      fillDemoSignupBtn.addEventListener("click", () => {
        const fullNameEl = document.getElementById("regFullName") || document.getElementById("regFirstName");
        const emailEl = document.getElementById("regEmail");
        const phoneEl = document.getElementById("regPhone");
        const passEl = document.getElementById("regPass");
        const pass2El = document.getElementById("regPass2");
        const termsEl = document.getElementById("regTerms");
        if (fullNameEl) fullNameEl.value = "nc";
        if (emailEl) emailEl.value = "nc@gmail.com";
        if (phoneEl) phoneEl.value = "9786923694";
        if (passEl) passEl.value = "arun2003";
        if (pass2El) pass2El.value = "arun2003";
        if (termsEl) termsEl.checked = true;
      });
    }

    // Check query params if redirected from register.html (Screenshot 3 state)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("registered") === "true") {
      const regEmail = urlParams.get("email");
      const regName = urlParams.get("name");
      if (regEmail && document.getElementById("loginEmail")) {
        document.getElementById("loginEmail").value = regEmail;
      }
      if (regName) {
        try { sessionStorage.setItem("lastRegisteredName", regName); } catch (e) {}
        const dummyNameEl = document.getElementById("dummySignInName");
        if (dummyNameEl) dummyNameEl.textContent = regName;
      }
      const accountAlert = document.getElementById("accountCreatedAlert");
      if (accountAlert) {
        accountAlert.hidden = false;
        accountAlert.focus?.();
      }
    }

    if ((window.location.hash === "#signup" || window.location.search.includes("tab=signup")) && signupTab && window.bootstrap) {
      bootstrap.Tab.getOrCreateInstance(signupTab).show();
    }

    // Customer Login Submit Handler (Reference Screenshot 4: Dummy Mode Simulated, NO REDIRECT)
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!loginForm.checkValidity()) {
          loginForm.classList.add("was-validated");
          return;
        }

        const email = document.getElementById("loginEmail") ? document.getElementById("loginEmail").value.trim() : "";
        const errorBox = document.getElementById("loginError");
        if (errorBox) errorBox.hidden = true;

        // Hide account created alert if present
        const accountCreatedAlert = document.getElementById("accountCreatedAlert");
        if (accountCreatedAlert) accountCreatedAlert.hidden = true;

        // Resolve display name for the simulation message
        let displayName = "";
        try { displayName = sessionStorage.getItem("lastRegisteredName") || ""; } catch (e) {}
        if (!displayName) {
          const user = getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
          if (user) {
            displayName = user.fullName || user.firstName || "";
          }
        }
        if (!displayName && email) {
          displayName = email.split("@")[0];
        }
        if (!displayName) displayName = "Customer";

        const dummyNameEl = document.getElementById("dummySignInName");
        if (dummyNameEl) dummyNameEl.textContent = displayName;

        const successBox = document.getElementById("successMessage");
        if (successBox) {
          successBox.hidden = false;
          successBox.focus?.();
          successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        // Explicitly dummy mode: DO NOT REDIRECT to customer-dashboard.html
      });
    }
  };

  /* ---------------------------------------------------------- */
  /* Register page & integrated register tab in login.html       */
  /* ---------------------------------------------------------- */

  const initRegisterPage = () => {
    initPasswordToggles();

    const form = document.getElementById("registerForm");
    if (!form) return;

    // Fill demo button on register.html if present
    const fillDemoSignupBtn = document.getElementById("fillDemoSignupBtn");
    if (fillDemoSignupBtn) {
      fillDemoSignupBtn.addEventListener("click", () => {
        const fullNameEl = document.getElementById("regFullName") || document.getElementById("regFirstName");
        const emailEl = document.getElementById("regEmail");
        const phoneEl = document.getElementById("regPhone");
        const passEl = document.getElementById("regPass");
        const pass2El = document.getElementById("regPass2");
        const termsEl = document.getElementById("regTerms");
        if (fullNameEl) fullNameEl.value = "nc";
        if (emailEl) emailEl.value = "nc@gmail.com";
        if (phoneEl) phoneEl.value = "9786923694";
        if (passEl) passEl.value = "arun2003";
        if (pass2El) pass2El.value = "arun2003";
        if (termsEl) termsEl.checked = true;
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const pass = document.getElementById("regPass");
      const pass2 = document.getElementById("regPass2");
      if (pass && pass2) {
        pass2.setCustomValidity(pass.value !== pass2.value ? "Passwords do not match." : "");
      }
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const fullNameInput = document.getElementById("regFullName") || document.getElementById("regFirstName");
      const fullName = fullNameInput ? fullNameInput.value.trim() : "Customer";
      const email = document.getElementById("regEmail") ? document.getElementById("regEmail").value.trim() : "";
      const phone = document.getElementById("regPhone") ? document.getElementById("regPhone").value.trim() : "";
      const password = pass ? pass.value : "";

      const [firstName, ...rest] = fullName.split(/\s+/);
      const lastName = rest.join(" ");

      const result = registerCustomer({
        firstName: firstName || fullName,
        lastName: lastName || "",
        email,
        phone,
        password
      });

      try {
        sessionStorage.setItem("lastRegisteredName", fullName);
        sessionStorage.setItem("lastRegisteredEmail", email);
      } catch (err) {}

      // If on standalone register.html, redirect to login.html with registered params (Screenshot 3)
      if (currentFile() === "register.html") {
        window.location.href = `login.html?registered=true&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}`;
        return;
      }

      // If in login.html (in #signupPane tab): switch to Customer Login tab, prefill email, show Screenshot 3 alert
      const customerTab = document.getElementById("customerTabBtn");
      if (customerTab && window.bootstrap) {
        bootstrap.Tab.getOrCreateInstance(customerTab).show();
      }

      const loginEmail = document.getElementById("loginEmail");
      if (loginEmail) loginEmail.value = email;

      const loginPass = document.getElementById("loginPass");
      if (loginPass) loginPass.value = "";

      const dummyNameEl = document.getElementById("dummySignInName");
      if (dummyNameEl) dummyNameEl.textContent = fullName;

      const successBox = document.getElementById("successMessage");
      if (successBox) successBox.hidden = true;

      const accountCreatedAlert = document.getElementById("accountCreatedAlert");
      if (accountCreatedAlert) {
        accountCreatedAlert.hidden = false;
        accountCreatedAlert.focus?.();
        accountCreatedAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });

    document.getElementById("regPass2")?.addEventListener("input", function () {
      this.setCustomValidity("");
    });
  };

  const initAdminRegisterPage = () => {
    const form = document.getElementById("adminRegisterForm");
    if (!form) return;
    const email = document.getElementById("adminRegEmail");
    const pass = document.getElementById("adminRegPass");
    const pass2 = document.getElementById("adminRegPass2");
    const emailFeedback = email?.closest(".mb-3")?.querySelector(".invalid-feedback");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      pass2.setCustomValidity(pass.value !== pass2.value ? "Passwords do not match." : "");
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }

      const result = registerAdmin({
        fullName: document.getElementById("adminRegName").value.trim(),
        email: email.value.trim(),
        password: pass.value
      });
      if (!result.ok) {
        email.setCustomValidity(result.message);
        if (emailFeedback) emailFeedback.textContent = result.message;
        form.classList.add("was-validated");
        return;
      }
      const successBox = document.getElementById("adminRegisterSuccess");
      if (successBox) { successBox.hidden = false; successBox.focus?.(); }
      window.setTimeout(() => { window.location.href = "login.html#admin-login"; }, 750);
    });

    email?.addEventListener("input", () => {
      email.setCustomValidity("");
      if (emailFeedback) emailFeedback.textContent = "Enter a valid email address.";
    });
    pass2?.addEventListener("input", () => pass2.setCustomValidity(""));
  };

  /* ---------------------------------------------------------- */
  /* Customer profile form (customer-dashboard.html)              */
  /* ---------------------------------------------------------- */

  const initProfileForm = () => {
    const form = document.getElementById("profileForm");
    if (!form) return;
    const session = getSession();
    if (!session) return;
    const currentUser = getCurrentUser() || buildCurrentUser(session);

    const nameField = document.getElementById("pfName");
    const mailField = document.getElementById("pfMail");
    const phoneField = document.getElementById("pfPhone");
    const addrField = document.getElementById("pfAddr");
    const scheduleField = document.getElementById("pfSchedule");
    const notesField = document.getElementById("pfNotes");
    const alertBox = form.querySelector("[data-form-alert]");

    /* Always load the signed-in user's own data - never a template  */
    /* placeholder - regardless of what the static markup shipped.   */
    if (nameField) nameField.value = currentUser.fullName || "";
    if (mailField) mailField.value = currentUser.email || "";
    if (phoneField) phoneField.value = currentUser.phone || "";
    if (addrField) addrField.value = currentUser.address || "";
    if (scheduleField && session.schedule) scheduleField.value = session.schedule;
    if (notesField) notesField.value = session.notes || "";

    /* Card holder name on the payment modal should also reflect the  */
    /* real user, not the template's demo name.                       */
    const cardHolder = document.getElementById("cardHolder");
    if (cardHolder && !cardHolder.value) cardHolder.value = currentUser.fullName || "";

    let currentEmail = session.email;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
      const [firstName, ...rest] = (nameField.value || "").trim().split(" ");
      updateProfile(currentEmail, {
        firstName: firstName || session.firstName,
        lastName: rest.join(" ") || session.lastName,
        email: mailField ? mailField.value.trim() || currentEmail : currentEmail,
        phone: phoneField ? phoneField.value : session.phone,
        address: addrField ? addrField.value : session.address,
        schedule: scheduleField ? scheduleField.value : session.schedule,
        notes: notesField ? notesField.value : session.notes
      });
      currentEmail = mailField ? (mailField.value.trim() || currentEmail) : currentEmail;
      updateNavbar();
      if (cardHolder) cardHolder.value = nameField ? nameField.value : cardHolder.value;
      if (alertBox) {
        alertBox.hidden = false;
        alertBox.focus?.();
        window.clearTimeout(alertBox._spHideTimer);
        alertBox._spHideTimer = window.setTimeout(() => { alertBox.hidden = true; }, 3500);
      }
    });
  };

  /* ---------------------------------------------------------- */
  /* Data Management (Bookings, Invoices, Messages)              */
  /* ---------------------------------------------------------- */
  
  const seedCleaners = () => {
    let cleaners = getCleaners();
    if (!cleaners || cleaners.length === 0) {
      cleaners = [
        { id: "CL-101", name: "Marcus Vance", phone: "+1 800 555 0142", email: "marcus@crystalclean.com", rating: "4.98", jobs: 240, hours: 38, van: "Van #1 (Commercial Skid Rig)", area: "Downtown Commercial", status: "Available", panesWashed: "1,204 Panes", avatar: "assets/images/team/team-01.webp" },
        { id: "CL-102", name: "Liam Chen", phone: "+1 800 555 0143", email: "liam@crystalclean.com", rating: "4.95", jobs: 198, hours: 42, van: "Van #3 (Conservatory & Atrium)", area: "Lakeside Solariums", status: "On site", panesWashed: "2,187 Panes", avatar: "assets/images/team/team-02.webp" },
        { id: "CL-103", name: "Hana Sato", phone: "+1 800 555 0144", email: "hana@crystalclean.com", rating: "4.99", jobs: 312, hours: 36, van: "Van #2 (High-Reach Pure Water)", area: "Riverside North", status: "Washing", panesWashed: "3,410 Panes", avatar: "assets/images/team/team-03.webp" },
        { id: "CL-104", name: "Elena Rostova", phone: "+1 800 555 0145", email: "elena@crystalclean.com", rating: "5.0", jobs: 112, hours: 40, van: "Van #4 (IRATA Rope Rig)", area: "Metro Towers", status: "Certified", panesWashed: "890 Panes", avatar: "assets/images/team/team-04.webp" }
      ];
      saveCleaners(cleaners);
    }
  };

  const seedBookingsAndInvoices = () => {
    let bookings = getBookings();
    if (!bookings || bookings.length === 0) {
      bookings = [
        { id: "BK-4821", userId: "seed_customer_01", service: "Residential Window Cleaning (28 Panes)", date: "2026-10-24", time: "10:00 - 12:00", cleaner: "Hana Sato (Van #3)", price: "118.80", status: "Confirmed", invoiceId: "INV-2290" },
        { id: "BK-4822", userId: "seed_customer_02", service: "Commercial Curtain Wall & Atrium (140 Panes)", date: "2026-10-24", time: "08:30 - 14:00", cleaner: "Marcus Vance (Van #1)", price: "620.00", status: "In Progress", invoiceId: "INV-2291" },
        { id: "BK-4823", userId: "seed_customer_01", service: "Exterior Pure Water Wash + Skylights", date: "2026-06-15", time: "08:00 - 10:00", cleaner: "Marcus Vance", price: "149.00", status: "Completed", invoiceId: "INV-2274" },
        { id: "BK-4824", userId: "seed_customer_02", service: "High-Rise Rope Access Window Wash", date: "2026-10-26", time: "08:00 - 16:30", cleaner: "Elena Rostova (Van #4)", price: "1,250.00", status: "Confirmed", invoiceId: "INV-2292" },
        { id: "BK-4825", userId: "seed_customer_01", service: "Conservatory Deep Moss Removal & Sills", date: "2026-04-10", time: "12:00 - 14:00", cleaner: "Liam Chen", price: "179.00", status: "Completed", invoiceId: "INV-2251" }
      ];
      saveBookings(bookings);
    }
    let invoices = getInvoices();
    if (!invoices || invoices.length === 0) {
      invoices = [
        { id: "INV-2290", userId: "seed_customer_01", service: "Residential Window Cleaning", date: "2026-10-24", amount: "118.80", status: "Paid" },
        { id: "INV-2291", userId: "seed_customer_02", service: "Commercial Curtain Wall & Atrium", date: "2026-10-24", amount: "620.00", status: "Unpaid" },
        { id: "INV-2274", userId: "seed_customer_01", service: "Exterior Pure Water Wash + Skylights", date: "2026-06-15", amount: "149.00", status: "Paid" },
        { id: "INV-2292", userId: "seed_customer_02", service: "High-Rise Rope Access Window Wash", date: "2026-10-26", amount: "1,250.00", status: "Paid" },
        { id: "INV-2251", userId: "seed_customer_01", service: "Conservatory Deep Moss Removal", date: "2026-04-10", amount: "179.00", status: "Paid" }
      ];
      saveInvoices(invoices);
    }
  };

  const CLEANERS_KEY = "sp_cleaners";
  const getCleaners = () => {
    try { return JSON.parse(localStorage.getItem(CLEANERS_KEY)) || []; }
    catch(e) { return []; }
  };
  const saveCleaners = (data) => localStorage.setItem(CLEANERS_KEY, JSON.stringify(data));
  const addCleaner = (cleanerData) => {
     const cleaners = getCleaners();
     const cleaner = {
        id: "CL-" + Math.floor(Math.random() * 9000 + 1000),
        rating: '5.0',
        jobs: 0,
        hours: 0,
        ...cleanerData
     };
     cleaners.push(cleaner);
     saveCleaners(cleaners);
     return cleaner;
  };

  const BOOKINGS_KEY = "sp_bookings";
  const INVOICES_KEY = "sp_invoices";
  
  const getBookings = () => {
    try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || []; }
    catch(e) { return []; }
  };
  const saveBookings = (data) => localStorage.setItem(BOOKINGS_KEY, JSON.stringify(data));

  const getInvoices = () => {
    try { return JSON.parse(localStorage.getItem(INVOICES_KEY)) || []; }
    catch(e) { return []; }
  };
  const saveInvoices = (data) => localStorage.setItem(INVOICES_KEY, JSON.stringify(data));

  const createBooking = (bookingData) => {
    const bookings = getBookings();
    const invoices = getInvoices();
    
    // Create Invoice
    const invoiceId = "INV-" + Math.floor(Math.random() * 9000 + 1000);
    const invoice = {
       id: invoiceId,
       userId: bookingData.userId,
       service: bookingData.service,
       date: bookingData.date,
       amount: bookingData.price,
       status: 'Unpaid'
    };
    invoices.push(invoice);
    saveInvoices(invoices);
    
    // Create Booking
    const booking = {
       id: "SP-" + Math.floor(Math.random() * 9000 + 1000),
       userId: bookingData.userId,
       service: bookingData.service,
       date: bookingData.date,
       time: bookingData.time,
       status: 'Confirmed',
       price: bookingData.price,
       invoiceId: invoiceId
    };
    bookings.push(booking);
    saveBookings(bookings);
    
    return { booking, invoice };
  };

  const getBookingsForUser = (userId) => getBookings().filter(b => b.userId === userId);
  const getInvoicesForUser = (userId) => getInvoices().filter(i => i.userId === userId);
  

  
  /* Universal password visibility toggle */
  document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".auth-toggle-pass");
    if (!toggleBtn) return;
    const container = toggleBtn.closest(".auth-input");
    if (!container) return;
    const input = container.querySelector("input");
    if (!input) return;
    const isPass = input.getAttribute("type") === "password";
    input.setAttribute("type", isPass ? "text" : "password");
    toggleBtn.setAttribute("aria-label", isPass ? "Hide password" : "Show password");
    const icon = toggleBtn.querySelector("i");
    if (icon) {
      icon.className = isPass ? "bi bi-eye-slash" : "bi bi-eye";
    }
  });

  /* Auto-fill demo credentials helper */
  document.addEventListener("click", (e) => {
    const fillBtn = e.target.closest("[data-fill-demo]");
    if (!fillBtn) return;
    const email = fillBtn.getAttribute("data-email");
    const pass = fillBtn.getAttribute("data-pass");
    const type = fillBtn.getAttribute("data-type") || "customer";
    if (type === "admin") {
      const emailInput = document.getElementById("adminEmail");
      const passInput = document.getElementById("adminPass");
      if (emailInput) { emailInput.value = email; emailInput.dispatchEvent(new Event("input")); }
      if (passInput) { passInput.value = pass; passInput.dispatchEvent(new Event("input")); }
    } else {
      const emailInput = document.getElementById("loginEmail");
      const passInput = document.getElementById("loginPass");
      if (emailInput) { emailInput.value = email; emailInput.dispatchEvent(new Event("input")); }
      if (passInput) { passInput.value = pass; passInput.dispatchEvent(new Event("input")); }
    }
  });

  /* Global Sign Out Handler for any sign out button or link */
  document.addEventListener("click", (e) => {
    const logoutBtn = e.target.closest("[data-auth-logout], .ref-nav-signout, a[href*='login.html'].signout, a[href*='logout']");
    if (logoutBtn) {
      e.preventDefault();
      logout();
    }
  });

  /* ---------------------------------------------------------- */
  /* Boot                                                         */
  /* ---------------------------------------------------------- */

  seedUsers();
  seedCleaners();
  seedBookingsAndInvoices();
  requireAuth();
  updateNavbar();
  initAdminChrome();

  const onReady = (fn) => document.readyState !== "loading"
    ? fn() : document.addEventListener("DOMContentLoaded", fn);

  onReady(() => {
    initLoginPage();
    initRegisterPage();
    initAdminRegisterPage();
    initProfileForm();
    initCustomerDashboardChrome();
  });

  document.getElementById("paymentModal")?.addEventListener("show.bs.modal", () => {
    const cardHolder = document.getElementById("cardHolder");
    if (!cardHolder || cardHolder.value) return;
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.fullName) cardHolder.value = currentUser.fullName;
  });

  window.SP_AUTH = { getCleaners, addCleaner, createBooking, getBookings, getInvoices, getBookingsForUser, getInvoicesForUser, getUsers, login, logout, registerCustomer, getSession, updateProfile, getCurrentUser };
})();
