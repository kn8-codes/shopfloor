import { supabase, supabaseEnabled } from '$lib/supabase';

export async function getCurrentUser() {
  if (!supabaseEnabled || !supabase) return null;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user ?? null;
}

export async function getMyShopCard() {
  const user = await getCurrentUser();
  if (!user || !supabaseEnabled || !supabase) return null;

  const { data, error } = await supabase
    .from('shop_cards')
    .select('id, handle, display_name, neighborhood, bio, skills, is_visible')
    .eq('id', user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/** @param {{
 * title: string,
 * description: string,
 * category: string,
 * neighborhood: string,
 * urgency: string,
 * budget_note: string,
 * safe_to_share: boolean
 * }} payload */
export async function createHelpRequest(payload) {
  if (!supabaseEnabled || !supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You need to sign in first.');
  }

  const shopCard = await getMyShopCard();
  if (!shopCard) {
    throw new Error('Create your shop card before posting a request.');
  }

  const { data, error } = await supabase
    .from('help_requests')
    .insert({
      author_id: user.id,
      title: payload.title.trim(),
      description: payload.description.trim(),
      category: payload.category,
      neighborhood: payload.neighborhood.trim(),
      urgency: payload.urgency,
      budget_note: payload.budget_note.trim() || null,
      safe_to_share: payload.safe_to_share
    })
    .select('id')
    .single();

  if (error) throw error;

  return data;
}


/** @param {string} rawTools */
function parseTools(rawTools) {
  return rawTools
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/** @param {{
 * handle: string,
 * display_name: string,
 * neighborhood: string,
 * bio: string,
 * skills: string[],
 * toolsText: string
 * }} payload */
export async function upsertMyShopCard(payload) {
  if (!supabaseEnabled || !supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error('You need to sign in first.');
  }

  const normalizedHandle = payload.handle.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  const tools = parseTools(payload.toolsText);

  const { data, error } = await supabase
    .from('shop_cards')
    .upsert({
      id: user.id,
      handle: normalizedHandle,
      display_name: payload.display_name.trim(),
      neighborhood: payload.neighborhood.trim(),
      bio: payload.bio.trim(),
      skills: payload.skills,
      help_style: 'depends',
      contact_pref: 'in_app',
      is_visible: true
    })
    .select('handle')
    .single();

  if (error) throw error;

  return {
    handle: data.handle,
    tools
  };
}

/** @param {string} handle */
export async function getShopCardByHandle(handle) {
  if (!supabaseEnabled || !supabase) return null;

  const { data, error } = await supabase
    .from('shop_cards')
    .select('*')
    .eq('handle', handle)
    .maybeSingle();

  if (error) throw error;
  return data;
}
