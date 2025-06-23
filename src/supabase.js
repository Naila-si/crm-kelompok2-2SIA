import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://atopjzuwjupmqrhfdjkv.supabase.co/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0b3BqenV3anVwbXFyaGZkamt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTg5MzYsImV4cCI6MjA2NjIzNDkzNn0.p2HozAkYiUgu0ZWcL_nbaqQwzmJ4mcEIax2lD54XkJo'
export const supabase = createClient(supabaseUrl, supabaseKey)