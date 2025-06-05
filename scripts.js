// components.js
class GlobalComponents {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
            
            // Reinitialize event listeners and functionality
            if (elementId === 'header') {
                this.initializeHeader();
                // Call setActiveHeaderLink if it exists
                if (typeof setActiveHeaderLink === 'function') {
                    setActiveHeaderLink();
                }
            }
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }

    static initializeHeader() {
        // Reinitialize dropdown functionality
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-content').style.display = 'block';
            });
            dropdown.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown-content').style.display = 'none';
            });
        });
    }

    static async initializeComponents() {
        await this.loadComponent('header', 'components/header.html');
        await this.loadComponent('footer', 'components/footer.html');
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Document is ready.');
    
    // Initialize global components first
    await GlobalComponents.initializeComponents();

    // Function to update image map hotspots dynamically based on image size
    function updateHotspots() {
        const img = document.getElementById('background-img');
        if (!img) {
            console.log('Background image not found.');
            return;
        }
        const width = img.clientWidth;
        const height = img.clientHeight;
        const map = document.querySelector('map[name="building-map"]');
        if (!map) {
            console.log('Image map not found.');
            return;
        }
        const areas = map.getElementsByTagName('area');

        const coords = {
            shape4: [400, 550, 920, 650],
            shape5: [200, 550, 400, 650]
        };

        for (let i = 0; i < areas.length; i++) {
            if (coords['shape' + (i + 4)]) {
                areas[i].coords = coords['shape' + (i + 4)]
                    .map(coord => Math.round(coord * width / 1920))
                    .join(',');
            } else {
                console.warn(`No coordinates found for area shape${i + 4}.`);
            }
        }
    }

    window.addEventListener('resize', updateHotspots);
    updateHotspots();

    // Function to update navigation links in the header
    function updateNavigationLinks() {
        const links = {
            "AVENUE METRO": "index.html",
			"1ST FL Shopping": "avenuemetro_shop.html",
            "2ND FL Play Zone": "avenuemetro_game_room.html",
            "3RD FL Lounge": "avenuemetro_lounge.html",
            "4TH FL Movie Theater": "avenuemetro_theater.html"
        };

        document.querySelectorAll('.header-center .dropdown').forEach(dropdown => {
            const span = dropdown.querySelector('span');
            if (!span) {
                console.warn('Dropdown span not found.');
                return;
            }
            const linkText = span.textContent.trim();
            if (links[linkText]) {
                span.innerHTML = `<a href="${links[linkText]}" style="color: white; text-decoration: none;">${linkText}</a>`;
            } else {
                console.warn(`No matching link found for text: ${linkText}`);
            }
        });

        const headerLeft = document.querySelector('.header-left');
        if (headerLeft) {
            console.log('Updating AVENUE METRO link.');
            headerLeft.innerHTML = `<a href="${links['AVENUE METRO']}" style="color: white; text-decoration: none;">${headerLeft.textContent}</a>`;
        }
    }

    // Call updateNavigationLinks after components are loaded
    updateNavigationLinks();

    // Chatbot functionality
    const userInput = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');

    if (!userInput || !chatOutput) {
        console.error('Chat elements not found.');
        return;
    }

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && userInput.value.trim() !== '') {
            const message = userInput.value.trim();
            userInput.value = ''; // Clear the input field

            displayMessage('You: ' + message);

            fetch('https://your-backend-url.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayMessage('Alina: ' + data.response);
            })
            .catch(error => {
                console.error('Error:', error);
                displayMessage('Alina: Sorry, I am having trouble responding right now.');
            });
        }
    });

    // Function to display messages in the chat output
    function displayMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        chatOutput.appendChild(messageDiv);
        chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the latest message
    }

    // Highlight the active header link based on the current page
    function setActiveHeaderLink() {
        // Get the current page filename (e.g., "avenuemetro_shop.html")
        const currentPage = window.location.pathname.split('/').pop();

        // Select all header links in the main nav
        const headerLinks = document.querySelectorAll('.header-center .dropdown > a');

        headerLinks.forEach(link => {
            // Remove any existing 'active' class
            link.classList.remove('active');
            // If the link's href matches the current page, add 'active'
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
});