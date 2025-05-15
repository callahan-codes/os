import * as API from './api.js';

export function aboutMeContent() {
    const html = `
        <div class="as-container">
            <div class="as-aboutme">
                <div class="as-aboutme-menu">
                    <div id="as-AMmenu-about">Home</div>
                    <div id="as-AMmenu-projects">Projects</div>
                    <div id="as-AMmenu-experience">Experience</div>
                    <div id="as-AMmenu-contact">Contact</div>
                </div>

                <div id="as-abtme_content" class="as-aboutme-content"></div>
            </div>
        </div>
    `;

    return html;
}

export function acAbout() {
    const menuItem = document.getElementById('as-AMmenu-about');
    document.getElementById('as-AMmenu-experience').classList.remove('active');
    document.getElementById('as-AMmenu-projects').classList.remove('active');
    document.getElementById('as-AMmenu-contact').classList.remove('active');

    const dom = document.getElementById('as-abtme_content');
    const html = `
        <h1>Welcome</h1>
        <p>
            My name is <span>Bryce Callahan</span> and I'm a 25 year old full-stack developer based out of Tuscaloosa, Alabama. I currently work for the University of Alabama, more specifically 
            within the <a target="_blank" href="https://cchs.ua.edu/">College of Community Health Sciences</a>. I've been managing a few of their websites will getting my bachelor's degree in Management Information Systems, that of which
            I'll be graduating in December 2025.
        </p>
        <p>
            I built this website to showcase myself along with the pure enjoyment I get from developing websites. I hope you find my portolio fun and informative and please reach out with any questions!
        </p>   
        <hr/>
        <div class="grid col-heavy_left clickable" id="clickable-projects">
            <div>
                <svg viewBox="0 0 553 551" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="anim_frame-projects">
                        <g id="fp-notepad">
                            <rect id="fp-notepad-base" x="37" y="37" width="328" height="410" rx="10" fill="#4661DA"/>
                            <rect id="fp-notepad-line1" x="63" y="79" width="196" height="22" rx="11" fill="#FF4A93"/>
                            <rect id="fp-notepad-line2" x="63" y="127" width="232" height="22" rx="11" fill="#69F069"/>
                            <rect id="fp-notepad-line3" x="63" y="175" width="248" height="22" rx="11" fill="#EFF49D"/>
                            <rect id="fp-notepad-line4" x="63" y="223" width="215" height="22" rx="11" fill="#FFA4A4"/>
                        </g>
                        <g id="fp-gear">
                            <circle id="fp-gear-large" cx="352" cy="366" r="122.5" fill="#1A1A1A" stroke="white" stroke-width="5"/>
                            <circle id="fp-gear-small" cx="351.5" cy="365.5" r="62.5" fill="white"/>
                            <rect id="gear-rect1" x="324" y="206" width="56" height="70" rx="5" fill="#1A1A1A"/>
                            <rect id="gear-rect2" width="55.9128" height="70.8895" rx="5" transform="matrix(0.708209 -0.706003 0.708209 0.706003 218 265.409)" fill="#1A1A1A"/>
                            <rect id="gear-rect3" x="192" y="393.411" width="55.8255" height="71" rx="5" transform="rotate(-90 192 393.411)" fill="#1A1A1A"/>
                            <rect id="gear-rect4" width="55.9128" height="70.8895" rx="5" transform="matrix(0.708209 0.706003 -0.708209 0.706003 255.205 409.361)" fill="#1A1A1A"/>
                            <rect id="gear-rect5" x="324" y="456" width="56" height="70" rx="5" fill="#1A1A1A"/>
                            <rect id="gear-rect6" width="55.9128" height="70.8895" rx="5" transform="matrix(0.708209 -0.706003 0.708209 0.706003 401 448.836)" fill="#1A1A1A"/>
                            <rect id="gear-rect7" x="441" y="393.411" width="55.8255" height="71" rx="5" transform="rotate(-90 441 393.411)" fill="#1A1A1A"/>
                            <rect id="gear-rect8" width="55.9128" height="70.8895" rx="5" transform="matrix(0.708209 0.706003 -0.708209 0.706003 446.205 225.935)" fill="#1A1A1A"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div>
                <h2>Projects</h2>
                <p>A collection of web and desktop applications I've had the opportunity to develop. Open-source projects are also available on my Github.</p>
            </div>
        </div>

        <div class="grid col-heavy_left clickable" id="clickable-experience">
            <div>
                <svg viewBox="0 0 548 551" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="anim_frame-experience">
                <g id="light-bulb-svgrepo-com 1">
                <g id="Group">
                <g id="Group_2">
                <path id="Vector" d="M194.5 71C126.954 71 72.0001 124.189 72.0001 189.571C72.0001 233.561 97.7653 274.476 137.936 294.769L139.154 311.292C139.393 314.558 142.315 317.07 145.7 316.781C149.074 316.549 151.613 313.712 151.374 310.447L149.909 290.565C149.753 288.452 148.44 286.576 146.469 285.656C108.672 267.922 84.2503 230.202 84.2503 189.571C84.2503 130.731 133.708 82.8573 194.5 82.8573C255.292 82.8573 304.75 130.731 304.75 189.571C304.75 232.964 277.974 271.697 236.538 288.261C234.393 289.118 232.934 291.075 232.767 293.316L230.102 329.408C229.862 332.674 232.401 335.511 235.775 335.742C235.925 335.754 236.071 335.76 236.218 335.76C239.404 335.76 242.092 333.374 242.322 330.254L244.721 297.757C288.756 278.61 317.001 236.543 317.001 189.572C317 124.189 262.046 71 194.5 71Z" fill="#4661DA"/>
                </g>
                </g>
                <g id="Group_3">
                <g id="Group_4">
                <path id="Vector_2" d="M232.629 343.865L153.004 326.079C149.717 325.344 146.418 327.335 145.655 330.525C144.896 333.716 146.95 336.9 150.246 337.635L229.871 355.421C230.335 355.525 230.798 355.571 231.256 355.571C234.043 355.571 236.564 353.719 237.22 350.975C237.979 347.784 235.925 344.6 232.629 343.865Z" fill="#4661DA"/>
                </g>
                </g>
                <g id="Group_5">
                <g id="Group_6">
                <path id="Vector_3" d="M232.629 367.579L153.004 349.793C149.717 349.058 146.418 351.049 145.655 354.239C144.896 357.43 146.95 360.614 150.246 361.349L229.871 379.135C230.335 379.239 230.798 379.285 231.256 379.285C234.043 379.285 236.564 377.433 237.22 374.689C237.979 371.499 235.925 368.314 232.629 367.579Z" fill="#4661DA"/>
                </g>
                </g>
                <g id="Group_7">
                <g id="Group_8">
                <path id="Vector_4" d="M232.629 391.294L153.004 373.508C149.717 372.767 146.418 374.758 145.655 377.954C144.896 381.144 146.95 384.328 150.246 385.064L229.871 402.85C230.335 402.954 230.798 403 231.256 403C234.043 403 236.564 401.147 237.22 398.403C237.979 395.213 235.925 392.028 232.629 391.294Z" fill="#4661DA"/>
                </g>
                </g>
                </g>
                <g id="strobes">
                <rect id="bulb-strobe1" x="65.2044" y="188.731" width="14.064" height="53.2044" rx="7.03198" transform="rotate(90 65.2044 188.731)" fill="#1A1A1A"/>
                <rect id="bulb-strobe2" width="14.3634" height="52.1387" rx="7.1817" transform="matrix(-0.724531 0.689242 -0.718246 -0.695789 99.56 102.511)" fill="#1A1A1A"/>
                <rect id="bulb-strobe3" x="202.11" y="66.0749" width="14.784" height="51.0749" rx="7.39201" transform="rotate(-180 202.11 66.0749)" fill="#1A1A1A"/>
                <rect id="bulb-strobe4" width="14.3634" height="52.1387" rx="7.1817" transform="matrix(-0.724531 -0.689242 0.718246 -0.695789 294.794 112.411)" fill="#1A1A1A"/>
                <rect id="bulb-strobe5" x="318.796" y="202.795" width="14.064" height="53.2044" rx="7.03198" transform="rotate(-90 318.796 202.795)" fill="#1A1A1A"/>
                </g>
                <g id="pencil-bulb">
                <path id="pencil-line-bulb" d="M232 397C294 420 -34 575 391.295 504.517" stroke="#4661DA" stroke-width="5"/>
                <path id="pencil-bulb_2" d="M443.898 154L467.533 158.168L410.229 483.154L391.692 506.749L386.594 478.987L443.898 154Z" fill="#1A1A1A"/>
                <rect id="pencil-eraser-bulb" x="447.72" y="133" width="24" height="22" transform="rotate(9.73516 447.72 133)" fill="#A55353"/>
                <rect id="pencil-sep-bulb" x="387.871" y="470.604" width="24" height="5.15351" transform="rotate(9.73516 387.871 470.604)" fill="white"/>
                </g>
                </g>
                </svg>

            </div>
            <div>
                <h2>Experience</h2>
                <p>
                    Dive into the journey of my full-stack career along with my software knowledge. Cover my past experiences in the web development field along with
                    a small look into one of the world's most in-depth websites about tobacco and its effects on society.
                </p>
            </div>
        </div>

        <div class="grid col-heavy_left clickable" id="clickable-contact">
            <div>
                <svg viewBox="0 0 548 551" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="anim_frame-contact">
                    <rect id="Rectangle 1" x="263" y="315" width="22" height="161" fill="#D9D9D9"/>
                    <g id="mailbox-back">
                        <path id="mailbox-back_2" d="M145.499 80C145.499 77.7909 147.29 76 149.499 76H397C452.228 76 497 120.772 497 176V370.712C497 372.922 495.209 374.712 493 374.712H149.499C147.29 374.712 145.499 372.922 145.499 370.712V80Z" fill="#2945C2"/>
                        <g id="anim_frame-contact-sub" transform="translate(80, 0)">
                            <g id="mailbox-b-flag-base" filter="url(#filter0_d_3_2)">
                                <rect x="321.014" y="195.909" width="142.19" height="22.3176" transform="rotate(0.0733228 321.014 195.909)" fill="#FA1313"/>
                            </g>
                            <g id="mailbox-b-flag-top" filter="url(#filter1_d_3_2)">
                                <rect x="436.695" y="196" width="26.6573" height="41.0319" fill="#D70D0D"/>
                            </g>
                        </g>
                    </g>
                    <g id="mailbox-front">
                        <rect id="mailbox-f-bottom" x="51" y="187.607" width="211.777" height="187.106" fill="#4661DA"/>
                        <path id="mailbox-f-top" d="M262.777 193.351C262.777 162.228 251.621 132.379 231.763 110.371C211.905 88.3638 184.972 76 156.889 76C128.805 76 101.872 88.3638 82.0141 110.371C62.1561 132.379 51 162.228 51 193.351L156.889 193.351H262.777Z" fill="#4661DA"/>
                        <path id="mailbox-f-semicircle" d="M184.286 174.477C184.286 163.159 180.308 152.305 173.225 144.302C166.143 136.299 156.538 131.803 146.522 131.803C136.506 131.803 126.901 136.299 119.818 144.302C112.736 152.305 108.757 163.159 108.757 174.477L146.522 174.477H184.286Z" fill="#1A1A1A"/>
                        <rect id="mailbox-f-rect" x="110.238" y="185.966" width="74.048" height="14.7715" fill="#1A1A1A"/>
                    </g>
                </g>
                    <defs>
                        <filter id="filter0_d_3_2" x="316.986" y="195.909" width="150.219" height="30.4995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_2"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_2" result="shape"/>
                            </filter>
                            <filter id="filter1_d_3_2" x="432.695" y="196" width="34.6573" height="49.0319" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_2"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_2" result="shape"/>
                        </filter>
                    </defs>
                </svg>

            </div>
            <div>
                <h2>Contact</h2>
                <p>Fill out a quick-and-easy form with your reason of contact and I'll get back to you as quick as possible!</p>
            </div>
        </div>
    `;

    menuItem.classList.add('active')
    dom.innerHTML = html;

    document.getElementById('as-AMmenu-about').addEventListener('click', () => {
        acAbout();
    });
    document.getElementById('as-AMmenu-experience').addEventListener('click', () => {
        acExperience();
    });
    document.getElementById('as-AMmenu-contact').addEventListener('click', () => {
        acContact();
    });
    document.getElementById('as-AMmenu-projects').addEventListener('click', () => {
        acProjects();
    });
    document.getElementById('clickable-projects').addEventListener('click', () => {
        acProjects();
    });
    document.getElementById('clickable-experience').addEventListener('click', () => {
        acExperience();
    });
    document.getElementById('clickable-contact').addEventListener('click', () => {
        acContact();
    });

    return html;
}

