document.addEventListener("DOMContentLoaded", async () => {
    const reviewList = document.getElementById("review-list");
    const averageRatingEl = document.getElementById("average-rating");
    const averageStarsEl = document.getElementById("average-stars");

    // try {
    //   const response = await fetch('http://localhost:5000/reviews');
    //   const reviews = await response.json();

    // LocalStorage에서 리뷰 데이터 가져오기
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // 리뷰가 아직 없을 때
    const renderEmptyMessage = () => {
      reviewList.innerHTML = "<p>등록된 리뷰가 없습니다.</p>";
      averageRatingEl.textContent = "0.00";
      averageStarsEl.innerHTML = `
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
      `;
    };

  if (reviews.length === 0) {
      renderEmptyMessage();
      return;
  }

  // 리뷰 목록 렌더링
  const renderReviews = () => {
    reviewList.innerHTML = ""; // 기존 리뷰 목록 초기화

    reviews.forEach((review, index) => {
      const li = document.createElement("li");
      const filledStars = `<i class="fa-solid fa-star"></i>`.repeat(review.rating);
      const emptyStars = `<i class="fa-regular fa-star"></i>`.repeat(5 - review.rating);
      li.innerHTML = `
        <div>
          <div>${filledStars}${emptyStars}</div>
          <small>${review.date}</small>
          <p>${review.content}</p>
          <small>${review.options.join(", ")}</small>
          <button class="edit-btn" data-index="${index}">수정</button>
          <button class="delete-btn" data-index="${index}">삭제</button>
        </div>
      `;
      reviewList.appendChild(li);
    });

    // 전체 평점 업데이트
    updateAverageRating();
  };

  // 평균 평점 업데이트
  const updateAverageRating = () => {
    if (reviews.length === 0) {
        renderEmptyMessage();
        return;
    }

    // 전체 평점 계산
    const totalStars = reviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = (totalStars / reviews.length).toFixed(2); // 소수점 둘째 자리까지 표시
    
    // 전체 평점 업데이트
    averageRatingEl.textContent = averageRating;

    // 별점 업데이트
    const filledStars = Math.round(averageRating);
    const averageStars = `
        ${`<i class="fa-solid fa-star"></i>`.repeat(filledStars)}
        ${`<i class="fa-regular fa-star"></i>`.repeat(5 - filledStars)}
    `;
    averageStarsEl.innerHTML = averageStars;
  };

    // 수정 및 삭제 버튼 이벤트 핸들링
    reviewList.addEventListener("click", (event) => {
      const target = event.target;

      // 수정 버튼 클릭 시, 해당 리뷰의 index를 URL 파라미터로 전달
      if (target.classList.contains("edit-btn")) {
        const index = event.target.dataset.index;
        window.location.href = `reviewEdit.html?index=${index}`;
      }

      // 삭제 버튼 클릭 시
      if (target.classList.contains("delete-btn")) {
          const index = target.dataset.index;
          const confirmDelete = confirm("이 리뷰를 삭제하시겠습니까?");

          if (confirmDelete) {
              reviews.splice(index, 1);
              localStorage.setItem("reviews", JSON.stringify(reviews));
              renderReviews();
          }
      }
    });

  // 초기 렌더링
  renderReviews();

    // } catch (error) {
    //     console.error('리뷰 불러오기 오류:', error);
    //     reviewList.innerHTML = '<li>리뷰를 불러오는 데 실패했습니다.</li>';
    // }
});

