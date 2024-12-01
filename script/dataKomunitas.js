// async function fetchCommunities() {
//   // Ambil token dari localStorage
//   const token = localStorage.getItem("auth_token");

//   // Validasi apakah token tersedia
//   if (!token) {
//     console.error("Token tidak ditemukan. Harap login kembali.");
//     alert("Token tidak ditemukan. Harap login kembali.");
//     return;
//   }

//   try {
//     // Kirim permintaan GET ke API
//     const response = await fetch("http://127.0.0.1:8000/api/komunitas", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Periksa status respons
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `HTTP ${response.status}`);
//     }

//     // Parse data JSON dari respons
//     const communities = await response.json();

//     // Tampilkan data di console
//     console.log("Data Komunitas:", communities.data);

//     // Jika ingin, proses atau tampilkan data di halaman HTML
//   } catch (error) {
//     console.error("Gagal mengambil data komunitas:", error);
//     alert(`Gagal mengambil data komunitas: ${error.message}`);
//   }
// }

// // Panggil fungsi fetchCommunities saat halaman dimuat
// document.addEventListener("DOMContentLoaded", fetchCommunities);

// async function fetchAndProcessCommunities() {
//   const token = localStorage.getItem("auth_token");

//   if (!token) {
//     console.error("Token tidak ditemukan. Harap login kembali.");
//     alert("Token tidak ditemukan. Harap login kembali.");
//     return;
//   }

//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/komunitas", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `HTTP ${response.status}`);
//     }

//     const result = await response.json();

//     // Ambil data array dari result
//     const communities = result.data;

//     // Looping data array dan tampilkan di console
//     communities.forEach((community, index) => {
//       console.log(`Komunitas #${index + 1}:`);
//       console.log(`ID: ${community.id}`);
//       console.log(`Nama: ${community.nama_komunitas}`);
//       console.log(`Deskripsi: ${community.deskripsi_komunitas}`);
//       console.log(`jumlah anggota: ${community.jumlah_anggota}`);
//       console.log(`batas anggota: ${community.batas_anggota}`);
//       console.log("----------------------------");
//     });
//   } catch (error) {
//     console.error("Gagal memproses data komunitas:", error);
//     alert(`Gagal memproses data komunitas: ${error.message}`);
//   }
// }

// // Panggil fungsi saat halaman dimuat
// document.addEventListener("DOMContentLoaded", fetchAndProcessCommunities);

// async function fetchAndRenderCommunities() {
//   const token = localStorage.getItem("auth_token");

//   if (!token) {
//     console.error("Token tidak ditemukan. Harap login kembali.");
//     alert("Token tidak ditemukan. Harap login kembali.");
//     return;
//   }

//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/komunitas", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `HTTP ${response.status}`);
//     }

//     const result = await response.json();
//     const communities = result.data; // Array of communities

//     // Seleksi elemen container untuk komunitas
//     const container = document.getElementById("community-container");

//     // Looping dan tambahkan elemen HTML untuk setiap komunitas
//     communities.forEach((community) => {
//       const communityCard = `
//           <div
//             class="bg-[#27223E] rounded-3xl overflow-hidden my-5 mx-5 w-[30%] flex flex-col relative"
//           >
//             <div
//               class="relative h-52 bg-cover bg-no-repeat"
//               style="background-image: url('./assets/community_pic.png')"
//             >
//               <div
//                 class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"
//               ></div>
//               <h2
//                 class="absolute bottom-2 left-1/3 transform -translate-x-1/2 text-white font-bold text-lg text-shadow-md z-10"
//               >
//                 ${community.nama_komunitas}
//               </h2>
//             </div>

//             <div class="p-4 text-white">
//               <p>${community.deskripsi_komunitas}</p>
//               <div class="flex justify-between items-center mt-2">
//                 <button
//                   class="bg-[#FFD88D] text-[#0A061E] rounded-full py-1 px-4"
//                 >
//                   Masuk
//                 </button>
//                 <a href="update_community.html"><button
//                   class="bg-[#FFD88D] text-[#0A061E] rounded-full py-1 px-4"
//                 >
//                 Edit
//                 </button></a>

