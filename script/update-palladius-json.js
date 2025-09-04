const fs = require('fs');
const path = require('path');

const issuesJsonPath = process.argv[2];
if (!issuesJsonPath) {
    console.error('Please provide the path to the issues JSON file as a command line argument.');
    process.exit(1);
}

const issuesJson = fs.readFileSync(issuesJsonPath, 'utf-8');
const issues = JSON.parse(issuesJson);
const randomAppIdeasDir = path.join(__dirname, '..', 'random-app-ideas');
const existingAppDirs = fs.readdirSync(randomAppIdeasDir);

const ideas = issues.map(issue => {
    const abstract = issue.body.substring(0, 100) + '...';
    const category = issue.labels.length > 0 ? issue.labels[0].name : 'General';

    const appDir = existingAppDirs.find(dir => dir.startsWith(`${issue.number}--`));
    let appName = null;
    let screenshot = null;
    if (appDir) {
        appName = appDir.substring(appDir.indexOf('--') + 2);
        const screenshotPath = `gh-pages/images/random-app-ideas/screenshots/${appName}.png`;
        if (fs.existsSync(path.join(__dirname, '..', screenshotPath))) {
            screenshot = screenshotPath;
        }
    }

    return {
        createdAt: issue.createdAt,
        number: issue.number,
        title: issue.title,
        url: issue.url,
        abstract: abstract,
        category: category,
        appName: appName,
        screenshot: screenshot
    };
});

const palladiusJson = {
    eventName: "Euro Cloud Summit",
    "eventEmojis": "🇨🇭☁️",
    ideas: ideas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
};

const palladiusJsonPath = path.join(__dirname, '..', 'gh-pages', 'palladius.json');
fs.writeFileSync(palladiusJsonPath, JSON.stringify(palladiusJson, null, 4));

console.log('palladius.json updated successfully.');