export function acProjects() {
    const menuItem = document.getElementById('as-AMmenu-projects');
    document.getElementById('as-AMmenu-experience').classList.remove('active');
    document.getElementById('as-AMmenu-about').classList.remove('active');
    document.getElementById('as-AMmenu-contact').classList.remove('active');

    const dom = document.getElementById('as-abtme_content');
    const html = `
        <h1>Projects</h1>
         
    `;

    menuItem.classList.add('active')
    dom.innerHTML = html;

    return html;
}

export function acExperience() {
    const menuItem = document.getElementById('as-AMmenu-experience');
    document.getElementById('as-AMmenu-projects').classList.remove('active');
    document.getElementById('as-AMmenu-about').classList.remove('active');
    document.getElementById('as-AMmenu-contact').classList.remove('active');

    const dom = document.getElementById('as-abtme_content');
    const html = `
        <h1>Experience</h1>
        <hr/>

        <h3>My Resume</h3>
        <p>
            Click here to download!
        </p>
        <hr/>

        <h3>Current Employment</h3>
        <p>
            I've worked full-time as a full-stack developer for the University of Alabama while obtaining my degree in Management Information Systems part-time for almost 4 years now. My technical duties include 
            managing and maintaining various websites related to the medical portion of the university. I accomplish this using a multitude of various <a href="#tools">tools and programming languages</a>.
        <p>
        <p>
            The non-technical skills applied to my role include
            <ul>
                <li>Project Management</li>
                <li>Communication Skills</li>
                <li>Technology Consulting</li>
            </ul>
            <p>
                I'm the only developer within this particular college of the university, so I work with many people who went outside the technical field, mostly medical-related, and help them display
                whatever it may be they want published by building accessible, well-designed websites/pages for them; all within university guidelines of course. 
            </p>
        </p>

        <h3>Past Experiences</h3>
        <p>

        </p>

        <h3>Tools and Languages</h3>
        <div class="experience-tools" id="tools">
            <div>
                <i class="devicon-html5-plain-wordmark icon"></i><br>
                HTML
            </div>
            <div>
                <i class="devicon-css3-plain-wordmark icon"></i><br>
                CSS
            </div>
            <div>
                <i class="devicon-javascript-plain icon"></i><br>
                JS
            </div>
            <div>
                <i class="devicon-react-original icon"></i><br>
                React
            </div>
            <div>
                <i class="devicon-threejs-original icon"></i><br>
                Three
            </div>
            <div>
                <i class="devicon-php-plain icon"></i><br>
                PHP
            </div>
            <div>
                <i class="devicon-python-plain icon"></i><br>
                Python
            </div>
            <div>
                <i class="devicon-csharp-plain icon"></i><br>
                C#
            </div>
            <div>
                <i class="devicon-azuresqldatabase-plain icon"></i><br>
                SQL
            </div>
        </div>
    `;

    menuItem.classList.add('active')
    dom.innerHTML = html;

    return html;
}

