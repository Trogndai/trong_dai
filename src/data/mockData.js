
export const TOTAL_CUSTOMERS = 1544;

const base = (id, name, code, category, rep, score, ytdRev, deltaLy, deltaBdg, noCallDays) => {
  const vsLy = 100 + deltaLy;
  const vsBudget = 100 + deltaBdg;
  return {
    id,
    name,
    code,
    category,
    rep,
    score,
    ytdRev,
    vsLy,
    vsBudget,
    lyRev: vsLy > 0 ? ytdRev / (vsLy / 100) : 0,
    noCallDays,
    channel: 'Allied Health',
    sentiment: score <= 25 ? 'At Risk' : 'Neutral',
  };
};

export const customers = [
  {
    ...base('4152001', 'Allsports (Aust) Ltd', '4152001', 'Physiotherapy', 'Wade Degnan', 10, 19155.77, -47.3, 156, 596),
    vsLy: 52.7,
    vsBudget: 256,
    lyRev: 70135.93,
    ytdGp: 1000,
    lyGp: 3000,
    vsLyGp: 46,
    lastOrder: '5mo ago · $332',
    detail: {
      accountNo: '4152001',
      leadSource: 'Existing',
      category: 'Physiotherapy',
      account: 'Sales - Astir',
      grade: '—',
      professionals: '12',
      email: 'camphill@allsportsphysio.com.au',
      website: 'http://www.allsportsphysio.com.au',
      address: ['448 Old Cleveland Road', 'Camp Hill 4152'],
      salesExecutive: 'Wade Degnan',
      territory: '—',
    },
  },
  base('2640020', 'Back on Track Physiotherapy - Albury', '2640020', 'Physiotherapy', 'Roisin Whitford', 10, 15000, -43, 196, 289),
  base('2617002', 'G&G Belconnen Physiotherapy', '2617002', 'Physiotherapy', 'Silas Donald', 10, 6000, -68, 18, 329),
  base('3070001', 'Bodyfit Physiotherapy', '3070001', 'Physiotherapy', 'Juan Schaerer', 10, 9000, -37, 71, 332),
  base('3805003', 'Casey Central Osteopathy', '3805003', 'Osteopathy', 'Juan Schaerer', 10, 3000, -39, 52, 567),
  base('2154011', 'Castle Hill Osteopathy', '2154011', 'Osteopathy', 'Roisin Whitford', 10, 5000, -87, 115, 225),
  base('6258004', 'Chanti Slade Occupational Therapist', '6258004', 'Occupational Therapy', 'Ashley Phelps', 10, 3000, -43, 118, 1562),
  base('7320002A', 'Leap Health Coastal Physiotherapy - Burnie', '7320002A', 'Physiotherapy', 'Ashley Phelps', 10, 34000, -35, 377, 226),
  base('3912004', 'Peninsula Elite Physio', '3912004', 'Physiotherapy', 'Juan Schaerer', 10, 4000, -51, 101, 619),
  base('3133001', 'First Choice Health', '3133001', 'Physiotherapy', 'Juan Schaerer', 10, 7000, -32, 133, 653),
  base('2211004', 'HH Physiotherapy PTY LTD', '2211004', 'Physiotherapy', null, 10, 7000, -32, 115, null),
];

export function getCustomerDetail(c) {
  if (c.detail) return c.detail;
  const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return {
    accountNo: c.code,
    leadSource: 'Existing',
    category: c.category,
    account: 'Sales - Astir',
    grade: '—',
    professionals: '—',
    email: `info@${slug}.com.au`,
    website: `http://www.${slug}.com.au`,
    address: ['—'],
    salesExecutive: c.rep || '—',
    territory: '—',
  };
}

export const activitiesByCustomer = {
  '4152001': [
    {
      id: 'a1',
      type: 'Appointment',
      date: '2024-11-20',
      customer: 'Allsports (Aust) Ltd',
      outcome: 'Successful (Spoke to the DM)',
      lines: [
        'had a great app with Maria and Emma',
        '2nd app. went really well. would like me to beat their ROM pricing - $130 ascender brace. also inmotion k tek black @ $9.45',
      ],
      user: 'Wade Degnan',
      status: 'Done',
    },
    {
      id: 'a2',
      type: 'Email',
      date: '2024-11-06',
      customer: 'Allsports (Aust) Ltd',
      outcome: 'Email Sent',
      lines: ['List sent to DC', 'List recieved'],
      user: 'Wade Degnan',
      status: 'Done',
    },
    {
      id: 'a3',
      type: 'Appointment',
      date: '2024-10-23',
      customer: 'Allsports (Aust) Ltd',
      outcome: 'Call Completed',
      lines: [
        'Had an awesome meeting with Maria',
        'she’ll send through a list. she’s not comfortable with sending voices through does have an Excel list that you’ll send through to us we’ll stop just use past All Sports pricing, indicated that she’s happy to use us more. $500 credit to be applied',
      ],
      user: 'Wade Degnan',
      status: 'Done',
    },
    {
      id: 'a4',
      type: 'Appointment',
      date: '2024-10-22',
      customer: 'Allsports (Aust) Ltd',
      outcome: 'Call Completed',
      lines: [
        'Had a meeting with Kaneisha at conference,',
        'Maria does the ordering still, will be in touch regarding the $500 store credit- will be a good one to get more from!',
      ],
      user: 'Wade Degnan',
      status: 'Done',
    },
  ],
};

