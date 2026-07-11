export const categoryOptions = [
  'car',
  'housing',
  'appliance',
  'paperwork',
  'ride_help',
  'tool_borrow',
  'yard_outdoor',
  'kid_family',
  'other'
];

export const urgencyOptions = ['low', 'normal', 'high', 'urgent'];
export const responseTypeOptions = ['can_help', 'have_tool', 'advice', 'know_someone'];
export const toolAvailabilityOptions = ['available', 'limited', 'unavailable'];
export const toolConditionOptions = ['good', 'fair', 'rough', 'unknown'];

export const profiles = [
  {
    id: 'profile-jlibertytools',
    handle: 'jlibertytools',
    display_name: 'J. Liberty Tools',
    neighborhood: 'West Akron',
    bio: 'Automotive first, appliance rescue second, paperwork only under protest.',
    help_style: 'depends',
    contact_pref: 'in_app',
    skills: ['battery / alternator', 'brake jobs', 'minor appliance repair', 'reading codes'],
    needs: ['body work', 'drywall', 'city paperwork that needs a cleaner brain than mine'],
    is_visible: true,
    completed_help_count: 12,
    field_note_count: 6
  },
  {
    id: 'profile-northhillpartsrun',
    handle: 'northhillpartsrun',
    display_name: 'North Hill Parts Run',
    neighborhood: 'North Hill',
    bio: 'Can track down parts, haul awkward things, and figure out basic electrical before panic sets in.',
    help_style: 'depends',
    contact_pref: 'in_app',
    skills: ['parts lookup', 'pickup runs', 'basic electrical'],
    needs: ['trailer wiring', 'fence posts'],
    is_visible: true,
    completed_help_count: 5,
    field_note_count: 2
  }
];

export const tools = [
  {
    id: 'tool-obd-scanner',
    profile_id: 'profile-jlibertytools',
    name: 'OBD-II scanner',
    category: 'car',
    description: 'Reads codes and clears the obvious stuff before people waste money guessing.',
    condition: 'good',
    lendable: true,
    availability_status: 'available',
    neighborhood: 'West Akron',
    notes: 'Best for quick driveway diagnostics.'
  },
  {
    id: 'tool-floor-jack-stands',
    profile_id: 'profile-jlibertytools',
    name: 'Floor jack + stands',
    category: 'tool_borrow',
    description: 'Heavy enough to matter, useful enough to keep somebody from doing dumb jack-only nonsense.',
    condition: 'good',
    lendable: true,
    availability_status: 'limited',
    neighborhood: 'West Akron',
    notes: 'Bring-on-site only unless I know you.'
  },
  {
    id: 'tool-soldering-station',
    profile_id: 'profile-jlibertytools',
    name: 'Soldering station',
    category: 'appliance',
    description: 'Bench-only electronics repair setup.',
    condition: 'good',
    lendable: false,
    availability_status: 'available',
    neighborhood: 'West Akron',
    notes: 'Not leaving the bench.'
  },
  {
    id: 'tool-pickup-truck',
    profile_id: 'profile-northhillpartsrun',
    name: 'Pickup truck',
    category: 'ride_help',
    description: 'Useful for parts runs, marketplace pickups, and moving dumb heavy things once.',
    condition: 'fair',
    lendable: false,
    availability_status: 'limited',
    neighborhood: 'North Hill',
    notes: 'Driver included. Not a free-for-all loaner.'
  }
];

export const help_requests = [
  {
    id: 'request-battery-clamp',
    author_id: 'profile-northhillpartsrun',
    title: 'Need help replacing a dead battery clamp before tomorrow’s school run',
    description: '2008 Focus starts if I hold the terminal just right, but the positive clamp is cooked and I do not trust it for one more morning.',
    category: 'car',
    neighborhood: 'Kenmore',
    urgency: 'urgent',
    budget_note: 'Barter / small cash / labor swap',
    status: 'open',
    safe_to_share: true,
    created_at_label: '32 minutes ago'
  },
  {
    id: 'request-dryer-heat',
    author_id: 'profile-jlibertytools',
    title: 'Dryer tumbles but no heat, trying not to line-dry clothes all week',
    description: 'Whirlpool dryer still spins, but no heat. Looking for someone who knows whether this sounds like a thermal fuse or heating element.',
    category: 'appliance',
    neighborhood: 'North Hill',
    urgency: 'normal',
    budget_note: 'Unknown',
    status: 'open',
    safe_to_share: true,
    created_at_label: '1 hour ago'
  },
  {
    id: 'request-lawnmower-borrow',
    author_id: 'profile-northhillpartsrun',
    title: 'Need to borrow a mower for one afternoon before the city gets loud',
    description: 'Grass got away from me. Just need one solid cut and I can return same day with gas replaced.',
    category: 'tool_borrow',
    neighborhood: 'Firestone Park',
    urgency: 'low',
    budget_note: 'Barter',
    status: 'open',
    safe_to_share: true,
    created_at_label: '2 hours ago'
  }
];

export const request_responses = [
  {
    id: 'response-battery-clamp-1',
    request_id: 'request-battery-clamp',
    author_id: 'profile-jlibertytools',
    response_type: 'can_help',
    message: 'I can swing by after 6 with a clamp kit and scanner if the cable itself is still decent.'
  },
  {
    id: 'response-battery-clamp-2',
    request_id: 'request-battery-clamp',
    author_id: 'profile-jlibertytools',
    response_type: 'have_tool',
    message: 'Even if I cannot do it tonight, I have the jack stands and scanner if somebody closer can wrench.'
  }
];

