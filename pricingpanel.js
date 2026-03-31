(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log("Pricing Panel Script loaded. DOM ready.");

    const modal = document.querySelector('.modal.pricingModal');
    const closeBtn = document.querySelector('.modal__content__close');
    const openTriggers = document.querySelectorAll(
      '[data-modal-trigger="pricingModal"]'
    );
    const table = document.querySelector('.table-basic');

    if (!modal) return;

    /* --------------------------
       MODAL OPEN / CLOSE LOGIC
    --------------------------- */

    function updateScrollLock() {
      const isVisible =
        window.getComputedStyle(modal).display === 'block';

      document.body.classList.toggle('modal-open', isVisible);
    }

    function openModal() {
      modal.style.display = 'block'; // or class-based if preferred
      updateScrollLock();
    }

    function closeModal() {
      modal.style.display = 'none'; // or class-based if preferred
      updateScrollLock();
    }

    // Open modal
    openTriggers.forEach(trigger => {
      trigger.addEventListener('click', function () {
        openModal();
      });
    });

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeModal();
      });
    }

    // Initial modal state check
    updateScrollLock();

    // Watch for external modal changes
    const observer = new MutationObserver(updateScrollLock);
    observer.observe(modal, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    /* --------------------------
       TABLE ROW RADIO SELECTION
       (MOBILE + DESKTOP)
    --------------------------- */

    if (table) {
      table.addEventListener('click', function (event) {
        // Find the clicked row
        const row = event.target.closest('tr');
        if (!row) return;

        // Ignore divider rows
        if (row.classList.contains('divider')) return;

        // If the user clicked the radio directly, let native behavior run
        if (event.target.matches('input[type="radio"]')) return;

        // Find the radio inside this row
        const radio = row.querySelector('input[type="radio"]');
        if (!radio || radio.disabled) return;

        // Select the radio
        radio.checked = true;

        // Trigger change event (important for analytics / listeners)
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  });
})();
