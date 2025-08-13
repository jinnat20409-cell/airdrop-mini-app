import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userSection = document.getElementById("userSection");
const userName = document.getElementById("userName");
const refLink = document.getElementById("refLink");

// Login
loginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            userName.textContent = user.displayName;
            refLink.value = `${window.location.origin}?ref=${user.uid}`;
            userSection.style.display = "block";
            loginBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
        })
        .catch((error) => {
            console.error(error);
        });
});

// Logout
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        userSection.style.display = "none";
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    });
});

// Airdrop List
const airdrops = [
    { name: "TokenX Airdrop", link: "https://example.com/airdrop1" },
    { name: "CryptoY Giveaway", link: "https://example.com/airdrop2" }
];

const airdropList = document.getElementById("airdropList");
airdrops.forEach(drop => {
    const div = document.createElement("div");
    div.classList.add("airdrop");
    div.innerHTML = `<h3>${drop.name}</h3><a href="${drop.link}" target="_blank">Join Now</a>`;
    airdropList.appendChild(div);
});