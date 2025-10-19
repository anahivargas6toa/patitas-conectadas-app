"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN DE API ---
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWHrNza5bPe-mu2aqCkKl2TbCFCbNOcY533Ca0CaCwWy8w4A6RHeqUT4pganTikn0/exec'; // <-- ¡¡¡IMPORTANTE!!! Pega aquí la URL de tu NUEVO Google Apps Script que acabas de implementar.
    // --- STATE ---
    const defaultUserPic = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAxMy41QzE1LjA5NTMgMTMuNSAxNy42MjUgMTEuMDQ0MyAxNy42MjUgOEExLjUgMS41IDAgMCAwIDE3LjYyNSA1QzE3LjYyNSA2LjA0NDI5IDE1LjA5NTMgMy41IDEyIDMuNUM4LjkwNDcyIDMuNSAzLjA5NDM3IDYuMDQ0MjkgMy4wOTQzNyA4QTEuNSAxLjUgMCAwIDAgMy4wOTQzNyAxMUMzLjA5NDM3IDkuOTU1NzEgOC45MDQ3MiAxMy41IDEyIDEzLjVaTTE5LjUgMjAuNUMxOS41IDIwLjUgMjEgMjAgMjEgMTcuNUMyMSAxNC41IDE1LjUgMTQuNSAxMiAxNC41QzguNSAxNC41IDMgMTQuNSAzIDE3LjVDMyAyMCA0LjUgMjAuNSA0LjUgMjAuNUgxOS41WiIgZmlsbD0iI2NkY2RjZCIvPgo8L3N2Zz4K';
    const defaultPetPic = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1Ljg2NCA4LjM2Mzk1QzE1Ljg2NCA5LjQxNDMyIDE1LjAyMzMgMTAuMjU1IDE0IDEwLjI1NUMxMi45NzY3IDEwLjI1NSAxMi4xMzYgOS40MTQzMiAxMi4xMzYgOC4zNjM5NUMxMi4xMzYgNy4zMTM1OCAxMi45NzY3IDYuNDcyOSAxNCA2LjQ3MjlDMTUuMDIzMyA2LjQ3MjkgMTUuODY0IDcuMzEzNTggMTUuODY0IDguMzYzOTVaTTguMTgxNTIgMTMuOTc3NEM5LjIwNDg4IDEzLjk3NzQgMTAuMDQ1NSA5LjQxNDMyIDEwLjA0NTUgMTIuMDg2M0MxMC4wNDU1IDExLjAzNiA5LjIwNDg4IDEwLjE5NTMgOC4xODE1MiAxMC4xOTUzQzcuMTU4MTYgMTAuMTOTUzIDYuMzE3NDkgMTEuMDM2IDYuMzE3NDkgMTIuMDg2M0M2LjMxNzQ5IDEzLjEzNjcgNy4xNTgxNiAxMy45Nzc0IDguMTgxNTIgMTMuOTc3NFoiIGZpbGw9IiM4RDVCNEMiLz4KPHBhdGggZD0iTTEwLjA0NTUgMTAuMjU1QzExLjA2ODggMTAuMjU1IDExLjkwOTUgOS40MTQzMiAxMS45MDk1IDguMzYzOTVDMTEuOTA5NSA3LjMxMzU4IDExLjA2ODggNi44NzI5IDEwLjA0NTUgNi40NzI5QzkuMDIyMTkgNi44NzI5IDguMTgxNTIgNy4zMTM1OCA4LjE4MTUyIDguMzYzOTVDOC4xODE1MiA5LjQxNDMyIDkuMDIyMTkgMTAuMjU1IDEwLjA0NTUgMTAuMjU1WiIgZmlsbD0iIzVEQUVDMyIvPgo8cGF0aCBkPSJNMTUuODY0IDEzLjk3NzRDMTYuODg3NCAxMy45Nzc0IDE3LjcyOCAxMy4xMzY3IDE3LjcyOCAxMi4wODYzQzE3LjcyOCAxMS4wMzYgMTYuODg3NCAxMC4xOTUzIDE1Ljg2NCAxMC4xOTUzQzE4LjQ4MDYgMTAuMTOTUzIDE0IDExLjAzNiAxNCAxMi4wODYzQzE0IDEzLjEzNjcgMTQuODQwNiAxMy45Nzc0IDE1Ljg2NCAxMy45Nzc0WiIgZmlsbD0iIzVEQUVDMyIvPgo8cGF0aCBkPSJNMTIgMThDMTQuMzUyMyAxOCAxNi4yNzI3IDE2LjIxNjIgMTYuMjcyNyAxNC4wNDU1QzE2LjI3MjcgMTEuODc0NyAxNC4zNTIzIDEwLjA5MDkgMTIgMTAuMDkwOUM5LjY4NzcyIDEwLjA5MDkgNy43MjcyNyAxMS44NzQ3IDcuNzI3MjcgMTQuMDQ1NUM3LjcyNzI3IDE2LjIxNjIgOS42NDc3MiAxOCAxMiAxOFoiIGZpbGw9IiM4RDVCNEMiLz4KPC9zdmc+Cg==';
    let allUsers = [];
    let allPets = [];
    let currentUser = null;
    let currentPage = 1;
    let currentFilter = 'all';
    const publicationsPerPage = 6;
    // --- API HELPER ---
    const apiCall = async (action, payload) => {
        // Aquí puedes añadir un spinner de carga
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action, payload }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Apps Script web apps a menudo funcionan mejor con text/plain
            },
        });
        if (!response.ok) { // handle HTTP errors
            throw new Error(`Error de red: ${response.statusText}`);
        }
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || 'Error desconocido en la API');
        }
        // Aquí puedes quitar el spinner de carga
        return result.data;
    };
    // --- FUNCIÓN PARA GUARDAR ESTADO ---
    const saveCurrentUserState = async () => {
        if (!currentUser)
            return null;
        try {
            return await apiCall('saveUserData', currentUser);
        }
        catch (error) {
            console.error('Failed to save user state:', error);
            alert(`Error al guardar estado: ${error.message}`);
            return null;
        }
    };
    // --- VIEWS ---
    const splashScreen = document.getElementById('splash-screen');
    const mainView = document.getElementById('main-view');
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const profileView = document.getElementById('profile-view');
    const editProfileView = document.getElementById('edit-profile-view');
    const registerPetView = document.getElementById('register-pet-view');
    const editPetView = document.getElementById('edit-pet-view');
    const publicationsView = document.getElementById('publications-view');
    const qrScannerView = document.getElementById('qr-scanner-view');
    const views = [mainView, loginView, registerView, profileView, editProfileView, registerPetView, editPetView, publicationsView].filter(v => v !== null);
    let currentView = null;
    // --- BUTTONS ---
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const registerFromLoginButton = document.getElementById('register-from-login');
    const backToMainButton = document.getElementById('back-to-main');
    const backToMainFromRegisterButton = document.getElementById('back-to-main-from-register');
    const loginFromRegisterButton = document.getElementById('login-from-register');
    const logoutButton = document.getElementById('logout-button');
    const editProfileButton = document.getElementById('edit-profile-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    const registerPetButton = document.getElementById('register-pet-button');
    const cancelRegisterPetButton = document.getElementById('cancel-register-pet-button');
    const cancelEditPetButton = document.getElementById('cancel-edit-pet-button');
    const publicationsButton = document.getElementById('publications-button');
    const backToProfileFromPublications = document.getElementById('back-to-profile-from-publications');
    const scanQrButton = document.getElementById('scan-qr-button');
    const cancelScanBtn = document.getElementById('cancel-scan-btn');
    // --- USER FORM ELEMENTS ---
    const loginForm = document.getElementById('login-form');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');
    const loginPasswordError = document.getElementById('login-password-error');
    const loginSubmitButton = loginForm === null || loginForm === void 0 ? void 0 : loginForm.querySelector('button[type="submit"]');
    const registerForm = document.getElementById('register-form');
    const profilePicInput = document.getElementById('reg-profile-pic');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const regFullnameInput = document.getElementById('reg-fullname');
    const regUsernameInput = document.getElementById('reg-username');
    const regPasswordInput = document.getElementById('reg-password');
    const regPhoneInput = document.getElementById('reg-phone');
    const regEmailInput = document.getElementById('reg-email');
    const regAddressInput = document.getElementById('reg-address');
    const regPasswordError = document.getElementById('register-password-error');
    const registerSubmitButton = document.getElementById('submit-register');
    const editProfileForm = document.getElementById('edit-profile-form');
    const editProfilePicInput = document.getElementById('edit-profile-pic');
    const editProfilePicPreview = document.getElementById('edit-profile-pic-preview');
    const editFullnameInput = document.getElementById('edit-fullname');
    const editUsernameInput = document.getElementById('edit-username');
    const editPasswordInput = document.getElementById('edit-password');
    const editPhoneInput = document.getElementById('edit-phone');
    const editEmailInput = document.getElementById('edit-email');
    const editAddressInput = document.getElementById('edit-address');
    // --- PET FORM ELEMENTS ---
    const registerPetForm = document.getElementById('register-pet-form');
    const registerPetPicInput = document.getElementById('register-pet-pic');
    const registerPetPicPreview = document.getElementById('register-pet-pic-preview');
    const registerPetNameInput = document.getElementById('register-pet-name');
    const registerPetBreedInput = document.getElementById('register-pet-breed');
    const registerPetAgeInput = document.getElementById('register-pet-age');
    const registerPetStatusInput = document.getElementById('register-pet-status');
    const registerPetDescriptionInput = document.getElementById('register-pet-description');
    const editPetForm = document.getElementById('edit-pet-form');
    const editPetIdInput = document.getElementById('edit-pet-id');
    const editPetPicInput = document.getElementById('edit-pet-pic');
    const editPetPicPreview = document.getElementById('edit-pet-pic-preview');
    const editPetNameInput = document.getElementById('edit-pet-name');
    const editPetBreedInput = document.getElementById('edit-pet-breed');
    const editPetAgeInput = document.getElementById('edit-pet-age');
    const editPetStatusInput = document.getElementById('edit-pet-status');
    const editPetDescriptionInput = document.getElementById('edit-pet-description');
    const editPetOwnerName = document.getElementById('edit-pet-owner-name');
    const editPetOwnerPhone = document.getElementById('edit-pet-owner-phone');
    // --- PROFILE ELEMENTS ---
    const profileCardPic = document.getElementById('profile-card-pic');
    const profileCardName = document.getElementById('profile-card-name');
    const profileCardUsername = document.getElementById('profile-card-username');
    const profileCardPhone = document.getElementById('profile-card-phone');
    const profileCardEmail = document.getElementById('profile-card-email');
    const profileCardAddress = document.getElementById('profile-card-address');
    const petsListContainer = document.getElementById('pets-list-container');
    // --- PUBLICATIONS ELEMENTS ---
    const publicationsContainer = document.getElementById('publications-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const paginationControls = document.getElementById('pagination-controls');
    const filterControls = document.getElementById('filter-controls');
    // --- QR MODAL ELEMENTS ---
    const qrCodeModal = document.getElementById('qr-code-modal');
    const qrModalCloseBtn = document.getElementById('qr-modal-close-btn');
    const qrModalTitle = document.getElementById('qr-modal-title');
    const qrModalImage = document.getElementById('qr-modal-image');
    const qrDownloadBtn = document.getElementById('qr-download-btn');
    // --- QR SCANNER ELEMENTS ---
    const qrVideo = document.getElementById('qr-video');
    const qrCanvas = document.getElementById('qr-canvas');
    const scannedInfoModal = document.getElementById('scanned-info-modal');
    const scannedInfoCloseBtn = document.getElementById('scanned-info-close-btn');
    const scannedPetName = document.getElementById('scanned-pet-name');
    const scannedOwnerName = document.getElementById('scanned-owner-name');
    const scannedOwnerPhone = document.getElementById('scanned-owner-phone');
    const callOwnerBtn = document.getElementById('call-owner-btn');
    let videoStream = null;
    let animationFrameId = null;
    // --- CONFIRMATION MODAL ELEMENTS ---
    const deleteConfirmModal = document.getElementById('delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    // --- USER PROFILE MODAL ELEMENTS ---
    const userProfileModal = document.getElementById('user-profile-modal');
    const userProfileModalCloseBtn = document.getElementById('user-profile-modal-close-btn');
    const userProfileModalPic = document.getElementById('user-profile-modal-pic');
    const userProfileModalName = document.getElementById('user-profile-modal-name');
    const userProfileModalUsername = document.getElementById('user-profile-modal-username');
    const userProfileModalPhone = document.getElementById('user-profile-modal-phone');
    const userProfileModalEmail = document.getElementById('user-profile-modal-email');
    const userProfileModalAddress = document.getElementById('user-profile-modal-address');
    const userProfileModalCallBtn = document.getElementById('user-profile-modal-call-btn');
    // --- VIEW NAVIGATION ---
    const navigateTo = (targetView) => {
        if (!targetView || targetView === currentView)
            return;
        const transitionOut = () => {
            currentView === null || currentView === void 0 ? void 0 : currentView.classList.add('hidden');
            targetView.classList.remove('hidden');
            setTimeout(() => targetView.classList.add('fade-in'), 20);
            currentView = targetView;
        };
        if (currentView) {
            currentView.classList.remove('fade-in');
            setTimeout(transitionOut, 300);
        }
        else {
            views.forEach(v => v.classList.add('hidden'));
            targetView.classList.remove('hidden');
            setTimeout(() => targetView.classList.add('fade-in'), 20);
            currentView = targetView;
        }
    };
    // --- DATA HANDLING ---
    const populateProfileCard = (user) => {
        if (!user)
            return;
        if (profileCardPic)
            profileCardPic.src = user.profilePic;
        if (profileCardName)
            profileCardName.textContent = user.fullname;
        if (profileCardUsername)
            profileCardUsername.textContent = `@${user.username}`;
        if (profileCardPhone)
            profileCardPhone.textContent = user.phone;
        if (profileCardEmail)
            profileCardEmail.textContent = user.email;
        if (profileCardAddress)
            profileCardAddress.textContent = user.address || 'No especificada';
        renderPets();
    };
    const populateEditForm = (user) => {
        if (!user)
            return;
        if (editProfilePicPreview)
            editProfilePicPreview.src = user.profilePic;
        if (editFullnameInput)
            editFullnameInput.value = user.fullname;
        if (editUsernameInput)
            editUsernameInput.value = user.username;
        if (editPhoneInput)
            editPhoneInput.value = user.phone;
        if (editEmailInput)
            editEmailInput.value = user.email;
        if (editAddressInput)
            editAddressInput.value = user.address;
        if (editPasswordInput)
            editPasswordInput.value = '';
    };
    const resetAllForms = () => {
        if (loginForm) {
            loginForm.reset();
            if (loginSubmitButton)
                loginSubmitButton.disabled = true;
            if (loginPasswordError)
                loginPasswordError.textContent = '';
        }
        if (registerForm) {
            registerForm.reset();
            if (registerSubmitButton)
                registerSubmitButton.disabled = true;
            if (regPasswordError)
                regPasswordError.textContent = '';
        }
        if (editProfileForm)
            editProfileForm.reset();
        if (registerPetForm)
            registerPetForm.reset();
        if (editPetForm)
            editPetForm.reset();
        if (profilePicPreview)
            profilePicPreview.src = defaultUserPic;
        if (registerPetPicPreview)
            registerPetPicPreview.src = defaultPetPic;
    };
    // --- RENDER PETS ---
    const renderPets = () => {
        if (!petsListContainer || !currentUser)
            return;
        petsListContainer.innerHTML = ''; // Clear existing pets
        const userPets = allPets.filter(p => p.ownerId === currentUser.id);
        userPets.forEach((pet) => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.dataset.petId = pet.id.toString();
            const statusClass = `status-${pet.status.toLowerCase().replace(' ', '-')}`;
            let publicationAction = '';
            const isPublishable = ['Perdido', 'En adopción', 'Encontrado'].includes(pet.status);
            if (isPublishable) {
                if (pet.isPublished) {
                    publicationAction = `<div class="publication-status-badge published">✓ Publicado</div>`;
                }
                else {
                    publicationAction = `
                <button class="pet-action-btn publish-pet-btn" aria-label="Publicar Mascota">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="#337AB7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
              `;
                }
            }
            petCard.innerHTML = `
        <img src="${pet.photo}" alt="${pet.name}" class="pet-card-photo">
        <div class="pet-card-info">
          <span class="pet-status-badge ${statusClass}">${pet.status}</span>
          <div class="pet-card-header">
            <h3>${pet.name}</h3>
            <p class="pet-breed">${pet.breed}</p>
          </div>
          <p class="pet-card-description">${pet.description}</p>
        </div>
        <div class="pet-card-actions">
          ${publicationAction}
          <button class="pet-action-btn qr-pet-btn" aria-label="Mostrar Código QR">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 11H11V3H3V11ZM5 5H9V9H5V5Z" fill="#6C757D"/>
                  <path d="M3 21H11V13H3V21ZM5 15H9V19H5V15Z" fill="#6C757D"/>
                  <path d="M13 3V11H21V3H13ZM19 9H15V5H19V9Z" fill="#6C757D"/>
                  <path d="M13 13H15V15H13V13Z" fill="#6C757D"/><path d="M15 15H17V17H15V15Z" fill="#6C757D"/>
                  <path d="M17 17H19V19H17V17Z" fill="#6C757D"/><path d="M19 19H21V21H19V19Z" fill="#6C757D"/>
                  <path d="M19 13H21V15H19V13Z" fill="#6C757D"/><path d="M17 13H19V15H17V13Z" fill="#6C757D"/>
                  <path d="M15 17H17V19H15V17Z" fill="#6C757D"/><path d="M13 19H15V21H13V19Z" fill="#6C757D"/>
              </svg>
          </button>
          <button class="pet-action-btn edit-pet-btn" aria-label="Editar Mascota">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#8D5B4C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
          <button class="pet-action-btn delete-pet-btn" aria-label="Eliminar Mascota">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#D9534F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
        </div>
      `;
            petsListContainer.appendChild(petCard);
        });
    };
    // --- RENDER PAGINATION CONTROLS ---
    const renderPaginationControls = (totalItems, page) => {
        if (!paginationControls)
            return;
        paginationControls.innerHTML = '';
        const totalPages = Math.ceil(totalItems / publicationsPerPage);
        if (totalPages <= 1)
            return;
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.className = 'btn pagination-btn';
        prevButton.id = 'prev-page-btn';
        if (page === 1) {
            prevButton.disabled = true;
        }
        const pageInfo = document.createElement('span');
        pageInfo.className = 'page-info';
        pageInfo.textContent = `Página ${page} de ${totalPages}`;
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.className = 'btn pagination-btn';
        nextButton.id = 'next-page-btn';
        if (page === totalPages) {
            nextButton.disabled = true;
        }
        paginationControls.appendChild(prevButton);
        paginationControls.appendChild(pageInfo);
        paginationControls.appendChild(nextButton);
    };
    // --- RENDER PUBLICATIONS ---
    const renderPublications = (searchTerm = '', page = 1) => {
        if (!publicationsContainer)
            return;
        publicationsContainer.innerHTML = 'Cargando publicaciones...';
        const normalizedSearch = searchTerm.toLowerCase().trim();
        // 1. Get all publishable pets
        const allPublishablePets = allPets.filter(pet => ['Perdido', 'En adopción', 'Encontrado', 'Adoptado'].includes(pet.status) && pet.isPublished);
        // 2. Filter by status or ownership
        const statusFilteredPets = (() => {
            if (currentFilter === 'mine') {
                return currentUser ? allPublishablePets.filter(pet => pet.ownerId === currentUser.id) : [];
            }
            if (currentFilter === 'all') {
                return allPublishablePets;
            }
            return allPublishablePets.filter(pet => pet.status === currentFilter);
        })();
        // 3. Filter by search term
        const finalFilteredPets = statusFilteredPets.filter((pet) => {
            const owner = allUsers.find(u => u.id === pet.ownerId);
            return normalizedSearch === '' ||
                pet.name.toLowerCase().includes(normalizedSearch) ||
                (owner && owner.username.toLowerCase().includes(normalizedSearch));
        });
        // 4. Paginate the results
        const startIndex = (page - 1) * publicationsPerPage;
        const paginatedPets = finalFilteredPets.slice(startIndex, startIndex + publicationsPerPage);
        // 5. Render pets for the current page
        publicationsContainer.innerHTML = ''; // Clear loading message
        if (paginatedPets.length === 0) {
            publicationsContainer.innerHTML = '<p>No se encontraron publicaciones con estos criterios.</p>';
        }
        paginatedPets.forEach((pet) => {
            const user = allUsers.find(u => u.id === pet.ownerId);
            if (!user)
                return; // Skip if owner not found
            const pubCard = document.createElement('div');
            pubCard.className = 'publication-card';
            pubCard.dataset.petId = pet.id.toString();
            pubCard.dataset.ownerId = user.id.toString();
            const statusClass = `status-${pet.status.toLowerCase().replace(' ', '-')}`;
            const commentsHtml = pet.comments.map(comment => `
        <li class="comment-item">
          <img src="${comment.userProfilePic}" alt="${comment.username}" class="commenter-pic">
          <div class="comment-content">
            <strong>${comment.username}</strong>
            <p>${comment.text}</p>
          </div>
        </li>
      `).join('');
            let deleteButtonHtml = '';
            if (currentUser && currentUser.id === user.id) {
                deleteButtonHtml = `
          <button class="pet-action-btn delete-pet-btn" aria-label="Eliminar Mascota y Publicación">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#D9534F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
        `;
            }
            const publicationDate = pet.publicationDate ? new Date(pet.publicationDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
            pubCard.innerHTML = `
          <div class="owner-info">
              <img src="${user.profilePic}" alt="${user.fullname}">
              <div class="owner-details">
                  <p>${user.fullname} (@${user.username})</p>
                  <p class="publication-meta">📞 ${user.phone} ${publicationDate ? `&bull; Publicado: ${publicationDate}` : ''}</p>
              </div>
              ${deleteButtonHtml}
          </div>
          <img src="${pet.photo}" alt="${pet.name}" class="pet-card-photo">
          <div class="pet-card-info">
              <span class="pet-status-badge ${statusClass}">${pet.status}</span>
              <h3>${pet.name}</h3>
              <p>${pet.breed} - ${pet.age}</p>
              <p class="pet-card-description">${pet.description}</p>
          </div>
          <div class="comments-section">
              <ul class="comments-list">${commentsHtml}</ul>
              <form class="comment-form">
                  <input type="text" name="commentText" placeholder="Añade un comentario..." required autocomplete="off">
                  <button type="submit" aria-label="Enviar comentario">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </button>
              </form>
          </div>
      `;
            publicationsContainer.appendChild(pubCard);
        });
        // 6. Render pagination controls
        renderPaginationControls(finalFilteredPets.length, page);
    };
    // --- PET DELETION ---
    const deletePet = async (petId, ownerId) => {
        if (!currentUser || currentUser.id !== ownerId) {
            alert('No tienes permiso para eliminar esta mascota.');
            return;
        }
        try {
            await apiCall('deletePet', { id: petId });
            // Actualizar el estado local
            allPets = allPets.filter(p => p.id !== petId);
            renderPets();
            renderPublications(searchInput.value, currentPage);
        }
        catch (error) {
            alert(`Error al eliminar la mascota: ${error.message}`);
        }
    };
    // --- QR SCANNER LOGIC ---
    const stopScanner = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
        }
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        if (qrScannerView)
            qrScannerView.classList.add('hidden');
        videoStream = null;
        animationFrameId = null;
    };
    const handleScannedData = (data) => {
        const lines = data.split('\n');
        if (lines.length < 3 || !data.includes('Nombre:') || !data.includes('Dueño/a:') || !data.includes('Contacto:')) {
            alert('Código QR no válido para esta aplicación.');
            return;
        }
        try {
            const petName = lines[0].split(':')[1].trim();
            const ownerName = lines[1].split(':')[1].trim();
            const ownerPhone = lines[2].split(':')[1].trim();
            if (scannedPetName)
                scannedPetName.textContent = petName;
            if (scannedOwnerName)
                scannedOwnerName.textContent = ownerName;
            if (scannedOwnerPhone)
                scannedOwnerPhone.textContent = ownerPhone;
            if (callOwnerBtn)
                callOwnerBtn.href = `tel:${ownerPhone.replace(/\s+/g, '')}`;
            scannedInfoModal === null || scannedInfoModal === void 0 ? void 0 : scannedInfoModal.classList.remove('hidden');
        }
        catch (e) {
            alert('Formato de código QR incorrecto.');
        }
    };
    const scanFrame = () => {
        if (qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA) {
            const qrCanvasContext = qrCanvas.getContext('2d');
            if (qrCanvasContext) {
                qrCanvas.height = qrVideo.videoHeight;
                qrCanvas.width = qrVideo.videoWidth;
                qrCanvasContext.drawImage(qrVideo, 0, 0, qrCanvas.width, qrCanvas.height);
                const imageData = qrCanvasContext.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                if (code) {
                    stopScanner();
                    handleScannedData(code.data);
                    return;
                }
            }
        }
        animationFrameId = requestAnimationFrame(scanFrame);
    };
    const startScanner = async () => {
        if (!qrScannerView || !qrVideo)
            return;
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            qrVideo.srcObject = videoStream;
            qrVideo.setAttribute("playsinline", "true");
            qrVideo.play();
            qrScannerView.classList.remove('hidden');
            animationFrameId = requestAnimationFrame(scanFrame);
        }
        catch (error) {
            // Fix: Renamed catch variable from 'err' to 'error' to resolve "Cannot find name" issue and improve clarity.
            console.error("Error accessing camera: ", error);
            alert("No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios en tu navegador.");
        }
    };
    // --- FORM VALIDATION ---
    const validateLoginForm = () => {
        if (!loginUsernameInput || !loginPasswordInput || !loginSubmitButton || !loginPasswordError)
            return;
        const isUsernameValid = loginUsernameInput.value.trim() !== '';
        const password = loginPasswordInput.value;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        if (password.length > 0 && (!hasLetter || !hasNumber)) {
            if (!hasLetter) {
                loginPasswordError.textContent = 'Debe incluir al menos una letra.';
            }
            else { // !hasNumber
                loginPasswordError.textContent = 'Debe incluir al menos un número.';
            }
        }
        else {
            loginPasswordError.textContent = ''; // Clear error message
        }
        loginSubmitButton.disabled = !(isUsernameValid && hasLetter && hasNumber);
    };
    const validateRegisterForm = () => {
        if (!regFullnameInput || !regUsernameInput || !regPasswordInput || !regPhoneInput || !regEmailInput || !registerSubmitButton || !regPasswordError)
            return;
        const areFieldsFilled = regFullnameInput.value.trim() !== '' &&
            regUsernameInput.value.trim() !== '' &&
            regPhoneInput.value.trim() !== '' &&
            regEmailInput.value.trim() !== '';
        const password = regPasswordInput.value;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const isPasswordValid = hasLetter && hasNumber;
        if (password.length > 0 && !isPasswordValid) {
            if (!hasLetter) {
                regPasswordError.textContent = 'Debe incluir al menos una letra.';
            }
            else {
                regPasswordError.textContent = 'Debe incluir al menos un número.';
            }
        }
        else {
            regPasswordError.textContent = '';
        }
        registerSubmitButton.disabled = !(areFieldsFilled && isPasswordValid);
    };
    loginUsernameInput === null || loginUsernameInput === void 0 ? void 0 : loginUsernameInput.addEventListener('input', validateLoginForm);
    loginPasswordInput === null || loginPasswordInput === void 0 ? void 0 : loginPasswordInput.addEventListener('input', validateLoginForm);
    [regFullnameInput, regUsernameInput, regPasswordInput, regPhoneInput, regEmailInput].forEach(input => {
        input === null || input === void 0 ? void 0 : input.addEventListener('input', validateRegisterForm);
    });
    // --- EVENT LISTENERS ---
    loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener('click', () => navigateTo(loginView));
    registerButton === null || registerButton === void 0 ? void 0 : registerButton.addEventListener('click', () => navigateTo(registerView));
    registerFromLoginButton === null || registerFromLoginButton === void 0 ? void 0 : registerFromLoginButton.addEventListener('click', () => navigateTo(registerView));
    loginFromRegisterButton === null || loginFromRegisterButton === void 0 ? void 0 : loginFromRegisterButton.addEventListener('click', () => navigateTo(loginView));
    backToMainButton === null || backToMainButton === void 0 ? void 0 : backToMainButton.addEventListener('click', () => navigateTo(mainView));
    backToMainFromRegisterButton === null || backToMainFromRegisterButton === void 0 ? void 0 : backToMainFromRegisterButton.addEventListener('click', () => navigateTo(mainView));
    logoutButton === null || logoutButton === void 0 ? void 0 : logoutButton.addEventListener('click', () => {
        currentUser = null;
        allUsers = [];
        allPets = [];
        resetAllForms();
        navigateTo(mainView);
    });
    editProfileButton === null || editProfileButton === void 0 ? void 0 : editProfileButton.addEventListener('click', () => {
        populateEditForm(currentUser);
        navigateTo(editProfileView);
    });
    cancelEditButton === null || cancelEditButton === void 0 ? void 0 : cancelEditButton.addEventListener('click', () => navigateTo(profileView));
    registerPetButton === null || registerPetButton === void 0 ? void 0 : registerPetButton.addEventListener('click', () => {
        if (registerPetForm)
            registerPetForm.reset();
        if (registerPetPicPreview)
            registerPetPicPreview.src = defaultPetPic;
        navigateTo(registerPetView);
    });
    cancelRegisterPetButton === null || cancelRegisterPetButton === void 0 ? void 0 : cancelRegisterPetButton.addEventListener('click', () => navigateTo(profileView));
    cancelEditPetButton === null || cancelEditPetButton === void 0 ? void 0 : cancelEditPetButton.addEventListener('click', () => navigateTo(profileView));
    publicationsButton === null || publicationsButton === void 0 ? void 0 : publicationsButton.addEventListener('click', async () => {
        currentPage = 1;
        currentFilter = 'all';
        searchInput.value = '';
        filterControls === null || filterControls === void 0 ? void 0 : filterControls.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === 'all');
        });
        try {
            // Cargar todos los datos públicos desde la API
            const publicData = await apiCall('getPublicData', {});
            // Sanitize user data to ensure phone is always a string
            allUsers = publicData.users.map((u) => (Object.assign(Object.assign({}, u), { phone: String(u.phone) })));
            allPets = publicData.pets;
            renderPublications('', currentPage);
        }
        catch (error) {
            alert(`No se pudo cargar la información de la comunidad: ${error.message}`);
            publicationsContainer.innerHTML = '<p>No se pudo cargar la información de la comunidad. Intenta de nuevo más tarde.</p>';
        }
        finally {
            navigateTo(publicationsView);
        }
    });
    backToProfileFromPublications === null || backToProfileFromPublications === void 0 ? void 0 : backToProfileFromPublications.addEventListener('click', () => navigateTo(profileView));
    // Picture preview handlers with image resizing
    const handleImageUpload = (input, preview, maxWidth, maxHeight) => {
        var _a;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            const result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (typeof result !== 'string')
                return;
            const img = new Image();
            img.src = result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    preview.src = result; // Fallback to original if canvas fails
                    return;
                }
                let { width, height } = img;
                // Calculate aspect-ratio preserved dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                }
                else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                // Use JPEG for better compression of photos, with a quality setting.
                preview.src = canvas.toDataURL('image/jpeg', 0.85);
            };
            img.onerror = () => {
                console.error("Failed to load image for resizing.");
            };
        };
        reader.onerror = () => {
            console.error("Failed to read the file.");
        };
        reader.readAsDataURL(file);
    };
    const resetFileInputOnClick = (input) => {
        if (!input)
            return;
        input.addEventListener('click', (e) => {
            // Reset the value to allow re-selecting the same file, triggering the 'change' event.
            e.target.value = '';
        });
    };
    resetFileInputOnClick(profilePicInput);
    resetFileInputOnClick(editProfilePicInput);
    resetFileInputOnClick(registerPetPicInput);
    resetFileInputOnClick(editPetPicInput);
    const USER_PIC_MAX_DIMENSION = 512;
    const PET_PIC_MAX_DIMENSION = 800;
    profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.addEventListener('change', () => handleImageUpload(profilePicInput, profilePicPreview, USER_PIC_MAX_DIMENSION, USER_PIC_MAX_DIMENSION));
    editProfilePicInput === null || editProfilePicInput === void 0 ? void 0 : editProfilePicInput.addEventListener('change', () => handleImageUpload(editProfilePicInput, editProfilePicPreview, USER_PIC_MAX_DIMENSION, USER_PIC_MAX_DIMENSION));
    registerPetPicInput === null || registerPetPicInput === void 0 ? void 0 : registerPetPicInput.addEventListener('change', () => handleImageUpload(registerPetPicInput, registerPetPicPreview, PET_PIC_MAX_DIMENSION, PET_PIC_MAX_DIMENSION));
    editPetPicInput === null || editPetPicInput === void 0 ? void 0 : editPetPicInput.addEventListener('change', () => handleImageUpload(editPetPicInput, editPetPicPreview, PET_PIC_MAX_DIMENSION, PET_PIC_MAX_DIMENSION));
    // Handle registration form submission
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newUserPayload = {
            id: Date.now(),
            fullname: regFullnameInput.value.trim(),
            username: regUsernameInput.value.trim().toLowerCase(),
            password: regPasswordInput.value.trim(),
            phone: regPhoneInput.value.trim(),
            email: regEmailInput.value.trim(),
            address: regAddressInput.value.trim(),
            profilePic: profilePicPreview.src
        };
        try {
            const registeredUser = await apiCall('register', newUserPayload);
            await apiCall('logEvent', {
                type: 'USER_REGISTRATION',
                timestamp: new Date().toISOString(),
                details: `User '${registeredUser.username}' (ID: ${registeredUser.id}) registered.`
            });
            // Sanitize the new user's phone number
            registeredUser.phone = String(registeredUser.phone);
            currentUser = Object.assign(Object.assign({}, registeredUser), { pets: [] });
            populateProfileCard(currentUser);
            resetAllForms();
            navigateTo(profileView);
        }
        catch (error) {
            alert(`Error en el registro: ${error.message}`);
        }
    });
    // Handle login form submission
    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (loginSubmitButton) {
            loginSubmitButton.textContent = 'Verificando...';
            loginSubmitButton.disabled = true;
        }
        if (loginError)
            loginError.classList.add('hidden');
        setTimeout(async () => {
            try {
                // Convert username to lowercase to prevent case-sensitivity issues on the backend.
                const credentials = {
                    username: loginUsernameInput.value.trim().toLowerCase(),
                    password: loginPasswordInput.value.trim(),
                };
                console.log(`Intentando iniciar sesión con el usuario: "${credentials.username}"`);
                const user = await apiCall('login', credentials);
                // Sanitize the logged-in user's phone number
                user.phone = String(user.phone);
                currentUser = user;
                try {
                    // After successful login, fetch all public data to have the full app state.
                    const publicData = await apiCall('getPublicData', {});
                    // Sanitize user data to ensure phone is always a string
                    allUsers = publicData.users.map((u) => (Object.assign(Object.assign({}, u), { phone: String(u.phone) })));
                    allPets = publicData.pets;
                }
                catch (dataError) {
                    alert('Inicio de sesión correcto, pero no se pudo cargar la información de la comunidad.');
                    allUsers = [currentUser]; // At least add the current user to the list
                    allPets = [];
                }
                populateProfileCard(currentUser);
                navigateTo(profileView);
                loginForm.reset();
            }
            catch (error) {
                const apiErrorMessage = error.message || 'Usuario o contraseña incorrectos.';
                console.error('Login attempt failed:', error);
                if (loginError) {
                    let displayMessage = `Error: ${apiErrorMessage}`;
                    if (apiErrorMessage.includes('Usuario o contraseña incorrectos')) {
                        displayMessage = 'Usuario o contraseña incorrectos. Por favor, verifica tus datos. Nota: El nombre de usuario no distingue mayúsculas de minúsculas.';
                    }
                    loginError.textContent = displayMessage;
                    loginError.classList.remove('hidden');
                }
                else {
                    alert(`Error: ${apiErrorMessage}`);
                }
                loginPasswordInput.value = '';
            }
            finally {
                if (loginSubmitButton) {
                    loginSubmitButton.textContent = 'Ingresar';
                    validateLoginForm();
                }
            }
        }, 2000); // 2-second delay
    });
    // Handle Edit Profile form submission
    editProfileForm === null || editProfileForm === void 0 ? void 0 : editProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser)
            return;
        // This object contains the data that will be used to update the local state.
        const updatedLocalData = {
            fullname: editFullnameInput.value,
            username: editUsernameInput.value.trim().toLowerCase(),
            phone: editPhoneInput.value,
            email: editEmailInput.value,
            address: editAddressInput.value,
            profilePic: editProfilePicPreview.src,
        };
        // This object is what we send to the backend. It includes the ID and optional new password.
        const apiPayload = Object.assign(Object.assign({ id: currentUser.id }, updatedLocalData), { password: editPasswordInput.value.trim() || undefined });
        try {
            // Send the update to the server. We don't need to use the return value
            // because we are performing an optimistic UI update.
            await apiCall('saveUserData', apiPayload);
            // --- 1. Update the main currentUser state object ---
            currentUser = Object.assign(Object.assign({}, currentUser), updatedLocalData);
            // --- 2. Update the user's record in the allUsers array for consistency ---
            const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                // We merge with the existing user object in the array to preserve any other properties
                allUsers[userIndex] = Object.assign(Object.assign({}, allUsers[userIndex]), updatedLocalData);
            }
            // --- 3. Refresh the UI with the new data and navigate back ---
            populateProfileCard(currentUser);
            navigateTo(profileView);
        }
        catch (error) {
            alert(`Hubo un error al guardar los cambios: ${error.message}`);
        }
    });
    // --- PET MANAGEMENT EVENTS ---
    registerPetForm === null || registerPetForm === void 0 ? void 0 : registerPetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser)
            return;
        const petName = registerPetNameInput.value;
        const qrData = `Nombre: ${petName}\nDueño/a: ${currentUser.fullname}\nContacto: ${currentUser.phone}`;
        const newPetPayload = {
            id: Date.now(),
            ownerId: currentUser.id,
            name: petName,
            breed: registerPetBreedInput.value,
            age: registerPetAgeInput.value,
            photo: registerPetPicPreview.src,
            status: registerPetStatusInput.value,
            description: registerPetDescriptionInput.value,
            isPublished: false,
            publicationDate: null,
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`,
        };
        try {
            const addedPet = await apiCall('addPet', newPetPayload);
            allPets.push(Object.assign(Object.assign({}, addedPet), { comments: [] })); // Añadir al estado local
            await apiCall('logEvent', {
                type: 'PET_REGISTRATION',
                timestamp: new Date().toISOString(),
                details: `Pet '${addedPet.name}' (ID: ${addedPet.id}) was registered by user '${currentUser.username}' (ID: ${currentUser.id}).`
            });
            renderPets();
            navigateTo(profileView);
        }
        catch (error) {
            alert(`Error al registrar la mascota: ${error.message}`);
        }
    });
    editPetForm === null || editPetForm === void 0 ? void 0 : editPetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser)
            return;
        const petId = parseInt(editPetIdInput.value, 10);
        const petIndex = allPets.findIndex((p) => p.id === petId);
        if (petIndex > -1) {
            const oldPet = allPets[petIndex];
            const newStatus = editPetStatusInput.value;
            const newName = editPetNameInput.value;
            const isNoLongerPublishable = !['Perdido', 'En adopción', 'Encontrado', 'Adoptado'].includes(newStatus);
            let newQrCode = oldPet.qrCode;
            if (oldPet.name !== newName) {
                const qrData = `Nombre: ${newName}\nDueño/a: ${currentUser.fullname}\nContacto: ${currentUser.phone}`;
                newQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
            }
            const updatedPetPayload = Object.assign(Object.assign({}, oldPet), { name: newName, breed: editPetBreedInput.value, age: editPetAgeInput.value, photo: editPetPicPreview.src, status: newStatus, description: editPetDescriptionInput.value, isPublished: isNoLongerPublishable ? false : oldPet.isPublished, publicationDate: isNoLongerPublishable ? null : oldPet.publicationDate, qrCode: newQrCode });
            try {
                const updatedPet = await apiCall('updatePet', updatedPetPayload);
                allPets[petIndex] = Object.assign(Object.assign({}, allPets[petIndex]), updatedPet);
                renderPets();
                navigateTo(profileView);
            }
            catch (error) {
                alert(`Error al actualizar la mascota: ${error.message}`);
            }
        }
    });
    petsListContainer === null || petsListContainer === void 0 ? void 0 : petsListContainer.addEventListener('click', async (e) => {
        const target = e.target;
        const editButton = target.closest('.edit-pet-btn');
        const publishButton = target.closest('.publish-pet-btn');
        const deleteButton = target.closest('.delete-pet-btn');
        const qrButton = target.closest('.qr-pet-btn');
        const petCard = target.closest('.pet-card');
        if (!petCard || !currentUser)
            return;
        const petId = parseInt(petCard.dataset.petId || '0', 10);
        const pet = allPets.find((p) => p.id === petId);
        if (editButton && pet) {
            editPetIdInput.value = pet.id.toString();
            editPetPicPreview.src = pet.photo;
            editPetNameInput.value = pet.name;
            editPetBreedInput.value = pet.breed;
            editPetAgeInput.value = pet.age;
            editPetStatusInput.value = pet.status;
            editPetDescriptionInput.value = pet.description;
            if (editPetOwnerName)
                editPetOwnerName.textContent = currentUser.fullname;
            if (editPetOwnerPhone)
                editPetOwnerPhone.textContent = currentUser.phone;
            navigateTo(editPetView);
        }
        if (publishButton && pet) {
            const updatedPetPayload = Object.assign(Object.assign({}, pet), { isPublished: true, publicationDate: Date.now() });
            try {
                const updatedPet = await apiCall('updatePet', updatedPetPayload);
                pet.isPublished = true;
                pet.publicationDate = updatedPet.publicationDate;
                renderPets();
            }
            catch (error) {
                alert(`Error al publicar la mascota: ${error.message}`);
            }
        }
        if (deleteButton && pet) {
            if (deleteConfirmModal) {
                deleteConfirmModal.dataset.petId = pet.id.toString();
                deleteConfirmModal.dataset.ownerId = currentUser.id.toString();
                deleteConfirmModal.classList.remove('hidden');
            }
        }
        if (qrButton && pet && pet.qrCode) {
            if (qrModalTitle)
                qrModalTitle.textContent = `Código QR de ${pet.name}`;
            if (qrModalImage)
                qrModalImage.src = pet.qrCode;
            if (qrDownloadBtn) {
                qrDownloadBtn.href = pet.qrCode;
                qrDownloadBtn.download = `QR_${pet.name.replace(/\s+/g, '_')}.png`;
            }
            qrCodeModal === null || qrCodeModal === void 0 ? void 0 : qrCodeModal.classList.remove('hidden');
        }
    });
    searchForm === null || searchForm === void 0 ? void 0 : searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentPage = 1;
        renderPublications(searchInput.value, currentPage);
    });
    filterControls === null || filterControls === void 0 ? void 0 : filterControls.addEventListener('click', (e) => {
        const target = e.target;
        if (target.matches('.filter-btn')) {
            currentFilter = target.dataset.filter || 'all';
            currentPage = 1;
            filterControls.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
            renderPublications(searchInput.value, currentPage);
        }
    });
    publicationsContainer === null || publicationsContainer === void 0 ? void 0 : publicationsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const deleteButton = target.closest('.delete-pet-btn');
        if (deleteButton) {
            const card = deleteButton.closest('.publication-card');
            if (!card)
                return;
            const petId = card.dataset.petId;
            const ownerId = card.dataset.ownerId;
            if (petId && ownerId && currentUser && currentUser.id === parseInt(ownerId, 10)) {
                if (deleteConfirmModal) {
                    deleteConfirmModal.dataset.petId = petId;
                    deleteConfirmModal.dataset.ownerId = ownerId;
                    deleteConfirmModal.classList.remove('hidden');
                }
            }
        }
        else {
            const ownerInfo = target.closest('.owner-info');
            if (ownerInfo) {
                const card = ownerInfo.closest('.publication-card');
                if (!card)
                    return;
                const ownerId = parseInt(card.dataset.ownerId || '0', 10);
                const owner = allUsers.find(u => u.id === ownerId);
                if (owner) {
                    if (userProfileModalPic)
                        userProfileModalPic.src = owner.profilePic;
                    if (userProfileModalName)
                        userProfileModalName.textContent = owner.fullname;
                    if (userProfileModalUsername)
                        userProfileModalUsername.textContent = `@${owner.username}`;
                    if (userProfileModalPhone)
                        userProfileModalPhone.textContent = owner.phone;
                    if (userProfileModalEmail)
                        userProfileModalEmail.textContent = owner.email;
                    if (userProfileModalAddress)
                        userProfileModalAddress.textContent = owner.address || 'No especificada';
                    if (userProfileModalCallBtn)
                        userProfileModalCallBtn.href = `tel:${String(owner.phone).replace(/\s+/g, '')}`;
                    userProfileModal === null || userProfileModal === void 0 ? void 0 : userProfileModal.classList.remove('hidden');
                }
            }
        }
    });
    publicationsContainer === null || publicationsContainer === void 0 ? void 0 : publicationsContainer.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form.classList.contains('comment-form'))
            return;
        const card = form.closest('.publication-card');
        const petId = parseInt(card.dataset.petId || '0', 10);
        const commentInput = form.querySelector('input[name="commentText"]');
        const text = commentInput.value.trim();
        if (text && petId && currentUser) {
            const newCommentPayload = {
                petId: petId,
                userId: currentUser.id,
                username: currentUser.username,
                userProfilePic: currentUser.profilePic,
                text: text,
                timestamp: Date.now()
            };
            try {
                const addedComment = await apiCall('addComment', newCommentPayload);
                const pet = allPets.find(p => p.id === petId);
                if (pet) {
                    pet.comments.push(addedComment);
                }
                await apiCall('logEvent', {
                    type: 'COMMENT_POSTED',
                    timestamp: new Date().toISOString(),
                    details: `User '${currentUser.username}' (ID: ${currentUser.id}) commented on pet (ID: ${petId}).`
                });
                // Re-render to show the new comment immediately
                renderPublications(searchInput.value, currentPage);
            }
            catch (error) {
                alert(`Error al enviar el comentario: ${error.message}`);
            }
        }
    });
    paginationControls === null || paginationControls === void 0 ? void 0 : paginationControls.addEventListener('click', e => {
        const target = e.target;
        if (target.id === 'prev-page-btn' && currentPage > 1) {
            currentPage--;
            renderPublications(searchInput.value, currentPage);
        }
        else if (target.id === 'next-page-btn') {
            currentPage++;
            renderPublications(searchInput.value, currentPage);
        }
    });
    // --- MODAL AND SCANNER EVENTS ---
    scanQrButton === null || scanQrButton === void 0 ? void 0 : scanQrButton.addEventListener('click', startScanner);
    cancelScanBtn === null || cancelScanBtn === void 0 ? void 0 : cancelScanBtn.addEventListener('click', stopScanner);
    qrModalCloseBtn === null || qrModalCloseBtn === void 0 ? void 0 : qrModalCloseBtn.addEventListener('click', () => {
        qrCodeModal === null || qrCodeModal === void 0 ? void 0 : qrCodeModal.classList.add('hidden');
    });
    qrCodeModal === null || qrCodeModal === void 0 ? void 0 : qrCodeModal.addEventListener('click', (e) => {
        if (e.target === qrCodeModal) {
            qrCodeModal.classList.add('hidden');
        }
    });
    scannedInfoCloseBtn === null || scannedInfoCloseBtn === void 0 ? void 0 : scannedInfoCloseBtn.addEventListener('click', () => {
        scannedInfoModal === null || scannedInfoModal === void 0 ? void 0 : scannedInfoModal.classList.add('hidden');
    });
    scannedInfoModal === null || scannedInfoModal === void 0 ? void 0 : scannedInfoModal.addEventListener('click', (e) => {
        if (e.target === scannedInfoModal) {
            scannedInfoModal.classList.add('hidden');
        }
    });
    const closeUserProfileModal = () => {
        userProfileModal === null || userProfileModal === void 0 ? void 0 : userProfileModal.classList.add('hidden');
    };
    userProfileModalCloseBtn === null || userProfileModalCloseBtn === void 0 ? void 0 : userProfileModalCloseBtn.addEventListener('click', closeUserProfileModal);
    userProfileModal === null || userProfileModal === void 0 ? void 0 : userProfileModal.addEventListener('click', (e) => {
        if (e.target === userProfileModal) {
            closeUserProfileModal();
        }
    });
    // --- CONFIRMATION MODAL EVENTS ---
    confirmDeleteBtn === null || confirmDeleteBtn === void 0 ? void 0 : confirmDeleteBtn.addEventListener('click', async () => {
        if (deleteConfirmModal) {
            const petId = parseInt(deleteConfirmModal.dataset.petId || '0', 10);
            const ownerId = parseInt(deleteConfirmModal.dataset.ownerId || '0', 10);
            if (petId && ownerId) {
                await deletePet(petId, ownerId);
            }
            deleteConfirmModal.classList.add('hidden');
            delete deleteConfirmModal.dataset.petId;
            delete deleteConfirmModal.dataset.ownerId;
        }
    });
    const closeDeleteModal = () => {
        if (deleteConfirmModal) {
            deleteConfirmModal.classList.add('hidden');
            delete deleteConfirmModal.dataset.petId;
            delete deleteConfirmModal.dataset.ownerId;
        }
    };
    cancelDeleteBtn === null || cancelDeleteBtn === void 0 ? void 0 : cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteConfirmModal === null || deleteConfirmModal === void 0 ? void 0 : deleteConfirmModal.addEventListener('click', (e) => {
        if (e.target === deleteConfirmModal) {
            closeDeleteModal();
        }
    });
    // --- INITIALIZATION ---
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            splashScreen.addEventListener('transitionend', () => {
                splashScreen.style.display = 'none';
                navigateTo(mainView);
            }, { once: true });
        }, 2000);
    }
    else {
        navigateTo(mainView);
    }
});
