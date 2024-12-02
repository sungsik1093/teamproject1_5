document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star-rating .fa-star");
    const ratingValue = document.querySelector(".rating-value");
    const reviewUploadButton = document.querySelector(".review-upload");
    const textReview = document.querySelector(".text-review");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let selectedRating = 0;

    // 별점 이벤트
    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        selectedRating = index + 1;
        // 클릭한 별까지 활성화
        stars.forEach((s, i) => {
          // if (i <= index) {
          if(i < selectedRating){
            // fa-regular : 빈 별, fa-solid : 채워진 별
            s.classList.remove("fa-regular");
            s.classList.add("fa-solid");
          } else {
            s.classList.remove("fa-solid");
            s.classList.add("fa-regular");
          }
        });

        // 별점 표시
        // ratingValue.textContent = `${index + 1}/5`;
        ratingValue.textContent = `${selectedRating}/5`;
      });
    });

    // 리뷰 업로드 이벤트
    reviewUploadButton.addEventListener("click", (e) => {
      e.preventDefault(); // 폼 기본 제출 방지
  
      const reviewContent = textReview.value.trim();
      const selectedCheckboxes = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
  
      // 입력 검증
      if (selectedRating === 0) {
        alert("별점을 선택해주세요!");
        return;
      }
  
      if (reviewContent === "") {
        alert("리뷰 내용을 작성해주세요!");
        return;
      }
  
      // 리뷰 데이터 생성
      const review = {
        rating: selectedRating,
        content: reviewContent,
        options: selectedCheckboxes,
        date: new Date().toLocaleString(), // 작성 날짜
      };
  
      // LocalStorage에 저장
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(reviews));
  
      alert("리뷰가 등록되었습니다!");
  
      // 다른 페이지로 이동 (리뷰 목록 페이지)
      location.href = "reviewList.html";
    });
});