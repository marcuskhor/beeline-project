// ============================================================
// About Us.JS - FINAL CLEAN VERSION
// ============================================================

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // ==================== 01. CUSTOM CURSOR ====================
    function initCustomCursor() {
        const cursor = document.getElementById('customCursor');
        const cursorDefaultImg = cursor ? cursor.querySelector('.cursor-buzz-default') : null;
        const cursorHoverImg = cursor ? cursor.querySelector('.cursor-buzz-hover') : null;

        const interactiveElements = gsap.utils.toArray(
            'a, button, .result-card, .nav-links li a, .lang-btn, .search-box, .nav-arrow'
        );
        
        const headerInteractiveElements = gsap.utils.toArray(
            '.header .nav-links li a, .header .lang-btn, .header .search-box'
        );

        if (!cursor || !cursorDefaultImg || !cursorHoverImg) {
            return;
        }

        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
        const damping = 0.1; 

        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * damping;
            cursorY += (mouseY - cursorY) * damping;
            gsap.set(cursor, { x: cursorX, y: cursorY });
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            const leaveTimeline = gsap.timeline();
            leaveTimeline.to(cursorHoverImg, { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.out" }, 0);
            leaveTimeline.to(cursorDefaultImg, { opacity: 1, scale: 1, duration: 0.4, ease: "elastic.out(1.5, 0.6)" }, 0);
        });
        
        interactiveElements.forEach(el => {
            const isHeaderElement = headerInteractiveElements.includes(el);
            const isFancyButton = el.matches('.btn-primary') || el.matches('.btn-secondary');
            const bg = isFancyButton ? el.querySelector('.btn-bg') : null;
            const textInner = isFancyButton ? el.querySelectorAll('.text-inner') : null;

            el.addEventListener('mouseenter', () => {
                gsap.killTweensOf([cursorDefaultImg, cursorHoverImg]);
                const hoverTimeline = gsap.timeline();
                if (!isHeaderElement) { 
                    hoverTimeline.to(cursorDefaultImg, { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.out" }, 0);
                    hoverTimeline.to(cursorHoverImg, { opacity: 1, scale: 1.5, duration: 0.4, ease: "elastic.out(1.5, 0.4)" }, 0);
                }
                
                if (isFancyButton && bg && textInner && textInner.length > 1) {
                    gsap.killTweensOf([bg, textInner[1]]); 
                    gsap.to(bg, { clipPath: "circle(75% at 50% 50%)", duration: 0.5, ease: "power2.out" });
                    gsap.to(textInner[1], { opacity: 1, duration: 0.3, ease: "power2.out", delay: 0.1 });
                }
            });

            el.addEventListener('mouseleave', () => {
                if (isFancyButton && bg && textInner && textInner.length > 1) {
                    gsap.killTweensOf([bg, textInner[1]]);
                    gsap.to(bg, { clipPath: "circle(0% at 50% 50%)", duration: 0.4, ease: "power2.inOut" });
                    gsap.to(textInner[1], { opacity: 0, duration: 0.3, ease: "power2.in" });
                }
                
                if (isHeaderElement) return; 
                gsap.killTweensOf([cursorDefaultImg, cursorHoverImg]);
                const leaveTimeline = gsap.timeline();
                leaveTimeline.to(cursorHoverImg, { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.out" }, 0);
                leaveTimeline.to(cursorDefaultImg, { opacity: 1, scale: 1, duration: 0.4, ease: "elastic.out(1.5, 0.6)" }, 0);
            });
        });

        const headerElement = document.querySelector('.header');
        if (headerElement) {
            headerElement.addEventListener('mouseenter', () => {
                gsap.to(cursor, { opacity: 0, duration: 0.2, ease: "power2.out" });
            });
            
            headerElement.addEventListener('mouseleave', () => {
                gsap.killTweensOf([cursor, cursorDefaultImg, cursorHoverImg]);
                gsap.set(cursorHoverImg, { opacity: 0, scale: 0.8 }); 
                gsap.to(cursorDefaultImg, { opacity: 1, scale: 1, duration: 0.4, ease: "elastic.out(1.5, 0.6)" });
                gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
            });
        }
        
        const footer = document.querySelector(".footer");
        if (footer) {
            footer.addEventListener("mouseenter", () => {
                gsap.to(cursor, { opacity: 0, duration: 0.2 }); 
            });
            footer.addEventListener("mouseleave", () => {
                gsap.to(cursor, { opacity: 1, duration: 0.2 });
            });
        }
    }


    // 3. NAVIGATION LINKS
const navLinks = gsap.utils.toArray(".nav-links > li > a");
const customCursor = document.getElementById('customCursor'); 

navLinks.forEach(link => {
  const background = link.querySelector('.nav-bg');
  const textWrap = link.querySelector('.text-wrap');
  const textInner = link.querySelectorAll('.text-inner'); 
  const navArrow = link.querySelector('.nav-arrow');

  // 【修改点 1】：直接获取 wrap 的高度作为滚动的距离
  // 这样无论 CSS 里的 em 是多少，动画距离永远精准等于盒子高度
  let textHeight = textWrap ? textWrap.offsetHeight : 0;

  // 如果获取失败，才用 fallback
  if (textHeight === 0 && textInner.length > 0) {
      textHeight = textInner[0].offsetHeight;
  }

  if (background && textWrap && textInner.length > 1) { 
    // 初始化位置
    gsap.set(textInner[0], { y: 0 }); 
    gsap.set(textInner[1], { y: 0 }); 

    link.addEventListener('mouseenter', () => {
      // 在 hover 瞬间重新计算高度（防止浏览器缩放导致的高度变化）
      let currentHeight = textWrap.offsetHeight; 

      gsap.killTweensOf([background, link, textInner]);
      if (navArrow) gsap.to(navArrow, { color: 'white', duration: 0.2 });
      if (customCursor) { 
        gsap.to(customCursor, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.out" });
      }
      gsap.to(background, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(link, { color: 'white', duration: 0.2 });
      
      // 【修改点 2】：使用重新计算的 currentHeight
      gsap.to(textInner, { y: -currentHeight, duration: 0.3, ease: "power2.out" });
      
      if (navArrow) gsap.to(navArrow, { color: 'white', duration: 0.2 });
    });

    link.addEventListener('mouseleave', () => {
      gsap.killTweensOf([background, link, textInner]);
      if (navArrow) gsap.to(navArrow, { color: 'var(--dark-text)', duration: 0.2 });
      gsap.to(background, { scale: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(link, { color: 'var(--dark-text)', duration: 0.2, delay: 0.1 });
      
      // 回归原位
      gsap.to(textInner, { y: 0, duration: 0.3, ease: "power2.out" });
      
      if (navArrow) gsap.to(navArrow, { color: 'var(--dark-text)', duration: 0.2 });
    });
  }
});



// ==================== 03. CORE VALUES ACCORDION (最终完美修复版) ====================
const valueItems = gsap.utils.toArray('.value-item');
const valueButtons = gsap.utils.toArray('.value-item .toggle-btn');

// 初始化图标状态
gsap.set('.value-item .icon-minus', { opacity: 0, rotationY: 180 });
gsap.set('.value-item .icon-plus', { opacity: 1, rotationY: 0 });

valueButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const parentItem = button.closest('.value-item');
        const targetContent = document.getElementById(button.dataset.target); 
        const iconPlus = button.querySelector('.icon-plus');
        const iconMinus = button.querySelector('.icon-minus');

        if (!parentItem || !targetContent) return;

        const isCollapsing = parentItem.classList.contains('active');
        const style = window.getComputedStyle(parentItem);
        
        // 1. 获取容器的基础样式 (Padding / Border)
        const paddingTop = parseFloat(style.paddingTop) || 0;
        const paddingBottom = parseFloat(style.paddingBottom) || 0;
        const borderTop = parseFloat(style.borderTopWidth) || 0;
        const borderBottom = parseFloat(style.borderBottomWidth) || 0;

        // 2. 获取标题行高度
        const titleRow = parentItem.querySelector('.title-row');
        const titleRect = titleRow.getBoundingClientRect();
        const titleHeight = titleRect.height; 

        // 3. 计算闭合状态下的高度
        const targetCollapsedHeight = Math.ceil(titleHeight + paddingTop + paddingBottom + borderTop + borderBottom);

        if (isCollapsing) {
            // ==================== [收起逻辑] ====================
            
            gsap.set(targetContent, { display: 'block' });
            parentItem.classList.remove('active');
            button.classList.remove('active');

            gsap.set(parentItem, { 
                backgroundColor: 'transparent',
                borderColor: '#e27d3a', 
                boxShadow: 'none' 
            });

            const collapseTL = gsap.timeline({
                defaults: { duration: 0.4, ease: 'power2.inOut' },
                onComplete: () => {
                    gsap.set(parentItem, { clearProps: 'height, overflow' }); 
                    gsap.set(targetContent, { clearProps: 'all', display: 'none' });
                }
            });

            collapseTL.to(iconPlus, { opacity: 1, rotationY: 0 }, 0);
            collapseTL.to(iconMinus, { opacity: 0, rotationY: 180 }, 0);
            collapseTL.to(targetContent, { height: 0, opacity: 0, marginTop: 0 }, 0);

            collapseTL.fromTo(parentItem, 
                { height: parentItem.offsetHeight }, 
                { height: targetCollapsedHeight, minHeight: targetCollapsedHeight }, 
                0
            );

        } else {
            // ==================== [展开逻辑] ====================
            
            // 1. 关闭其他已展开的卡片
            valueItems.forEach(item => {
                if (item !== parentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const otherBtn = item.querySelector('.toggle-btn');
                    if (otherBtn) otherBtn.classList.remove('active');

                    // 计算其他卡片的闭合高度
                    const iStyle = window.getComputedStyle(item);
                    const iTitleRow = item.querySelector('.title-row');
                    const iPt = parseFloat(iStyle.paddingTop) || 0;
                    const iPb = parseFloat(iStyle.paddingBottom) || 0;
                    const iBt = parseFloat(iStyle.borderTopWidth) || 0;
                    const iBb = parseFloat(iStyle.borderBottomWidth) || 0;
                    const iTitleH = iTitleRow.getBoundingClientRect().height;
                    const otherCollapsedHeight = Math.ceil(iTitleH + iPt + iPb + iBt + iBb);

                    const otherContent = item.querySelector('.value-content');
                    const oPlus = item.querySelector('.icon-plus');
                    const oMinus = item.querySelector('.icon-minus');

                    const closeOtherTL = gsap.timeline();
                    
                    gsap.set(item, { backgroundColor: 'transparent', borderColor: '#e27d3a', boxShadow: 'none' });
                    
                    closeOtherTL.to(item, { 
                        height: otherCollapsedHeight, 
                        minHeight: otherCollapsedHeight,
                        duration: 0.4,
                        ease: 'power2.inOut',
                        clearProps: 'height, overflow'
                    }, 0);

                    if (otherContent) {
                        closeOtherTL.to(otherContent, { height: 0, opacity: 0, marginTop: 0, display: 'none', duration: 0.4 }, 0);
                    }
                    if (oPlus && oMinus) {
                        closeOtherTL.to(oPlus, { opacity: 1, rotationY: 0, duration: 0.4 }, 0);
                        closeOtherTL.to(oMinus, { opacity: 0, rotationY: 180, duration: 0.4 }, 0);
                    }
                }
            });

            // ==================== [展开当前卡片 - 修复核心] ====================

            const startHeight = parentItem.offsetHeight;

            // ★ 步骤 A: 先强制显示内容 (display: block)，这是为了让浏览器能计算出真实的 margin
            gsap.set(targetContent, { display: 'block', height: 'auto', opacity: 1 });
            
            // ★ 步骤 B: 在显示状态下，读取 margin-top 和高度
            const activeContentStyle = window.getComputedStyle(targetContent);
            // 这里获取的值绝对准确，因为元素已经渲染出来了
            const cssMarginTop = parseFloat(activeContentStyle.marginTop) || 20; 
            const contentHeight = targetContent.scrollHeight;

            // ★ 步骤 C: 读取完毕，立即重置状态，准备开始动画
            gsap.set(targetContent, { display: 'none', height: 0, opacity: 0 }); 
            
            // ★ 步骤 D: 计算最终展开高度 (包含刚刚读取到的 margin)
            const finalExpandHeight = Math.ceil(startHeight + contentHeight + cssMarginTop);

            parentItem.classList.add('active');
            button.classList.add('active');
            targetContent.style.display = 'block'; // 确保动画开始前是 block

            gsap.set(parentItem, {
                backgroundColor: 'white',
                borderColor: 'transparent',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)'
            });

            const expandTL = gsap.timeline({ defaults: { duration: 0.5, ease: 'power2.out' } });

            expandTL.to(iconPlus, { opacity: 0, rotationY: -180 }, 0);
            expandTL.to(iconMinus, { opacity: 1, rotationY: 0 }, 0);

            expandTL.fromTo(parentItem, 
                { height: startHeight }, 
                { height: finalExpandHeight }, 
                0
            );

            // 在动画中使用读取到的正确 cssMarginTop
            expandTL.fromTo(targetContent, 
                { height: 0, opacity: 0, marginTop: 0 }, 
                { 
                    height: 'auto', 
                    opacity: 1, 
                    marginTop: cssMarginTop 
                }, 0.1);
        }
    });
});


// ==================== 04. SLIDER & ANIMATION (MOBILE SCROLL + DESKTOP SLIDER) ====================
function initWhyBeeSlider() {
    const track = document.querySelector('.carousel-track');
    // 使用 Array.from 确保拿到的是纯净数组
    const originalSlides = Array.from(document.querySelectorAll('.slide-item')); 
    const nextBtn = document.querySelector('.right-arrow-btn');
    const prevBtn = document.querySelector('.left-arrow-btn');

    if (!track || originalSlides.length === 0) return;

    // 判断是否为手机/平板 (<= 991px)
    const isMobile = window.innerWidth <= 991;

    // ============================================================
    // ★★★ 分流 1: 手机端 (垂直堆叠 + 滚动触发动画) ★★★
    // ============================================================
    if (isMobile) {
        // 1. 隐藏多余的克隆/穿帮元素
        // 手机端不需要克隆，直接操作 originalSlides
        const elementsToHide = document.querySelectorAll('.line-path, .line-dot, .page-title, .fade-item, .main-bee-img, .logo-breakdown, .fade-p3, .pop-p3, .title-mascot-img, .fade-p2, .evolution-row > *, .font-row');
        gsap.set(elementsToHide, { opacity: 0, visibility: "hidden" }); // 初始隐身
        
        // 2. 定义动画播放器 (针对每一页)
        const playMobileAnims = (slideIndex, slideElement) => {
            
            // --- Page 1: 蓝图动画 ---
            if (slideIndex === 0) {
                const mainImg = slideElement.querySelector('.main-bee-img');
                const lines = slideElement.querySelectorAll('.line-path');
                const dots = slideElement.querySelectorAll('.line-dot');
                const fadeItems = slideElement.querySelectorAll('.fade-item, .logo-breakdown, .page-title');
                
                if (mainImg) {
                    const tl = gsap.timeline();
                    // 重置状态
                    gsap.set(dots, { attr: { r: 0 }, opacity: 1, visibility: "visible" });
                    lines.forEach(path => {
                        const length = path.getTotalLength();
                        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1, visibility: "visible" });
                    });
                    gsap.set(fadeItems, { opacity: 0, y: 20, visibility: "visible" });
                    gsap.set(mainImg, { opacity: 0, scale: 0.8, visibility: "visible" });

                    // 播放
                    tl.to(mainImg, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" })
                      .add(() => { /* 同步点 */ });
                      
                    lines.forEach((line, i) => {
                        const dot = dots[i];
                        if (dot && line) {
                            tl.to(dot, { attr: { r: 1 }, duration: 0.2, ease: "back.out(3)" }, i === 0 ? "+=0.1" : ">-0.2")
                              .to(line, { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" }, "<");
                        }
                    });
                    tl.to(fadeItems, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
                }
            }

            // --- Page 2: Logo & Font ---
            if (slideIndex === 1) {
                const fadeItems = slideElement.querySelectorAll('.fade-p2');
                const evoItems = slideElement.querySelectorAll('.evolution-row > *');
                const fontRows = slideElement.querySelectorAll('.font-row');
                
                const tl = gsap.timeline();
                // 确保可见
                gsap.set([fadeItems, evoItems, fontRows], { visibility: "visible" });

                if(fadeItems.length) tl.fromTo(fadeItems, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
                if(evoItems.length) tl.fromTo(evoItems, { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3");
                if(fontRows.length) tl.fromTo(fontRows, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "<");
            }

            // --- Page 3: Buzz ---
            // --- Page 3: Buzz ---
if (slideIndex === 2) {
    const fadeItems = slideElement.querySelectorAll('.fade-p3');
    const popItems = slideElement.querySelectorAll('.pop-p3');
    const mascot = slideElement.querySelector('.title-mascot-img'); // ★ 确保选中吉祥物元素
    
    const tl = gsap.timeline();
    
    // 确保 visibility 开启，并设置初始隐藏状态 (防止闪烁)
    gsap.set([fadeItems, popItems, mascot], { visibility: "visible" }); 
    if (mascot) gsap.set(mascot, { opacity: 0, scale: 0.5, y: 30 }); // ★ 新增：吉祥物初始状态
    gsap.set(fadeItems, { autoAlpha: 0, x: -30 });
    gsap.set(popItems, { scale: 0, autoAlpha: 0 });

    // ★★★ 播放吉祥物动画 (先让它出来) ★★★
    if (mascot) {
        tl.fromTo(mascot, 
            { opacity: 0, scale: 0.5, y: 30 }, 
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }
        );
    }

    if (fadeItems.length > 0) {
        // 让文字在吉祥物出来后 0.4 秒左右开始
        tl.fromTo(fadeItems, 
            { autoAlpha: 0, x: -30 }, 
            { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
            mascot ? ">-0.4" : 0 
        );
    }
    
    if (popItems.length > 0) {
        tl.fromTo(popItems, 
            { scale: 0, autoAlpha: 0 }, 
            { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, 
            "-=0.4"
        );
    }
}
        };

        // 3. 使用 IntersectionObserver 监听滚动
        // 当页面滑入屏幕 30% 时，触发对应动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 找到当前滑入的是第几个 Slide
                    const index = originalSlides.indexOf(entry.target);
                    if (index !== -1) {
                        playMobileAnims(index, entry.target);
                        // 播放后取消监听 (只播一次，不反复播)
                        observer.unobserve(entry.target); 
                    }
                }
            });
        }, { threshold: 0.25 }); // 25% 可见时触发

        // 开始监听 3 个页面
        originalSlides.forEach(slide => observer.observe(slide));

        return; // ★★★ 结束手机端逻辑，不执行下面的 Desktop 代码 ★★★
    }


    // ============================================================
    // ★★★ 分流 2: 电脑端 (横向轮播 + 点击触发动画) ★★★
    // ============================================================
    
    // (以下是你原本的 Desktop 完整代码，完全没动，除了变量名复用)
    const totalSlidesOriginal = originalSlides.length; 

    // Clone Setup
    const firstSlideClone = originalSlides[0].cloneNode(true);
    const lastSlideClone = originalSlides[totalSlidesOriginal - 1].cloneNode(true);
    
    // 初始隐藏
    const elementsToHide = firstSlideClone.querySelectorAll('.line-path, .line-dot, .page-title, .fade-item, .main-bee-img, .logo-breakdown, .fade-p3, .pop-p3, .title-mascot-img');
    const elementsToHide2 = lastSlideClone.querySelectorAll('.fade-p3, .pop-p3, .title-mascot-img');
    
    gsap.set(elementsToHide, { opacity: 0, visibility: "hidden" });
    gsap.set(elementsToHide2, { opacity: 0, visibility: "hidden" });
    
    track.prepend(lastSlideClone); 
    track.appendChild(firstSlideClone); 

    const allSlides = Array.from(track.querySelectorAll('.slide-item'));
    const totalSlidesWithClones = allSlides.length; 

    let currentIndex = 1; 
    gsap.set(track, { xPercent: -100 * currentIndex });

    // --- PAGE 1 BLUEPRINT LOGIC (DESKTOP) ---
    const firstSlide = allSlides[1]; 
    const mainImg = firstSlide.querySelector('.main-bee-img');
    const lines = firstSlide.querySelectorAll('.line-path');
    const dots = firstSlide.querySelectorAll('.line-dot');
    const fadeItems = firstSlide.querySelectorAll('.fade-item, .logo-breakdown, .page-title');
    let blueprintTimeline = null; 
    
    function resetBlueprintState() {
        if (!blueprintTimeline) return;
        blueprintTimeline.seek(0).pause();
        gsap.set(dots, { attr: { r: 0 }, opacity: 1 });
        lines.forEach(path => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
        });
        gsap.set(fadeItems, { opacity: 0, y: 20 });
        gsap.set(mainImg, { opacity: 0, scale: 0.8 });
    }

    if (mainImg) {
        blueprintTimeline = gsap.timeline({ paused: true });
        blueprintTimeline.to(mainImg, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" });
        lines.forEach((line, index) => {
            const dot = dots[index];
            if (dot && line) {
                blueprintTimeline
                    .to(dot, { attr: { r: 1 }, duration: 0.2, ease: "back.out(3)" }, index === 0 ? "+=0.1" : ">-0.2") 
                    .to(line, { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" }, "<"); 
            }
        });
        blueprintTimeline.to(fadeItems, { opacity: 1, y: 0, duration: 0.6, }, "-=0.3");
        resetBlueprintState(); 
        blueprintTimeline.play(); 
    }

    // --- SLIDER UPDATE LOGIC (DESKTOP) ---
    function updateSlider(isLoopJump = false) {
        const xOffset = -100 * currentIndex;

        if (currentIndex === 2) resetPage2Animation();
        if (currentIndex === 3 || currentIndex === 0) resetPage3Animation(); 

        if (currentIndex === 1 && blueprintTimeline && !isLoopJump) {
            blueprintTimeline.pause();
        }

        if (isLoopJump) {
            gsap.set(track, { xPercent: xOffset });
            if (currentIndex === 1 && blueprintTimeline) blueprintTimeline.restart(); 
        } else {
            gsap.to(track, {
                xPercent: xOffset,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                    handleLoop(); 
                    
                    if (currentIndex === 1 && blueprintTimeline) {
                        blueprintTimeline.invalidate().restart();
                    } else if (currentIndex !== 1 && blueprintTimeline) {
                        resetBlueprintState();
                    }

                    if (currentIndex === 2) playPage2Animation();
                    else resetPage2Animation();

                    if (currentIndex === 3) playPage3Animation(); 
                    else if (currentIndex !== 0) resetPage3Animation(); 
                },
                overwrite: true 
            });
        }
    }

    function playPage2Animation() {
        const activeSlide = allSlides[2];
        if (activeSlide) {
            const tl = gsap.timeline();
            const fadeItems = activeSlide.querySelectorAll('.fade-p2');
            if(fadeItems.length) tl.fromTo(fadeItems, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
            
            const evoItems = activeSlide.querySelectorAll('.evolution-row > *');
            if(evoItems.length) tl.fromTo(evoItems, { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3");

            const fontRows = activeSlide.querySelectorAll('.font-row');
            if(fontRows.length) tl.fromTo(fontRows, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "<");
        }
    }

    function resetPage2Animation() {
        const activeSlide = allSlides[2];
        if (activeSlide) {
            const items = activeSlide.querySelectorAll('.fade-p2, .evolution-row > *, .font-row');
            gsap.killTweensOf(items);
            gsap.set(activeSlide.querySelectorAll('.fade-p2'), { autoAlpha: 0, y: 50 });
            gsap.set(activeSlide.querySelectorAll('.evolution-row > *'), { autoAlpha: 0, x: -30 });
            gsap.set(activeSlide.querySelectorAll('.font-row'), { autoAlpha: 0, x: 50 });
        }
    }

    function playPage3Animation() {
        let targetIndex = (currentIndex === 0 || currentIndex === 3) ? currentIndex : 3;
        const activeSlide = allSlides[targetIndex];

        if (activeSlide) {
            const fadeItems = activeSlide.querySelectorAll('.fade-p3');
            const popItems = activeSlide.querySelectorAll('.pop-p3');
            
            gsap.set(fadeItems, { autoAlpha: 0, x: -30 });
            gsap.set(popItems, { scale: 0, autoAlpha: 0 });

            const tl = gsap.timeline();
            if (fadeItems.length > 0) tl.fromTo(fadeItems, { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" });
            if (popItems.length > 0) tl.fromTo(popItems, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.4");
        }
    }

    function resetPage3Animation() {
        const indicesToReset = [0, 3];
        indicesToReset.forEach(index => {
            const slide = allSlides[index];
            if (slide) {
                const fadeItems = slide.querySelectorAll('.fade-p3');
                const popItems = slide.querySelectorAll('.pop-p3');
                const mascot = slide.querySelectorAll('.title-mascot-img');
                gsap.killTweensOf([fadeItems, popItems, mascot]);
                gsap.set(fadeItems, { autoAlpha: 0, x: -30 });
                gsap.set(popItems, { scale: 0, autoAlpha: 0 });
            }
        });
    }

    function handleLoop() {
        if (currentIndex === totalSlidesWithClones - 1) { 
            currentIndex = 1; 
            updateSlider(true); 
            if (blueprintTimeline) blueprintTimeline.restart(); 
        } 
        else if (currentIndex === 0) { 
            currentIndex = totalSlidesWithClones - 2; 
            updateSlider(true); 
            playPage3Animation();
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlidesWithClones - 1) {
                if (currentIndex === totalSlidesWithClones - 2 && blueprintTimeline) resetBlueprintState(); 
                currentIndex++;
                updateSlider();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                if (currentIndex - 1 === 1 && blueprintTimeline) resetBlueprintState(); 
                currentIndex--;
                updateSlider();
            }
        });
    }
}


 // ==================== team ====================
document.addEventListener("DOMContentLoaded", function() {
    const teamSection = document.querySelector('.team-section-wrapper');
    const missionBeeImg = document.querySelector('.mission-bee-img'); // 找到蜂巢图片

    // 观察团队区域的渐显
    const teamObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            teamSection.classList.add('active');
            teamObserver.disconnect();
        }
    }, { threshold: 0.2 });
    teamObserver.observe(teamSection);

    // 观察蜂巢图片的渐显
    const beeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            missionBeeImg.classList.add('scroll-visible'); // 直接添加 visible 类
            beeObserver.disconnect();
        }
    }, { threshold: 0.2 });
    beeObserver.observe(missionBeeImg);
});

    // ==================== 05. INITIALIZATION ====================
    initCustomCursor();
    initWhyBeeSlider();

});




// ==================== TEAM ====================
document.addEventListener("DOMContentLoaded", function() {
    const teamSection = document.querySelector('.team-section-wrapper');

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            teamSection.classList.add('active'); // 只要看到了，就加上 active 类
            observer.disconnect(); // 完事收工，不再监控
        }
    }, { threshold: 0.2 });

    observer.observe(teamSection);
});


