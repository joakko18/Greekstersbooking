import bcrypt from 'bcryptjs';

async function hashPassword() {
  const plaintextPassword = '4793960'; // Replace with the password you want to hash
  const hashedPassword = await bcrypt.hash(plaintextPassword, 10); // 10 is the salt rounds (you can adjust this)

  console.log('Hashed Password:', hashedPassword); // Output the hashed password to console
}

// Call the function to hash the password

hashPassword()