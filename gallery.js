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
    let date;
    if (file.gitDate) {
      date = formatDate(file.gitDate);
    } else if (file.lastModified) {
      date = formatDate(file.lastModified);
    } else {
      date = "Team Photo";
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

    imgFiles.forEach(file => {
      file.gitDate = file.lastModified || null;
    });

    // Group images by date
    const imagesByDate = groupImagesByDate(imgFiles);

    // Build HTML by date group (collapsible, horizontal scroll)
    galleryDiv.innerHTML = Object.entries(imagesByDate).map(([date, images], idx) => `
      <div class="galleryDateGroup">
        <h2 class="collapsible${idx === 0 ? " open" : ""}">${date}</h2>
        <div class="galleryDateImages"${idx === 0 ? "" : ' style="display:none;"'}>
          ${images.map(file => `
            <div class="galleryItem">
              <img src="${file.download_url}" alt="${file.name}" class="galleryImg" data-fullsrc="${file.download_url}" />
              <p>${file.name}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

    addCollapsibleListeners();
    addLightboxListeners();
  } catch (err) {
    galleryDiv.innerHTML = "<p>Could not load gallery images.</p>";
    console.error(err);
  }
}

// Collapsible date group logic
function addCollapsibleListeners() {
  document.querySelectorAll('.galleryDateGroup .collapsible').forEach(header => {
    header.addEventListener('click', function() {
      // Close all groups except clicked one
      document.querySelectorAll('.galleryDateGroup .galleryDateImages').forEach(div => {
        div.style.display = 'none';
      });
      document.querySelectorAll('.galleryDateGroup .collapsible').forEach(h => {
        h.classList.remove('open');
      });
      // Open current
      this.classList.add('open');
      this.nextElementSibling.style.display = 'flex';
    });
  });
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
              group.innerHTML = `<h2 class="collapsible">${date}</h2><div class="galleryDateImages" style="display:none;"></div>`;
              galleryFull.prepend(group);
              addCollapsibleListeners();
            }
            const imagesDiv = group.querySelector('.galleryDateImages');
            const div = document.createElement('div');
            div.className = 'galleryItem';
            div.innerHTML = `<img src="${imgURL}" alt="${caption}" class="galleryImg" data-fullsrc="${imgURL}"><br><small>${caption}</small>`;
            imagesDiv.prepend(div);
            imagesDiv.style.display = 'flex';
            group.querySelector('.collapsible').classList.add('open');
            addLightboxListeners();
          };
          reader.readAsDataURL(file);
          fileInput.value = '';
          document.getElementById('photoCaption').value = '';
        }
      });
    }
  }
});