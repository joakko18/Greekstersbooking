import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabaseClient';




// Fetch appointments by date
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
  
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }
  
    try {
      const { data, error } = await supabase
        .from('appointments_schedule')
        .select('id, date, time_slot')
        .eq('date', date);
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
      console.log(error)
    }
  }








// Delete appointment slot
export async function DELETE(req: Request,) {
    const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const { error } = await supabase.from('appointments_schedule').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Appointment slot deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete appointment slot' }, { status: 500 });
    console.log(error)
  }
}
