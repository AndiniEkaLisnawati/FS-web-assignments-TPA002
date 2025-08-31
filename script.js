const BMI_CATEGORIES = {
    UNDERWEIGHT: ' UNDERWEIGHT',
    NORMAL: 'Normal (ideal)',
    OVERWEIGHT: 'OVERWEIGHT',
    OBESITY: 'OBESITY',
};

// Fungsi untuk menghitung BMI berdasarkan berat badan dan tinggi badan
const calculateBMI = (weight, height) => {
    let bmi = weight / ((height / 100) ** 2);
    return bmi.toFixed(1); // Mengembalikan BMI dengan 1 angka desimal
};

// Fungsi untuk memvalidasi input berat badan, tinggi badan, usia, dan jenis kelamin
const validateInput = (weight, height, age, gender) => {
    const genderErrorMessage = document.getElementById('genderErrorMessage');
    const weightErrorMessage = document.getElementById('weightErrorMessage');
    const ageErrorMessage = document.getElementById('ageErorMessage'); // Pastikan ini sesuai dengan HTML
    const heightErrorMessage = document.getElementById('heightErrorMessage');

    genderErrorMessage.textContent = '';
    weightErrorMessage.textContent = '';
    ageErrorMessage.textContent = '';
    heightErrorMessage.textContent = '';

    let isValid = true;

    if (!gender) {
        genderErrorMessage.innerText = 'Please select your gender first.';
        isValid = false;
    }

    if (isNaN(weight) || weight <= 0) {
        weightErrorMessage.innerText = 'Weight must be a number greater than 0.';
        isValid = false;
    }

    if (isNaN(height) || height <= 0) {
        heightErrorMessage.innerText = 'Height must be a number greater than 0.';
        isValid = false;
    }

    if (isNaN(age) || age <= 0) {
        ageErrorMessage.innerText = 'Age must be a number greater than 0.';
        isValid = false;
    }

    return isValid;
};

// Fungsi untuk mengecek status BMI berdasarkan nilai BMI dan jenis kelamin
const checkStatus = (bmi, gender) => {
    let status = '';

    if (gender === 'male') {
        if (bmi < 18.5) {
            status = BMI_CATEGORIES.UNDERWEIGHT;
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = BMI_CATEGORIES.NORMAL;
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            status = BMI_CATEGORIES.OVERWEIGHT;
        } else if (bmi >= 30.0) {
            status = BMI_CATEGORIES.OBESITY;
        }
    } else if (gender === 'female') {
        if (bmi < 17) {
            status = BMI_CATEGORIES.UNDERWEIGHT;
        } else if (bmi >= 17 && bmi <= 23.9) {
            status = BMI_CATEGORIES.NORMAL;
        } else if (bmi >= 23.0 && bmi <= 27.0) {
            status = BMI_CATEGORIES.OVERWEIGHT;
        } else if (bmi > 27.0) {
            status = BMI_CATEGORIES.OBESITY;
        }
    }

    return status;
};

// Fungsi untuk mendapatkan deskripsi teks berdasarkan status BMI
const getDescText = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return 'You have less than normal weight';
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return 'You have a weight in the normal range';
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return 'You are overweight';
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return 'You are very overweight';
    }
};

// Fungsi untuk menampilkan hasil BMI, status, dan deskripsi
const generateDisplay = (bmi, status) => {
    const resultTitle = document.getElementById('result-title');
    resultTitle.innerText = status; // Menampilkan status BMI
    const resultBmi = document.getElementById('result-bmi');
    resultBmi.innerText = bmi; // Menampilkan nilai BMI
    const resultDesc = document.getElementById('result-desc');
    resultDesc.innerText = getDescText(status); // Menampilkan deskripsi berdasarkan status

    // Menyembunyikan form dan menampilkan hasil
    document.getElementById('result');
};

// Fungsi untuk mengecek BMI dan menampilkan hasil
const checkBMI = (event) => {
    event.preventDefault(); // Mencegah pengiriman formulir

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value; // Menggunakan optional chaining
    const age = parseInt(document.getElementById('age').value);

    if (!validateInput(weight, height, age, gender)) {
        return; // Jika input tidak valid, keluar dari fungsi
    }

    const bmi = calculateBMI(weight, height); // Menghitung BMI
    const status = checkStatus(bmi, gender); // Mengecek status BMI
    generateDisplay(bmi, status); // Menampilkan hasil

    document.getElementById('form').reset();
    document.getElementById('result').classList.remove('d-hidden');
    document.getElementById('form').classList.add('d-hidden');
    document.getElementById('sub-result').classList.remove('d-hidden');
};

// Fungsi untuk mengembalikan tampilan form
const regenerateBMI = () => {
    document.getElementById('weight').value = ''; // Mengosongkan input berat
    document.getElementById('height').value = ''; // Mengosongkan input tinggi
    document.getElementById('age').value = ''; // Mengosongkan input usia
    document.getElementById('form').classList.remove('d-hidden');
    document.getElementById('sub-result').classList.add('d-hidden');
    document.getElementById('result').classList.add('d-hidden');

    // Menghapus pilihan gender
    const genderInput = document.querySelector('input[name="gender"]:checked');
    if (genderInput) {
        genderInput.checked = false; // Hanya set checked jika ada input yang terpilih
    }
};

// Menambahkan event listener untuk tombol submit
document.querySelector('form').addEventListener('submit', checkBMI);
document.getElementById('result').addEventListener('reset', regenerateBMI);