export function acContact() {
    const menuItem = document.getElementById('as-AMmenu-contact');
    document.getElementById('as-AMmenu-experience').classList.remove('active');
    document.getElementById('as-AMmenu-projects').classList.remove('active');
    document.getElementById('as-AMmenu-about').classList.remove('active');

    const dom = document.getElementById('as-abtme_content');
    const html = `
        <h1>Contact</h1>

        <form onsubmit="return false;" method="post" id="contact-form">

            <div class="grid col-2 gap">
                <div>
                    <label for="user-name">Name</label><br>
                    <input type="text" id="user-name" name="user-name" placeholder="Your name here">
                </div>
                <div>
                    <label for="user-email">Email</label><br>
                    <input type="email" id="user-email" name="user-email" placeholder="Your email here">
                </div>
            </div>

            <label for="user-message">Leave a message</label><br>
            <textarea maxlength="5000" name="user-message" id="user-message" form="contact-form" placeholder="Maximum of 5000 characters."></textarea><br>

            <div id="alert"></div>

            <button class="btn-light" type="submit" value="Submit" id="contact-form-submit">Submit</button>
        </form> 
         
    `;

    menuItem.classList.add('active')
    dom.innerHTML = html;

    document.getElementById('contact-form-submit').addEventListener('click', () => {
        API.createNewUserMessage();
    });

    return html;
}

export function snakeGame() {
    return '<div id="snake-container"></div>';
}

export function credits() {
    let index = 0;
    const people = [
        "Ashley Flowers <3",
        "Mom and Dad",
        "Blake and Brenna",
        "Wilkey, Ben and Alex"
    ];

    let html = `
        <div class="credits-container" id="credits">
            <div>
                <h1>Special Thanks To</h1>
            </div>
            <div id="person-name">
                <p>${people[index]}</p>
            </div>
            <div>
                <p>Click to continue</p>
            </div>
        </div>
    `;
    
    
    return html;
}