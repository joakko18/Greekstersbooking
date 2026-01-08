import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabaseClient'; // Ensure this path is correct

export async function GET() {
  try {
    // Fetch appointments first
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('id, schedule_id, customer_name, customer_email, service, notes');

    if (appointmentsError) {
      return NextResponse.json({ error: appointmentsError.message }, { status: 500 });
    }

    // Extract schedule_ids
    const scheduleIds = appointments.map(appt => appt.schedule_id);

    // Fetch schedules separately
    const { data: schedules, error: schedulesError } = await supabase
      .from('appointments_schedule')
      .select('id, date, time_slot')
      .in('id', scheduleIds);

    if (schedulesError) {
      return NextResponse.json({ error: schedulesError.message }, { status: 500 });
    }

    // Merge schedules with appointments
    const combinedData = appointments.map(appt => {
      const schedule = schedules.find(sched => sched.id === appt.schedule_id);
      return {
        ...appt,
        date: schedule?.date || 'N/A',
        time_slot: schedule?.time_slot || 'N/A',
      };
    });

    return NextResponse.json(combinedData);
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to fetch appointments', },{ status: 500 },);
    console.log(error)
  }
}
