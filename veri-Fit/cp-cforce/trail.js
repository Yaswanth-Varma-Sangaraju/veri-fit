let model; // Declare the model variable globally

// Load the model
async function loadModel() {
    try {
        // Load the model from the specified path
        model = await tmImage.load('model/model.json', 'model/metadata.json');
        
        // Update the load status on the webpage
        document.getElementById('loadStatus').textContent = "Model loaded successfully!";
    } catch (error) {
        console.error("Error loading model:", error);
        document.getElementById('loadStatus').textContent = "Failed to load model.";
    }
}

// Analyze the uploaded image
async function analyzeImage() {
    // Clear the previous result and indicate analysis is in progress
    document.getElementById('result').textContent = "Analyzing...";

    const imageUpload = document.getElementById('imageUpload').files[0];
    if (!imageUpload) {
        alert("Please upload an image first!");
        document.getElementById('result').textContent = "No image uploaded.";
        return;
    }

    // Prepare the image for analysis
    const image = document.createElement("img");
    image.src = URL.createObjectURL(imageUpload);
    await image.decode();

    // Run the model and get predictions
    const predictions = await model.predict(image);
    
    // Debugging: log predictions to see raw output
    console.log(predictions);

    // Find the prediction with the highest probability
    const bestPrediction = predictions.reduce((max, p) => (p.probability > max.probability ? p : max));
    const result = bestPrediction.className;

    // Display the new result on the webpage
    document.getElementById('result').textContent = `Result: ${result}`;
}

// Attach the analyzeImage function to the button click
document.getElementById('analyzeButton').addEventListener('click', analyzeImage);

// Load the model on page load
window.onload = loadModel;
