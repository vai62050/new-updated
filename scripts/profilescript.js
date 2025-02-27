 // Profile dropdown functionality
 const profileBtn = document.querySelector('.profile-btn');
 const dropdownContent = document.querySelector('.dropdown-content');

 profileBtn.addEventListener('click', () => {
     dropdownContent.classList.toggle('dropdown-active');
 });

 // Close dropdown when clicking outside
 document.addEventListener('click', (e) => {
     if (!e.target.closest('.profile-dropdown')) {
         dropdownContent.classList.remove('dropdown-active');
     }
 });

 function confirmDelete() {
     if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
         // Here you would typically make an API call to delete the account
         alert('Account deletion request submitted.');
     }
 }