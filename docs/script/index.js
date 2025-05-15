import * as APPContent from './content.js';
import * as SNAKE from './snake.js';

const osDisplay = document.getElementById('os-screen-content');  
const osFooterToggle = document.getElementById('os-footer-burger_menu'); 
const osFooterMenu = document.getElementById('os-footer-menu-display'); 
const osFooterApps = document.getElementById('os-footer-apps');

const iconAboutMe = document.getElementById('mainscreen-applications_AboutMe');
const iconSnakeGame = document.getElementById('mainscreen-applications_SnakeGame');
const iconCredits = document.getElementById('mainscreen-applications_Credits');

const audioDown = document.getElementById('mousedown_click');

let tempStatus = null;
let isDragging = false;
let currentAppIndex = null;
let offsetX, offsetY;

// Apps array
const osApps = [
    {
        index: 1,
        name: 'Portfolio',
        image: './media/images/icon-aboutme.png',
        status: 'closed',
        toolbarclass: 'app-aboutme-toolbar',
        contentclass: 'app-aboutme-content',
        content: APPContent.aboutMeContent()
    },
    {
        index: 2,
        name: 'Snake',
        image: './media/images/icon-snake-nobg.png',
        status: 'closed',
        toolbarclass: 'app-snakeGame-toolbar',
        contentclass: 'app-snakeGame-content',
        content: APPContent.snakeGame()
    },
    {
        index: 3,
        name: 'Credits',
        image: './media/images/icon-wordle.png',
        status: 'closed',
        toolbarclass: 'app-credits-toolbar',
        contentclass: 'app-credits-content',
        content: APPContent.credits()
    }
];

// Onload function
async function onLoad() {

    // build aboutme app
    const app = osApps.find(app => app.index === 1);
    buildAppScreen(app);
    APPContent.acAbout();
}

// Build app screen for a given app
async function buildAppScreen(app) {
    if (app.status === 'closed') {
        const containerDiv = document.createElement('div');
        const appDiv = document.createElement('div');
        containerDiv.classList.add('app-screen-container');
        containerDiv.id = `container-main-${app.index}`;
        appDiv.classList.add('app-screen');
        appDiv.id = `app-main-${app.index}`;

        appDiv.innerHTML = `
            <div class="as-toolbar ${app.toolbarclass}" id="as-toolbar-${app.index}">
                <div class="dynamic-toolbar" id="as-toolbar-name-${app.index}"><img src="${app.image}" alt="App Screen ${app.name} image"/>${app.name}</div>
                <div class="as-toolbar-min" id="as-toolbar-minimize-${app.index}">-</div>
                <div class="as-toolbar-max" id="as-toolbar-maximize-${app.index}">□</div>
                <div class="as-toolbar-exit" id="as-toolbar-exit-${app.index}">x</div>
            </div>
            <div id="as-content-${app.index}" class="as-content ${app.contentclass}">${app.content}</div>
        `;

        containerDiv.appendChild(appDiv);

        osDisplay.appendChild(containerDiv);
        addWindowToFooter(app.index);
        toggleZIndexes(app.index);

        if (app.index === 2) {
            initializeSnakeGame();
        }
        if (app.index === 3) {
            addCreditsClickListener();
        }

        document.getElementById(`as-toolbar-${app.index}`).addEventListener('pointerdown', (e) => startDrag(e, app.index));
        document.getElementById(`as-toolbar-minimize-${app.index}`).addEventListener('click', () => toggleMinimizeScreenWindow(app.index));
        document.getElementById(`as-toolbar-maximize-${app.index}`).addEventListener('click', () => toggleFullScreenWindow(app.index));
        document.getElementById(`as-toolbar-exit-${app.index}`).addEventListener('click', () => {
            closeWindow(app.index);
            closeWindowInFooter(app.index);
        });

        app.status = 'open';
    }
}

