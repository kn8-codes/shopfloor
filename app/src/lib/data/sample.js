export const categories = ['Car', 'Housing', 'Tool borrow', 'Ride help', 'Paperwork', 'Appliance rescue'];

export const requests = [
  {
    id: 'battery-clamp',
    title: 'Need help replacing a dead battery clamp before tomorrow’s school run',
    category: 'Car',
    neighborhood: 'Kenmore',
    urgency: 'Urgent',
    body: '2008 Focus starts if I hold the terminal just right, but the positive clamp is cooked and I do not trust it for one more morning.',
    author: '@everlydadfixes',
    budget: 'Barter / small cash / labor swap',
    postedAgo: '32 minutes ago'
  },
  {
    id: 'dryer-wont-heat',
    title: 'Dryer tumbles but no heat, trying not to line-dry clothes all week',
    category: 'Appliance rescue',
    neighborhood: 'North Hill',
    urgency: 'Normal',
    body: 'Whirlpool dryer still spins, but no heat. Looking for someone who knows whether this sounds like a thermal fuse or heating element.',
    author: '@northhilllaundry',
    budget: 'Unknown',
    postedAgo: '1 hour ago'
  },
  {
    id: 'lawnmower-borrow',
    title: 'Need to borrow a mower for one afternoon before the city gets loud',
    category: 'Tool borrow',
    neighborhood: 'Firestone Park',
    urgency: 'Low',
    body: 'Grass got away from me. Just need one solid cut and I can return same day with gas replaced.',
    author: '@yardshift',
    budget: 'Barter',
    postedAgo: '2 hours ago'
  }
];

export const helpers = [
  {
    handle: 'jlibertytools',
    display: '@jlibertytools',
    neighborhood: 'West Akron',
    helpStyle: 'barter / depends',
    skills: ['Battery / alternator', 'Brake jobs', 'Minor appliance repair', 'Reading codes'],
    tools: ['Jack + stands', 'Socket set', 'Code scanner', 'Jump pack'],
    needs: 'Body work, drywall, and anything involving clean paperwork at city offices.',
    completed: 12,
    fieldNotes: 6
  },
  {
    handle: 'northhillpartsrun',
    display: '@northhillpartsrun',
    neighborhood: 'North Hill',
    helpStyle: 'depends',
    skills: ['Parts lookup', 'Pickup runs', 'Basic electrical'],
    tools: ['Multimeter', 'Pickup truck', 'Battery charger'],
    needs: 'Trailer wiring and fence posts.',
    completed: 5,
    fieldNotes: 2
  }
];

export const fieldNotes = [
  {
    id: 'gfci-fridge',
    title: 'Fridge wasn’t dying, the outlet GFCI was half-tripped',
    category: 'Housing',
    neighborhood: 'North Hill',
    body: 'Checked voltage first, reset the upstream GFCI, cleaned the plug, fridge came back. Ten minutes. Zero-dollar fix.',
    safety: 'Safe',
    cost: '$0',
    time: '10 minutes'
  },
  {
    id: 'battery-terminal-temp-fix',
    title: 'Temporary battery terminal fix bought 48 hours until payday',
    category: 'Car',
    neighborhood: 'Kenmore',
    body: 'Cleaned corrosion, trimmed back the cable end, used a universal clamp replacement. Not forever, but enough to make school and work.',
    safety: 'Temporary',
    cost: '$14',
    time: '25 minutes'
  }
];
