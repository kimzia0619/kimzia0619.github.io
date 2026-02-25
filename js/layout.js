window.addEventListener('load', function() {
  const container = document.querySelector('.greensock');
  const logo = document.querySelector('.logo');
  const into = document.querySelector('.into');

  const wLogo = logo.offsetWidth;
  const wInto = into.offsetWidth;
  const totalW = wLogo + wInto;

  // 1. 초기 세팅: autoAlpha는 여기서 한 번만 실행되도록 설정
  gsap.set(container, { width: wLogo, autoAlpha: 0 });
  gsap.set(into, { x: 250, autoAlpha: 0 }); // 처음에 숨김

  // 2. 등장 애니메이션 (딱 한 번만 실행)
  const introTl = gsap.timeline();
  introTl.to(container, { duration: 1, autoAlpha: 1 });

  // 3. 무한 왕복 애니메이션 (등장 이후 시작)
  // 개별 요소가 아닌 타임라인 전체에 repeat과 yoyo를 적용합니다.
  const loopTl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 1,
    delay: 0.5 // 등장 후 첫 시작 전 대기
  });

  loopTl.to(container, { 
      duration: 1.5, 
      width: totalW, 
      ease: "power2.inOut" 
    })
    .to(into, { 
      duration: 1.5, 
      x: wLogo, 
      autoAlpha: 1, // 첫 확장 때 나타나고, yoyo에 의해 축소될 때 다시 사라짐
      ease: "power2.inOut" 
    }, "<"); // container 확장과 동기화

function handleAnimation() {
        if (window.innerWidth > 420) {
            // PC: 애니메이션 재생
            loopTl.play();
        } else {
            // 모바일: 애니메이션 정지 + 원하는 멈춤 상태 고정
            // 시작 상태로 멈추고 싶으면 .pause(0), 끝 상태로 멈추고 싶으면 .progress(1).pause()
            loopTl.pause(); 
        }
    }

    // 4. 즉시 실행 및 리사이즈 이벤트 등록
    handleAnimation();
    window.addEventListener('resize', handleAnimation);
});


window.addEventListener('load', function() {
    const wrappers = document.querySelectorAll('.banner_wrap');

    wrappers.forEach((content, index) => {
        // 1. 컨텐츠 복제 (무한 루프 필수)
        const originalContent = content.innerHTML;
        content.innerHTML += originalContent; 

        // 2. 방향 설정 (index가 1, 3, 5... 이면 오른쪽으로)
        const isEven = index % 2 === 1; 

        if (isEven) {
            // 오른쪽으로 흐르는 배너: -50%에서 시작해서 0으로 이동
            gsap.set(content, { xPercent: -50 }); // 초기 위치 설정
            gsap.to(content, {
                xPercent: 0,
                duration: 30, // 속도는 취향껏 조절
                ease: "none",
                repeat: -1
            });
        } else {
            // 왼쪽으로 흐르는 배너: 0에서 시작해서 -50%로 이동
            gsap.to(content, {
                xPercent: -50,
                duration: 30,
                ease: "none",
                repeat: -1
            });
        }
    });
});