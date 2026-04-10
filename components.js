const NAV_HTML = `
<nav id="navbar">
    <a class="nav-logo" href="index.html">
        <img class="nav-image" src="../images/inago.png" alt="いなご" />
        <span class="nav-text">C.Okumura</span>
    </a>
    <button class="hamburger" id="menuBtn" aria-label="メニューを開く" aria-expanded="false">
        <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="navLinks">
        <li><a href="index.html"    data-page="index">ホーム</a></li>
        <li><a href="projects.html" data-page="projects">プロジェクト</a></li>
        <li><a href="skills.html"   data-page="skills">スキル</a></li>
        <li><a href="profile.html"  data-page="profile">プロフィール</a></li>
        <li><a href="contact.html"  data-page="contact">お問い合わせ</a></li>
    </ul>
</nav>
`;

/* ============================================================
    フッターのHTML
   ============================================================ */
const FOOTER_HTML = `
<footer>
    <p>© 2026 okumurachie ♥</p>
</footer>
`;

/* ============================================================
    HTMLを挿入する関数
   ============================================================ */

/**
 * ナビゲーションを <body> の先頭に挿入する
 */
function injectNav() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = NAV_HTML;
    const navEl = wrapper.firstElementChild;
    document.body.insertBefore(navEl, document.body.firstChild);
}

/**
 * フッターを <body> の末尾に追加する
 */
function injectFooter() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = FOOTER_HTML;
    const footerEl = wrapper.firstElementChild;
    document.body.appendChild(footerEl);
}

/**
 * 現在表示しているページを URL から判定し、
 * 対応するナビリンクに nav-active クラスを付ける
 *
 * 例: URL が "projects.html" なら data-page="projects" のリンクをアクティブに
 */
function setActiveNav() {
    // ファイル名を取得（例: "projects.html" → "projects"）
    const pathname = window.location.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    const currentPage = filename.replace('.html', '') || 'index';

    // data-page 属性と照合してアクティブクラスを付与
    document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
        if (link.dataset.page === currentPage) {
            link.classList.add('nav-active');
        }
    });
}

/* ============================================================
    実行（DOMが構築される前でも動作するよう同期実行）
   ============================================================ */
injectNav();
injectFooter();
setActiveNav();
