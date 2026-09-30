// =============================================
// 🔒 نظام حماية متقدم - منصة الإيضاح (النسخة النهائية)
// =============================================
(function() {
        'use strict';

        // =============================================
        // 🛡️ نظام حماية Console المتقدم
        // =============================================
        const _0xDevMode = {
            active: false,
            secretKey: 'ALIDAH_DEV_2026',
            checkInterval: null,

            activate: function() {
                this.active = true;
                if (this.checkInterval) {
                    clearInterval(this.checkInterval);
                    this.checkInterval = null;
                }
            },

            protect: function() {
                const self = this;

                document.addEventListener('keydown', function(e) {
                    if (self.active) return;

                    if (e.key === 'F12' ||
                        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
                        (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
                        (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k'))) {
                        e.preventDefault();
                        self._showWarning();
                        return false;
                    }
                });

                document.addEventListener('contextmenu', function(e) {
                    if (self.active) return;
                    e.preventDefault();
                    self._showWarning();
                    return false;
                });

                self.checkInterval = setInterval(function() {
                    if (self.active) return;

                    const start = performance.now();
                    debugger;
                    const end = performance.now();

                    if (end - start > 100) {
                        self._blockSite();
                    }
                }, 1000);

                const devtools = { open: false };
                const element = new Image();
                Object.defineProperty(element, 'id', {
                    get: function() {
                        if (!self.active) {
                            self._blockSite();
                        }
                    }
                });

                setInterval(function() {
                    if (!self.active) {
                        console.log('%c', element);
                    }
                }, 500);
            },

            _showWarning: function() {
                alert('⛔ عذراً، هذه الميزة معطلة لأسباب أمنية');
            },

            _blockSite: function() {
                document.body.innerHTML = `
                <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:#0a0e14;display:flex;align-items:center;justify-content:center;flex-direction:column;z-index:999999;">
                    <h1 style="color:#ef4444;font-size:48px;font-family:'Tajawal',sans-serif;margin-bottom:20px;">⛔ تم اكتشاف محاولة اختراق</h1>
                    <p style="color:#8b95a5;font-size:24px;font-family:'Tajawal',sans-serif;">عذراً، لا يمكنك الوصول إلى هذا المحتوى</p>
                </div>
            `;
                throw new Error('Security violation');
            }
        };

        _0xDevMode.protect();

        // =============================================
        // 🔐 إعدادات Firebase
        // =============================================
        const firebaseConfig = {
            apiKey: "AIzaSyCTZCt9aKNXPvOdx9g3p7RH4",
            authDomain: "alidah-99472.firebaseapp.com",
            projectId: "alidah-99472",
            storageBucket: "alidah-99472.firebasestorage.app",
            messagingSenderId: "696531426179",
            appId: "1:696531426179:web:7b2176188682adace2b4b6",
            measurementId: "G-HLC65V979V"
        };

        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        db.enablePersistence({synchronizeTabs:true}).catch(()=>{});
        const contentRef = db.collection("platform").doc("data");
        const studentsRef = db.collection("students");
        const resultsRef = db.collection("results");
        let _0xContentUnsub = null, _0xStudentUnsub = null, _0xResultUnsub = null;


        const _0xSec = {
            s1: [0x4b, 0x7e, 0x2a, 0x9f, 0x3c, 0x1d, 0x8b, 0x5e],
            s2: [0x6f, 0x3a, 0xc2, 0x4d, 0x9e, 0x7b, 0x1f, 0x5c],

            h1: "b310c94ebd4a386786bd0b36c2a0249966b275f5c2ee053b09f298029cbc137d",
            h2: "242bddda8a716b517444fd2f89d025663fe44a3e9344de89a1f4e723303fda68",

            iter: 100000
        };

        // =============================================
        async function _0xHash(password, saltArray) {
            const encoder = new TextEncoder();
            const passwordBuffer = encoder.encode(password);
            const saltBuffer = new Uint8Array(saltArray);

            const keyMaterial = await crypto.subtle.importKey(
                'raw', passwordBuffer, 'PBKDF2', false, ['deriveBits']
            );

            const derivedBits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: saltBuffer, iterations: _0xSec.iter, hash: 'SHA-256' },
                keyMaterial, 256
            );

            return Array.from(new Uint8Array(derivedBits))
                .map(b => b.toString(16).padStart(2, '0')).join('');
        }

        async function _0xCheck1(password) {
            try {
                return await _0xHash(password, _0xSec.s1) === _0xSec.h1;
            } catch { return false; }
        }

        async function _0xCheck2(password) {
            try {
                return await _0xHash(password, _0xSec.s2) === _0xSec.h2;
            } catch { return false; }
        }

        // =============================================
        // 🛡️ حماية XSS
        // =============================================
        function _0xSanitize(input) {
            if (typeof input !== 'string') return '';
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        }

        function _0xValidateURL(url) {
            if (typeof url !== 'string') return false;
            try { const u = new URL(url); return ['youtube.com','youtu.be','www.youtube.com','drive.google.com','docs.google.com'].some(d => u.hostname === d || u.hostname.endsWith('.'+d)); } catch { return false; }
        }

        // =============================================
        // 📊 المتغيرات
        // =============================================
        let _0xData = {};
        let _0xView = 'home';
        let _0xGrade = null;
        let _0xSubject = null;
        let _0xLoggedIn = false;
        let _0xStep = 1;
        let _0xAttempts = 0;
        const _0xMaxAttempts = 5;
        let _0xLocked = false;
        let _0xLockTime = 0;

        // =============================================
        // 📚 الصفوف والمواد
        // =============================================
        const _0xGrades = [
            "الصف الأول الإعدادي", "الصف الثاني الإعدادي", "الصف الثالث الإعدادي",
            "الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"
        ];

        const _0xSubjects = {
            "الصف الأول الإعدادي": ["الفقه", "التوحيد", "التفسير", "الحديث", "السيرة"],
            "الصف الثاني الإعدادي": ["الفقه", "التوحيد", "التفسير", "الحديث", "السيرة"],
            "الصف الثالث الإعدادي": ["الفقه", "التوحيد", "التفسير", "الحديث", "السيرة", "علم الميراث"],
            "الصف الأول الثانوي": ["الفقه", "التوحيد", "التفسير", "الحديث"],
            "الصف الثاني الثانوي": ["الفقه", "التوحيد", "التفسير", "الحديث"],
            "الصف الثالث الثانوي": ["الفقه", "التوحيد", "التفسير", "الحديث", "علم الميراث"]
        };

        // =============================================
        // 🎨 الأيقونات
        // =============================================
        const _0xIcons = {
            book: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
            video: '<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
            play: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>',
            quiz: '<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
            arrow: '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
            home: '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
            graduate: '<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
            tafseer: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/></svg>',
            external: '<svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
            link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
        };

        // =============================================
        // 🔧 العناصر
        // =============================================
        const $ = id => document.getElementById(id);
        const _0xE = {
            main: $('main-content'),
            breadcrumb: $('breadcrumb'),
            loading: $('loading-screen'),
            scrollTop: $('scroll-top'),
            particles: $('particles'),
            loginModal: $('login-modal'),
            adminModal: $('admin-modal'),
            pwd1: $('password1-input'),
            pwd2: $('password2-input'),
            err1: $('login-error-1'),
            err2: $('login-error-2'),
            adminBtn: $('admin-header-btn'),
            loginClose: $('login-close'),
            adminClose: $('admin-close'),
            nextBtn: $('next-btn'),
            loginBtn: $('login-btn'),
            saveBtn: $('save-btn'),
            gradeSel: $('grade-select'),
            subjectSel: $('subject-select'),
            typeSel: $('type-select'),
            linkIn: $('link-input'),
            titleIn: $('title-input'),
            success: $('admin-success'),
            links: $('current-links'),
            linkGroup: $('link-group'), durationGroup: $('duration-group'), duration: $('quiz-duration'), builder: $('question-builder'),
            studentsList: $('students-list'), resultsList: $('results-list'), studentsCount: $('students-count'), activeStudentsCount: $('active-students-count'), blockedStudentsCount: $('blocked-students-count'),
            studentModal: $('student-modal'), studentName: $('student-name'), studentPhone: $('student-phone'), studentError: $('student-error'), studentSave: $('student-save'),
            videoModal: $('video-modal'), videoFrame: $('video-frame'), videoTitle: $('video-title'), videoClose: $('video-close'),
            quizModal: $('quiz-modal'), quizTitle: $('quiz-title'), quizSubject: $('quiz-subject-label'), quizTimer: $('quiz-timer'), quizBody: $('quiz-body'), quizSubmit: $('quiz-submit'), quizResult: $('quiz-result'), themeToggle: $('theme-toggle'),
            step1: $('step-1'),
            step2: $('step-2'),
            dot1: $('step-dot-1'),
            dot2: $('step-dot-2')
        };

        // =============================================
        // 📥 تحميل وحفظ البيانات
        // =============================================
        async function _0xLoadData() {
            try {
                const doc = await contentRef.get();
                if (doc.exists && doc.data().content) {
                    _0xData = doc.data().content;
                }
                // تهيئة البيانات
                _0xGrades.forEach(g => {
                    if (!_0xData[g]) _0xData[g] = {};
                    _0xSubjects[g].forEach(s => {
                        if (!_0xData[g][s]) _0xData[g][s] = { books: [], videos: [], quizzes: [] };
                        // تحويل البيانات القديمة إن وجدت
                        _0xMigrateData(g, s);
                    });
                });
                // حفظ تنظيف البيانات القديمة مرة واحدة حتى لا يعود اختبار الطلاق القديم بعد التحديث اللحظي.
                await _0xSaveData();
            } catch {
                _0xGrades.forEach(g => {
                    _0xData[g] = {};
                    _0xSubjects[g].forEach(s => { _0xData[g][s] = { books: [], videos: [], quizzes: [] }; });
                });
            }
        }

        // تحويل البيانات من النظام القديم للجديد
        function _0xMigrateData(grade, subject) {
            const data = _0xData[grade][subject];

            // إذا كان هناك book قديم (string)
            if (data.book && typeof data.book === 'string') {
                if (!data.books) data.books = [];
                data.books.push({
                    id: Date.now() + '_migrated',
                    title: 'كتاب ' + subject,
                    url: data.book,
                    addedAt: Date.now()
                });
                delete data.book;
            }

            // إذا كان هناك video قديم (string)
            if (data.video && typeof data.video === 'string') {
                if (!data.videos) data.videos = [];
                data.videos.push({
                    id: Date.now() + '_migrated_video',
                    title: 'شرح ' + subject,
                    url: data.video,
                    addedAt: Date.now()
                });
                delete data.video;
            }

            delete data.quiz;
            if (Array.isArray(data.quizzes)) data.quizzes = data.quizzes.filter(q => q && q.questions && q.questions.length && !String(q.title||'').includes('الطلاق'));

            // التأكد من وجود المصفوفات
            if (!data.books) data.books = [];
            if (!data.videos) data.videos = [];
            if (!data.quizzes) data.quizzes = [];
        }

        async function _0xSaveData() { try { await contentRef.set({ content: _0xData, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, {merge:true}); return true; } catch(e) { console.error(e); return false; } }

        // =============================================
        // ✨ الجزيئات
        // =============================================
        function _0xParticles() {
            const colors = ['#d4a843', '#e8c56b', '#22c997', '#e879a9', '#a78bfa', '#f59e0b'];
            for (let i = 0; i < 35; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                p.style.cssText = `width:${Math.random()*4+2}px;height:${Math.random()*4+2}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*10}s;animation-duration:${Math.random()*5+7}s`;
                _0xE.particles.appendChild(p);
            }
        }

        // =============================================
        // 🏠 عرض الصفحات
        // =============================================
        function _0xRenderHome() {
            _0xView = 'home';
            _0xGrade = null;
            _0xSubject = null;
            _0xUpdateBreadcrumb();
            const info = {
                "الصف الأول الإعدادي": ["إعدادي", 1],
                "الصف الثاني الإعدادي": ["إعدادي", 2],
                "الصف الثالث الإعدادي": ["إعدادي", 3],
                "الصف الأول الثانوي": ["ثانوي", 1],
                "الصف الثاني الثانوي": ["ثانوي", 2],
                "الصف الثالث الثانوي": ["ثانوي", 3]
            };

            let html = '<div class="section-header"><h2 class="section-title"><span>اختر الصف الدراسي</span></h2><p class="section-subtitle">اختر الصف الدراسي للوصول إلى المواد والكتب والفيديوهات والاختبارات</p></div><div class="grades-grid">';

            _0xGrades.forEach(g => {
                        let cnt = 0;
                        _0xSubjects[g].forEach(s => {
                            const subj = _0xData[g] && _0xData[g][s];
                            if (subj) {
                                cnt += (subj.books || []).length;
                                cnt += (subj.videos || []).length;
                                cnt += (subj.quizzes || []).length;
                            }
                        });
                        html += `<div class="grade-card" data-grade="${g}"><div class="grade-card-header"><div class="grade-icon">${_0xIcons.graduate}<span class="grade-icon-badge">${info[g][1]}</span></div><div class="grade-info"><h3>${g}</h3><p>المرحلة ${info[g][0]}</p></div></div><div class="grade-card-body"><div class="grade-stats"><div class="stat-item"><div class="stat-value">${_0xSubjects[g].length}</div><div class="stat-label">مواد دراسية</div></div><div class="stat-item"><div class="stat-value">${cnt}</div><div class="stat-label">محتوى</div></div></div></div><div class="grade-card-footer"><div class="subjects-preview">${_0xSubjects[g].slice(0,3).map(s=>`<span class="subject-tag">${s}</span>`).join('')}</div><div class="grade-arrow">${_0xIcons.arrow}</div></div></div>`;
        });
        html += '</div>';
        _0xE.main.innerHTML = html;
        document.querySelectorAll('.grade-card').forEach(c => c.onclick = () => _0xSelectGrade(c.dataset.grade));
    }

    function _0xSelectGrade(g) {
        _0xGrade = g; _0xView = 'subjects'; _0xUpdateBreadcrumb();
        let html = `<div class="section-header"><h2 class="section-title"><span>${g}</span></h2><p class="section-subtitle">اختر المادة الدراسية</p></div><div class="subjects-grid">`;
        _0xSubjects[g].forEach(s => {
            const c = _0xData[g] ? _0xData[g][s] : { books: [], videos: [], quizzes: [] };
            const booksCount = (c.books || []).length;
            const videosCount = (c.videos || []).length;
            const quizzesCount = (c.quizzes || []).length;
            const hasContent = booksCount > 0 || videosCount > 0 || quizzesCount > 0;
            
            let txt = [];
            if (booksCount > 0) txt.push(booksCount + ' كتاب');
            if (videosCount > 0) txt.push(videosCount + ' فيديو');
            if (quizzesCount > 0) txt.push(quizzesCount + ' اختبار');
            
            html += `<div class="subject-card" data-subject="${s}"><div class="subject-card-content"><div class="subject-icon">${_0xIcons.tafseer}</div><div class="subject-info"><h4>${s}${quizzesCount > 0 ? `<span class="quiz-badge">${_0xIcons.quiz}اختبار</span>` : ''}</h4><p>${txt.length ? txt.join(' + ') : 'لم يتم إضافة محتوى'}</p></div><div class="subject-arrow">${_0xIcons.arrow}</div></div></div>`;
        });
        html += '</div>';
        _0xE.main.innerHTML = html;
        document.querySelectorAll('.subject-card').forEach(c => c.onclick = () => {
            const sub = c.dataset.subject;
            const cont = _0xData[_0xGrade] ? _0xData[_0xGrade][sub] : { books: [], videos: [], quizzes: [] };
            const hasContent = (cont.books || []).length > 0 || (cont.videos || []).length > 0 || (cont.quizzes || []).length > 0;
            if (hasContent) _0xSelectSubject(sub);
        });
    }

    function _0xSelectSubject(s) {
        _0xSubject = s; _0xView = 'content'; 
        const c = _0xData[_0xGrade] ? _0xData[_0xGrade][s] : { books: [], videos: [], quizzes: [] };
        _0xUpdateBreadcrumb();
        
        let html = `<div class="content-panel"><div class="content-panel-header"><h2 class="content-panel-title">${_0xIcons.tafseer}${s} - ${_0xGrade}</h2></div><div class="content-panel-body">`;
        
        const books = c.books || [];
        const videos = c.videos || [];
        const quizzes = c.quizzes || [];
        
        // عرض الكتب
        if (books.length > 0) {
            html += `<div class="content-section book">
                <div class="content-section-header">
                    <div class="content-section-icon">${_0xIcons.book}</div>
                    <h3 class="content-section-title">الكتب</h3>
                    <span class="content-section-count">${books.length}</span>
                </div>
                <div class="links-list">`;
            books.forEach((item, idx) => {
                if (_0xValidateURL(item.url)) {
                    html += `<div class="link-item-user book" data-url="${_0xSanitize(item.url)}">
                        <div class="link-icon">${_0xIcons.book}</div>
                        <div class="link-details">
                            <div class="link-title">${_0xSanitize(item.title)}</div>
                            <div class="link-type">كتاب PDF</div>
                        </div>
                        <div class="link-arrow">${_0xIcons.external}</div>
                    </div>`;
                }
            });
            html += `</div></div>`;
        }
        
        // عرض الفيديوهات
        if (videos.length > 0) {
            html += `<div class="content-section video">
                <div class="content-section-header">
                    <div class="content-section-icon">${_0xIcons.play}</div>
                    <h3 class="content-section-title">الفيديوهات</h3>
                    <span class="content-section-count">${videos.length}</span>
                </div>
                <div class="links-list">`;
            videos.forEach((item, idx) => {
                if (_0xValidateURL(item.url)) {
                    html += `<div class="link-item-user video" data-url="${_0xSanitize(item.url)}">
                        <div class="link-icon">${_0xIcons.play}</div>
                        <div class="link-details">
                            <div class="link-title">${_0xSanitize(item.title)}</div>
                            <div class="link-type">فيديو YouTube</div>
                        </div>
                        <div class="link-arrow">${_0xIcons.external}</div>
                    </div>`;
                }
            });
            html += `</div></div>`;
        }
        
        // عرض الاختبارات
        if (quizzes.length > 0) {
            html += `<div class="content-section quiz">
                <div class="content-section-header">
                    <div class="content-section-icon">${_0xIcons.quiz}</div>
                    <h3 class="content-section-title">الاختبارات</h3>
                    <span class="content-section-count">${quizzes.length}</span>
                </div>
                <div class="links-list">`;
            quizzes.forEach((item, idx) => {
                {
                    html += `<div class="link-item-user quiz" data-id="${_0xSanitize(String(item.id))}" data-url="${_0xSanitize(item.url||'')}">
                        <div class="link-icon">${_0xIcons.quiz}</div>
                        <div class="link-details">
                            <div class="link-title">${_0xSanitize(item.title)}</div>
                            <div class="link-type">اختبار</div>
                        </div>
                        <div class="link-arrow">${_0xIcons.external}</div>
                    </div>`;
                }
            });
            html += `</div></div>`;
        }
        
        // إذا لا يوجد محتوى
        if (books.length === 0 && videos.length === 0 && quizzes.length === 0) {
            html += `<div class="status-message"><h3>لم يتم إضافة محتوى بعد</h3><p>سيتم إضافة المحتوى قريباً إن شاء الله</p></div>`;
        }
        
        html += '</div></div>';
        _0xE.main.innerHTML = html;
        
        // إضافة أحداث النقر على الروابط
        document.querySelectorAll('.link-item-user').forEach(item => {
            item.onclick = () => {
                const url=item.dataset.url; const type=item.classList.contains('video')?'video':item.classList.contains('quiz')?'quiz':'book';
                if(type==='video'){const itemData=videos.find(x=>x.url===url);if(itemData)_0xOpenVideo(itemData);}
                else if(type==='quiz'){const itemData=quizzes.find(x=>String(x.id)===String(item.dataset.id));if(itemData)_0xOpenQuiz(itemData,_0xGrade,_0xSubject);}
                else if(url&&_0xValidateURL(url))window.open(url,'_blank','noopener,noreferrer');
            };
        });
    }

    function _0xUpdateBreadcrumb() {
        let items = [`<button class="breadcrumb-item ${_0xView==='home'?'active':''}" id="bc-home">${_0xIcons.home}الرئيسية</button>`];
        if(_0xGrade) items.push(`<span class="breadcrumb-arrow">${_0xIcons.arrow}</span><button class="breadcrumb-item ${_0xView==='subjects'?'active':''}" id="bc-grade">${_0xGrade}</button>`);
        if(_0xSubject) items.push(`<span class="breadcrumb-arrow">${_0xIcons.arrow}</span><button class="breadcrumb-item active">${_0xSubject}</button>`);
        _0xE.breadcrumb.innerHTML = items.join('');
        if($('bc-home')) $('bc-home').onclick = _0xRenderHome;
        if($('bc-grade')) $('bc-grade').onclick = () => _0xSelectGrade(_0xGrade);
    }

    function _0xRenderLinks() {
        let html = ''; const groups=[['books','الكتب','book'],['videos','الفيديوهات','video'],['quizzes','الاختبارات','quiz']];
        _0xGrades.forEach(g=>_0xSubjects[g].forEach(s=>{ const c=_0xData[g]?.[s]||{}; groups.forEach(([field,label,type])=>{ (c[field]||[]).forEach(item=>{
            html += `<div class="link-item admin-content-row"><div class="link-info"><div class="link-subject">${_0xSanitize(g)} - ${_0xSanitize(s)}</div><div class="link-title-display">${_0xSanitize(item.title)}</div><div class="link-url">${type==='quiz'?`اختبار داخلي · ${item.duration||30} دقيقة · ${(item.questions||[]).length} أسئلة`:_0xSanitize(item.url||'')}</div></div><button class="link-delete" data-grade="${_0xSanitize(g)}" data-subject="${_0xSanitize(s)}" data-type="${type}" data-id="${_0xSanitize(String(item.id))}">حذف</button></div>`;
        })})}));
        _0xE.links.innerHTML = html || '<div class="no-links">لا يوجد محتوى منشور حالياً.</div>';
        _0xE.links.querySelectorAll('.link-delete').forEach(b=>b.onclick=async()=>{const g=b.dataset.grade,s=b.dataset.subject,t=b.dataset.type,id=b.dataset.id;const field=t+'s';if(_0xData[g]?.[s]?.[field]){_0xData[g][s][field]=_0xData[g][s][field].filter(x=>String(x.id)!==String(id));await _0xSaveData();_0xRenderLinks();}});
    }

    function _0xYoutubeEmbed(url){ try{const u=new URL(url); let id=''; if(u.hostname.includes('youtu.be')) id=u.pathname.slice(1); else id=u.searchParams.get('v')||((u.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)||[])[1]); return id?'https://www.youtube.com/embed/'+id+'?rel=0&modestbranding=1&playsinline=1':'https://www.youtube.com/embed?listType=search&list='+encodeURIComponent(url); }catch{return '';} }
    function _0xOpenVideo(item){const src=_0xYoutubeEmbed(item.url);if(!src)return;_0xE.videoFrame.src=src;_0xE.videoTitle.textContent=item.title||'الفيديو';_0xE.videoModal.classList.add('active');document.body.classList.add('modal-open');}
    function _0xCloseVideo(){_0xE.videoFrame.src='';_0xE.videoModal.classList.remove('active');document.body.classList.remove('modal-open');}
    function _0xNormalizeAnswer(v){return String(v||'').toLowerCase().replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[ًٌٍَُِّْـ]/g,'').replace(/[^\u0600-\u06FFa-z0-9 ]/gi,' ').replace(/\s+/g,' ').trim();}
    function _0xEssaySimilar(answer,model){const a=_0xNormalizeAnswer(answer),m=_0xNormalizeAnswer(model);if(!a||!m)return false;if(a===m||a.includes(m)||m.includes(a))return true;const stop=new Set(['من','في','على','الى','إلى','عن','هو','هي','هذا','هذه','ذلك','تكون','كان','كانت','و','او','أو']);const A=new Set(a.split(' ').filter(x=>x.length>2&&!stop.has(x))),M=new Set(m.split(' ').filter(x=>x.length>2&&!stop.has(x)));let hit=0;M.forEach(x=>{if(A.has(x))hit++});return M.size>0 && hit/Math.max(1,M.size)>=0.45;}
    let _0xQuizState=null,_0xQuizInterval=null;
    async function _0xOpenQuiz(item,grade,subject){
        if(!item?.questions?.length){alert('هذا الاختبار لا يحتوي أسئلة.');return;}
        const studentId=localStorage.getItem('alidahStudentId'); if(!studentId){alert('سجل بيانات الطالب أولاً.');return;}
        try{const attemptRef=resultsRef.doc(`${studentId}_${item.id}`);const snap=await attemptRef.get();if(snap.exists){alert('تم استخدام محاولة هذا الاختبار من قبل. لا يمكن دخوله مرة أخرى.');return;}await attemptRef.set({studentId,quizId:item.id,quizTitle:item.title,gradeText:grade,subject,status:'started',startedAt:firebase.firestore.FieldValue.serverTimestamp()});}catch(e){console.error(e);alert('تعذر بدء الاختبار الآن. حاول مرة أخرى.');return;}
        _0xQuizState={item,grade,subject,startedAt:Date.now(),answers:{}}; _0xE.quizTitle.textContent=item.title; _0xE.quizSubject.textContent=grade+' · '+subject; _0xE.quizResult.innerHTML=''; _0xE.quizSubmit.disabled=false;
        _0xE.quizBody.innerHTML=item.questions.map((q,i)=>{let extra='';if(q.type==='mcq')extra=(q.options||[]).map((o,j)=>`<label class="quiz-option"><input type="radio" name="q${i}" value="${j}"><span>${_0xSanitize(o)}</span></label>`).join('');else if(q.type==='tf')extra='<label class="quiz-option"><input type="radio" name="q'+i+'" value="true"><span>صح</span></label><label class="quiz-option"><input type="radio" name="q'+i+'" value="false"><span>خطأ</span></label>';else extra=q.type==='essay'?`<textarea class="admin-input quiz-answer" data-q="${i}" placeholder="اكتب إجابتك..."></textarea>`:`<input class="admin-input quiz-answer" data-q="${i}" placeholder="اكتب الإجابة">`;return `<div class="quiz-question"><div class="quiz-question-title"><b>${i+1}. ${_0xSanitize(q.text)}</b><span class="question-points">${Number(q.points||1)} درجة</span></div><div class="quiz-options">${extra}</div></div>`}).join('');
        _0xE.quizModal.classList.add('active');document.body.classList.add('modal-open');_0xStartQuizTimer(item.duration||30);
    }
    function _0xStartQuizTimer(minutes){clearInterval(_0xQuizInterval);const end=_0xQuizState.startedAt+minutes*60000;const tick=()=>{const left=Math.max(0,end-Date.now()),sec=Math.ceil(left/1000);_0xE.quizTimer.textContent=Math.floor(sec/60).toString().padStart(2,'0')+':'+(sec%60).toString().padStart(2,'0');if(left<=0){clearInterval(_0xQuizInterval);_0xSubmitQuiz(true)}};tick();_0xQuizInterval=setInterval(tick,500);}
    async function _0xSubmitQuiz(auto=false){
        if(!_0xQuizState)return;if(!auto&&!confirm('هل تريد تسليم الاختبار؟'))return;clearInterval(_0xQuizInterval);const {item,grade,subject}=_0xQuizState;let score=0,total=0,answers=[];
        item.questions.forEach((q,i)=>{const points=Math.max(.5,Number(q.points)||1);total+=points;let ans='';const radio=document.querySelector(`input[name="q${i}"]:checked`);const text=document.querySelector(`.quiz-answer[data-q="${i}"]`);ans=radio?radio.value:(text?text.value.trim():'');let correct=false;if(q.type==='mcq'||q.type==='tf')correct=String(ans)===String(q.correct);else if(q.type==='fill')correct=_0xNormalizeAnswer(ans)===_0xNormalizeAnswer(q.correct)||_0xNormalizeAnswer(ans).includes(_0xNormalizeAnswer(q.correct));else correct=_0xEssaySimilar(ans,q.model);if(correct)score+=points;answers.push({answer:ans,correct,points});});
        const percent=total?Math.round(score/total*100):0,level=percent<50?'راسب':percent<65?'مقبول':percent<75?'جيد':percent<85?'جيد جداً':'ممتاز';const studentId=localStorage.getItem('alidahStudentId');const studentName=localStorage.getItem('alidahStudentName')||'طالب';
        try{await resultsRef.doc(`${studentId}_${item.id}`).set({studentId,studentName,quizId:item.id,quizTitle:item.title,gradeText:grade,subject,score,total,percent,level,answers,submittedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:false});}catch(e){console.error(e);alert('تعذر حفظ النتيجة. لم يتم اعتماد التسليم، حاول مرة أخرى.');return;}
        _0xE.quizResult.innerHTML=`<div class="quiz-result-card"><strong>تم تسليم الاختبار ${auto?'تلقائياً لانتهاء الوقت':''}</strong><div>النتيجة: ${score} / ${total} — ${percent}%</div><div>التقدير: ${level}</div></div>`;_0xE.quizSubmit.disabled=true;
    }
    // =============================================
    // 🔐 تسجيل الدخول
    // =============================================
    function _0xResetSteps() {
        _0xStep = 1; _0xE.pwd1.value = ''; _0xE.pwd2.value = '';
        _0xE.err1.classList.remove('show'); _0xE.err2.classList.remove('show');
        _0xE.step1.classList.add('active'); _0xE.step2.classList.remove('active');
        _0xE.dot1.classList.add('active'); _0xE.dot1.classList.remove('completed'); _0xE.dot2.classList.remove('active');
    }

    function _0xCheckLock() {
        if(_0xLocked) {
            const rem = Math.ceil((300000 - (Date.now() - _0xLockTime)) / 1000);
            if(rem > 0) return { locked: true, remaining: rem };
            _0xLocked = false; _0xAttempts = 0;
        }
        return { locked: false };
    }

    async function _0xGoToStep2() {
        const lock = _0xCheckLock();
        if(lock.locked) { _0xE.err1.textContent = `تم قفل النظام. انتظر ${lock.remaining} ثانية`; _0xE.err1.classList.add('show'); return; }
        const pwd = _0xE.pwd1.value;
        if(!pwd) { _0xE.err1.textContent = 'الرجاء إدخال كلمة المرور الأولى'; _0xE.err1.classList.add('show'); return; }
        
        if(pwd === _0xDevMode.secretKey) {
            _0xDevMode.activate();
            _0xE.err1.textContent = '✅ تم تفعيل وضع المطور - يمكنك الآن فتح الـ Console';
            _0xE.err1.style.color = '#22c55e';
            _0xE.err1.classList.add('show');
            setTimeout(() => { _0xE.err1.classList.remove('show'); _0xE.err1.style.color = ''; }, 3000);
            return;
        }
        
        if(!await _0xCheck1(pwd)) {
            _0xAttempts++;
            _0xE.err1.textContent = `كلمة المرور الأولى غير صحيحة (${_0xAttempts}/${_0xMaxAttempts})`;
            _0xE.err1.classList.add('show'); _0xE.pwd1.value = ''; _0xE.pwd1.focus();
            if(_0xAttempts >= _0xMaxAttempts) { _0xLocked = true; _0xLockTime = Date.now(); _0xE.err1.textContent = 'تم قفل النظام لمدة 5 دقائق'; }
            return;
        }
        _0xStep = 2; _0xE.err1.classList.remove('show');
        _0xE.step1.classList.remove('active'); _0xE.step2.classList.add('active');
        _0xE.dot1.classList.remove('active'); _0xE.dot1.classList.add('completed'); _0xE.dot2.classList.add('active');
        _0xE.pwd2.focus();
    }

    async function _0xDoLogin() {
        const lock = _0xCheckLock();
        if(lock.locked) { _0xE.err2.textContent = `تم قفل النظام. انتظر ${lock.remaining} ثانية`; _0xE.err2.classList.add('show'); return; }
        const pwd = _0xE.pwd2.value;
        if(!pwd) { _0xE.err2.textContent = 'الرجاء إدخال كلمة المرور الثانية'; _0xE.err2.classList.add('show'); return; }
        if(!await _0xCheck2(pwd)) {
            _0xAttempts++;
            _0xE.err2.textContent = `كلمة المرور الثانية غير صحيحة (${_0xAttempts}/${_0xMaxAttempts})`;
            _0xE.err2.classList.add('show'); _0xE.pwd2.value = ''; _0xE.pwd2.focus();
            if(_0xAttempts >= _0xMaxAttempts) { _0xLocked = true; _0xLockTime = Date.now(); _0xE.err2.textContent = 'تم قفل النظام لمدة 5 دقائق'; }
            return;
        }
        _0xLoggedIn = true; _0xAttempts = 0;
        _0xE.loginModal.classList.remove('active'); _0xE.adminModal.classList.add('active');
        _0xResetSteps(); _0xRenderLinks(); _0xSubscribeStudents(); _0xSubscribeResults();
    }

    // =============================================
    // 📝 أحداث لوحة الإدارة
    // =============================================
    _0xE.gradeSel.onchange = function() {
        let opts = '<option value="">-- اختر المادة --</option>';
        if(this.value && _0xSubjects[this.value]) _0xSubjects[this.value].forEach(s => opts += `<option value="${s}">${s}</option>`);
        _0xE.subjectSel.innerHTML = opts;
    };
    
    _0xE.typeSel.onchange = _0xSetAdminType;
    _0xE.studentSave.onclick = _0xRegisterStudent;
    _0xE.videoClose.onclick = _0xCloseVideo;
    _0xE.videoModal.addEventListener('click',e=>{if(e.target===_0xE.videoModal)_0xCloseVideo()});
    _0xE.quizSubmit.onclick = ()=>_0xSubmitQuiz(false);
    _0xE.quizModal.addEventListener('click',e=>{if(e.target===_0xE.quizModal&&!_0xQuizState)_0xE.quizModal.classList.remove('active')});
    _0xE.adminBtn.onclick = () => {
        if(_0xLoggedIn) { _0xE.adminModal.classList.add('active'); _0xRenderLinks(); }
        else { _0xE.loginModal.classList.add('active'); _0xE.pwd1.focus(); _0xResetSteps(); }
    };
    _0xE.loginClose.onclick = () => { _0xE.loginModal.classList.remove('active'); _0xResetSteps(); };
    _0xE.adminClose.onclick = () => _0xE.adminModal.classList.remove('active');
    _0xE.nextBtn.onclick = e => { e.preventDefault(); _0xGoToStep2(); };
    _0xE.loginBtn.onclick = e => { e.preventDefault(); _0xDoLogin(); };
    _0xE.pwd1.onkeypress = e => { if(e.key==='Enter') { e.preventDefault(); _0xGoToStep2(); } };
    _0xE.pwd2.onkeypress = e => { if(e.key==='Enter') { e.preventDefault(); _0xDoLogin(); } };
    
    _0xE.saveBtn.onclick = async () => {
        const grade=_0xE.gradeSel.value, subject=_0xE.subjectSel.value, type=_0xE.typeSel.value, title=_0xE.titleIn.value.trim();
        if(!grade||!subject||!type||!title){alert('الرجاء إكمال البيانات المطلوبة');return;}
        if(!_0xData[grade])_0xData[grade]={}; if(!_0xData[grade][subject])_0xData[grade][subject]={books:[],videos:[],quizzes:[]};
        const field=type+'s', id=Date.now()+'_'+Math.random().toString(36).slice(2);
        if(type==='quiz'){const qs=_0xCollectQuestions(),duration=Math.max(1,parseInt(_0xE.duration.value||30));if(!qs.length||qs.some(q=>!q.text)){alert('أضف سؤالاً واحداً على الأقل وأكمل نص السؤال');return;}if(qs.some(q=>q.type==='mcq'&&q.options.filter(Boolean).length<2)){alert('أكمل خيارات الاختيار من متعدد');return;}_0xData[grade][subject][field].push({id,title,duration,questions:qs,addedAt:Date.now()});}
        else {const link=_0xE.linkIn.value.trim();if(!_0xValidateURL(link)){alert('الرابط غير صالح. استخدم YouTube أو Google Drive.');return;}_0xData[grade][subject][field].push({id,title,url:link,addedAt:Date.now()});}
        _0xRenderLinks(); if(await _0xSaveData()){_0xE.success.classList.add('show');setTimeout(()=>_0xE.success.classList.remove('show'),2200);_0xE.titleIn.value='';_0xE.linkIn.value='';_0xE.typeSel.value='';_0xSetAdminType();_0xRenderLinks();}
    };


    // =============================================
    // 👨‍🎓 الطلاب + الوضع + التحديث اللحظي
    // =============================================
    async function _0xRegisterStudent(){const name=_0xE.studentName.value.trim(),phone=_0xE.studentPhone.value.replace(/\D/g,'');if(name.split(/\s+/).length<3){_0xE.studentError.textContent='اكتب الاسم الثلاثي كاملاً';_0xE.studentError.classList.add('show');return}if(phone.length<10){_0xE.studentError.textContent='أدخل رقم هاتف صحيح';_0xE.studentError.classList.add('show');return}try{const snap=await studentsRef.where('phone','==',phone).limit(10).get();let existing=snap.docs.find(d=>_0xNormalizeAnswer(d.data().name)===_0xNormalizeAnswer(name));if(existing&&existing.data().blocked){_0xE.studentError.textContent='هذا الحساب محظور من الدخول';_0xE.studentError.classList.add('show');return}let ref=existing?.ref;if(!ref)ref=studentsRef.doc();await ref.set({id:ref.id,name,phone,blocked:false,updatedAt:firebase.firestore.FieldValue.serverTimestamp(),createdAt:existing?.data().createdAt||firebase.firestore.FieldValue.serverTimestamp()},{merge:true});localStorage.setItem('alidahStudentId',ref.id);localStorage.setItem('alidahStudentName',name);localStorage.setItem('alidahStudentPhone',phone);_0xE.studentModal.classList.remove('active');}catch(e){console.error(e);_0xE.studentError.textContent='تعذر حفظ البيانات، حاول مرة أخرى';_0xE.studentError.classList.add('show')}}
    function _0xSubscribeContent(){if(_0xContentUnsub)return;_0xContentUnsub=contentRef.onSnapshot(s=>{if(s.exists&&s.data().content){_0xData=s.data().content;_0xGrades.forEach(g=>{_0xData[g]??={};_0xSubjects[g].forEach(sub=>{_0xData[g][sub]??={books:[],videos:[],quizzes:[]};_0xData[g][sub].books??=[];_0xData[g][sub].videos??=[];_0xData[g][sub].quizzes??=[]});});if(_0xView==='home')_0xRenderHome();else if(_0xView==='subjects')_0xSelectGrade(_0xGrade);else if(_0xView==='content')_0xSelectSubject(_0xSubject);if(_0xLoggedIn)_0xRenderLinks();}},e=>console.error(e))}
    function _0xSubscribeStudents(){if(_0xStudentUnsub)return;_0xStudentUnsub=studentsRef.orderBy('createdAt','desc').limit(200).onSnapshot(s=>{const rows=s.docs.map(d=>d.data());const blocked=rows.filter(x=>x.blocked).length;_0xE.studentsCount.textContent=rows.length;_0xE.blockedStudentsCount.textContent=blocked;_0xE.activeStudentsCount.textContent=rows.length-blocked;_0xE.studentsList.innerHTML=rows.length?rows.map(x=>`<div class="link-item student-row"><div class="link-info"><div class="link-title-display">${_0xSanitize(x.name||'')}</div><div class="link-subject">${_0xSanitize(x.phone||'')} · ${x.blocked?'محظور':'نشط'} · ${x.createdAt?.toDate?x.createdAt.toDate().toLocaleString('ar-EG'):''}</div></div><div class="row-actions"><button class="student-toggle" data-id="${x.id}" data-block="${x.blocked?'0':'1'}">${x.blocked?'فك الحظر':'حظر'}</button><button class="student-delete" data-id="${x.id}">حذف</button></div></div>`).join(''):'<div class="no-links">لا يوجد طلاب مسجلون.</div>';_0xE.studentsList.querySelectorAll('.student-toggle').forEach(b=>b.onclick=async()=>studentsRef.doc(b.dataset.id).set({blocked:b.dataset.block==='1',updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true}));_0xE.studentsList.querySelectorAll('.student-delete').forEach(b=>b.onclick=async()=>{if(confirm('حذف الطالب نهائياً؟'))await studentsRef.doc(b.dataset.id).delete()})},e=>console.error(e))}
    function _0xSubscribeResults(){if(_0xResultUnsub)return;_0xResultUnsub=resultsRef.orderBy('submittedAt','desc').limit(200).onSnapshot(s=>{_0xE.resultsList.innerHTML=s.empty?'<div class="no-links">لا توجد نتائج حتى الآن.</div>':s.docs.map(d=>{const r=d.data();return `<div class="link-item"><div class="link-info"><div class="link-title-display">${_0xSanitize(r.studentName||'طالب')} — ${_0xSanitize(r.quizTitle||'اختبار')}</div><div class="link-subject">${_0xSanitize(r.gradeText||'')} · ${r.score||0}/${r.total||0} · ${r.percent||0}% · ${_0xSanitize(r.level||'')} · ${r.submittedAt?.toDate?r.submittedAt.toDate().toLocaleString('ar-EG'):''}</div></div></div>`}).join('')},e=>console.error(e))}
    function _0xInitTheme(){document.body.classList.remove('light-mode');if(_0xE.themeToggle){_0xE.themeToggle.textContent='☾ الوضع الليلي';_0xE.themeToggle.onclick=()=>{document.body.classList.remove('light-mode');localStorage.setItem('alidahTheme','dark');};}}
    function _0xSetAdminType(){const quiz=_0xE.typeSel.value==='quiz';_0xE.linkGroup.style.display=quiz?'none':'block';_0xE.durationGroup.style.display=quiz?'block':'none';_0xE.builder.innerHTML='';if(!quiz)return;let count=0;const wrap=document.createElement('div');wrap.innerHTML='<div class="builder-head"><h4>أسئلة الاختبار</h4><button type="button" class="mini-btn" id="add-question">+ إضافة سؤال</button></div><div id="questions-list"></div>';_0xE.builder.appendChild(wrap);const list=wrap.querySelector('#questions-list');const add=()=>{const card=document.createElement('div');card.className='question-editor';card.innerHTML=`<div class="question-editor-head"><b>السؤال ${++count}</b><button type="button" class="remove-q">حذف</button></div><input class="admin-input q-text" placeholder="نص السؤال"><select class="admin-select q-type"><option value="mcq">اختيار من متعدد</option><option value="tf">صح أو خطأ</option><option value="fill">أكمل الفراغ</option><option value="essay">مقالي قصير</option></select><input type="number" class="admin-input q-points" min="0.5" step="0.5" value="1" placeholder="درجة السؤال"><div class="q-extra"></div>`;list.appendChild(card);const type=card.querySelector('.q-type'),extra=card.querySelector('.q-extra');const paint=()=>{if(type.value==='mcq')extra.innerHTML='<input class="admin-input q-opt" placeholder="الخيار الأول"><input class="admin-input q-opt" placeholder="الخيار الثاني"><input class="admin-input q-opt" placeholder="الخيار الثالث"><input class="admin-input q-opt" placeholder="الخيار الرابع"><select class="admin-select q-correct"><option value="0">الإجابة الصحيحة: 1</option><option value="1">الإجابة الصحيحة: 2</option><option value="2">الإجابة الصحيحة: 3</option><option value="3">الإجابة الصحيحة: 4</option></select>';else if(type.value==='tf')extra.innerHTML='<select class="admin-select q-correct"><option value="true">الإجابة الصحيحة: صح</option><option value="false">الإجابة الصحيحة: خطأ</option></select>';else if(type.value==='fill')extra.innerHTML='<input class="admin-input q-correct-text" placeholder="الإجابة الصحيحة">';else extra.innerHTML='<textarea class="admin-input q-model" placeholder="الإجابة النموذجية للمقال القصير"></textarea>';};type.onchange=paint;paint();card.querySelector('.remove-q').onclick=()=>{card.remove();list.querySelectorAll('.question-editor b').forEach((b,i)=>b.textContent='السؤال '+(i+1))};};add();wrap.querySelector('#add-question').onclick=add;}
    function _0xCollectQuestions(){return [...document.querySelectorAll('#questions-list .question-editor')].map(card=>{const type=card.querySelector('.q-type').value,q={id:Date.now()+'_'+Math.random().toString(36).slice(2),text:card.querySelector('.q-text').value.trim(),type,points:Math.max(.5,Number(card.querySelector('.q-points')?.value||1))};if(type==='mcq'){q.options=[...card.querySelectorAll('.q-opt')].map(x=>x.value.trim());q.correct=card.querySelector('.q-correct').value}else if(type==='tf')q.correct=card.querySelector('.q-correct').value;else if(type==='fill')q.correct=card.querySelector('.q-correct-text').value.trim();else q.model=card.querySelector('.q-model').value.trim();return q});}

    // =============================================
    // 🚀 تهيئة التطبيق
    // =============================================
    async function _0xInit() {
        _0xParticles(); _0xInitTheme(); await _0xLoadData(); _0xRenderHome(); _0xSubscribeContent();
        const sid=localStorage.getItem('alidahStudentId'); if(!sid) _0xE.studentModal.classList.add('active');
        setTimeout(() => _0xE.loading.classList.add('hidden'), 800);
        window.onscroll = () => { if(window.scrollY > 300) _0xE.scrollTop.classList.add('visible'); else _0xE.scrollTop.classList.remove('visible'); };
        _0xE.scrollTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _0xInit);
    else _0xInit();


    document.addEventListener('contextmenu',e=>{if(_0xQuizState)e.preventDefault();});
    document.addEventListener('copy',e=>{if(_0xQuizState)e.preventDefault();});
    document.addEventListener('cut',e=>{if(_0xQuizState)e.preventDefault();});
    document.addEventListener('dragstart',e=>{if(_0xQuizState)e.preventDefault();});
    document.addEventListener('keydown',e=>{if(!_0xQuizState)return;const k=e.key.toLowerCase();if(e.key==='PrintScreen'||e.key==='F12'||(e.ctrlKey&&['p','s','u','c','x'].includes(k))||(e.ctrlKey&&e.shiftKey&&['i','j','c'].includes(k))){e.preventDefault();}});
})();