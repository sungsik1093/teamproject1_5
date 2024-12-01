// const starRating = [...document.getElementsByClassName("fa-regular")];

// function executeRating(stars) {
//   const starClassActive = "fa-regular fa-star";
//   const starClassInactive = "fa-regular fa-star";
//   const starsLength = stars.length;
//   let i;

//   stars.map((star) => {
//     star.onclick = () => {
//       i = stars.indexOf(star);

//       if (star.className===starClassInactive) {
//         for (i; i >= 0; --i) stars[i].className = starClassActive;
//       } else {
//         for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
//       }
//     };
//   });
// }

// executeRating(starRating)


// const starRating = [...document.getElementsByClassName("fa-regular")];

// function executeRating(stars) {
//     const starClassActive = "fa-star active"; // 활성 상태
//     const starClassInactive = "fa-star"; // 비활성 상태

//     stars.forEach((star, index) => {
//         star.onclick = () => {
//             for (let i = 0; i < stars.length; i++) {
//                 if (i <= index) {
//                     // 활성화: 클릭한 별부터 첫번째 별까지
//                     stars[i].className = `fa-regular ${starClassActive}`;
//                 } else {
//                     // 비활성화: 클릭한 별부터 마지막 별까지
//                     stars[i].className = `fa-regular ${starClassInactive}`;
//                 }
//             }
//         };
//     });
// }

// // 실행
// executeRating(starRating);

// 별점 요소 가져오기
// document.addEventListener("DOMContentLoaded", () => {
//     const stars = document.querySelectorAll('.star-rating .fa-star');
//     const ratingValue = document.querySelector(".rating-value");
//     let selectedRating = 0; // 별점 값

//     stars.forEach((star, index) => {
//         star.addEventListener('click', () => {
//             selectedRating = index + 1; // 별점 값 저장
//             // 클릭한 별과 이전 별들을 활성화 상태로 변경
//             stars.forEach((s, i) => {
//                 if (i <= index) {
//                     s.classList.add('active'); // 활성화
//                 } else {
//                     s.classList.remove('active'); // 비활성화
//                 }
//             });

//             // 별점 표시
//             ratingValue.textContent = `${index + 1}/5`;
//         });
//     });
// });

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