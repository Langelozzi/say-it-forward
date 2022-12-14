/**
 * Inject templates into proper placeholders.
 */
function loadSkeleton() {
    $('#navbar-placeholder').load('../templates/nav.html');
    $('#navbar-back-btn-placeholder').load('../templates/nav-back-btn.html');
    $('#navbar-no-account-icon-placeholder').load('../templates/nav-no-account-icon.html');
    $('#footer-empty-placeholder').load('../templates/footer-empty.html');
    $('#footer-placeholder').load('../templates/footer.html');
}
loadSkeleton();