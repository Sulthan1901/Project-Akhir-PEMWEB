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
