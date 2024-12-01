async function Simpan(event) {
  event.preventDefault(); // Mencegah form reload

  // Tangkap nilai dari elemen input
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const location = document.getElementById("location").value;
  const facilities = document.getElementById("facilities").value.split(",");
  const price_per_hour = document.getElementById("price_per_hour").value;
  const avaible = document.getElementById("avaible").value;

  // Ambil token dari localStorage
  const token = localStorage.getItem("auth_token");

  // Validasi token
  if (!token) {
    alert("Token tidak ditemukan. Harap login kembali.");
    return;
  }

  // Siapkan data untuk dikirim
  const requestData = {
    name: name,
    type: type,
    location: location,
    facilities: facilities,
    price_per_hour: price_per_hour,
    avaible: avaible,
  };

  try {
    // Kirim data menggunakan fetch
    const response = await fetch("http://127.0.0.1:8000/api/courts", {
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
    window.location.href = "sewa_lapangan.html";
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert(`Gagal membuat komunitas: ${error.message}`);
  }
}

// Tambahkan event listener pada tombol
document.querySelector("form").addEventListener("submit", Simpan);
