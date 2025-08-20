// Replace these with your repo and folder info
const repoOwner = "elmerloyzsocial-sys";
const repoName = "Balleros4Life";
const galleryFolder = "gallery";

const galleryDiv = document.getElementById("galleryFull");

// Fetch images from GitHub /gallery/ folder
async function fetchGalleryImages() {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${galleryFolder}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch gallery images.");
    const files = await response.json();

    // Only show image files (jpg, jpeg, png, gif)
    const imgFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    );

    // Display images
    galleryDiv.innerHTML = imgFiles.map(file => `
      <div class="galleryItem">
        <img src="${file.download_url}" alt="${file.name}" class="galleryImg" />
        <p>${file.name}</p>
      </div>
    `).join("");
  } catch (err) {
    galleryDiv.innerHTML = "<p>Could not load gallery images.</p>";
    console.error(err);
  }
}

// Call the function to load gallery images
fetchGalleryImages();
