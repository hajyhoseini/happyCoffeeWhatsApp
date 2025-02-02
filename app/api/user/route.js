import { createClient } from '@supabase/supabase-js';

// اطلاعات اتصال به Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// متد POST
export async function POST(req) {
  try {
    const { name, phone, address, city } = await req.json();  // گرفتن داده‌ها از درخواست
    
    // ارسال داده‌ها به Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, phone, address, city }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
