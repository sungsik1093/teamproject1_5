document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const form = document.querySelector("form");
    const passwordInput = document.querySelector("input[name='password']");
    const confirmPasswordInput = document.querySelector("input[name='confirm_password']");

    phoneInput.addEventListener("input", function () {
        // 입력된 값에서 숫자만 남기고 나머지 문자 제거
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    });

    form.addEventListener("submit", function (event) {
        // 전화번호 길이 검사 (예: 10자리 이상)
        if (phoneInput.value.length < 10) {
            alert("전화번호는 최소 10자리여야 합니다.");
            event.preventDefault();
            return;
        }

        // 비밀번호 강도 검사 (최소 8자리, 숫자 및 특수문자 포함)
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("비밀번호는 최소 8자리이며 숫자와 특수문자를 포함해야 합니다.");
            event.preventDefault();
            return;
        }

        // 비밀번호 확인 검사
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("비밀번호가 일치하지 않습니다.");
            event.preventDefault();
            return;
        }
    });

    // 비밀번호 표시 기능 추가 (비밀번호 확인 필드에만)
    const confirmPasswordToggle = document.createElement("input");
    confirmPasswordToggle.type = "checkbox";
    confirmPasswordToggle.id = "toggleConfirmPassword";
    const confirmPasswordToggleLabel = document.createElement("label");
    confirmPasswordToggleLabel.htmlFor = "toggleConfirmPassword";
    confirmPasswordToggleLabel.textContent = "비밀번호 표시";

    confirmPasswordInput.parentElement.insertAdjacentElement("afterend", confirmPasswordToggleLabel);
    confirmPasswordToggleLabel.insertAdjacentElement("afterend", confirmPasswordToggle);

    confirmPasswordToggle.addEventListener("change", function () {
        if (confirmPasswordToggle.checked) {
            confirmPasswordInput.type = "text";
        } else {
            confirmPasswordInput.type = "password";
        }
    });
});