export const switchSaveByCustomer = {
  '4152001': {
    summary: { customerSaving: 0, gpUplift: 67, switchableLines: 5 },
    lines: [
      { id: 's1', current: 'ASO ANKLE BRACE / BLACK / MEDIUM', qty: 12, unit: 52.52, total: 630.24, target: 'ORTHOLIFE TOTAL STABILITY ANKLE BRACE WITH STRAP / MEDIUM / 30-32CM', targetUnit: 0, targetTotal: 0, customerSaves: 0, gp: 369.28 },
      { id: 's2', current: 'ASO ANKLE BRACE / BLACK / SMALL', qty: 10, unit: 52.52, total: 525.2, target: 'ORTHOLIFE TOTAL STABILITY ANKLE BRACE WITH STRAP / SMALL / 28-30CM', targetUnit: 0, targetTotal: 0, customerSaves: 0, gp: 303.32 },
      { id: 's3', current: 'ASO ANKLE BRACE / BLACK / LARGE', qty: 4, unit: 52.52, total: 210.08, target: 'ORTHOLIFE TOTAL STABILITY ANKLE BRACE WITH STRAP / LARGE / 32 - 35CM', targetUnit: 0, targetTotal: 0, customerSaves: 0, gp: 112.24 },
      { id: 's4', current: 'POCKET PHYSIO / INDIVIDUAL', qty: 3, unit: 9.9, total: 29.7, target: 'FORTRESS KNUCKLE PHYSIO / PURPLE', targetUnit: 0, targetTotal: 0, customerSaves: 0, gp: 13.84 },
      { id: 's5', current: 'MEDI-SWABS ALCOHOL SWAB / BOX/200', qty: 1, unit: 14.96, total: 14.96, target: 'TAYLOR’S SKIN CLEANSING ALCOHOL SWABS / BOX OF 200', targetUnit: 0, targetTotal: 0, customerSaves: 0, gp: 3.77 },
    ],
  },
};

export const QUICK_FILTERS = [
  { key: 'callDue', label: 'Call due', test: (c) => c.noCallDays != null && c.noCallDays > 30 },
  { key: 'revDrop', label: 'Rev drop', test: (c) => c.vsLy < 100 },
  { key: 'atRisk', label: 'At risk', test: (c) => c.score <= 25 },
  { key: 'belowBdg', label: 'Below bdg', test: (c) => c.vsBudget < 100 },
  { key: 'aboveBdg', label: 'Above bdg', test: (c) => c.vsBudget >= 100 },
  { key: 'lapsed', label: 'Lapsed', test: (c) => c.noCallDays != null && c.noCallDays > 365 },
];

export const FILTER_OPTIONS = {
  salesReps: ['Alex Hawkins', 'Andrew Molnar', 'Ashley Phelps', 'BDM Team', 'Daniel Donald', 'Debbie Cormack', 'Garth McCallum', 'Juan Schaerer', 'Roisin Whitford', 'Silas Donald', 'Wade Degnan'],
  channels: ['Allied Health', 'Dental', 'Other', 'Primary Healthcare'],
  sizes: [
    { key: 'inactive', label: 'Inactive (no R12 revenue)', test: (c) => c.ytdRev <= 0 },
    { key: 'micro', label: 'Micro (< $5k R12)', test: (c) => c.ytdRev > 0 && c.ytdRev < 5000 },
    { key: 'small', label: 'Small ($5k – $20k R12)', test: (c) => c.ytdRev >= 5000 && c.ytdRev < 20000 },
    { key: 'medium', label: 'Medium ($20k – $50k R12)', test: (c) => c.ytdRev >= 20000 && c.ytdRev < 50000 },
    { key: 'large', label: 'Large ($50k – $250k R12)', test: (c) => c.ytdRev >= 50000 && c.ytdRev < 250000 },
    { key: 'major', label: 'Major (> $250k R12)', test: (c) => c.ytdRev >= 250000 },
  ],
  sentiments: ['Positive', 'Neutral', 'At Risk', 'Negative'],
  categories: ['Acupuncture', 'Aesthetic Clinic', 'Aged Care Provider', 'Airport / Transport Hub', 'Allergy & Immunology Specialists', 'Allied Health', 'Occupational Therapy', 'Osteopathy', 'Physiotherapy'],
};

export const EMPTY_FILTERS = {
  myCustomers: false,
  salesReps: [],
  channels: [],
  sizes: [],
  sentiments: [],
  categories: [],
  showZeroSpend: false,
};
