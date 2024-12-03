async function Simpan(event) {
  event.preventDefault(); // Mencegah form reload

  // Tangkap nilai dari elemen input
  const communityName = document.getElementById("community-name").value;
  const address = document.getElementById("deskripsi").value;
  const motivation = document.getElementById("motivation").value;

  // Ambil token dari localStorage
  const token = localStorage.getItem("auth_token");

  // Validasi token
  if (!token) {
    alert("Token tidak ditemukan. Harap login kembali.");
    return;
  }

  // Siapkan data untuk dikirim
  const requestData = {
    nama_komunitas: communityName,
    deskripsi_komunitas: address,
    batas_anggota: motivation,
  };

  try {
    // Kirim data menggunakan fetch
    const response = await fetch("http://127.0.0.1:8000/api/komunitas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    // Periksa status respons
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    const responseData = await response.json();
    alert("Komunitas berhasil dibuat!");
    console.log("Data berhasil dikirim:", responseData);

    // Redirect ke halaman lain jika diperlukan
    window.location.href = "community.html";
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert(`Gagal membuat komunitas: ${error.message}`);
  }
}

// Tambahkan event listener pada tombol
document.querySelector("form").addEventListener("submit", Simpan);
