// =========================
// ナビゲーションのハンバーガーメニュー機能
// =========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// ハンバーガーメニューをクリックしたときの動作
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ナビゲーションリンクをクリックしたときにハンバーガーメニューを閉じる
// （スマホ表示時のメニュー閉じ）
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offset = document.querySelector('.navbar').offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        // スマホ時はメニューを閉じる
        if (window.innerWidth < 800) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// =========================
// スムーズスクロール機能
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =========================
// ナビゲーションのアクティブ状態を管理
// =========================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =========================
// スキルバーのアニメーション
// =========================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // スキルバーをアニメーションで表示
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// スキルセクションを監視してアニメーションを発火
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// =========================
// プロジェクトカードのホバーエフェクト
// =========================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// =========================
// お問い合わせフォーム送信処理
// =========================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータを取得
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // 簡単なバリデーション
        if (!name || !email || !subject || !message) {
            alert('すべての項目を入力してください。');
            return;
        }
        
        // メールアドレスの形式チェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('正しいメールアドレスを入力してください。');
            return;
        }
        
        // 送信成功メッセージ（実際の送信処理は別途実装が必要）
        alert('お問い合わせありがとうございます。\n内容を確認次第、ご連絡いたします。');
        this.reset();
    });
}

// =========================
// ページ読み込み時のアニメーション
// =========================
window.addEventListener('load', () => {
    // ヒーローセクションのフェードイン
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // プロフィール画像のアニメーション
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (profilePlaceholder) {
        profilePlaceholder.style.opacity = '0';
        profilePlaceholder.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            profilePlaceholder.style.transition = 'all 1s ease';
            profilePlaceholder.style.opacity = '1';
            profilePlaceholder.style.transform = 'scale(1)';
        }, 600);
    }
});

// =========================
// スクロール時のナビゲーション背景変更
// =========================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// =========================
// テキストタイピングエフェクト（オプション）
// =========================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ヒーローセクションのタイトルにタイピングエフェクトを適用（オプション）
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
}

// =========================
// スムーズなスクロール位置調整（ナビゲーションバーの高さを考慮）
// =========================
function adjustScrollPosition(target) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = target.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// ナビゲーションリンクのクリックイベントを更新
// （スクロール位置を調整してジャンプ）
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            adjustScrollPosition(target);
        }
    });
}); 