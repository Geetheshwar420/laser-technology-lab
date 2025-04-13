import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// REST API fallback functions
export async function supabaseRestFetch(
  endpoint: string,
  method: string,
  body?: any,
  headers: Record<string, string> = {}
) {
  const url = `${supabaseUrl}/rest/v1/${endpoint}`;
  const authHeaders = {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
    'Content-Type': 'application/json',
    ...headers
  };

  const response = await fetch(url, {
    method,
    headers: authHeaders,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Supabase REST request failed');
  }

  return response.json();
}

// Verify the lesson_progress table has required columns
export async function verifyTableStructure() {
  const requiredColumns = [
    'lesson_id', 'user_id', 'completed', 
    'score', 'completed_at', 'updated_at',
    'components_completed'
  ];

  const { data: columns, error } = await supabase
    .rpc('get_table_columns', { table_name: 'lesson_progress' });

  if (error) {
    console.error('Error verifying table structure:', error);
    throw new Error('Failed to verify table structure');
  }

  const missingColumns = requiredColumns.filter(
    col => !columns.some((c: any) => c.column_name === col)
  );

  if (missingColumns.length > 0) {
    const errorMsg = `Missing required columns: ${missingColumns.join(', ')}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  console.log('Table structure verified successfully');
}

export async function restUpsertProgress(data: any) {
  console.log('[REST] Attempting to upsert progress:', JSON.stringify(data, null, 2));
  try {
    await verifyTableStructure();
    const result = await supabaseRestFetch('lesson_progress', 'POST', data, {
      'Prefer': 'resolution=merge-duplicates'
    });
    console.log('[REST] Upsert successful:', result);
    return result;
  } catch (error) {
    console.error('[REST] Upsert failed:', error);
    throw error;
  }
}