// Initialize the Snake game canvas with dynamic resizing
async function initializeSnakeGame() {
    const snakeContainer = document.getElementById("snake-container");
    const canvas = document.createElement('canvas');
    canvas.classList.add('game-canvas');
    canvas.id = "gameCanvas"; 
    snakeContainer.appendChild(canvas); 

    function updateCanvasSize() {
        canvas.width = snakeContainer.offsetWidth;
        canvas.height = snakeContainer.offsetHeight;
        SNAKE.updateGameCanvasSize(canvas.width, canvas.height); 
    }

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    SNAKE.showMenuScreen();
}

// Credit Clicker listeners
function addCreditsClickListener() {
    const creditsContainer = document.getElementById('credits');
    const people = [
        "Ashley Flowers <3",
        "Mom and Dad",
        "Blake and Brenna",
        "Wilkey, Ben and Alex"
    ];

    let index = 0;

    creditsContainer.addEventListener('click', () => {
        index = (index + 1) % people.length;  // Cycle to the next name, loop back to the first one after the last.
        const personNameElement = document.getElementById('person-name');
        personNameElement.innerHTML = `<p>${people[index]}</p>`;
    });
}

// Start the drag process
function startDrag(e, appIndex) {
    const appDiv = document.getElementById(`app-main-${appIndex}`);
    const app = osApps.find(app => app.index === appIndex);
        
    if (!appDiv) return; 

    if (app.status === 'maximized') return;

    if (isDragging && currentAppIndex === appIndex) {
        stopDrag();
        return;
    }

    appDiv.style.zIndex = '100'
    isDragging = true;
    currentAppIndex = appIndex;

    const toolbar = document.getElementById(`as-toolbar-${appIndex}`);
    const rect = toolbar.getBoundingClientRect();

    offsetX = e.clientX - rect.left; 
    offsetY = e.clientY - rect.top;  

    document.addEventListener('pointermove', onDrag);
    document.addEventListener('pointerup', stopDrag);
}

// Move current div (drag)
function onDrag(e) {
    if (!isDragging || !currentAppIndex) return;

    const appDiv = document.getElementById(`app-main-${currentAppIndex}`);
    if (!appDiv) return;

    const x = e.clientX - offsetX; 
    const y = e.clientY - offsetY;

    const appWidth = appDiv.offsetWidth;
    const appHeight = appDiv.offsetHeight;

    const maxX = window.innerWidth - appWidth;
    const maxY = window.innerHeight - appHeight;

    const left = Math.min(Math.max(x, 0), maxX);
    const top = Math.min(Math.max(y, 0), maxY);

    appDiv.style.left = `${left}px`;
    appDiv.style.top = `${top}px`;
}

// Stop the dragging process
function stopDrag() {
    toggleZIndexes(currentAppIndex);
    isDragging = false;
    currentAppIndex = null;

    document.removeEventListener('pointermove', onDrag);
    document.removeEventListener('pointerup', stopDrag);
}

// Adjust App Window Z Index
function toggleZIndexes(excludeAppIndex) {
    const allDivs = document.querySelectorAll('[id^="app-main-"]');
    
    allDivs.forEach(div => {
        const appIndex = div.id.replace('app-main-', '');
        if (appIndex != excludeAppIndex) {
            div.style.zIndex = '25';
        } else {
            div.style.zIndex = '100';
        }
    });
}

// Toggle Full Screen App Window
function toggleFullScreenWindow(appIndex) {
    const app = osApps.find(app => app.index === appIndex);
    const appWindow = document.getElementById(`app-main-${app.index}`);

    if (app.status === 'open') {
        appWindow.style.transition = 'width 0.5s ease, height 0.5s ease, transform 0.5s ease';

        window.requestAnimationFrame(() => {
            appWindow.style.transform = 'translate(-50%, 0%)';
            appWindow.style.width = '100vw';
            appWindow.style.height = 'calc(100vh - 70px)';
            appWindow.style.top = '0';
            appWindow.style.left = '50%';
            appWindow.style.resize = 'none'

            app.status = 'maximized';
        });

    } else if (app.status === 'maximized') {
        appWindow.style.transition = 'none';
        appWindow.style.width = '';
        appWindow.style.height = '';
        appWindow.style.top = '';
        appWindow.style.left = '';
        appWindow.style.transform = '';
        appWindow.style.resize = 'both'

        app.status = 'open';
    }
}

