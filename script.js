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
// Perkiraan data harga bahan bakar dan konsumsi BBM (km/liter)
const DATA_BENSIN = {
    "pertalite": {jenis: "Pertalite", harga: 12000, BBM_kilometer_per_liter: 20},
    "pertamax": {jenis: "Pertamax", harga: 14000, BBM_kilometer_per_liter: 40}
};

// Perkiraan kecepatan rata-rata kendaraan (km/jam)
const DATA_KENDARAAN = {
    "motor": {tipe: "Motor", KECEPATAN_RATA_RATA_KMH: 60},
    "mobil": {tipe: "Mobil", KECEPATAN_RATA_RATA_KMH: 80}
};


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
    const selectBakar = document.getElementById('bahanBakar');
    

    for (const key in DATA_WISATA) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = DATA_WISATA[key].nama;
        
        // Kloning elemen option untuk select tujuan
        selectPertama.appendChild(option.cloneNode(true));
        selectKedua.appendChild(option);
    }

    for (const key in DATA_BENSIN) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = DATA_BENSIN[key].jenis;

        selectBakar.appendChild(option);
    }

    for (const key in DATA_KENDARAAN) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = DATA_KENDARAAN[key].tipe;

        document.getElementById('alatTransportasi').appendChild(option);
    }
}

function hitungPerjalanan(event) {
    event.preventDefault(); // Mencegah form submit/refresh
    
    const pertamaKey = document.getElementById('lokasiPertama').value;
    const keduaKey = document.getElementById('lokasiKedua').value;
    const bensinKey = document.getElementById('bahanBakar').value;
    const transportKey = document.getElementById('alatTransportasi').value;
    const hasilDiv = document.getElementById('hasilPerhitungan');
    hasilDiv.innerHTML = ''; // Bersihkan hasil sebelumnya

    if (!pertamaKey || !keduaKey || !bensinKey || !transportKey) {
        hasilDiv.innerHTML = 'Pilih lokasi awal, tujuan dan jenis BBM terlebih dahulu.';
        return;
    }

    const asal = DATA_WISATA[pertamaKey];
    const tujuan = DATA_WISATA[keduaKey];
    const bbm = DATA_BENSIN[bensinKey];
    const kendaraan = DATA_KENDARAAN[transportKey];

    // Perhitungan Jarak (km)
    const jarakKm = Math.abs(tujuan.jarak_dari_kediri - asal.jarak_dari_kediri);

    // Perhitungan Waktu (jam)
    const waktuJam = jarakKm / kendaraan.KECEPATAN_RATA_RATA_KMH;
    const waktuMenit = Math.round(waktuJam * 60);

    // Perhitungan Biaya
    const biayaTiket = tujuan.tiket;
    const literBBM = jarakKm / bbm.BBM_kilometer_per_liter;
    const biayaBBM = literBBM * bbm.harga * 2;
    const totalBiaya = biayaTiket + biayaBBM;
    const hargaBensin = bbm.harga;

    // Output ke HTML
    hasilDiv.innerHTML = `
        <h3>📝 Hasil Estimasi Perjalanan</h3>
        <p>Dari: <strong>${asal.nama}</strong> menuju <strong>${tujuan.nama}</strong></p>
        <hr>
        <p>Jarak Tempuh Total: <strong>${jarakKm.toFixed(2)} km</strong></p>
        <p>Estimasi Waktu Tempuh: Menggunakan ${(kendaraan.tipe)} <strong>${waktuJam.toFixed(2)} jam</strong> <br> (± ${waktuMenit} menit)</p>
        <hr>
        <h4>DETAIL BIAYA:</h4>
        <p>- Biaya Tiket Masuk: ${formatter.format(biayaTiket)}</p>
        <h4>DETAIL BIAYA BBM:</h4>
        <p>- Harga per liter: ${formatter.format(hargaBensin)}</p>
        <p>- Konsumsi: 1 liter untuk <b>${bbm.BBM_kilometer_per_liter} km</b></p>
        <p>- Pemakaian BBM: ${literBBM.toFixed(2)} liter</p>
        <p>- Estimasi Biaya BBM (Pulang-Pergi): ${formatter.format(biayaBBM)}</p>
        <h3>TOTAL BIAYA ESTIMASI: <span style="color: #d9534f;">${formatter.format(totalBiaya)}</span></h3>
    `;
}


// --- 3. INICIALISASI ---

// Jalankan fungsi untuk mengisi opsi destinasi saat halaman dimuat
populateDestinations();

// Tambahkan event listener untuk memproses form saat tombol ditekan
document.getElementById('travelForm').addEventListener('submit', hitungPerjalanan);