// SEARCH BOX
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 这里的 Data 可以随便写，用来测试
    const searchData = [
        { title: "Brand Identity", category: "Service", link: "Services_Branding.html" },
        { title: "Web Development", category: "Service", link: "Services_WebDesign.html" },
        { title: "Nike Campaign", category: "Portfolio", link: "Portfolio_Nike.html" },
        { title: "Coffee Shop", category: "Portfolio", link: "Portfolio_Coffee.html" },
        { title: "About Beeline", category: "Page", link: "About Us.html" },
        { title: "Contact Us", category: "Contact", link: "Get in Touch.html" },
        { title: "Instagram Management Management", category: "Service", link: "Services_Social.html" }
    ];

    // 2. 获取元素
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // 3. 定义分类颜色 (想要什么颜色改这里)
    function getCategoryColor(cat) {
        switch(cat) {
            case 'Service': return '#964f33';   // 你的品牌棕色
            case 'Portfolio': return '#E04F5F'; // 红色/粉色
            case 'Page': return '#4A90E2';      // 蓝色
            case 'Contact': return '#27AE60';   // 绿色
            default: return '#999';
        }
    }

    // 4. 监听输入
    searchInput.addEventListener('input', function(e) {
        const value = e.target.value.toLowerCase().trim();

        // 如果输入为空，隐藏下拉框
        if (value.length === 0) {
            searchResults.classList.remove('active');
            return;
        }

        // 过滤数据
        const filteredData = searchData.filter(item => 
            item.title.toLowerCase().includes(value)
        );

        // 显示结果
        displayResults(filteredData);
    });

    // 5. 渲染结果 HTML
    function displayResults(results) {
    searchResults.innerHTML = ''; 

    if (results.length > 0) {
        results.forEach(item => {
            const link = document.createElement('a');
            link.href = item.link;
            link.className = 'search-item';
            
            const color = getCategoryColor(item.category);

            // 【关键改动】：category 放前面，title 放后面
            link.innerHTML = `
                <span class="item-category" style="color: ${color}">${item.category}</span>
                <span class="item-title">${item.title}</span>
            `;
            
            searchResults.appendChild(link);
        });
    } else {
        searchResults.innerHTML = `
            <div class="search-item" style="justify-content:center; color:#bbb; cursor:default;">
                No results found
            </div>
        `;
    }
    
    searchResults.classList.add('active');
}

    // 6. 点击外部关闭搜索框
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
});


