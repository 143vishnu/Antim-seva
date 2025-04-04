document.addEventListener("DOMContentLoaded", function() {
    // ========== BOOKING FORM HANDLING ==========
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let service = document.getElementById("service").value;

            if (name === "" || email === "") {
                alert("Please fill in all required fields.");
                return;
            }

            let confirmationDiv = document.createElement("p");
            confirmationDiv.className = "success-message";
            confirmationDiv.innerText = `🎉 Booking confirmed for ${name} with the ${service} package!`;

            document.querySelector(".booking-form").appendChild(confirmationDiv);
            confirmationDiv.style.display = "block";

            // Clear form fields
            document.getElementById("bookingForm").reset();

            // Remove message after 3 seconds
            setTimeout(() => {
                confirmationDiv.style.display = "none";
            }, 3000);
        });

        bookingForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent page reload

            // Show the confirmation message
            const confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.classList.remove("hidden");

            // Reset the form after 1 second
            setTimeout(() => {
                document.getElementById("bookingForm").reset();
            }, 1000);
        });
    }

    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
                return;
            }

            let confirmationDiv = document.createElement("p");
            confirmationDiv.className = "success-message";
            confirmationDiv.innerText = `📩 Thank you, ${name}! Your message has been received.`;

            document.querySelector(".contact-form").appendChild(confirmationDiv);
            confirmationDiv.style.display = "block";

            document.getElementById("contactForm").reset();

            setTimeout(() => {
                confirmationDiv.style.display = "none";
            }, 3000);
        });
    }

    // ========== TESTIMONIALS HANDLING ==========
    const testimonialForm = document.getElementById("testimonialForm");
    if (testimonialForm) {
        testimonialForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let review = document.getElementById("review").value.trim();

            if (name === "" || review === "") {
                alert("Please fill in all fields before submitting.");
                return;
            }

            testimonials.push({ name, review });
            loadTestimonials();

            let successMessage = document.createElement("p");
            successMessage.className = "success-message";
            successMessage.innerText = `✅ Thank you, ${name}! Your testimonial has been submitted.`;

            document.querySelector(".testimonial-form").appendChild(successMessage);
            successMessage.style.display = "block";

            document.getElementById("testimonialForm").reset();

            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);
        });
    }

    function loadTestimonials() {
        let testimonialContainer = document.getElementById("testimonial-list");
        testimonialContainer.innerHTML = "";  

        testimonials.forEach(testimonial => {
            let div = document.createElement("div");
            div.classList.add("testimonial");
            div.innerHTML = `<p>"${testimonial.review}"</p><h4>- ${testimonial.name}</h4>`;
            testimonialContainer.appendChild(div);
        });
    }

    document.addEventListener("DOMContentLoaded", loadTestimonials);

    // ========== FAQ HANDLING ==========

    const faqs = [
        { category: "services", question: "How do I book a service?", answer: "You can book a service through our <a href='booking.html'>Booking Page</a>." },
        { category: "payments", question: "What payment options are available?", answer: "We accept online payments via UPI, debit/credit cards, and bank transfers." },
        { category: "services", question: "Are services available in all cities?", answer: "Currently, we operate in major cities, and we are expanding. Contact us for details." },
        { category: "customization", question: "Can I customize the funeral arrangements?", answer: "Yes, we offer customizable packages to fit different traditions and preferences." },
        { category: "services", question: "Do you offer live-streaming services?", answer: "Yes, we provide live-streaming options for family members who cannot attend in person." }
    ];

    function loadFAQs(filter = "", category = "all") {
        let faqContainer = document.getElementById("faq-list");
        faqContainer.innerHTML = "";

        faqs.forEach(faq => {
            if (
                (faq.question.toLowerCase().includes(filter.toLowerCase()) || faq.answer.toLowerCase().includes(filter.toLowerCase())) &&
                (category === "all" || faq.category === category)
            ) {
                let div = document.createElement("div");
                div.classList.add("faq-item");
                div.innerHTML = `<h3>${faq.question}</h3><p>${faq.answer}</p>`;
                
                div.addEventListener("click", function () {
                    this.classList.toggle("active");
                });

                faqContainer.appendChild(div);
            }
        });
    }

    function filterFAQs(category) {
        loadFAQs("", category);
    }

    document.getElementById("faqSearch").addEventListener("input", function() {
        loadFAQs(this.value);
    });

    document.addEventListener("DOMContentLoaded", () => loadFAQs());

    // Check if the browser supports Speech Recognition
    document.addEventListener("DOMContentLoaded", function () {
        // Check if Speech Recognition is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            console.log("✅ Speech Recognition is supported!");

            const recognition = new SpeechRecognition();
            recognition.lang = "en-US"; // Set language
            recognition.interimResults = false; // Capture only final results

            const voiceButton = document.getElementById("voiceSearchBtn");
            const searchInput = document.getElementById("searchInput");

            if (voiceButton && searchInput) {
                voiceButton.addEventListener("click", function () {
                    console.log("🎙️ Listening...");
                    recognition.start(); // Start voice recognition
                });

                // Capture spoken text
                recognition.onresult = function (event) {
                    const spokenText = event.results[0][0].transcript;
                    console.log("✅ Recognized text:", spokenText);
                    searchInput.value = spokenText; // Set text in search box
                };

                recognition.onerror = function (event) {
                    console.error("❌ Speech Recognition Error:", event.error);
                    alert("Speech Recognition Error: " + event.error);
                };

                recognition.onend = function () {
                    console.log("🎤 Speech recognition ended.");
                };
            } else {
                console.error("❌ voiceSearchBtn or searchInput not found in DOM.");
            }
        } else {
            console.error("❌ Speech Recognition is not supported in this browser.");
            alert("Your browser does not support Speech Recognition. Try using Google Chrome.");
        }

        // Dark Mode Toggle
        const darkModeToggle = document.getElementById("darkModeToggle");
        if (darkModeToggle) {
            darkModeToggle.addEventListener("click", function () {
                document.body.classList.toggle("dark-mode");
            });
        } else {
            console.error("❌ darkModeToggle button not found in DOM.");
        }

        // Chatbot Logic
        const chatSubmit = document.getElementById("chatSubmit");
        const chatInput = document.getElementById("chatInput");
        const chatResponse = document.getElementById("chatResponse");

        const faqs = [
            { question: "What is your service?", answer: "We provide post-death ritual services." },
            { question: "How can I book?", answer: "You can book through our website." }
        ];

        if (chatSubmit && chatInput && chatResponse) {
            chatSubmit.addEventListener("click", function () {
                let userInput = chatInput.value.toLowerCase();
                let response = "Sorry, I don’t understand.";

                faqs.forEach(faq => {
                    if (faq.question.toLowerCase().includes(userInput)) {
                        response = faq.answer;
                    }
                });

                chatResponse.innerHTML = `<p>${response}</p>`;
            });
        } else {
            console.error("❌ Chat elements not found in DOM.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("heroVideo");
    const playPauseBtn = document.getElementById("playPauseBtn");

    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = "Pause";
        } else {
            video.pause();
            playPauseBtn.textContent = "Play";
        }
    });
});
