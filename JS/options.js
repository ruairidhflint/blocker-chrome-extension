class ItemList {
  constructor(list) {
    this.blockedList = list || [];
    this.app = this.getElement("#root-options");
    this.list = this.createElement("ul", "list");
    this.form = this.getElement("#options-form");
    this.input = this.getElement("#option-input");

    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.form.addEventListener("submit", this.onSubmit);

    this.app.append(this.list);
    this.displayList(this.blockedList);
  }

  // Create HTML element
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  // Get element from DOM
  getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  // Display blocked list
  displayList(blockedList) {
    // Clear existing list
    this.list.innerHTML = "";

    if (blockedList.length === 0) {
      const p = this.createElement("p", "empty-blocked-list");
      p.textContent = "Nothing here yet!";
      this.list.append(p);
    } else {
      blockedList.forEach((item) => {
        const li = this.createElement("li", "blocked-list-item");
        li.id = item;

        const span = this.createElement("span", "blocker-list-text");
        span.textContent = item;

        const image = this.createElement("img", "blocker-list-img");
        image.src = `https://www.google.com/s2/favicons?domain=${item}`;
        image.alt = `Favicon for ${item}`;

        const deleteButton = this.createElement(
          "button",
          "blocker-list-button"
        );
        deleteButton.textContent = "×";
        deleteButton.setAttribute(
          "aria-label",
          `Remove ${item} from blocklist`
        );
        deleteButton.addEventListener("click", () => this.deleteItem(item));

        li.append(image, span, deleteButton);
        this.list.append(li);
      });
    }
  }

  // Delete item from blocked list
  async deleteItem(id) {
    try {
      const updatedBlockedList = this.blockedList.filter((item) => item !== id);

      await chrome.storage.local.set({
        shiaBlocked: JSON.stringify(updatedBlockedList),
      });

      this.blockedList = updatedBlockedList;
      this.displayList(this.blockedList);
      console.log("Successfully removed from block list:", id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  // Add new item to blocked list
  async addNewItem(newItem) {
    try {
      // Normalize the domain before adding
      const normalizedItem = normalizeDomain(newItem);

      // Check if already exists (case-insensitive)
      const exists = this.blockedList.some(
        (item) => normalizeDomain(item) === normalizedItem
      );

      if (exists) {
        this.setInputError("Domain already blocked");
        return;
      }

      this.blockedList = [...this.blockedList, normalizedItem];

      await chrome.storage.local.set({
        shiaBlocked: JSON.stringify(this.blockedList),
      });

      this.displayList(this.blockedList);
      this.resetInput();
      console.log("Successfully added to block list:", normalizedItem);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  }

  // Reset input field
  resetInput() {
    this.input.style.border = "1px solid rgb(230, 230, 230)";
    this.input.placeholder = "Add Website to Blocklist eg. instagram.com";
    this.input.value = "";
  }

  // Set input error state
  setInputError(message) {
    this.input.value = "";
    this.input.placeholder = message;
    this.input.style.border = "1px solid red";
    this.input.focus();
  }

  // Handle form submission
  async onSubmit(e) {
    e.preventDefault();

    const inputValue = this.input.value.trim();

    if (!inputValue) {
      this.setInputError("Please enter a website");
      return;
    }

    if (this.checkURLRepetition(inputValue)) {
      this.setInputError("URL already blocked");
      return;
    }

    if (this.validateURL(inputValue)) {
      await this.addNewItem(inputValue);
    } else {
      this.setInputError("Invalid URL");
    }
  }

  // Validate URL format
  validateURL(url) {
    if (!url || typeof url !== "string") return false;

    // More comprehensive domain validation
    const domainRegex =
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    // Check length constraints
    if (url.length > 253) return false;

    // Check for valid domain format
    if (!domainRegex.test(url)) return false;

    // Additional checks for common issues
    if (url.includes("..") || url.startsWith(".") || url.endsWith("."))
      return false;

    return true;
  }

  // Check if URL already exists in blocked list
  checkURLRepetition(url) {
    const normalizedUrl = normalizeDomain(url);
    return this.blockedList.some(
      (item) => normalizeDomain(item) === normalizedUrl
    );
  }
}

// Normalize domain for consistent comparison
function normalizeDomain(domain) {
  if (!domain) return "";

  // Convert to lowercase and remove www. prefix for comparison
  let normalized = domain.toLowerCase().trim();

  // Remove www. prefix if present
  if (normalized.startsWith("www.")) {
    normalized = normalized.substring(4);
  }

  return normalized;
}

// Initialize the app
async function initializeApp() {
  try {
    const data = await chrome.storage.local.get("shiaBlocked");
    const blockedList = JSON.parse(data.shiaBlocked || "[]");
    new ItemList(blockedList);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
