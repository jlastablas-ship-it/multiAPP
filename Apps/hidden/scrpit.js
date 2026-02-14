class HTMLIframeManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error('Container not found');
            return;
        }
        this.iframe = null;
        this.taskbar = null;
        this.backButton = null;
        this.forwardButton = null;
        this.refreshButton = null;
        this.urlInput = null;
        this.goButton = null;

        this.render();
        this.setupEventListeners();
    }

    render() {
        // Taskbar creation
        this.taskbar = document.createElement('div');
        this.taskbar.style.cssText = 'display: flex; align-items: center; padding: 5px; background-color: #f0f0f0;';

        // Buttons and Input
        this.backButton = this.createButton('Back', () => this.goBack());
        this.forwardButton = this.createButton('Forward', () => this.goForward());
        this.refreshButton = this.createButton('Refresh', () => this.refresh());
        this.urlInput = document.createElement('input');
        this.urlInput.type = 'text';
        this.urlInput.style.cssText = 'flex-grow: 1; margin: 0 5px; padding: 5px;';
        this.goButton = this.createButton('Go', () => this.goToUrl(this.urlInput.value));

        this.taskbar.appendChild(this.backButton);
        this.taskbar.appendChild(this.forwardButton);
        this.taskbar.appendChild(this.refreshButton);
        this.taskbar.appendChild(this.urlInput);
        this.taskbar.appendChild(this.goButton);

        // Iframe creation
        this.iframe = document.createElement('iframe');
        this.iframe.style.cssText = 'width: 100%; height: 600px; border: 1px solid #ccc;';
        this.iframe.src = 'about:blank'; // Default empty page

        // Append to container
        this.container.appendChild(this.taskbar);
        this.container.appendChild(this.iframe);
    }

    createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.margin = '0 2px';
        button.onclick = onClick;
        return button;
    }

    setupEventListeners() {
        // Event listeners are already set up in createButton, but can add more here if needed
    }

    goBack() {
        try {
            this.iframe.contentWindow.history.back();
        } catch (e) {
            console.warn('Could not go back:', e);
        }
    }

    goForward() {
        try {
            this.iframe.contentWindow.history.forward();
        } catch (e) {
            console.warn('Could not go forward:', e);
        }
    }

    refresh() {
        try {
            this.iframe.contentWindow.location.reload();
        } catch (e) {
            console.warn('Could not refresh:', e);
        }
    }

    goToUrl(url) {
        // Basic URL validation and normalization
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        this.iframe.src = url;
    }
}

// Usage:
// Asegúrate de tener un elemento contenedor en tu HTML con el id 'iframe-container'
document.addEventListener('DOMContentLoaded', () => {
 new HTMLIframeManager('#iframe-container');
 });


