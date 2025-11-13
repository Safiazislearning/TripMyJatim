// --- 1. DATA WISATA JATIM ---
const DATA_WISATA = {
    "gunung_bromo": { nama: "Gunung Bromo", tiket: 27000, jarak_dari_kediri: 241 },
    "kawah_ijen": { nama: "Kawah Ijen", tiket: 100000, jarak_dari_kediri: 324 },
    "jatim_park_3": { nama: "Jatim Park 3", tiket: 110000, jarak_dari_kediri: 82 },
    "pantai_papuma": { nama: "Pantai Papuma", tiket: 15000, jarak_dari_kediri: 40 },
    "kebun_binatang_surabaya": {nama: "KBS (Kebun Binatang Surabaya)", tiket: 20000, jarak_dari_kediri: 123}, 
    "coban_rondo": {nama: "Coban Rondo (Batu)", tiket: 20000, jarak_dari_kediri: 85}, 
    "gunung_kelud": {nama: "Gunung Kelud (Kediri)", tiket: 15000, jarak_dari_kediri: 30}, 
    "candi_penataran": {nama: "Candi Penataran (Blitar)", tiket: 10000, jarak_dari_kediri: 65}, 
    "museum_angkut": {nama: "Museum Angkut", tiket: 110000, jarak_dari_kediri: 87},
    "pantai_balekambang": {nama: "Pantai Balekambang (Malang)", tiket: 15000, jarak_dari_kediri: 160},
    "air_terjun_tumpak_sewu": {nama: "Air Terjun Tumpak Sewu (Lumajang)", tiket: 20000, jarak_dari_kediri: 195},
    "pantai_tambakrejo": {nama: "Pantai Tambakrejo (Blitar)", tiket: 15000, jarak_dari_kediri: 95},
    "pantai_tiga_warna": {nama: "Pantai Tiga Warna", tiket: 10000, jarak_dari_kediri: 134},
    "taman_doraemon": {nama: "Taman Doraemon", tiket: 5000, jarak_dari_kediri: 19}
};
// Konstanta perhitungan
const HARGA_BBM_PER_LITER = 12000;
const KONSUMSI_BBM_KM_PER_LITER = 15;
const KECEPATAN_RATA_RATA_KMH = 60;

// Helper untuk format mata uang IDR
const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
});

// --- 2. FUNGIONALITAS UTAMA ---

function populateDestinations() {
    // Mengisi opsi (select) dengan data destinasi
    const selectPertama = document.getElementById('lokasiPertama');
    const selectKedua = document.getElementById('lokasiKedua');

    for (const key in DATA_WISATA) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = DATA_WISATA[key].nama;
        
        // Kloning elemen option untuk select tujuan
        selectPertama.appendChild(option.cloneNode(true));
        selectKedua.appendChild(option);
    }
}

function hitungPerjalanan(event) {
    event.preventDefault(); // Mencegah form submit/refresh
    
    const pertamaKey = document.getElementById('lokasiPertama').value;
    const keduaKey = document.getElementById('lokasiKedua').value;
    const hasilDiv = document.getElementById('hasilPerhitungan');
    hasilDiv.innerHTML = ''; // Bersihkan hasil sebelumnya

    if (!pertamaKey || !keduaKey) {
        hasilDiv.innerHTML = 'Pilih lokasi awal dan tujuan terlebih dahulu.';
        return;
    }

    const dataPertama = DATA_WISATA[pertamaKey];
    const dataKedua = DATA_WISATA[keduaKey];

    // Perhitungan Jarak (km)
    const jarakKm = Math.abs(dataKedua.jarak_dari_kediri - dataPertama.jarak_dari_kediri);

    // Perhitungan Waktu (jam)
    const waktuJam = jarakKm / KECEPATAN_RATA_RATA_KMH;
    const waktuMenit = Math.round(waktuJam * 60);

    // Perhitungan Biaya
    const biayaTiket = dataKedua.tiket;
    const literBBM = jarakKm / KONSUMSI_BBM_KM_PER_LITER;
    const biayaBBM = literBBM * HARGA_BBM_PER_LITER;
    const totalBiaya = biayaTiket + biayaBBM;

    // Output ke HTML
    hasilDiv.innerHTML = `
        <h3>📝 Hasil Estimasi Perjalanan</h3>
        <p>Dari: <strong>${dataPertama.nama}</strong> menuju <strong>${dataKedua.nama}</strong></p>
        <hr>
        <p>Jarak Tempuh Total: <strong>${jarakKm.toFixed(2)} km</strong></p>
        <p>Estimasi Waktu Tempuh: <strong>${waktuJam.toFixed(2)} jam</strong> (± ${waktuMenit} menit)</p>
        <hr>
        <h4>DETAIL BIAYA:</h4>
        <p>- Biaya Tiket Masuk: ${formatter.format(biayaTiket)}</p>
        <p>- Estimasi Biaya BBM (Pulang-Pergi): ${formatter.format(biayaBBM)}</p>
        <h3>TOTAL BIAYA ESTIMASI: <span style="color: #d9534f;">${formatter.format(totalBiaya)}</span></h3>
    `;
}


// --- 3. INICIALISASI ---

// Jalankan fungsi untuk mengisi opsi destinasi saat halaman dimuat
populateDestinations();

// Tambahkan event listener untuk memproses form saat tombol ditekan
document.getElementById('travelForm').addEventListener('submit', hitungPerjalanan);
