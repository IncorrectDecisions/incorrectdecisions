document.addEventListener('DOMContentLoaded', () => {
    const robuxButton = document.querySelector('.robux-button');
    const quizButton = document.querySelector('.quiz-button');

    // Initial animation
    gsap.fromTo(
      [robuxButton, quizButton],
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
    );

  // Hover animation with gsap
     robuxButton.addEventListener('mouseenter', () => {
         gsap.to(robuxButton, { scale: 1.05, duration: 0.2, ease: "power2.out" });
     });
       robuxButton.addEventListener('mouseleave', () => {
           gsap.to(robuxButton, { scale: 1, duration: 0.2, ease: "power2.out" });
      });
     quizButton.addEventListener('mouseenter', () => {
         gsap.to(quizButton, { scale: 1.05, duration: 0.2, ease: "power2.out" });
     });
     quizButton.addEventListener('mouseleave', () => {
         gsap.to(quizButton, { scale: 1, duration: 0.2, ease: "power2.out" });
     });
});