import { supabaseEnabled } from '$lib/supabase';

export const appConfig = {
  name: 'ShopFloor',
  taglines: {
    short: 'When something breaks, start with the neighborhood.',
    long: 'A neighborhood repair and mutual-aid network for working people.'
  },
  supabaseEnabled
};