// ==================== MISSION BEE====================
const beeImg = ".mission-bee-img";

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: beeImg,
        start: "top 80%", 
        toggleActions: "play none none none"
    }
});

// 1. 弹跳入场 (优化版)
tl.fromTo(beeImg, 
    { 
        scale: 0.5,     // 不需要从0开始，从0.5开始会让浏览器绘制压力小很多，视觉效果没区别
        autoAlpha: 0 
    },
    { 
        duration: 0.8,  // 时间缩短，动作更干脆利落
        scale: 1, 
        autoAlpha: 1, 
        
        // 【关键改动】用 back.out 代替 elastic
        // 1.7 是回弹力度，越大弹得越猛，1.7 是标准值
        ease: "back.out(1.7)", 
        
        force3D: true // 再次强制 GSAP 使用 GPU
    }
)
// 2. 持续漂浮 (保持丝滑)
.to(beeImg, {
    y: -30, 
    duration: 1,  // 稍微慢一点点，显得更有质感
    ease: "sine.inOut", 
    yoyo: true, 
    repeat: -1
});

/* ==================== MOBILE MENU & SEARCH JS (最终修复版) ==================== */
document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. 汉堡菜单逻辑 (Hamburger Menu)
    // ============================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenuSidebar');
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    
    // 获取 Services 元素 (用于关闭菜单时自动收起)
    const mobileServiceLink = document.querySelector('.mobile-has-submenu > a');
    const mobileGridWrapper = document.querySelector('.submenu-grid-wrapper');

    function toggleMenu() {
        if (!mobileMenu) return;

        // 检查当前是否打开
        const isActive = mobileMenu.classList.contains('active');

        if (isActive) {
            // ============== [关闭菜单] ==============
            mobileMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
            
            // 解锁背景滚动
            document.body.classList.remove('no-scroll');

            // ★★★ 自动收起 Services 菜单 (重置状态) ★★★
            if (mobileGridWrapper) mobileGridWrapper.classList.remove('open');
            if (mobileServiceLink) mobileServiceLink.classList.remove('active');

        } else {
            // ============== [打开菜单] ==============
            mobileMenu.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
            if (hamburgerBtn) hamburgerBtn.classList.add('active');
            
            // 锁定背景滚动
            document.body.classList.add('no-scroll');
        }
    }

    // 绑定点击事件
    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);


    // ============================================================
    // 2. Services 菜单折叠逻辑 (丝滑动画版)
    // ============================================================
    // 注意：这里必须获取 .submenu-grid-wrapper 才能实现丝滑动画
    const serviceLinkTrigger = document.querySelector('.mobile-has-submenu > a');
    const serviceGridWrapper = document.querySelector('.submenu-grid-wrapper');

    if (serviceLinkTrigger && serviceGridWrapper) {
        serviceLinkTrigger.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止跳转
            
            // 切换 Grid 动画类 (.open 控制 grid-template-rows)
            serviceGridWrapper.classList.toggle('open');
            
            // 切换箭头旋转
            serviceLinkTrigger.classList.toggle('active');
        });
    }


    // ============================================================
    // 3. 移动端搜索弹窗 UI (Search Overlay UI)
    // ============================================================
    const searchBtn = document.getElementById('mobileSearchBtn');
    const searchOverlay = document.getElementById('mobileSearchOverlay');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const mobileSearchInput = document.getElementById('mobileSearchInput');

    // 打开搜索
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            // 自动聚焦输入框
            if (mobileSearchInput) {
                setTimeout(() => mobileSearchInput.focus(), 100); 
            }
        });
    }

    // 关闭搜索
    if (closeSearchBtn && searchOverlay) {
        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }


    // ============================================================
    // 3. 统一搜索逻辑 (纯净版 - 样式完全由 CSS 控制)
    // ============================================================
    
    // A. 你的原始数据
    const searchData = [
        { title: "Brand Identity", category: "Service", link: "Services_Branding.html" },
        { title: "Web Development", category: "Service", link: "Services_Website Design.html" },
        { title: "Nike Campaign", category: "Portfolio", link: "Portfolio.html" },
        { title: "Coffee Shop", category: "Portfolio", link: "Portfolio.html" },
        { title: "About Beeline", category: "Page", link: "About Us.html" },
        { title: "Contact Us", category: "Contact", link: "Get in Touch.html" },
        { title: "Social Media", category: "Service", link: "Services_Social Media Management.html" }
    ];

    // B. 你的颜色定义函数
    function getCategoryColor(cat) {
        switch(cat) {
            case 'Service': return '#964f33';   // 品牌棕色
            case 'Portfolio': return '#E04F5F'; // 红色
            case 'Page': return '#4A90E2';      // 蓝色
            case 'Contact': return '#27AE60';   // 绿色
            default: return '#999';
        }
    }

    // C. 通用初始化函数
    function initSearchSystem(inputId, resultsId) {
        const input = document.getElementById(inputId);
        const resultsBox = document.getElementById(resultsId);

        if (!input || !resultsBox) return;

        // 监听输入
        input.addEventListener('input', function(e) {
            const value = e.target.value.toLowerCase().trim();

            // 空值隐藏
            if (value.length === 0) {
                resultsBox.style.display = 'none'; 
                return;
            }

            // 过滤
            const filteredData = searchData.filter(item => 
                item.title.toLowerCase().includes(value)
            );

            // 显示
            displayResults(filteredData, resultsBox);
        });

        // 渲染函数
        function displayResults(results, container) {
            container.innerHTML = ''; 

            if (results.length > 0) {
                container.style.display = 'block'; // 显示下拉框
                
                results.forEach(item => {
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.className = 'search-item'; // CSS 样式类
                    
                    const color = getCategoryColor(item.category);

                    // ★★★ 修正版：没有任何宽度/字体样式，只有颜色 ★★★
                    // 样式全部由 CSS (.item-category, .item-title) 控制
                    link.innerHTML = `
                        <span class="item-category" style="color: ${color}">${item.category}</span>
                        <span class="item-title">${item.title}</span>
                    `;
                    
                    container.appendChild(link);
                });
            } else {
                container.style.display = 'block';
                container.innerHTML = `
                    <div class="search-item" style="justify-content:center; color:#bbb; cursor:default; padding: 10px;">
                        No results found
                    </div>
                `;
            }
        }

        // 点击外部关闭
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !resultsBox.contains(e.target)) {
                resultsBox.style.display = 'none';
            }
        });
    }

    // D. 执行初始化
    initSearchSystem('searchInput', 'searchResults');           // 电脑版
    initSearchSystem('sidebarSearchInput', 'sidebarSearchResults'); // 手机侧边栏版
});