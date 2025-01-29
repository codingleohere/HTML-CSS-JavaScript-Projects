const generateForm = document.querySelector('.generate_form');
const imageGallery = document.querySelector('.image_gallery');
const OPENAI_API_KEY = ""

const generateAiImages = async (userPrompt, userImageQuanmtity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImageQuanmtity),
                size: "1024x1024",
                response_format: "b64_json"
            })
        });
        const { data } = await response.json();
        console.log(data)
    }
    catch (error) {

    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    const userPrompt = e.srcElement[0].value;
    const userImageQuanmtity = e.srcElement[1].value;

    const imgMarkup = Array.from({ length: userImageQuanmtity }, () =>
        ` <div class="img_card">
        <a class="download_btn" href="#">Download</a>
        <img src="assets/images/testimg.png" alt="">
    </div>`
    ).join("");
    imageGallery.innerHTML = imgMarkup;
    generateAiImages(userPrompt, userImageQuanmtity);
}
generateForm.addEventListener('submit', handleFormSubmission);
