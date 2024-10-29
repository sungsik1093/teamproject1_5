document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function () {
        // 입력된 값에서 숫자만 남기고 나머지 문자 제거
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    });
});