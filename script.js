const openChatGPTButton = document.getElementById("openChatGPTButton");
const openCopilotButton = document.getElementById("openCopilotButton");
const openClaudeButton = document.getElementById("openClaudeButton");
const openGeminiButton = document.getElementById("openGeminiButton");
const searchInput = document.getElementById("catalogSearchInput");
const categorySelect = document.getElementById("catalogCategorySelect");
const catalogCategories = document.querySelectorAll(".ia-category");

if (openChatGPTButton) {
  openChatGPTButton.addEventListener("click", () => {
    window.open("https://chat.openai.com/chat", "_blank");
  });
}

if (openCopilotButton) {
  openCopilotButton.addEventListener("click", () => {
    window.open("https://copilot.microsoft.com/", "_blank");
  });
}

if (openClaudeButton) {
  openClaudeButton.addEventListener("click", () => {
    window.open("https://claude.ai/", "_blank");
  });
}

if (openGeminiButton) {
  openGeminiButton.addEventListener("click", () => {
    window.open("https://gemini.google/", "_blank");
  });
}

function setupCategoryToggles() {
  document.querySelectorAll(".ia-category").forEach(categoryBlock => {
    const heading = categoryBlock.querySelector("h3");
    const list = categoryBlock.querySelector(".ia-list");
    if (!heading || !list) return;

    const wrapper = document.createElement("div");
    wrapper.className = "category-header";
    heading.parentNode.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-toggle-button";
    button.textContent = "Afficher";
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const hidden = list.classList.toggle("collapsed");
      list.style.display = hidden ? "none" : "block";
      button.textContent = hidden ? "Afficher" : "Masquer";
      button.setAttribute("aria-expanded", hidden ? "false" : "true");
    });

    wrapper.appendChild(button);

    list.classList.add("collapsed");
    list.style.display = "none";
  });
}

function setupCatalogLinks() {
  const iaLinks = {
    "chatgpt": "https://chat.openai.com/chat",
    "microsoft copilot": "https://copilot.microsoft.com/",
    "copilot": "https://copilot.microsoft.com/",
    "claude": "https://claude.ai/",
    "gemini": "https://gemini.google/",
    "perplexity": "https://www.perplexity.ai/",
    "huggingchat": "https://huggingface.co/chat",
    "youchat": "https://youchat.com/",
    "pi ai": "https://pi.ai/",
    "character ai": "https://beta.character.ai/",
    "replika": "https://replika.com/",
    "openassistant": "https://open-assistant.io/",
    "janitor ai": "https://janitor.ai/",
    "notion ai": "https://www.notion.so/product/ai",
    "elevenlabs": "https://elevenlabs.io/",
    "descript": "https://www.descript.com/",
    "runway": "https://runwayml.com/",
    "synthesia": "https://www.synthesia.io/",
    "heygen": "https://www.heygen.com/",
    "voice mod": "https://www.voicemod.net/",
    "murf ai": "https://murf.ai/",
    "notion":"https://www.notion.so/",
    "slack ai": "https://slack.com/",
    "zapier ai": "https://zapier.com/apps/zapier/integrations",
    "airtable ai": "https://airtable.com/",
    "google colab": "https://colab.research.google.com/",
    "huggin face": "https://huggingface.co/",
    "huggin face":"https://huggingface.co/",
    "hugging face":"https://huggingface.co/"
  };

  document.querySelectorAll(".ia-item").forEach(item => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      const name = item.textContent.trim();
      const key = name.toLowerCase();
      const target = iaLinks[key] || `https://www.google.com/search?q=${encodeURIComponent(name + " chat")}`;
      window.open(target, "_blank");
    });
  });
}

setupCategoryToggles();
setupCatalogLinks();

function filterCatalog() {
  const query = searchInput?.value.trim().toLowerCase() ?? "";
  const selectedCategory = categorySelect?.value ?? "all";

  catalogCategories.forEach(categoryBlock => {
    const categoryValue = categoryBlock.dataset.category;
    const items = Array.from(categoryBlock.querySelectorAll(".ia-item"));
    let categoryVisible = false;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const matchesQuery = query === "" || text.includes(query);
      const matchesCategory = selectedCategory === "all" || selectedCategory === categoryValue;
      const visible = matchesQuery && matchesCategory;

      item.style.display = visible ? "" : "none";
      if (visible) categoryVisible = true;
    });

    if (categoryVisible) {
      const list = categoryBlock.querySelector(".ia-list");
      const button = categoryBlock.querySelector(".category-toggle-button");
      if (list && list.classList.contains("collapsed")) {
        list.classList.remove("collapsed");
        list.style.display = "block";
        if (button) {
          button.textContent = "Masquer";
          button.setAttribute("aria-expanded", "true");
        }
      }
    }

    categoryBlock.style.display = categoryVisible ? "" : "none";
  });
}

function collapseAllCategories() {
  document.querySelectorAll(".ia-category").forEach(categoryBlock => {
    const list = categoryBlock.querySelector(".ia-list");
    const button = categoryBlock.querySelector(".category-toggle-button");
    if (!list || !button) return;

    list.classList.add("collapsed");
    list.style.display = "none";
    button.textContent = "Afficher";
    button.setAttribute("aria-expanded", "false");
  });
}

if (searchInput) {
  searchInput.addEventListener("input", filterCatalog);
  searchInput.addEventListener("blur", () => {
    if (searchInput.value.trim() === "") {
      collapseAllCategories();
    }
  });
}

if (categorySelect) {
  categorySelect.addEventListener("change", filterCatalog);
}