// Toggle Minimized Screen App Window
function toggleMinimizeScreenWindow(appIndex) {
    const app = osApps.find(app => app.index === appIndex);
    const appWindow = document.getElementById(`app-main-${app.index}`);
    const osFooterLine = document.getElementById(`os-footer-app-item-line-${app.index}`);

    if (app.status !== 'minimized') {
        appWindow.classList.add('hide');
        tempStatus = app.status;
        app.status = 'minimized';
        osFooterLine.classList.remove('active');

    } else {
        appWindow.classList.remove('hide');
        osFooterLine.classList.add('active');
        switch(tempStatus) {
            case 'open':
                app.status = 'open';
                break;
            case 'maximized':
                app.status = 'maximized';
                break;
            default:
                console.log('something went wrong (refresh page)...');
                break;
        }
        toggleZIndexes(app.index);
    }
}

// Close App Window
function closeWindow(appIndex) {
    const app = osApps.find(app => app.index === appIndex);
    const appWindow = document.getElementById(`app-main-${app.index}`);
    const container = document.getElementById(`container-main-${app.index}`);
    
    if (appWindow) {
        container.remove();
        app.status = 'closed'; 

        if(app.index === 2) {
            SNAKE.destroyGame();
        }

    }
}

// Add App to Footer
function addWindowToFooter(appIndex) {
    const app = osApps.find(app => app.index === appIndex);
    const html = `
        <div class="os-footer-app-item" id="os-footer-app-item-${app.index}">
            <img src="${app.image}" alt="${app.name} image"/>
            <div class="os-footer-app-item-line active" id="os-footer-app-item-line-${app.index}"></div>
        </div>
    `;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html; 
    
    const appElement = tempDiv.firstElementChild;
    osFooterApps.appendChild(appElement);

    document.getElementById(`os-footer-app-item-${app.index}`).addEventListener('click', () => toggleMinimizeScreenWindow(app.index));
}

// Close App in Footer
function closeWindowInFooter(appIndex) {
    const app = osApps.find(app => app.index === appIndex);
    const appWindow = document.getElementById(`os-footer-app-item-${app.index}`);
    
    if (appWindow) {
        appWindow.remove(); 
    }
}

// Menu toggle
function toggleMenu(status) {
    switch (status) {
        case 'open':
            osFooterToggle.classList.add('active');
            osFooterMenu.classList.add('show');
            break;
        case 'close':
            osFooterToggle.classList.remove('active');
            osFooterMenu.classList.remove('show');
            break;
        default:
            break;
    }
}

// Mouse click audio
function playAudio(type) {

    switch(type) {
        case 'down':
            try {
                audioDown.play().catch(error => {
                    console.error('Error playing audio on mouse down:', error);
                });
            } catch (error) {
                console.error('Unexpected error in playAudioDown:', error);
            }
            break;

        case 'up':
            try {
                audioDown.play().catch(error => {
                    console.error('Error playing audio on mouse down:', error);
                });
            } catch (error) {
                console.error('Unexpected error in playAudioDown:', error);
            }
            break;
            
        default:
            break;   
    }

};

// Footer Menu listener
osFooterToggle.addEventListener('click', () => {
    if (osFooterToggle.classList.contains('active')) {
        toggleMenu('close');  
    } else {
        toggleMenu('open');
    }
});

// Icon listeners for opening apps
iconAboutMe.addEventListener('click', () => {
    buildAppScreen(osApps[0]);
    APPContent.acAbout();
});

iconSnakeGame.addEventListener('click', () => {
    buildAppScreen(osApps[1]);
});

iconCredits.addEventListener('click', () => {
    buildAppScreen(osApps[2]);
});

// Add event listeners for both mouse and touch events
document.addEventListener('mousedown', () => playAudio('down'));
document.addEventListener('touchstart', () =>playAudio('down'));
document.addEventListener('mouseup', () =>playAudio('up'));
document.addEventListener('touchend', () =>playAudio('up'));

// On Load
window.onload = onLoad;
