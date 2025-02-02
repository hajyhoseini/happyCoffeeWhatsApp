import { createClient } from '@supabase/supabase-js';

// اطلاعات اتصال به Supabase (URL و API Key)
const SUPABASE_URL = 'https://ymtlhrkazymcesiehmmf.supabase.co';  // جایگزین با URL واقعی پروژه خود
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltdGxocmthenltY2VzaWVobW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NDMyMzMsImV4cCI6MjA1NDAxOTIzM30.F8rjfxNatt7ax0jheUREH5ccknSPJ41z7L4KjluDqvE'; // جایگزین با کلید API واقعی پروژه خود

// ایجاد کلاینت Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
