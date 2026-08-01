import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBe4l_92I4KseGnFdRex7ul8I-fEO1jUnI",
    authDomain: "sdn1talun-home.firebaseapp.com",
    databaseURL: "https://sdn1talun-home-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sdn1talun-home",
    storageBucket: "sdn1talun-home.firebasestorage.app",
    messagingSenderId: "959069024123",
    appId: "1:959069024123:web:ac4a762fd139ab6ab6d7de",
    measurementId: "G-6JVMZSXY48"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Dengarkan seluruh node 'statistik'
  onValue(ref(db, 'statistik'), (snapshot) => {
    if (snapshot.exists()) {
      const stats = snapshot.val();

      // Looping ke semua elemen yang punya atribut [data-stat]
      document.querySelectorAll('[data-stat]').forEach(el => {
        const key = el.getAttribute('data-stat');
        if (stats[key] !== undefined) {
          const angkaBaru = stats[key];
          const angkaLama = parseInt(el.textContent) || 0;
          
          // Jalankan animasi untuk masing-masing elemen
          animateValue(el, angkaLama, angkaBaru, 1200);
        }
      });
    }
  });

  // Fungsi animasi counter
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

const containerGaleri = document.getElementById('gallery-container');

  // Dengarkan perubahan pada node 'galeri'
  onValue(ref(db, 'galeri'), (snapshot) => {
    if (snapshot.exists()) {
      const listFoto = snapshot.val();
      
      // Kosongkan container dulu sebelum diisi ulang
      containerGaleri.innerHTML = '';

      // Render setiap foto ke dalam HTML
      listFoto.forEach((url, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Galeri ${index + 1}`;
        
        itemDiv.appendChild(img);
        containerGaleri.appendChild(itemDiv);
      });
    }
  });