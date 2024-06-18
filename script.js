document.addEventListener("DOMContentLoaded", function() {
    let balance = 0;
    let progress = 0;
    const balanceElement = document.getElementById("balance");
    const coinElement = document.getElementById("coin");
    const progressBar = document.getElementById("progress-bar");

    let cooldown = false;

    coinElement.addEventListener("click", function() {
        if (cooldown) {
            return;
        }

        balance++;
        balanceElement.textContent = `Balance: ${balance} coins`;

        progress += 10; // Increment progress by 10% with each click
        if (progress > 100) {
            progress = 100;
        }

        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;

        if (progress === 100) {
            startCooldown();
        } else {
            startDecrease();
        }
    });

    function startCooldown() {
        cooldown = true;
        coinElement.style.cursor = 'not-allowed';

        let interval = setInterval(() => {
            progress -= 2; // Decrease progress by 2% per step during cooldown
            if (progress <= 0) {
                progress = 0;
                clearInterval(interval);
                cooldown = false;
                coinElement.style.cursor = 'pointer';
            }
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${progress}%`;
        }, 100); // Decrease progress every 100 milliseconds
    }

    function startDecrease() {
        if (cooldown) {
            return;
        }

        let interval = setInterval(() => {
            progress -= 1; // Decrease progress by 1% per step during normal clicks
            if (progress <= 0) {
                progress = 0;
                clearInterval(interval);
            }
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${progress}%`;
        }, 200); // Decrease progress every 200 milliseconds
    }
});
