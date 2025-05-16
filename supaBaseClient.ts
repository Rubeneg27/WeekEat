import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vvhtjigoqzgggtggfydi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2aHRqaWdvcXpnZ2d0Z2dmeWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczODQzOTAsImV4cCI6MjA2Mjk2MDM5MH0.Z4W31SMemXpwqe7FQQwcBb3W0-QQjxoRSj-4SZsqJko';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);