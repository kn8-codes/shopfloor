import { appConfig } from '$lib/config/app';
import { getConnectionShape } from '$lib/supabase';

export async function load() {
  const connection = await getConnectionShape();

  return { appConfig, connection };
}
