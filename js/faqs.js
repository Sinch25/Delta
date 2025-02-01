const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    question.classList.toggle("active"); // Toggle the active class on the question
    answer.classList.toggle("active"); // Toggle the active class on the answer
  });
});
