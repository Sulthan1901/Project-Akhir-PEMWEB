const username = document.getElementById("username");

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
    console.log("Data Pengguna Saat Ini:", userData.data.username);

    username.innerText = userData.data.username;

    // Tampilkan data pengguna di halaman
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
    alert(`Gagal mengambil data pengguna: ${error.message}`);
  }
}

// Panggil fungsi ketika halaman dimuat
document.addEventListener("DOMContentLoaded", fetchCurrentUser);
