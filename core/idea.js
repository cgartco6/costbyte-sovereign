let ideaData = { description: "", answers: [], verdict: "" };

const questions = [
    "Who is your target customer?",
    "What problem does your idea solve?",
    "How will you make money (revenue model)?",
    "What makes your solution different or better?",
    "Any competitors you already know?"
];

let currentQuestionIndex = 0;

function handleInput() {
    const input = document.getElementById('command').value.trim();
    if (!input) return;

    const log = document.getElementById('log');
    log.innerHTML += `<p style="color:#fff;">&gt; ${input}</p>`;

    if (!ideaData.description) {
        ideaData.description = input;
        log.innerHTML += `<p>> Great. Now let me ask a few quick questions to validate your idea...</p>`;
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
        log.innerHTML += `<p style="color:#ffd700;">&gt; ${questions[currentQuestionIndex]}</p>`;
    }
}

function finishValidation() {
    const log = document.getElementById('log');
    log.innerHTML += `<p>> Running AI research simulation...</p>`;
    
    setTimeout(() => {
        // Simple verdict logic
        ideaData.verdict = "VIABLE";
        log.innerHTML += `<p style="color:#0f0;">✓ Research complete. Your idea is VIABLE with strong potential.</p>`;
        log.innerHTML += `<p>> Ready to generate your full startup package.</p>`;
        
        document.getElementById('generate-btn').style.display = 'block';
        
        // Save idea
        saveIdea(ideaData);
    }, 1800);
}

function saveIdea(data) {
    let ideas = JSON.parse(localStorage.getItem('userIdeas') || '[]');
    ideas.push({
        id: Date.now(),
        title: data.description.substring(0, 60) + "...",
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
        container.innerHTML = `<p style="color:#aaa;">No ideas yet. <a href="intake.html" style="color:#ffd700;">Submit your first idea →</a></p>`;
        return;
    }
    
    let html = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;">`;
    ideas.forEach(idea => {
        html += `
            <div class="item-card" style="text-align:left;">
                <h3>${idea.title}</h3>
                <p><strong>Date:</strong> \( {idea.date} | <span style="color:#0f0;"> \){idea.verdict}</span></p>
                <button onclick="generateDocumentsFromSaved(${idea.id})" style="margin-top:1rem;">Re-generate Documents</button>
            </div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

window.generateDocumentsFromSaved = function(id) {
    let ideas = JSON.parse(localStorage.getItem('userIdeas') || '[]');
    const found = ideas.find(i => i.id === id);
    if (found) generateDocuments(found.data);
};
