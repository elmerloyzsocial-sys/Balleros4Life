// Gallery fetch from GitHub
const repoOwner = "elmerloyzsocial-sys";
const repoName = "Balleros4Life";
const galleryFolder = "gallery";

async function fetchGalleryImages() {
  const galleryDiv = document.getElementById("galleryFull");
  if (!galleryDiv) return;

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

document.addEventListener("DOMContentLoaded", function() {
  // Gallery Page: Full gallery and upload form
  if (document.getElementById('galleryFull')) {
    fetchGalleryImages();

    // Upload form (local preview only)
    if (document.getElementById('uploadForm')) {
      document.getElementById('uploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('photoUpload');
        const caption = document.getElementById('photoCaption').value;
        const file = fileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(ev) {
            const imgURL = ev.target.result;
            const div = document.createElement('div');
            div.innerHTML = `<img src="${imgURL}" alt="${caption}" class="galleryImg"><br><small>${caption}</small>`;
            document.getElementById('galleryFull').prepend(div);
          };
          reader.readAsDataURL(file);
          fileInput.value = '';
          document.getElementById('photoCaption').value = '';
        }
      });
    }
  }
});