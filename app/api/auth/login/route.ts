import { supabase } from '@/app/utils/supabaseClient'; // Import Supabase client
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Store this in .env

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data (user and password)
    const { user, password } = await req.json();
    console.log('Received user and password:', user, password);

    // Query the Supabase database to find the user
    const { data: foundUser, error } = await supabase
      .from('user') // Table name
      .select('user, password') // Select only necessary fields
      .eq('user', user)
      .single(); // Expect only one result

    console.log('Supabase query result:', foundUser);

    // Handle if the user does not exist or query fails
    if (error || !foundUser) {
      console.error('Supabase error or user not found:', error);
      return NextResponse.json({ message: 'Invalid user or password' }, { status: 401 });
    }

    // Compare the received password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    
    if (!passwordMatch) {
      console.warn('Password mismatch');
      return NextResponse.json({ message: 'Invalid user or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({  user: foundUser.user }, SECRET_KEY, { expiresIn: '1h' });
    console.log('JWT token generated:', token);

    // Return success response
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
