document.addEventListener("DOMContentLoaded", () => {
    // 로컬 스토리지에서 모든 "form-" 키 가져오기
    const keys = Object.keys(localStorage).filter((key) => key.startsWith("form-"));

    // 폼 데이터가 없으면 경고
    if (keys.length === 0) {
        alert("제출된 폼 데이터가 없습니다.");
        return;
    }

    // 최신 폼 데이터를 가져오기 (타임스탬프 기준 정렬)
    const latestKey = keys.sort((a, b) => {
        const timeA = new Date(a.replace("form-", "")).getTime();
        const timeB = new Date(b.replace("form-", "")).getTime();
        return timeB - timeA; // 내림차순 정렬
    })[0];

    const latestFormData = JSON.parse(localStorage.getItem(latestKey));

    if (!latestFormData) {
        alert("최신 폼 데이터를 불러오는 데 실패했습니다.");
        return;
    }

    console.log("불러온 최신 폼 데이터:", latestFormData);

    // DOM 요소 가져오기
    const titleElement = document.getElementById("survey-title");
    const descriptionElement = document.getElementById("survey-description");
    const itemsContainer = document.getElementById("items");

    // 제목과 설명 렌더링
    titleElement.textContent = latestFormData.title || "제목 없음";
    descriptionElement.textContent = latestFormData.description || "설명이 없습니다.";

    // 질문 및 답변 렌더링
    itemsContainer.innerHTML = ""; // 이전 데이터 초기화
    latestFormData.responses.forEach((response) => {
        const formItem = document.createElement("div");
        formItem.classList.add("form-item");

        formItem.innerHTML = `
            <div class="question-box">
                <p class="form-question">${response.question}</p>
            </div>
            <div class="form-answer">
                <p class="form-answer-text">${response.answer || "답변 없음"}</p>
            </div>
        `;

        itemsContainer.appendChild(formItem);
    });
});
