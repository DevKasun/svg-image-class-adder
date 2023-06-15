// Get the necessary DOM elements
var imageUpload = document.getElementById("image-upload");
var addClassesButton = document.getElementById("add-classes-button");
var clearButton = document.getElementById("clear-button");
var editedSvgContainer = document.getElementById("edited-svg-container");
var downloadButton = document.getElementById("download-button");
var progressIndicator = document.getElementById("progress-indicator");
var successMessage = document.getElementById("success-message");
var groupClassInput = document.getElementById("group-class-input");
var pathClassInput = document.getElementById("path-class-input");
var textClassInput = document.getElementById("text-class-input");

// Define the variable to store the edited SVG
var editedSvg = null;

// Listen for changes in the file input
imageUpload.addEventListener("change", function (event) {
    var file = event.target.files[0];

    // Create a new FileReader instance
    var reader = new FileReader();

    // Read the uploaded SVG file
    reader.readAsText(file);

    // When the SVG is loaded
    reader.onload = function () {
        // Store the SVG content
        editedSvg = reader.result;

        // Display the edited SVG
        editedSvgContainer.innerHTML = editedSvg;
    };
});

// Listen for the "Add Classes" button click
addClassesButton.addEventListener("click", function () {
    if (editedSvg) {
        var parser = new DOMParser();
        var svgDoc = parser.parseFromString(editedSvg, "image/svg+xml");
        var svgRoot = svgDoc.documentElement;

        // Select all the groups (g) elements in the SVG
        var groups = svgRoot.querySelectorAll("g");

        // Get the user-specified class names
        var groupClass = groupClassInput.value.trim();
        var pathClass = pathClassInput.value.trim();
        var textClass = textClassInput.value.trim();

        // Loop through the groups and add classes if needed
        groups.forEach(function (group) {
            if (groupClass && !group.classList.contains(groupClass)) {
                group.classList.add(groupClass);
            }
        });

        // Select all the path elements in the SVG
        var paths = svgRoot.querySelectorAll("path");

        // Loop through the paths and add classes if needed
        paths.forEach(function (path) {
            if (pathClass && !path.classList.contains(pathClass)) {
                path.classList.add(pathClass);
            }
        });

        // Select all the text elements in the SVG
        var texts = svgRoot.querySelectorAll("text");

        // Loop through the text elements and add classes if needed
        texts.forEach(function (text) {
            if (textClass && !text.classList.contains(textClass)) {
                text.classList.add(textClass);
            }
        });

        // Update the edited SVG content
        editedSvg = new XMLSerializer().serializeToString(svgDoc);
        editedSvgContainer.innerHTML = editedSvg;

        // Hide progress indicator
        progressIndicator.style.display = "none";

        // Show success message
        successMessage.style.display = "block";
    }
});

// Listen for the "Clear" button click
clearButton.addEventListener("click", function () {
    // Reset input fields
    groupClassInput.value = "";
    pathClassInput.value = "";
    textClassInput.value = "";

    // Clear uploaded image
    imageUpload.value = "";

    // Clear edited SVG
    editedSvg = null;
    editedSvgContainer.innerHTML = "";

    // Hide success message
    successMessage.style.display = "none";
});

// Listen for the "Download" button click
downloadButton.addEventListener("click", function () {
    if (editedSvg) {
        // Create a new Blob with the SVG content
        var blob = new Blob([editedSvg], { type: "image/svg+xml" });

        // Create a temporary anchor element and set the Blob as its href
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "edited_image.svg";

        // Programmatically trigger the anchor's click event to initiate download
        a.click();

        // Clean up the temporary anchor element
        URL.revokeObjectURL(a.href);
    }
});
