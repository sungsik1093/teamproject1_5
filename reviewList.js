// document.addEventListener("DOMContentLoaded", () => {
//     const reviewList = document.getElementById("review-list");
//     const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

//         if (reviews.length === 0) {
//         reviewList.innerHTML = "<p>등록된 리뷰가 없습니다.</p>";
//         } else {
//         reviews.forEach((review) => {
//             const reviewItem = document.createElement("div");
//             reviewItem.classList.add("review-item");
//             reviewItem.innerHTML = `
//             <div class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
//             <div class="review-meta">${review.options.join(", ") || "선택사항 없음"}</div>
//             <div class="review-content">${review.content}</div>
//             `;
//             reviewList.appendChild(reviewItem);
//         });
//         }
// });

document.addEventListener("DOMContentLoaded", () => {
    const reviewList = document.getElementById("review-list");
    const averageRatingEl = document.getElementById("average-rating");
    const averageStarsEl = document.getElementById("average-stars");
    // LocalStorage에서 리뷰 데이터 가져오기
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // 리뷰가 아직 없을 때
    if (reviews.length === 0) {
        reviewList.innerHTML = "<p>등록된 리뷰가 없습니다.</p>";
        averageRatingEl.textContent = "0.00 / 5.00";
        averageStarsEl.innerHTML = "☆☆☆☆☆";
        return;
    }
  
    // 리뷰 데이터를 화면에 표시
    reviews.forEach((review) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${"⭐".repeat(review.rating)}</strong>
          <small>${review.date}</samll>
          <p>${review.content}</p>
          <small>${review.options.join(", ")}</small>
        </div>
      `;
      reviewList.appendChild(li);
    });

    // 전체 평점 계산
    const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
    const averageRating = (totalStars / reviews.length).toFixed(2); // 소수점 둘째 자리까지 표시

    // 전체 평점 표시
    averageRatingEl.textContent = `${averageRating} 5.00`;
    const filledStars = Math.round(averageRating); // 평균 별점 반올림
    averageStarsEl.innerHTML = "★".repeat(filledStars) + "☆".repeat(5 - filledStars);
});