const flags = {
    "Europe": [
        { "name": "Albania", "emoji": "🇦🇱" },
        { "name": "Andorra", "emoji": "🇦🇩" },
        { "name": "Austria", "emoji": "🇦🇹" },
        { "name": "Belarus", "emoji": "🇧🇾" },
        { "name": "Belgium", "emoji": "🇧🇪" },
        { "name": "Bosnia and Herzegovina", "emoji": "🇧🇦" },
        { "name": "Bulgaria", "emoji": "🇧🇬" },
        { "name": "Croatia", "emoji": "🇭🇷" },
        { "name": "Cyprus", "emoji": "🇨🇾" },
        { "name": "Czech Republic", "emoji": "🇨🇿" },
        { "name": "Denmark", "emoji": "🇩🇰" },
        { "name": "Estonia", "emoji": "🇪🇪" },
        { "name": "Finland", "emoji": "🇫🇮" },
        { "name": "France", "emoji": "🇫🇷" },
        { "name": "Germany", "emoji": "🇩🇪" },
        { "name": "Greece", "emoji": "🇬🇷" },
        { "name": "Hungary", "emoji": "🇭🇺" },
        { "name": "Iceland", "emoji": "🇮🇸" },
        { "name": "Ireland", "emoji": "🇮🇪" },
        { "name": "Italy", "emoji": "🇮🇹" },
        { "name": "Latvia", "emoji": "🇱🇻" },
        { "name": "Liechtenstein", "emoji": "🇱🇮" },
        { "name": "Lithuania", "emoji": "🇱🇹" },
        { "name": "Luxembourg", "emoji": "🇱🇺" },
        { "name": "Malta", "emoji": "🇲🇹" },
        { "name": "Moldova", "emoji": "🇲🇩" },
        { "name": "Monaco", "emoji": "🇲🇨" },
        { "name": "Montenegro", "emoji": "🇲🇪" },
        { "name": "Netherlands", "emoji": "🇳🇱" },
        { "name": "North Macedonia", "emoji": "🇲🇰" },
        { "name": "Norway", "emoji": "🇳🇴" },
        { "name": "Poland", "emoji": "🇵🇱" },
        { "name": "Portugal", "emoji": "🇵🇹" },
        { "name": "Romania", "emoji": "🇷🇴" },
        { "name": "Russia", "emoji": "🇷🇺" },
        { "name": "San Marino", "emoji": "🇸🇲" },
        { "name": "Serbia", "emoji": "🇷🇸" },
        { "name": "Slovakia", "emoji": "🇸🇰" },
        { "name": "Slovenia", "emoji": "🇸🇮" },
        { "name": "Spain", "emoji": "🇪🇸" },
        { "name": "Sweden", "emoji": "🇸🇪" },
        { "name": "Switzerland", "emoji": "🇨🇭" },
        { "name": "Ukraine", "emoji": "🇺🇦" },
        { "name": "United Kingdom", "emoji": "🇬🇧" },
        { "name": "Vatican City", "emoji": "🇻🇦" }
    ],
    "Asia": [
        { "name": "Afghanistan", "emoji": "🇦🇫" },
        { "name": "Armenia", "emoji": "🇦🇲" },
        { "name": "Azerbaijan", "emoji": "🇦🇿" },
        { "name": "Bahrain", "emoji": "🇧🇭" },
        { "name": "Bangladesh", "emoji": "🇧🇩" },
        { "name": "Bhutan", "emoji": "🇧🇹" },
        { "name": "Brunei", "emoji": "🇧🇳" },
        { "name": "Cambodia", "emoji": "🇰🇭" },
        { "name": "China", "emoji": "🇨🇳" },
        { "name": "Georgia", "emoji": "🇬🇪" },
        { "name": "India", "emoji": "🇮🇳" },
        { "name": "Indonesia", "emoji": "🇮🇩" },
        { "name": "Iran", "emoji": "🇮🇷" },
        { "name": "Iraq", "emoji": "🇮🇶" },
        { "name": "Israel", "emoji": "🇮🇱" },
        { "name": "Japan", "emoji": "🇯🇵" },
        { "name": "Jordan", "emoji": "🇯🇴" },
        { "name": "Kazakhstan", "emoji": "🇰🇿" },
        { "name": "Kuwait", "emoji": "🇰🇼" },
        { "name": "Kyrgyzstan", "emoji": "🇰🇬" },
        { "name": "Laos", "emoji": "🇱🇦" },
        { "name": "Lebanon", "emoji": "🇱🇧" },
        { "name": "Malaysia", "emoji": "🇲🇾" },
        { "name": "Maldives", "emoji": "🇲🇻" },
        { "name": "Mongolia", "emoji": "🇲🇳" },
        { "name": "Myanmar", "emoji": "🇲🇲" },
        { "name": "Nepal", "emoji": "🇳🇵" },
        { "name": "North Korea", "emoji": "🇰🇵" },
        { "name": "Oman", "emoji": "🇴🇲" },
        { "name": "Pakistan", "emoji": "🇵🇰" },
        { "name": "Palestine", "emoji": "🇵🇸" },
        { "name": "Philippines", "emoji": "🇵🇭" },
        { "name": "Qatar", "emoji": "🇶🇦" },
        { "name": "Saudi Arabia", "emoji": "🇸🇦" },
        { "name": "Singapore", "emoji": "🇸🇬" },
        { "name": "South Korea", "emoji": "🇰🇷" },
        { "name": "Sri Lanka", "emoji": "🇱🇰" },
        { "name": "Syria", "emoji": "🇸🇾" },
        { "name": "Taiwan", "emoji": "🇹🇼" },
        { "name": "Tajikistan", "emoji": "🇹🇯" },
        { "name": "Thailand", "emoji": "🇹🇭" },
        { "name": "Timor-Leste", "emoji": "🇹🇱" },
        { "name": "Turkey", "emoji": "🇹🇷" },
        { "name": "Turkmenistan", "emoji": "🇹🇲" },
        { "name": "United Arab Emirates", "emoji": "🇦🇪" },
        { "name": "Uzbekistan", "emoji": "🇺🇿" },
        { "name": "Vietnam", "emoji": "🇻🇳" },
        { "name": "Yemen", "emoji": "🇾🇪" }
    ],
    "Africa": [
        { "name": "Algeria", "emoji": "🇩🇿" },
        { "name": "Angola", "emoji": "🇦🇴" },
        { "name": "Benin", "emoji": "🇧🇯" },
        { "name": "Botswana", "emoji": "🇧🇼" },
        { "name": "Burkina Faso", "emoji": "🇧🇫" },
        { "name": "Burundi", "emoji": "🇧🇮" },
        { "name": "Cabo Verde", "emoji": "🇨🇻" },
        { "name": "Cameroon", "emoji": "🇨🇲" },
        { "name": "Central African Republic", "emoji": "🇨🇫" },
        { "name": "Chad", "emoji": "🇹🇩" },
        { "name": "Comoros", "emoji": "🇰🇲" },
        { "name": "Congo, Democratic Republic of the", "emoji": "🇨🇩" },
        { "name": "Congo, Republic of the", "emoji": "🇨🇬" },
        { "name": "Cote d'Ivoire", "emoji": "🇨🇮" },
        { "name": "Djibouti", "emoji": "🇩🇯" },
        { "name": "Egypt", "emoji": "🇪🇬" },
        { "name": "Equatorial Guinea", "emoji": "🇬🇶" },
        { "name": "Eritrea", "emoji": "🇪🇷" },
        { "name": "Eswatini", "emoji": "🇸🇿" },
        { "name": "Ethiopia", "emoji": "🇪🇹" },
        { "name": "Gabon", "emoji": "🇬🇦" },
        { "name": "Gambia", "emoji": "🇬🇲" },
        { "name": "Ghana", "emoji": "🇬🇭" },
        { "name": "Guinea", "emoji": "🇬🇳" },
        { "name": "Guinea-Bissau", "emoji": "🇬🇼" },
        { "name": "Kenya", "emoji": "🇰🇪" },
        { "name": "Lesotho", "emoji": "🇱🇸" },
        { "name": "Liberia", "emoji": "🇱🇷" },
        { "name": "Libya", "emoji": "🇱🇾" },
        { "name": "Madagascar", "emoji": "🇲🇬" },
        { "name": "Malawi", "emoji": "🇲🇼" },
        { "name": "Mali", "emoji": "🇲🇱" },
        { "name": "Mauritania", "emoji": "🇲🇷" },
        { "name": "Mauritius", "emoji": "🇲🇺" },
        { "name": "Morocco", "emoji": "🇲🇦" },
        { "name": "Mozambique", "emoji": "🇲🇿" },
        { "name": "Namibia", "emoji": "🇳🇦" },
        { "name": "Niger", "emoji": "🇳🇪" },
        { "name": "Nigeria", "emoji": "🇳🇬" },
        { "name": "Rwanda", "emoji": "🇷🇼" },
        { "name": "Sao Tome and Principe", "emoji": "🇸🇹" },
        { "name": "Senegal", "emoji": "🇸🇳" },
        { "name": "Seychelles", "emoji": "🇸🇨" },
        { "name": "Sierra Leone", "emoji": "🇸🇱" },
        { "name": "Somalia", "emoji": "🇸🇴" },
        { "name": "South Africa", "emoji": "🇿🇦" },
        { "name": "South Sudan", "emoji": "🇸🇸" },
        { "name": "Sudan", "emoji": "🇸🇩" },
        { "name": "Tanzania", "emoji": "🇹🇿" },
        { "name": "Togo", "emoji": "🇹🇬" },
        { "name": "Tunisia", "emoji": "🇹🇳" },
        { "name": "Uganda", "emoji": "🇺🇬" },
        { "name": "Zambia", "emoji": "🇿🇲" },
        { "name": "Zimbabwe", "emoji": "🇿🇼" }
    ],
    "North America": [
        { "name": "Antigua and Barbuda", "emoji": "🇦🇬" },
        { "name": "Bahamas", "emoji": "🇧🇸" },
        { "name": "Barbados", "emoji": "🇧🇧" },
        { "name": "Belize", "emoji": "🇧🇿" },
        { "name": "Canada", "emoji": "🇨🇦" },
        { "name": "Costa Rica", "emoji": "🇨🇷" },
        { "name": "Cuba", "emoji": "🇨🇺" },
        { "name": "Dominica", "emoji": "🇩🇲" },
        { "name": "Dominican Republic", "emoji": "🇩🇴" },
        { "name": "El Salvador", "emoji": "🇸🇻" },
        { "name": "Grenada", "emoji": "🇬🇩" },
        { "name": "Guatemala", "emoji": "🇬🇹" },
        { "name": "Haiti", "emoji": "🇭🇹" },
        { "name": "Honduras", "emoji": "🇭🇳" },
        { "name": "Jamaica", "emoji": "🇯🇲" },
        { "name": "Mexico", "emoji": "🇲🇽" },
        { "name": "Nicaragua", "emoji": "🇳🇮" },
        { "name": "Panama", "emoji": "🇵🇦" },
        { "name": "Saint Kitts and Nevis", "emoji": "🇰🇳" },
        { "name": "Saint Lucia", "emoji": "🇱🇨" },
        { "name": "Saint Vincent and the Grenadines", "emoji": "🇻🇨" },
        { "name": "Trinidad and Tobago", "emoji": "🇹🇹" },
        { "name": "United States", "emoji": "🇺🇸" }
    ],
    "South America": [
        { "name": "Argentina", "emoji": "🇦🇷" },
        { "name": "Bolivia", "emoji": "🇧🇴" },
        { "name": "Brazil", "emoji": "🇧🇷" },
        { "name": "Chile", "emoji": "🇨🇱" },
        { "name": "Colombia", "emoji": "🇨🇴" },
        { "name": "Ecuador", "emoji": "🇪🇨" },
        { "name": "Guyana", "emoji": "🇬🇾" },
        { "name": "Paraguay", "emoji": "🇵🇾" },
        { "name": "Peru", "emoji": "🇵🇪" },
        { "name": "Suriname", "emoji": "🇸🇷" },
        { "name": "Uruguay", "emoji": "🇺🇾" },
        { "name": "Venezuela", "emoji": "🇻🇪" }
    ],
    "Oceania": [
        { "name": "Australia", "emoji": "🇦🇺" },
        { "name": "Fiji", "emoji": "🇫🇯" },
        { "name": "Kiribati", "emoji": "🇰🇮" },
        { "name": "Marshall Islands", "emoji": "🇲🇭" },
        { "name": "Micronesia", "emoji": "🇫🇲" },
        { "name": "Nauru", "emoji": "🇳🇷" },
        { "name": "New Zealand", "emoji": "🇳🇿" },
        { "name": "Palau", "emoji": "🇵🇼" },
        { "name": "Papua New Guinea", "emoji": "🇵🇬" },
        { "name": "Samoa", "emoji": "🇼🇸" },
        { "name": "Solomon Islands", "emoji": "🇸🇧" },
        { "name": "Tonga", "emoji": "🇹🇴" },
        { "name": "Tuvalu", "emoji": "🇹🇻" },
        { "name": "Vanuatu", "emoji": "🇻🇺" }
    ]
};

const continentButtons = document.getElementById('continent-buttons');
const emojiContainer = document.getElementById('emoji-container');
const toast = document.getElementById('toast');

function displayFlags(continent) {
    emojiContainer.innerHTML = '';
    let flagsToShow = [];

    if (continent === 'All') {
        for (const c in flags) {
            flagsToShow = flagsToShow.concat(flags[c]);
        }
    } else {
        flagsToShow = flags[continent];
    }

    flagsToShow.forEach(flag => {
        const emojiItem = document.createElement('div');
        emojiItem.classList.add('emoji-item');
        emojiItem.textContent = flag.emoji;
        emojiItem.setAttribute('title', flag.name);
        emojiItem.addEventListener('click', () => {
            navigator.clipboard.writeText(flag.emoji).then(() => {
                toast.className = "toast show";
                setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
            });
        });
        emojiContainer.appendChild(emojiItem);
    });
}

continentButtons.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const continent = event.target.dataset.continent;
        const buttons = continentButtons.querySelectorAll('button');
        buttons.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
        displayFlags(continent);
    }
});

// Initial display
displayFlags('All');
continentButtons.querySelector('button').classList.add('active');
