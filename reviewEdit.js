document.addEventListener("DOMContentLoaded", () => {
    const starRatingEl = document.querySelector(".star-rating");
    const stars = starRatingEl.querySelectorAll(".fa-star");
    const ratingValueEl = document.querySelector(".rating-value");
    const textReviewEl = document.querySelector(".text-review");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const submitButton = document.querySelector(".review-upload");
    const cancelButton = document.querySelector(".cancel-edit");

    // URL 파라미터로 리뷰 index 가져오기
    const params = new URLSearchParams(window.location.search);
    const reviewIndex = parseInt(params.get("index"), 10); // URL에서 'index' 값 가져오기

    if (isNaN(reviewIndex)) {
        alert("잘못된 접근입니다.");
        window.location.href = "reviewList.html"; // 잘못된 접근일 경우 목록 페이지로 이동
        return;
    }

    // 로컬스토리지에서 리뷰 데이터 불러오기
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviewIndex < 0 || reviewIndex >= reviews.length) {
        alert("리뷰를 찾을 수 없습니다.");
        window.location.href = "reviewList.html"; // 잘못된 index일 경우 목록 페이지로 이동
        return;
    }

    // 수정할 리뷰 데이터
    const review = reviews[reviewIndex];

    // 기존 리뷰 데이터 랜더링
    ratingValueEl.textContent = `${review.rating}/5`;
    textReviewEl.value = review.content;

    // 체크박스 옵션 초기화
    checkboxes.forEach((checkbox) => {
        checkbox.checked = review.options.includes(checkbox.value);
    });

    // 별점 초기화
    stars.forEach((star, index) => {
        star.classList.toggle("fa-solid", index < review.rating);
        star.classList.toggle("fa-regular", index >= review.rating);
    });

    // 별점 클릭 이벤트
    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            stars.forEach((s, i) => {
                s.classList.toggle("fa-solid", i <= index);
                s.classList.toggle("fa-regular", i > index);
            });
            ratingValueEl.textContent = `${index + 1}/5`;
        });
    });

    // 수정 완료 버튼 클릭 이벤트
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        const updatedRating = parseInt(ratingValueEl.textContent.split("/")[0]);
        const updatedContent = textReviewEl.value.trim();
        const updatedOptions = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        if (!updatedContent) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        // 데이터 업데이트
        reviews[reviewIndex] = {
            ...review,
            rating: updatedRating,
            content: updatedContent,
            options: updatedOptions,
        };

        // 로컬스토리지에 저장
        localStorage.setItem("reviews", JSON.stringify(reviews));
        alert("리뷰가 수정되었습니다.");
        window.location.href = "reviewList.html";
    });

    // 취소 버튼 클릭 이벤트
    cancelButton.addEventListener("click", () => {
        const confirmCancel = confirm("수정을 취소하시겠습니까?");
        if (confirmCancel) {
            window.location.href = "reviewList.html";
        }
    });
});