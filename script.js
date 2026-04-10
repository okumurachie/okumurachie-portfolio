/* ============================================================
script.js — okumurachie Portfolio（全ページ共通）
   機能:
     1. ハンバーガーメニューの開閉
     2. スクロール時のナビ影付け
     3. スクロールフェードインアニメーション
     4. お問い合わせフォームのバリデーション（contact.html のみ動作）
   ============================================================ */

/* ============================================================
1. ハンバーガーメニューの開閉
   ============================================================ */

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    // アクセシビリティ：展開状態を aria 属性で伝える
    menuBtn.setAttribute('aria-expanded', String(isOpen));
});

// ナビリンクをクリックしたらメニューを閉じる（スマホ用）
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

/* ============================================================
2. スクロール時にナビに影をつける
   ============================================================ */

const navbar = document.getElementById('navbar');

window.addEventListener(
    'scroll',
    () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    },
    { passive: true },
);

/* ============================================================
3. スクロールフェードインアニメーション
    .reveal クラスの要素が画面内に入ったら .visible を付与
   ============================================================ */

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // 複数要素が同時に現れるとき、少しずつ遅らせてアニメーション
                    const delay = index * 80;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    // 一度表示したら監視を止める（パフォーマンス向上）
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12, // 12% 見えたら発火
            rootMargin: '0px 0px -40px 0px',
        },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
}

/* ============================================================
4. お問い合わせフォームのバリデーション
    contact.html にフォームがある場合のみ動作
   ============================================================ */

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // ページリロードを防ぐ

        // 入力値の取得と前後の空白除去
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // ── バリデーション ──
        if (!name) {
            showError('お名前を入力してください。');
            return;
        }
        if (!email || !isValidEmail(email)) {
            showError('正しいメールアドレスを入力してください。');
            return;
        }
        if (!message) {
            showError('メッセージを入力してください。');
            return;
        }

        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' },
        });

        if (response.ok) {
            formSuccess.hidden = false;
            contactForm.reset();
        } else {
            alert('送信に失敗しました。もう一度お試しください。');
        }
        // 10 秒後に成功メッセージを非表示
        setTimeout(() => {
            formSuccess.hidden = true;
        }, 10000);
    });
}

/**
 * バリデーションエラーをアラートで表示
 * @param {string} message
 */
function showError(message) {
    alert(message);
}

/**
 * メールアドレスの形式チェック
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
