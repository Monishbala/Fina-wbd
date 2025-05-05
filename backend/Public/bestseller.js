document.addEventListener('DOMContentLoaded', function () {
    const submitFilterButton = document.getElementById('submitFilter');
    const resetFilterButton = document.getElementById('resetFilter');

    function filterBooks() {
        const searchPrice = parseInt(document.getElementById('searchPrice').value) || Infinity;
        const minDiscount = parseInt(document.getElementById('minDiscount').value) || 0;
        const boxes = document.querySelectorAll('.box');
        const englishChecked = document.getElementById('englishCheckbox').checked;
        const teluguChecked = document.getElementById('teluguCheckbox').checked;
        const tamilChecked = document.getElementById('tamilCheckbox').checked;
        const hindiChecked = document.getElementById('hindiCheckbox').checked;
        
        boxes.forEach(function (box) {
            const price = parseInt(box.getAttribute('data-price'));
            const hasDiscount = box.getAttribute('data-discount') === 'true';
            const discountValue = parseFloat(box.getAttribute('data-discount-value')) || 0;
            const bookLanguage = box.getAttribute('data-language');

            let shouldBeShown = true;

            if (searchPrice && (price > searchPrice)) {
                shouldBeShown = false;
            }

            if (minDiscount && (!hasDiscount || discountValue < minDiscount)) {
                shouldBeShown = false;
            }

            if (
                (englishChecked && !bookLanguage.includes('English')) ||
                (teluguChecked && !bookLanguage.includes('Telugu')) ||
                (tamilChecked && !bookLanguage.includes('Tamil')) ||
                (hindiChecked && !bookLanguage.includes('Hindi'))
            ) {
                shouldBeShown = false;
            }

            if (shouldBeShown) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    }

    function submitFilter() {
        filterBooks();
    }

    function resetFilter() {
        document.getElementById('searchPrice').value = '';
        document.getElementById('minDiscount').value = '';
        document.getElementById('englishCheckbox').checked = false;
        document.getElementById('teluguCheckbox').checked = false;
        document.getElementById('tamilCheckbox').checked = false;
        document.getElementById('hindiCheckbox').checked = false;
        filterBooks();
    }

    submitFilterButton.addEventListener('click', submitFilter);
    resetFilterButton.addEventListener('click', resetFilter);
});