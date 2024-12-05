// document.addEventListener("DOMContentLoaded", () => {
//     const surveyContainer = document.getElementById("survey-container");
//     const submitButton = document.getElementById("submit");

//     // localStorage에서 설문 데이터 불러오기
//     const surveyData = JSON.parse(localStorage.getItem("surveyData"));

//     if (!surveyData) {
//         alert("설문 데이터가 없습니다.");
//         return;
//     }

//     // 설문 제목 및 설명 표시
//     const title = document.createElement("h2");
//     title.textContent = surveyData.title;

//     const description = document.createElement("p");
//     description.textContent = surveyData.description;

//     surveyContainer.appendChild(title);
//     surveyContainer.appendChild(description);

//     // 질문과 답변란 생성
//     surveyData.questions.forEach((question, index) => {
//         const questionContainer = document.createElement("div");
//         questionContainer.classList.add("question-container");

//         const questionElement = document.createElement("p");
//         questionElement.textContent = question;
//         questionContainer.appendChild(questionElement);

//         const answerInput = document.createElement("textarea");
//         answerInput.classList.add("answer-input");
//         answerInput.placeholder = "답변을 입력하세요.";
//         questionContainer.appendChild(answerInput);

//         surveyContainer.appendChild(questionContainer);
//     });

//     // 설문 제출 기능
//     submitButton.addEventListener("click", () => {
//         const answers = [];
//         document.querySelectorAll(".answer-input").forEach((input) => {
//             const answer = input.value.trim();
//             if (answer) {
//                 answers.push(answer);
//             }
//         });

//         if (answers.length === 0) {
//             alert("답변을 입력해주세요.");
//             return;
//         }

//         const responseData = {
//             title: surveyData.title,
//             answers: answers,
//         };

//         console.log("응답 데이터:", responseData);
//         alert("설문이 제출되었습니다!");

//         // 제출 후 초기화
//         document.getElementById("survey-container").innerHTML = "";
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    // 페이지 로딩 시 설문 데이터 가져오기 (저장된 JSON 파일 혹은 로컬 저장소에서 불러옴)
    const surveyData = JSON.parse(localStorage.getItem("surveyData")) || {};

    // 설문 데이터가 없으면 경고
    if (!surveyData.title || !surveyData.questions || surveyData.questions.length === 0) {
        alert("설문 데이터가 없습니다.");
        return;
    }

    const titleElement = document.getElementById("survey-title");
    const descriptionElement = document.getElementById("survey-description");
    const itemsContainer = document.getElementById("items");

    // 설문지 제목 및 설명 설정
    titleElement.textContent = surveyData.title;
    descriptionElement.textContent = surveyData.description;

    // 질문과 답변을 화면에 표시
    surveyData.questions.forEach((question) => {
        const formItem = document.createElement("div");
        formItem.classList.add("form-item");

        formItem.innerHTML = `
            <div class="question-box">
            <p class="form-question">${question}</p>
            </div>
            <div class="form-answer">
                <input type="text" class="form-answer-input" placeholder="답변을 입력해주세요.">
            </div>
        `;

        itemsContainer.appendChild(formItem);
    });

    // 제출 버튼 클릭 시
    document.getElementById("submit").addEventListener("click", () => {
        alert("설문이 제출되었습니다.");
    });
});