//                 <div class="text-sm text-[#7E7997] text-right">
//                   <p>
//                     Anggota: <span>${community.jumlah_anggota}</span> /
//                     <span>${community.batas_anggota}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;

//       // Tambahkan elemen ke container
//       container.innerHTML += communityCard;
//     });
//   } catch (error) {
//     console.error("Gagal memproses data komunitas:", error);
//     alert(`Gagal memproses data komunitas: ${error.message}`);
//   }
// }

// // Panggil fungsi saat halaman dimuat
// document.addEventListener("DOMContentLoaded", fetchAndRenderCommunities);

const token = localStorage.getItem("auth_token");

async function deleteCommunity(id) {
  const confirmDelete = confirm(
    "Apakah Anda yakin ingin menghapus komunitas ini?"
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/komunitas/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    alert("Komunitas berhasil dihapus!");
    fetchAndRenderCommunities(); // Reload daftar komunitas
  } catch (error) {
    console.error("Gagal menghapus komunitas:", error);
    alert(`Gagal menghapus komunitas: ${error.message}`);
  }
}

async function fetchAndRenderCommunities() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/komunitas", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    const communities = result.data; // Array komunitas
    const container = document.getElementById("community-container");

    container.innerHTML = ""; // Reset container

    communities.forEach((community) => {
      const communityCard = `
          <div
            class="bg-[#27223E] rounded-3xl overflow-hidden my-5 mx-5 w-[30%] flex flex-col relative"
          >
            <div
              class="relative h-52 bg-cover bg-no-repeat"
              style="background-image: url('./assets/community_pic.png')"
            >
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"
              ></div>
              <h2
                class="absolute bottom-2 left-1/3 transform -translate-x-1/2 text-white font-bold text-lg text-shadow-md z-10"
              >
                ${community.nama_komunitas}
              </h2>
            </div>

            <div class="p-4 text-white">
              <p>${community.deskripsi_komunitas}</p>
              <div class="flex justify-between items-center mt-2">
              <button
                  class="bg-[#FFD88D] text-[#0A061E] rounded-full py-1 px-4"
                  onclick="deleteCommunity(${community.id})"
                >
                  Hapus
                </button>
                <button
                  class="bg-[#FFD88D] text-[#0A061E] rounded-full py-1 px-4"
                  onclick="openEditForm(${community.id}, '${community.nama_komunitas}', '${community.deskripsi_komunitas}', ${community.jumlah_anggota}, ${community.batas_anggota})"
                >
                  Edit
                </button>
                <div class="text-sm text-[#7E7997] text-right">
                  <p>
                    Anggota: <span>${community.jumlah_anggota}</span> /
                    <span>${community.batas_anggota}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
      container.innerHTML += communityCard;
    });
  } catch (error) {
    console.error("Error fetching communities:", error);
  }
}

function openEditForm(id, nama, deskripsi, jumlahAnggota, batasAnggota) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-nama").value = nama;
  document.getElementById("edit-deskripsi").value = deskripsi;
  document.getElementById("edit-jumlah-anggota").value = jumlahAnggota;
  document.getElementById("edit-batas-anggota").value = batasAnggota;

  document.getElementById("edit-form").classList.remove("hidden");
}

function closeEditForm() {
  document.getElementById("edit-form").classList.add("hidden");
}

document
  .getElementById("edit-community-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("edit-id").value;
    const nama = document.getElementById("edit-nama").value;
    const deskripsi = document.getElementById("edit-deskripsi").value;
    const jumlahAnggota = document.getElementById("edit-jumlah-anggota").value;
    const batasAnggota = document.getElementById("edit-batas-anggota").value;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/komunitas/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nama_komunitas: nama,
            deskripsi_komunitas: deskripsi,
            jumlah_anggota: jumlahAnggota,
            batas_anggota: batasAnggota,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      alert("Komunitas berhasil diperbarui!");
      closeEditForm();
      fetchAndRenderCommunities(); // Reload communities
    } catch (error) {
      console.error("Gagal memperbarui komunitas:", error);
      alert(`Gagal memperbarui komunitas: ${error.message}`);
    }
  });

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchAndRenderCommunities);
