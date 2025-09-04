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
        <img src="${file.download_url}" alt="${file.name}" class="galleryImg" data-fullsrc="${file.download_url}" />
        <p>${file.name}</p>
      </div>
    `).join("");
    // Add click event for lightbox
    addLightboxListeners();
  } catch (err) {
    galleryDiv.innerHTML = "<p>Could not load gallery images.</p>";
    console.error(err);
  }
}

// Lightbox functionality to show full-resolution images
function addLightboxListeners() {
  const images = document.querySelectorAll(".galleryImg");
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.style.display = "none";
  lightbox.style.position = "fixed";
  lightbox.style.top = "0";
  lightbox.style.left = "0";
  lightbox.style.width = "100%";
  lightbox.style.height = "100%";
  lightbox.style.background = "rgba(0,0,0,0.8)";
  lightbox.style.justifyContent = "center";
  lightbox.style.alignItems = "center";
  lightbox.style.zIndex = "1000";
  document.body.appendChild(lightbox);

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.innerHTML = `
        <img src="${img.dataset.fullsrc}" class="lightboxImg" />
        <button class="lightboxClose">&times;</button>
      `;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") {
      lightbox.style.display = "none";
      lightbox.innerHTML = "";
    }
  });
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
            div.className = 'galleryItem';
            div.innerHTML = `<img src="${imgURL}" alt="${caption}" class="galleryImg" data-fullsrc="${imgURL}"><br><small>${caption}</small>`;
            document.getElementById('galleryFull').prepend(div);
            addLightboxListeners(); // Re-attach lightbox listeners for new images
          };
          reader.readAsDataURL(file);
          fileInput.value = '';
          document.getElementById('photoCaption').value = '';
        }
      });
    }
  }
});

// CSS for gallery and lightbox
const style = document.createElement('style');
style.textContent = `
  #galleryFull {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    padding: 10px;
  }
  .galleryItem {
    text-align: center;
    margin: 0;
  }
  .galleryImg {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s;
  }
  .galleryImg:hover {
    transform: scale(1.05);
  }
  #galleryPreview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    padding: 10px;
  }
  #galleryPreview img {
    width: 100%;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .lightboxImg {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }
  .lightboxClose {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  .lightboxClose:hover {
    color: #fbc02d;
  }
  @media (max-width: 600px) {
    #galleryFull {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    .galleryImg {
      width: 100%;
      height: auto;
    }
  }
`;
document.head.appendChild(style);