export const field_notes = [
  {
    id: 'fieldnote-gfci-fridge',
    request_id: null,
    author_id: 'profile-northhillpartsrun',
    title: 'Fridge wasn’t dying, the outlet GFCI was half-tripped',
    problem: 'Fridge lost power and looked dead.',
    fix: 'Checked voltage first, reset the upstream GFCI, cleaned the plug, fridge came back. Ten minutes. Zero-dollar fix.',
    cost: '$0',
    tools_used: 'multimeter',
    time_required: '10 minutes',
    safety_level: 'safe',
    neighborhood_tip: 'Check the weird upstream outlet before assuming the appliance itself is cooked.'
  },
  {
    id: 'fieldnote-battery-terminal-temp-fix',
    request_id: 'request-battery-clamp',
    author_id: 'profile-jlibertytools',
    title: 'Temporary battery terminal fix bought 48 hours until payday',
    problem: 'Terminal connection was too corroded and loose to trust for daily starts.',
    fix: 'Cleaned corrosion, trimmed back the cable end, used a universal clamp replacement. Not forever, but enough to make school and work.',
    cost: '$14',
    tools_used: 'wire brush, cutter, 10mm socket',
    time_required: '25 minutes',
    safety_level: 'temporary',
    neighborhood_tip: 'Call temporary fixes temporary. The honesty is part of the help.'
  }
];

export const local_support_options = [
  {
    id: 'support-akron-food-not-panic',
    name: 'Akron public food-assistance line',
    resource_kind: 'food',
    categories: ['kid_family', 'other'],
    service_area: 'Akron / Summit County',
    description: 'A plain first call when food is part of the emergency and the request still needs neighbor help around timing, rides, or paperwork.',
    access_note: 'Call or check the public site first; hours and eligibility can change.',
    source_name: 'Sample public-source placeholder',
    source_url: 'https://www.akronohio.gov/',
    source_checked_at_label: 'sample only — not live checked',
    verification_status: 'sample_unverified_public_source'
  },
  {
    id: 'support-summit-paperwork-help',
    name: 'Summit County paperwork/navigation help',
    resource_kind: 'paperwork',
    categories: ['paperwork', 'housing', 'kid_family'],
    service_area: 'Summit County',
    description: 'A support option for forms, benefits, housing paperwork, or agency navigation when the neighbor ask is really “sit with me through this.”',
    access_note: 'Use as a starting point, not an eligibility decision. Bring documents if an appointment is required.',
    source_name: 'Sample public-source placeholder',
    source_url: 'https://www.summitcountyohio.gov/',
    source_checked_at_label: 'sample only — not live checked',
    verification_status: 'sample_unverified_public_source'
  },
  {
    id: 'support-transit-ride-backup',
    name: 'Transit / ride-planning backup',
    resource_kind: 'transportation',
    categories: ['ride_help', 'paperwork', 'kid_family'],
    service_area: 'Akron area',
    description: 'A backup option for planning a route when the request still needs a person with a car, a tool, or time to help close the gap.',
    access_note: 'Check current schedules and fares. Do not assume this replaces neighbor help.',
    source_name: 'Sample public-source placeholder',
    source_url: 'https://www.akronmetro.org/',
    source_checked_at_label: 'sample only — not live checked',
    verification_status: 'sample_unverified_public_source'
  },
  {
    id: 'support-housing-repair-intake',
    name: 'Housing repair / tenant support intake',
    resource_kind: 'housing',
    categories: ['housing'],
    service_area: 'Akron / Summit County',
    description: 'A support option when a repair problem may involve landlord, safety, code, or paperwork questions in addition to hands-on help.',
    access_note: 'Call first. This panel cannot decide rights, eligibility, or urgency.',
    source_name: 'Sample public-source placeholder',
    source_url: 'https://www.akronohio.gov/',
    source_checked_at_label: 'sample only — not live checked',
    verification_status: 'sample_unverified_public_source'
  },
  {
    id: 'support-tool-library-pattern',
    name: 'Tool-lending / repair bench idea',
    resource_kind: 'tool_access',
    categories: ['tool_borrow', 'car', 'appliance', 'yard_outdoor'],
    service_area: 'Neighborhood-dependent',
    description: 'A placeholder for a real local tool-access option if one is checked later. For now, neighbor-owned tools remain the primary ShopFloor path.',
    access_note: 'Sample only. Do not treat this as a known available tool library.',
    source_name: 'ShopFloor sample fixture',
    source_url: '/knowledge',
    source_checked_at_label: 'sample only — not live checked',
    verification_status: 'sample_unverified_public_source'
  }
];

/** @param {string} handle */
export function getProfileByHandle(handle) {
  return profiles.find((profile) => profile.handle === handle);
}

/** @param {string} id */
export function getProfileById(id) {
  return profiles.find((profile) => profile.id === id);
}

export function getRequestsForFeed() {
  return help_requests.map((request) => ({
    ...request,
    author: getProfileById(request.author_id)
  }));
}

/** @param {string} id */
export function getRequestById(id) {
  const request = help_requests.find((item) => item.id === id);
  if (!request) return null;
  return {
    ...request,
    author: getProfileById(request.author_id),
    responses: request_responses.filter((response) => response.request_id === id).map((response) => ({
      ...response,
      author: getProfileById(response.author_id)
    }))
  };
}

/** @param {{ category?: string } | null | undefined} request */
export function getLocalSupportOptionsForRequest(request, limit = 5) {
  const category = request?.category;
  if (!category) return [];
  return local_support_options
    .filter((option) => option.categories.includes(category))
    .slice(0, limit);
}

/** @param {string} handle */
export function getProfileBundle(handle) {
  const profile = getProfileByHandle(handle);
  if (!profile) return null;
  return {
    profile,
    tools: tools.filter((tool) => tool.profile_id === profile.id),
    fieldNotes: field_notes.filter((note) => note.author_id === profile.id)
  };
}
