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

var editedSvg = null;

imageUpload.addEventListener("change", function (event) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        editedSvg = reader.result;

        editedSvgContainer.innerHTML = editedSvg;
    };
});

// Listen for the "Add Classes" button click
addClassesButton.addEventListener("click", function () {
    if (editedSvg) {
        var parser = new DOMParser();
        var svgDoc = parser.parseFromString(editedSvg, "image/svg+xml");
        var svgRoot = svgDoc.documentElement;

        var groups = svgRoot.querySelectorAll("g");

        var groupClass = groupClassInput.value.trim();
        var pathClass = pathClassInput.value.trim();
        var textClass = textClassInput.value.trim();

        groups.forEach(function (group) {
            if (groupClass && !group.classList.contains(groupClass)) {
                group.classList.add(groupClass);
            }
        });

        var paths = svgRoot.querySelectorAll("path");

        paths.forEach(function (path) {
            if (pathClass && !path.classList.contains(pathClass)) {
                path.classList.add(pathClass);
            }
        });
        var texts = svgRoot.querySelectorAll("text");

        texts.forEach(function (text) {
            if (textClass && !text.classList.contains(textClass)) {
                text.classList.add(textClass);
            }
        });

        editedSvg = new XMLSerializer().serializeToString(svgDoc);
        editedSvgContainer.innerHTML = editedSvg;

        progressIndicator.style.display = "none";

        successMessage.style.display = "block";
    }
});

// Listen for the "Clear" button click
clearButton.addEventListener("click", function () {
    groupClassInput.value = "";
    pathClassInput.value = "";
    textClassInput.value = "";

    imageUpload.value = "";

    editedSvg = null;
    editedSvgContainer.innerHTML = "";

    successMessage.style.display = "none";
});

downloadButton.addEventListener("click", function () {
    if (editedSvg) {
        var blob = new Blob([editedSvg], { type: "image/svg+xml" });

        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "edited_image.svg";

        a.click();

        URL.revokeObjectURL(a.href);
    }
});
