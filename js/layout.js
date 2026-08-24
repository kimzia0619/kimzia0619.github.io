document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.greensock');
  const logo = document.querySelector('.logo');
  const into = document.querySelector('.into');

  // 요소 존재 여부 확인 후 진행
  if (!container || !logo || !into) return;

  const wLogo = logo.offsetWidth;
  const wInto = into.offsetWidth;
  const totalW = wLogo + wInto;

  // 1. 초기 세팅
  gsap.set(container, { width: wLogo, autoAlpha: 0 });
  gsap.set(into, { x: 250, autoAlpha: 0 }); 

  // 2. 등장 애니메이션
  const introTl = gsap.timeline();
  introTl.to(container, { duration: 1, autoAlpha: 1 });

  // 3. 무한 왕복 애니메이션
  const loopTl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 1,
    delay: 0.5 
  });

  loopTl.to(container, { 
      duration: 1.5, 
      width: totalW, 
      ease: "power2.inOut" 
    })
    .to(into, { 
      duration: 1.5, 
      x: wLogo, 
      autoAlpha: 1, 
      ease: "power2.inOut" 
    }, "<");

  function handleAnimation() {
    if (window.innerWidth > 420) {
      loopTl.play();
    } else {
      loopTl.pause(); 
    }
  }

  // 4. 즉시 실행 및 리사이즈 이벤트 등록
  handleAnimation();
  window.addEventListener('resize', handleAnimation);
});


// 하단 배너 애니메이션도 동일하게 DOMContentLoaded로 변경
document.addEventListener('DOMContentLoaded', function() {
  const wrappers = document.querySelectorAll('.banner_wrap');

  wrappers.forEach((content, index) => {
    const originalContent = content.innerHTML;
    content.innerHTML += originalContent; 

    const isEven = index % 2 === 1; 

    if (isEven) {
      gsap.set(content, { xPercent: -50 });
      gsap.to(content, {
        xPercent: 0,
        duration: 30,
        ease: "none",
        repeat: -1
      });
    } else {
      gsap.to(content, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1
      });
    }
  });
});