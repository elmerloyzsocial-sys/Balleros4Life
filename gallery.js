const repoOwner = "elmerloyzsocial-sys";
const repoName = "Balleros4Life";
const galleryFolder = "gallery";

// Helper: Format date as YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
}

// Helper: Group images by date
function groupImagesByDate(imgFiles) {
  const imagesByDate = {};
  imgFiles.forEach(file => {
    // Use file.lastModified or file.date (custom property) or today's date if not available
    let date;
    if (file.gitDate) {
      date = formatDate(file.gitDate);
    } else if (file.lastModified) {
      date = formatDate(file.lastModified);
    } else {
      date = "Unknown Date";
    }
    if (!imagesByDate[date]) {
      imagesByDate[date] = [];
    }
    imagesByDate[date].push(file);
  });
  return imagesByDate;
}

async function fetchGalleryImages() {
  const galleryDiv = document.getElementById("galleryFull");
  if (!galleryDiv) return;
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${galleryFolder}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch gallery images.");
    const files = await response.json();

    // Only show image files (jpg, jpeg, png, gif)
    const imgFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file.name));

    // Try to get the date from the file metadata (GitHub API provides 'git_url' to get history)
    // For demo, just use the file 'date' from GitHub's 'created_at' (not available directly, so fallback to 'Unknown Date')
    imgFiles.forEach(file => {
      // GitHub doesn't provide date in this API, but you could fetch commit info for each file if needed (slow!)
      file.gitDate = file.lastModified || null; // Fallback, you could extend with additional API calls
    });

    // Group images by date
    const imagesByDate = groupImagesByDate(imgFiles);

    // Build HTML by date group
    galleryDiv.innerHTML = Object.entries(imagesByDate).map(([date, images]) => `
      <div class="galleryDateGroup">
        <h2>${date}</h2>
        <div class="galleryDateImages">
          ${images.map(file => `
            <div class="galleryItem">
              <img src="${file.download_url}" alt="${file.name}" class="galleryImg" data-fullsrc="${file.download_url}" />
              <p>${file.name}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

    addLightboxListeners();
  } catch (err) {
    galleryDiv.innerHTML = "<p>Could not load gallery images.</p>";
    console.error(err);
  }
}

// Lightbox: unchanged

function addLightboxListeners() {
  const images = document.querySelectorAll(".galleryImg");
  let lightbox = document.getElementById("lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
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
  }

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
            const date = formatDate(file.lastModified);
            const galleryFull = document.getElementById('galleryFull');
            // Find or create date group
            let group = [...galleryFull.children].find(dg => dg.querySelector('h2')?.textContent === date);
            if (!group) {
              group = document.createElement('div');
              group.className = 'galleryDateGroup';
              group.innerHTML = `<h2>${date}</h2><div class="galleryDateImages"></div>`;
              galleryFull.prepend(group);
            }
            const imagesDiv = group.querySelector('.galleryDateImages');
            const div = document.createElement('div');
            div.className = 'galleryItem';
            div.innerHTML = `<img src="${imgURL}" alt="${caption}" class="galleryImg" data-fullsrc="${imgURL}"><br><small>${caption}</small>`;
            imagesDiv.prepend(div);
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

// Additional CSS for date grouping
const style = document.createElement('style');
style.textContent = `
  #galleryFull {
    display: block;
    padding: 10px;
  }
  .galleryDateGroup {
    margin-bottom: 30px;
  }
  .galleryDateGroup h2 {
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #1976d2;
  }
  .galleryDateImages {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
    padding: 10px 0;
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
    .galleryDateImages {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
    .galleryImg {
      width: 100%;
      height: auto;
    }
  }
`;
document.head.appendChild(style);