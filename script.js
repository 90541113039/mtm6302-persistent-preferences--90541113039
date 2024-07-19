document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const listStyleSelect = document.getElementById('list-style-select');
    const fontSizeSelect = document.getElementById('font-size-select');
    const dynamicList = document.getElementById('dynamic-list');
    const customThemePanel = document.getElementById('custom-theme');
    const themeColor = document.getElementById('theme-color');
    const newItemInput = document.getElementById('new-item');
    const addItemButton = document.getElementById('add-item');
    const searchInput = document.getElementById('search');

    // Load preferences from local storage
    const savedTheme = localStorage.getItem('theme');
    const savedListStyle = localStorage.getItem('listStyle');
    const savedFontSize = localStorage.getItem('fontSize');

    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeSelect.value = savedTheme;
        if (savedTheme === 'theme-custom') {
            customThemePanel.style.display = 'block';
            document.documentElement.style.setProperty('--custom-bg-color', localStorage.getItem('customBgColor'));
            document.documentElement.style.setProperty('--custom-text-color', localStorage.getItem('customTextColor'));
            themeColor.value = localStorage.getItem('customBgColor') || '#ffffff';
        }
    }

    if (savedListStyle) {
        dynamicList.classList.add(savedListStyle);
        listStyleSelect.value = savedListStyle;
    }

    if (savedFontSize) {
        dynamicList.classList.add(savedFontSize);
        fontSizeSelect.value = savedFontSize;
    }

    // Add event listeners
    themeSelect.addEventListener('change', () => {
        document.body.className = '';
        document.body.classList.add(themeSelect.value);
        if (themeSelect.value === 'theme-custom') {
            customThemePanel.style.display = 'block';
        } else {
            customThemePanel.style.display = 'none';
        }
        localStorage.setItem('theme', themeSelect.value);
    });

    themeColor.addEventListener('input', () => {
        document.documentElement.style.setProperty('--custom-bg-color', themeColor.value);
        localStorage.setItem('customBgColor', themeColor.value);
    });

    listStyleSelect.addEventListener('change', () => {
        dynamicList.className = '';
        dynamicList.classList.add(listStyleSelect.value);
        localStorage.setItem('listStyle', listStyleSelect.value);
    });

    fontSizeSelect.addEventListener('change', () => {
        dynamicList.className = '';
        dynamicList.classList.add(fontSizeSelect.value);
        localStorage.setItem('fontSize', fontSizeSelect.value);
    });

    addItemButton.addEventListener('click', () => {
        const newItem = newItemInput.value.trim();
        if (newItem) {
            const listItem = document.createElement('li');
            listItem.textContent = newItem;

            // Create a remove button for each list item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-item';
            removeButton.addEventListener('click', () => {
                listItem.remove();
                saveListItems();
            });

            listItem.appendChild(removeButton);
            dynamicList.appendChild(listItem);

            newItemInput.value = '';
            saveListItems();
        }
    });

    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        Array.from(dynamicList.children).forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    function saveListItems() {
        const items = Array.from(dynamicList.children).map(li => li.textContent.replace('Remove', '').trim());
        localStorage.setItem('listItems', JSON.stringify(items));
    }

    // Load list items from local storage
    const savedListItems = JSON.parse(localStorage.getItem('listItems'));
    if (savedListItems) {
        savedListItems.forEach(itemText => {
            const listItem = document.createElement('li');
            listItem.textContent = itemText;

            // Create a remove button for each list item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-item';
            removeButton.addEventListener('click', () => {
                listItem.remove();
                saveListItems();
            });

            listItem.appendChild(removeButton);
            dynamicList.appendChild(listItem);
        });
    }
});
