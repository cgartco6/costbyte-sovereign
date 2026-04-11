let ideaData = { description: "", answers: [], verdict: "" };
const questions = [
    "Who is your target customer?",
    "What problem does your idea solve?",
    "How will you make money?",
    "What makes your solution unique?",
    "Any known competitors?"
];

let currentQuestionIndex = 0;

function handleInput() {
    const input = document.getElementById('command').value.trim();
    if (!input) return;

    const log = document.getElementById('log');
    log.innerHTML += `<p style="color:#fff;">> ${input}</p>`;

    if (!ideaData.description) {
        ideaData.description = input;
        log.innerHTML += `<p>> Excellent. I'll ask a few targeted questions to validate your idea.</p>`;
        askNextQuestion();
    } else if (currentQuestionIndex < questions.length) {
        ideaData.answers.push(input);
        currentQuestionIndex++;
        askNextQuestion();
    } else {
        finishValidation();
    }

    document.getElementById('command').value = '';
    document.getElementById('terminal').scrollTop = 999999;
}

function askNextQuestion() {
    const log = document.getElementById('log');
    if (currentQuestionIndex < questions.length) {
        log.innerHTML += `<p style="color:#ffd700;">> ${questions[currentQuestionIndex]}</p>`;
    }
}

function finishValidation() {
    const log = document.getElementById('log');
    log.innerHTML += `<p>> Running AI market research simulation...</p>`;

    setTimeout(() => {
        ideaData.verdict = "VIABLE";
        log.innerHTML += `<p class="response">✓ Validation complete. Your idea has strong potential and is VIABLE.</p>`;
        log.innerHTML += `<p>> Your full startup package and studio are now ready.</p>`;

        document.getElementById('generate-btn').style.display = 'block';
        document.getElementById('studio-btn').style.display = 'block';

        saveIdea(ideaData);
        localStorage.setItem('currentIdea', JSON.stringify(ideaData));
    }, 1500);
}

function saveIdea(data) {
    let ideas = JSON.parse(localStorage.getItem('userIdeas') || '[]');
    ideas.push({
        id: Date.now(),
        title: data.description.substring(0, 55) + "...",
        date: new Date().toISOString().slice(0,10),
        verdict: data.verdict,
        data: data
    });
    localStorage.setItem('userIdeas', JSON.stringify(ideas));
}

function renderIdeas() {
    const container = document.getElementById('ideas-list');
    let ideas = JSON.parse(localStorage.getItem('userIdeas') || '[]');
    
    if (ideas.length === 0) {
        container.innerHTML = `<p style="color:#aaa;">You haven't submitted any ideas yet. <a href="intake.html" style="color:#ffd700;">Submit your first idea →</a></p>`;
        return;
    }
    
    let html = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem;">`;
    ideas.forEach(idea => {
        html += `
            <div class="item-card" style="text-align:left;">
                <h3>${idea.title}</h3>
                <p><strong>Date:</strong> \( {idea.date} | <span style="color:#0f0;"> \){idea.verdict}</span></p>
                <button onclick="regeneratePackage(${idea.id})" style="margin-top:1rem;width:100%;">Re-generate Full Package</button>
            </div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

window.regeneratePackage = function(id) {
    let ideas = JSON.parse(localStorage.getItem('userIdeas') || '[]');
    const found = ideas.find(i => i.id === id);
    if (found) generateDocuments(found.data);
};
