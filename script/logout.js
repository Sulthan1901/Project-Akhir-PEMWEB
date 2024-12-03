// const token = localStorage.getItem("auth_token"); // Ambil token dari localStorage

async function logoutUser() {
  if (!token) {
    console.error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    alert("Token tidak ditemukan. Silakan login terlebih dahulu.");
    return;
  }

  try {
    // Fetch API dengan method DELETE
    const response = await fetch("http://127.0.0.1:8000/api/users/logout", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Cek jika ada error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    // Tampilkan data respon di console
    const data = await response.json();
    console.log("Logout berhasil:", data);

    // Hapus token dari localStorage
    localStorage.removeItem("auth_token");
    alert("Logout berhasil!");

    // Arahkan ke halaman index.html
    window.location.href = "login.html";
  } catch (error) {
    console.error("Gagal logout:", error);
    alert(`Gagal logout: ${error.message}`);
  }
}

// Tambahkan event listener pada tombol logout
document.getElementById("logout").addEventListener("click", logoutUser);
