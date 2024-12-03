const token = localStorage.getItem("auth_token");

async function deleteCommunity(id) {
  const confirmDelete = confirm(
    "Apakah Anda yakin ingin menghapus lapangan ini?"
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/courts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    alert("lapangan berhasil dihapus!");
    fetchAndRenderCommunities(); // Reload daftar komunitas
  } catch (error) {
    console.error("Gagal menghapus lapangan:", error);
    alert(`Gagal menghapus lapangan: ${error.message}`);
  }
}

async function fetchAndRenderCommunities() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/courts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    const communities = result.data; // Array komunitas
    const container = document.getElementById("community-container");
    console.log(communities);

    container.innerHTML = ""; // Reset container

    communities.forEach((community) => {
      const communityCard = `
        <div
            class="relative m-10 bg-[#31294D] rounded-2xl overflow-hidden shadow-lg w-90 h-96 cursor-pointer" 
          
        >
            <!-- Background Image -->
            <img
                src="./assets/unsplash_70YxSTWa2Zw.png"
                alt="Soccer Stadium"
                class="w-full h-52 object-cover"
            />

            <!-- Overlay and Text -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"
            ></div>
            <div
                class="absolute bottom-0 left-0 w-full p-4 flex items-center space-x-2 bg-gradient-to-r from-[#31294D]/90 to-transparent"
            >
                <!-- Text Section -->
                <div>
                    <h2 class="text-white font-semibold text-lg mb-2">
                        ${community.name}
                    </h2>
                
                    <span class="text-gray-300">${community.location}</span>
                    <p class="mt-2">Harga / jam : Rp. ${Math.trunc(
                      community.price_per_hour
                    )}</p>
                </div>
                <div class="flex justify-between items-center mt-2 absolute bottom-3 right-3">
                    <button
                        class="bg-[#FFD88D] text-[#0A061E] rounded-full py-1 px-4 mr-2"
                        id="hps"
                        
                        onclick="deleteCommunity(${community.id})"
                    >
                    Hapus
                    </button>
                    <button
        class="bg-[#FFD88D] text-[#0A061E] rounded-full py-1 px-4"
        id="edt"
        onclick="openEditForm(${community.id}, '${community.name}', '${
        community.type
      }', '${community.location}', '${community.facilities}', ${
        community.price_per_hour
      }, ${community.available})"
    >
        Edit
    </button>
                    
                </div>
            </div> 
        </div>`;
      container.innerHTML += communityCard;
    });
  } catch (error) {
    console.error("Error fetching communities:", error);
  }
}

function openEditForm(
  id,
  name,
  type,
  location,
  facilities,
  price_per_hour,
  avaible
) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-name").value = name;
  document.getElementById("edit-type").value = type;
  document.getElementById("edit-location").value = location;
  document.getElementById("edit-facilities").value = facilities;
  document.getElementById("edit-price").value = price_per_hour;
  document.getElementById("edit-avaible").value = avaible;

  document.getElementById("edit-form").classList.remove("hidden"); // Tampilkan form edit
}

function closeEditForm() {
  document.getElementById("edit-form").classList.add("hidden");
}

document
  .getElementById("edit-community-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("edit-id").value;
    const name = document.getElementById("edit-name").value;
    const type = document.getElementById("edit-type").value;
    const location = document.getElementById("edit-location").value;
    const facilities = document
      .getElementById("edit-facilities")
      .value.split(",");
    const price_per_hour = document.getElementById("edit-price").value;
    const avaible = document.getElementById("edit-avaible").value;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/courts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          type,
          location,
          facilities,
          price_per_hour,
          avaible,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      alert("Lapangan berhasil diperbarui!");
      closeEditForm();
      fetchAndRenderCommunities(); // Reload data
    } catch (error) {
      console.error("Gagal memperbarui Lapangan:", error);
      alert(`Gagal memperbarui Lapangan: ${error.message}`);
    }
  });

// Tangkap elemen dengan id "add-button"
const addButton = document.getElementById("add-button");
const hapusButtons = document.querySelectorAll("#hps");
const editButtons = document.querySelectorAll("#edt");

async function fetchCurrentUser() {
  // Ambil token dari localStorage
  const token = localStorage.getItem("auth_token");

  // Validasi token
  if (!token) {
    console.error("Token tidak ditemukan. Harap login kembali.");
    alert("Token tidak ditemukan. Harap login kembali.");
    return;
  }

  try {
    // Kirim request GET ke API
    const response = await fetch("http://127.0.0.1:8000/api/users/current", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Periksa apakah respons berhasil
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    // Parse data JSON dari respons
    const userData = await response.json();
    console.log("Data Pengguna Saat Ini:", userData.data.role);

    // Tambahkan kelas hidden jika role adalah "user"
    if (userData.data.role !== "user") {
      addButton.classList.remove("hidden");

      hapusButtons.forEach((hapusButton) => {
        hapusButton.classList.remove("hidden");
      });

      editButtons.forEach((editButton) => {
        editButton.classList.remove("hidden");
      });
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
    alert(`Gagal mengambil data pengguna: ${error.message}`);
  }
}

// Panggil fungsi fetchCurrentUser

fetchCurrentUser();
// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchAndRenderCommunities);
