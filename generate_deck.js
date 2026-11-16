const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs', 'flowfinance', 'FlowFinance_Growth_Deck.pdf');

// Create document with 16:9 landscape aspect ratio (960 x 540)
const doc = new PDFDocument({
  size: [960, 540],
  margins: { top: 35, bottom: 35, left: 45, right: 45 },
  autoFirstPage: false
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Color Palette
const COLORS = {
  navy: '#0f172a',
  indigo: '#4338ca',
  blue: '#2563eb',
  emerald: '#059669',
  slateDark: '#1e293b',
  slateMuted: '#64748b',
  slateLight: '#f1f5f9',
  cardBg: '#ffffff',
  cardBorder: '#cbd5e1',
  white: '#ffffff',
  accentBg: '#e0e7ff',
  warningBg: '#fef3c7',
  warningBorder: '#f59e0b',
  warningText: '#b45309'
};

function drawHeader(doc, slideNum, category, headline) {
  // Category / Eyebrow
  doc.rect(45, 25, 870, 2).fill(COLORS.indigo);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.indigo)
     .text(category.toUpperCase(), 45, 35, { characterSpacing: 1 });
  
  // Headline (One headline message per slide)
  doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.navy)
     .text(headline, 45, 52, { width: 800 });

  // Slide Number
  doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.slateMuted)
     .text(`${String(slideNum).padStart(2, '0')} / 16`, 860, 35, { align: 'right' });
}

function drawFooter(doc, sourceText) {
  doc.rect(45, 505, 870, 1).fill(COLORS.cardBorder);
  doc.font('Helvetica').fontSize(8.5).fillColor(COLORS.slateMuted)
     .text(`Source: ${sourceText}`, 45, 513, { width: 750 });
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.indigo)
     .text('FlowFinance Growth Strategy | Consulting Track', 680, 513, { align: 'right' });
}

function drawCard(doc, x, y, w, h, title, items, options = {}) {
  const bg = options.bg || COLORS.cardBg;
  const border = options.border || COLORS.cardBorder;
  const titleColor = options.titleColor || COLORS.navy;

  doc.roundedRect(x, y, w, h, 6).fillAndStroke(bg, border);

  let currentY = y + 10;
  if (title) {
    doc.font('Helvetica-Bold').fontSize(11).fillColor(titleColor)
       .text(title, x + 12, currentY, { width: w - 24 });
    currentY += 16;
  }

  items.forEach(item => {
    if (typeof item === 'string') {
      doc.font('Helvetica').fontSize(9).fillColor(COLORS.slateDark)
         .text(`• ${item}`, x + 12, currentY, { width: w - 24, lineGap: 2 });
      currentY += (doc.heightOfString(`• ${item}`, { width: w - 24 }) + 3);
    } else if (item.label && item.val) {
      doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.slateDark)
         .text(item.label + ': ', x + 12, currentY, { continued: true });
      doc.font('Helvetica').fontSize(9).fillColor(COLORS.slateMuted)
         .text(item.val, { width: w - 24 });
      currentY += 14;
    }
  });
}

// ==================== SLIDE 1: TITLE ====================
doc.addPage();
// Background decoration
doc.rect(0, 0, 960, 540).fill(COLORS.navy);
doc.rect(0, 520, 960, 20).fill(COLORS.indigo);

doc.font('Helvetica-Bold').fontSize(12).fillColor('#38bdf8')
   .text('CONSULTING & BUSINESS DEVELOPMENT TRACK | GROWTH CHALLENGE', 70, 120, { characterSpacing: 2 });

doc.font('Helvetica-Bold').fontSize(36).fillColor(COLORS.white)
   .text('FlowFinance Growth & Distribution Strategy', 70, 150, { width: 820 });

doc.font('Helvetica').fontSize(18).fillColor('#94a3b8')
   .text('Scaling India\'s Leading AI-Powered Financial Intelligence Platform for MSMEs & Startups', 70, 240, { width: 800 });

// Highlights row
const tagY = 320;
doc.roundedRect(70, tagY, 260, 90, 8).fillAndStroke('#1e293b', '#334155');
doc.font('Helvetica-Bold').fontSize(11).fillColor('#38bdf8').text('STRATEGIC FOCUS', 85, tagY + 12);
doc.font('Helvetica').fontSize(9.5).fillColor('#e2e8f0').text('Account Aggregator Data Layer\nDual Beachhead GTM Strategy\nCA Network Distribution Engine', 85, tagY + 30);

doc.roundedRect(350, tagY, 260, 90, 8).fillAndStroke('#1e293b', '#334155');
doc.font('Helvetica-Bold').fontSize(11).fillColor('#34d399').text('MARKET CONTEXT', 365, tagY + 12);
doc.font('Helvetica').fontSize(9.5).fillColor('#e2e8f0').text('10.11 Cr+ Udyam Registrations\nRs. 7.34L Cr Delayed Payments\nSection 43B(h) Statutory Driver', 365, tagY + 30);

doc.roundedRect(630, tagY, 260, 90, 8).fillAndStroke('#1e293b', '#334155');
doc.font('Helvetica-Bold').fontSize(11).fillColor('#f472b6').text('COMMERCIAL TARGET', 645, tagY + 12);
doc.font('Helvetica').fontSize(9.5).fillColor('#e2e8f0').text('Level 2 Challenge Milestone Plan\n10 Verified Paid Conversions\nRs. 11,000 Milestone Achievement', 645, tagY + 30);

doc.font('Helvetica').fontSize(10).fillColor('#64748b')
   .text('Prepared by Consulting Research & Deck-Building Assistant | Public Verifiable Data Only', 70, 480);

// ==================== SLIDE 2: EXECUTIVE SUMMARY ====================
doc.addPage();
drawHeader(doc, 2, 'Executive Summary', 'FlowFinance transforms backward-looking accounting into forward-looking cash intelligence.');

drawCard(doc, 45, 95, 275, 395, '1. Core Problem: The Cash Paradox', [
  'Indian SMBs are not failing from lack of profit; they fail from lack of cash visibility.',
  'Rs. 7.34L Cr to Rs. 8.1L Cr locked up in delayed trade receivables across Indian MSMEs.',
  'Tally and traditional desktop tools solve for backward tax compliance, leaving forward runway blind.',
  'Section 43B(h) enforces a mandatory 45-day payment rule, making real-time invoice tracking vital.'
], { border: '#cbd5e1' });

drawCard(doc, 342, 95, 275, 395, '2. The FlowFinance Solution', [
  'AI-native intelligence layer on top of banking & accounting infrastructure.',
  'Live bank feeds via RBI Account Aggregator framework without net-banking credential risk.',
  'Flowy AI Copilot provides plain-language answers to cash, runway, and invoice queries.',
  'Planning Studio models 90-day cash flow across Conservative, Base, and Growth scenarios.'
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 640, 95, 275, 395, '3. Growth & Execution Engine', [
  'Dual Beachhead: B2B Services Agencies (direct PLG) + CA Practices (compounding 1-to-many partner channel).',
  'Unit Economics: Blended ARPU of Rs. 3,200/mo, 85% gross margin, 24.2x LTV/CAC ratio (Assumption).',
  'Level 2 Milestone Target: Reach 10 verified paid conversions via 12-week structured distribution roadmap.',
  'Milestone earnings: Rs. 11,000 bonus + 10% monthly commissions on verified subscriptions.'
], { border: COLORS.emerald });

drawFooter(doc, 'GAME Delayed Payments Report (economictimes.indiatimes.com); Ministry of MSME; flowfinancebusiness.com');

// ==================== SLIDE 3: PLATFORM ANALYSIS ====================
doc.addPage();
drawHeader(doc, 3, 'Platform Architecture', 'A modern, modular finance stack engineered for non-finance operators and CAs.');

drawCard(doc, 45, 95, 205, 185, 'Analytics Hub', [
  'Single operating cash view',
  'Live Accounts Receivable tracking',
  'Automated spend anomaly alerts',
  'Data Spine Health diagnostics'
]);

drawCard(doc, 265, 95, 205, 185, 'Flowy AI Copilot', [
  'Embedded conversational chatbot',
  'Natural-language multi-lingual query',
  'Runway & burn rate calculation',
  'Zero multi-screen dashboard friction'
], { border: COLORS.indigo, bg: '#eef2ff' });

drawCard(doc, 485, 95, 205, 185, 'Finance Operations', [
  'Centralized bank accounts feed',
  'Automated AI categorization',
  'Invoices & expenses tracking',
  'Unusual expense review queue'
]);

drawCard(doc, 705, 95, 205, 185, 'Planning Studio', [
  '90-day forward cash projection',
  'Dynamic runway modeling',
  'Budget vs. actual variance',
  '3-scenario simulation (Growth/Base)'
]);

// Trust signals banner
doc.roundedRect(45, 295, 870, 195, 6).fillAndStroke('#f8fafc', '#cbd5e1');
doc.font('Helvetica-Bold').fontSize(12).fillColor(COLORS.navy).text('Trust, Compliance & Security Architecture', 65, 310);

const trustItems = [
  { label: 'Data Residency', val: 'All data hosted within India (AWS Mumbai ap-south-1 region).' },
  { label: 'Regulatory Posture', val: 'Compliant with Digital Personal Data Protection Act, 2023 (DPDPA).' },
  { label: 'Banking Integration', val: 'Read-only access via RBI Account Aggregator; no net-banking credentials stored.' },
  { label: 'AI Privacy Guarantee', val: 'Customer financial data is never sold and NEVER used to train 3rd party AI models.' },
  { label: 'No Lock-in Portability', val: 'Full customer data ownership with unrestricted data export and workspace deletion.' }
];

let ty = 330;
trustItems.forEach(t => {
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(COLORS.indigo).text(`[OK] ${t.label}: `, 65, ty, { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor(COLORS.slateDark).text(t.val);
  ty += 28;
});

drawFooter(doc, 'flowfinancebusiness.com/features; flowfinancebusiness.com/privacy');

// ==================== SLIDE 4: INDUSTRY LANDSCAPE ====================
doc.addPage();
drawHeader(doc, 4, 'Competitive Landscape', 'Positioned between static desktop ERPs and lightweight micro-merchant ledger apps.');

// Table header
const tableY = 95;
doc.rect(45, tableY, 870, 25).fill(COLORS.navy);
doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.white);
doc.text('COMPETITOR', 55, tableY + 8);
doc.text('TARGET SEGMENT', 160, tableY + 8);
doc.text('PRICING MODEL', 310, tableY + 8);
doc.text('CORE STRENGTH', 470, tableY + 8);
doc.text('STRATEGIC GAP VS. FLOWFINANCE', 670, tableY + 8);

const compRows = [
  { name: 'FlowFinance', seg: 'Startups, B2B Agencies, CAs', price: 'Rs. 1,999 - Rs. 7,999/mo', str: 'Live AA bank sync + Flowy AI copilot', gap: 'Early brand stage; requires Tally export bridge' },
  { name: 'Tally (TallyPrime)', seg: 'Traditional MSMEs, CAs', price: 'Rs. 22,500+ perpetual', str: 'Dominant CA trust, offline GST/TDS', gap: 'Offline desktop tool; no live cloud forecasting' },
  { name: 'Zoho Books', seg: 'Digitized SMBs, Mid-market', price: 'Rs. 749 - Rs. 7,999/mo', str: 'Comprehensive suite (CRM/Payroll/ERP)', gap: 'High configuration complexity; no conversational copilot' },
  { name: 'Khatabook', seg: 'Micro-merchants, Kiranas', price: 'Freemium / Rs. 3k-5k add-on', str: 'Mobile-first udhar bahi simplicity', gap: 'Informal ledger; lacks runway modeling & MIS decks' },
  { name: 'Vyapar', seg: 'Retail traders, Wholesalers', price: 'Rs. 699 - Rs. 3,399/yr', str: 'Barcode POS billing & offline inventory', gap: 'Narrow billing focus; no live cash flow intelligence' },
  { name: 'Refrens', seg: 'Freelancers, Boutique Agencies', price: 'Free to Rs. 10,000/yr', str: 'Client proposals & quotation tracking', gap: 'Limited financial intelligence; no AA bank feeds' },
  { name: 'RazorpayX', seg: 'Tech startups, Digital SMBs', price: 'Transaction fees / Spreads', str: 'Automated payouts & working capital', gap: 'Tied to specific bank partner; lacks multi-bank modeling' }
];

let rowY = tableY + 25;
compRows.forEach((r, idx) => {
  const isAlt = idx % 2 === 1;
  doc.rect(45, rowY, 870, 36).fill(isAlt ? '#f8fafc' : '#ffffff');
  if (idx === 0) {
    doc.rect(45, rowY, 870, 36).fill('#eef2ff');
  }
  doc.font(idx === 0 ? 'Helvetica-Bold' : 'Helvetica').fontSize(8.5).fillColor(idx === 0 ? COLORS.indigo : COLORS.slateDark);
  doc.text(r.name, 55, rowY + 12);
  doc.text(r.seg, 160, rowY + 12, { width: 140 });
  doc.text(r.price, 310, rowY + 12, { width: 150 });
  doc.text(r.str, 470, rowY + 12, { width: 190 });
  doc.text(r.gap, 670, rowY + 12, { width: 235 });
  rowY += 36;
});

// Strategic takeaway box
doc.roundedRect(45, 415, 870, 75, 6).fillAndStroke('#f1f5f9', '#cbd5e1');
doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.navy).text('Key Positioning Takeaway:', 60, 425);
doc.font('Helvetica').fontSize(9).fillColor(COLORS.slateDark).text(
  'FlowFinance does not attempt to replace Tally as the statutory book of record. Instead, it positions as an agile, forward-looking intelligence overlay that ingests bank data via Account Aggregator and feeds executive decisions—creating an expansionary wedge rather than a high-friction replacement battle.',
  60, 442, { width: 840, lineGap: 2 }
);

drawFooter(doc, 'flowfinancebusiness.com/compare; zoho.com/in/books/pricing; tallysolutions.com');

// ==================== SLIDE 5: MARKET OPPORTUNITY (TAM/SAM/SOM) ====================
doc.addPage();
drawHeader(doc, 5, 'Market Opportunity', 'Addressing a Rs. 4,800 Cr serviceable market across digitized Indian SMBs & startups.');

drawCard(doc, 45, 95, 275, 280, 'TAM: Total Addressable Market', [
  { label: 'Scope', val: 'All formal, GST-registered Indian MSMEs' },
  { label: 'Base Volume', val: '1.45 Crore enterprises (PIB / GSTN data)' },
  { label: 'Blended ARPU', val: 'Rs. 38,400 / year (Rs. 3,200/mo) [Assumption]' },
  { label: 'Annual TAM Value', val: 'Rs. 55,680 Crore (~$6.7 Billion USD)' },
  'Represents the complete digitized business economy filing recurring compliance in India.'
]);

drawCard(doc, 342, 95, 275, 280, 'SAM: Serviceable Available Market', [
  { label: 'Scope', val: 'Digitized B2B SMBs, Agencies, Tech Startups & CA Clients' },
  { label: 'Base Volume', val: '12.5 Lakh enterprises (~8.6% of TAM) [Assumption]' },
  { label: 'Selection Filter', val: 'Multi-bank operations, >Rs. 50L turnover, active invoicing' },
  { label: 'Annual SAM Value', val: 'Rs. 4,800 Crore (~$578 Million USD)' },
  'High-urgency segments experiencing severe working capital locks and delayed receivables.'
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 640, 95, 275, 280, 'SOM: Serviceable Obtainable Market', [
  { label: 'Scope', val: 'Realistic 36-Month target across Top 8 Indian Metro Hubs' },
  { label: 'Base Volume', val: '25,000 Verified Paying Workspaces [Assumption]' },
  { label: 'Market Share Target', val: '2.0% capture of defined SAM base' },
  { label: 'Annual SOM Run-rate', val: 'Rs. 96 Crore (~$11.5 Million ARR)' },
  'Driven by compounding CA partnerships and organic founder-led community channels.'
], { border: COLORS.emerald });

// Assumptions & methodology box
doc.roundedRect(45, 390, 870, 100, 6).fillAndStroke('#f8fafc', '#cbd5e1');
doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.navy).text('Market Sizing Methodology & Grounding Assumptions:', 60, 402);
doc.font('Helvetica').fontSize(9).fillColor(COLORS.slateDark).text(
  '• Cumulative registrations across Udyam Registration Portal (URP) and Udyam Assist Platform (UAP) crossed 10.11 Crore in late 2026 (>5.58 Crore formal Udyam) [Ministry of MSME / PIB].\n' +
  '• Formal GST filings stand at 1.45 Cr enterprises; SAM applies an 8.6% filter for businesses running active bank reconciliation and cash runway needs [Assumption].\n' +
  '• ARPU modeled at Rs. 3,200/mo based on a plan mix of 55% Essential (Rs. 1,999), 35% Growth (Rs. 3,999), and 10% Professional (Rs. 7,999) [Assumption derived from flowfinancebusiness.com/pricing].',
  60, 420, { width: 840, lineGap: 3 }
);

drawFooter(doc, 'Ministry of MSME Dashboard (msme.gov.in); PIB Press Release (pib.gov.in); flowfinancebusiness.com/pricing');

// ==================== SLIDE 6: TARGET CUSTOMER MATRIX ====================
doc.addPage();
drawHeader(doc, 6, 'Target Customer Segmentation', 'Four distinct segments characterized by varying cash volatility and advisory dynamics.');

drawCard(doc, 45, 95, 205, 395, '1. Venture Startups', [
  { label: 'Size', val: '5-25 staff; Pre-seed to Series A' },
  { label: 'Burn Rate', val: 'Rs. 5L - Rs. 35L / month' },
  { label: 'Primary Need', val: 'Runway modeling & investor decks' },
  { label: 'Core Trigger', val: 'Board meetings, hiring plans' },
  { label: 'Willingness to Pay', val: 'High (Growth Rs. 3,999/mo)' },
  'Lacks full-time CFO; founder manages finance ad-hoc.',
  'Flowy Copilot replaces expensive financial analyst hours.'
]);

drawCard(doc, 265, 95, 205, 395, '2. B2B Services Agencies', [
  { label: 'Size', val: '10-50 staff (IT, Creative, Media)' },
  { label: 'Cash Cycle', val: '60 to 90 Days DSO' },
  { label: 'Primary Need', val: 'Receivables aging & payroll buffer' },
  { label: 'Core Trigger', val: 'Payroll crunch on 1st of month' },
  { label: 'Willingness to Pay', val: 'High (Essential / Growth)' },
  'Lumpy client payments create sudden cash crunches.',
  'Automated invoice reminders protect monthly solvency.'
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 485, 95, 205, 395, '3. Scaling D2C Brands', [
  { label: 'Size', val: 'Rs. 1Cr - Rs. 20Cr GMV' },
  { label: 'Cash Cycle', val: 'Inventory lock + ad burn' },
  { label: 'Primary Need', val: 'Channel profitability & reorder cash' },
  { label: 'Core Trigger', val: 'Festive stock builds, Meta ad spend' },
  { label: 'Willingness to Pay', val: 'Moderate to High (Growth)' },
  'Working capital tied up across Amazon, Shopify, Quick-commerce.',
  'Needs multi-channel payment reconciliation.'
]);

drawCard(doc, 705, 95, 205, 395, '4. CA Advisory Firms', [
  { label: 'Size', val: '3-15 partners (30-100 clients)' },
  { label: 'Workload', val: '40% time on manual data entry' },
  { label: 'Primary Need', val: 'Client MIS decks & AA bank sync' },
  { label: 'Core Trigger', val: 'Month-end client review backlogs' },
  { label: 'Willingness to Pay', val: 'High (Channel Partner rev-share)' },
  'Channel multiplier: 1 CA firm onboards 15-30 client accounts.',
  'Shifts CA practice from compliance to high-margin advisory.'
], { border: COLORS.emerald });

drawFooter(doc, 'Industry interviews; flowfinancebusiness.com target profiling');

// ==================== SLIDE 7: USER PERSONAS ====================
doc.addPage();
drawHeader(doc, 7, 'User Personas', 'Deep empathy with the daily operational friction of Indian business operators.');

drawCard(doc, 45, 95, 425, 190, 'Persona A: Vikram (Tech Startup Founder, Age 29)', [
  { label: 'Context', val: 'Raised Rs. 3 Cr Seed round; 14 months runway.' },
  { label: 'Daily Pain', val: 'Uncertain how hiring 3 engineers impacts runway; dreads preparing monthly investor MIS in Excel.' },
  { label: 'Trigger Event', val: 'Lead investor requests a 12-month forward burn model before next board meeting.' },
  { label: 'Objection', val: '"Will this require me to manually upload CSVs every week?"' },
  { label: 'FlowFinance Hook', val: 'Live Account Aggregator feed + 1-click Investor Update generator.' }
]);

drawCard(doc, 490, 95, 425, 190, 'Persona B: Priya (Digital Agency Owner, Age 34)', [
  { label: 'Context', val: '22-member performance marketing agency; Rs. 45L monthly revenue.' },
  { label: 'Daily Pain', val: 'Enterprise clients delay payment by 75 days; struggles to meet Rs. 18L payroll on the 1st.' },
  { label: 'Trigger Event', val: 'Major client payment bounces right before festive bonus payouts.' },
  { label: 'Objection', val: '"Is it safe to connect our bank account?"' },
  { label: 'FlowFinance Hook', val: 'Automated receivables aging alerts + DPDPA-compliant read-only AA sync.' }
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 45, 295, 425, 195, 'Persona C: Rohan (D2C Brand Founder, Age 32)', [
  { label: 'Context', val: 'Omnichannel apparel brand doing Rs. 1.2 Cr monthly GMV.' },
  { label: 'Daily Pain', val: 'Cash trapped between fabric inventory and 14-day marketplace payout settlement delays.' },
  { label: 'Trigger Event', val: 'Stock-out during Diwali sale due to sudden working capital shortage.' },
  { label: 'Objection', val: '"We already use Zoho Books for GST invoicing."' },
  { label: 'FlowFinance Hook', val: 'Complementary Planning Studio scenario modeling for inventory financing.' }
]);

drawCard(doc, 490, 295, 425, 195, 'Persona D: CA Rajesh Sharma (Senior Partner, Age 44)', [
  { label: 'Context', val: 'Boutique accounting firm in Mumbai managing 45 corporate clients.' },
  { label: 'Daily Pain', val: 'Staff wastes hundreds of hours chasing client bank statements and categorizing ledgers.' },
  { label: 'Trigger Event', val: 'Losing high-value clients to modern tech-enabled virtual CFO firms.' },
  { label: 'Objection', val: '"Does this replace Tally? My team will never switch."' },
  { label: 'FlowFinance Hook', val: 'Zero replacement needed; acts as an automated MIS overlay with 10% partner commissions.' }
], { border: COLORS.emerald });

drawFooter(doc, 'flowfinancebusiness.com customer journey and advisory persona research');

// ==================== SLIDE 8: MARKET ENTRY STRATEGY ====================
doc.addPage();
drawHeader(doc, 8, 'Market Entry: Dual Beachhead', 'Simultaneous direct PLG acquisition and compounding CA channel activation.');

drawCard(doc, 45, 95, 425, 275, 'Beachhead 1: B2B Services Agencies (Direct PLG)', [
  'Why this segment?',
  '• Immediate urgency: High DSO (60-90 days) makes cash tracking critical.',
  '• High digital literacy: Already comfortable using cloud SaaS (Slack/Notion).',
  '• Fast sales cycle: 7-day self-serve trial conversion without committee approval.',
  '• Value Proposition: "Protect your payroll. Track overdue receivables and forecast 90-day cash flow automatically."',
  '• Acquisition Channels: Targeted LinkedIn thought leadership, agency Slack groups, and high-intent SEO content.'
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 490, 95, 425, 275, 'Beachhead 2: Chartered Accountants (Channel Multiplier)', [
  'Why this segment?',
  '• 1-to-many leverage: 1 onboarded CA brings 15 to 30 paying client accounts.',
  '• Extreme retention: Clients rarely churn when their trusted CA manages the tool.',
  '• Solves data ingestion: CAs actively assist clients in connecting bank feeds.',
  '• Value Proposition: "Cut client review time by 60%. Deliver automated CFO-grade MIS decks to every client."',
  '• Acquisition Channels: Direct partnership alliances, ICAI regional study circles, and tiered Level 2 commercial incentives (10% rev-share).'
], { border: COLORS.emerald });

// Strategic flywheel box
doc.roundedRect(45, 385, 870, 105, 6).fillAndStroke('#ffffff', '#cbd5e1');
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(COLORS.navy).text('The Dual Beachhead Growth Flywheel:', 60, 397);
doc.font('Helvetica').fontSize(9).fillColor(COLORS.slateDark).text(
  'Direct acquisition of B2B agencies seeds the market with active workspaces and creates rapid early revenue. In turn, agency founders invite their external CAs to review their FlowFinance dashboards. Once exposed to the product\'s automated MIS and Account Aggregator feeds, those CAs onboard their broader client rosters—unlocking viral, low-CAC compounding scale.',
  60, 415, { width: 840, lineGap: 2.5 }
);

drawFooter(doc, 'Market entry strategic analysis; ICAI CA directory benchmarks');

// ==================== SLIDE 9: POSITIONING & MESSAGING ====================
doc.addPage();
drawHeader(doc, 9, 'Positioning & Messaging Architecture', 'Clear, segment-specific messaging that eliminates data-sharing friction.');

drawCard(doc, 45, 95, 275, 395, 'Message Pillar 1: Non-Finance Founders', [
  { label: 'Core Fear', val: '"I don\'t understand accounting jargon and dread looking at P&L sheets."' },
  { label: 'FlowFinance Hook', val: 'Natural-language simplicity via Flowy Copilot.' },
  { label: 'Headline Hook', val: '"Know your runway. Eliminate cash surprises."' },
  '• Ask plain-English questions: "How much can we spend on marketing this quarter?"',
  '• Visual scenario modeling without breaking spreadsheet formulas.',
  '• 7-day free trial with no credit card required upfront.'
]);

drawCard(doc, 342, 95, 275, 395, 'Message Pillar 2: Agency & MSME Owners', [
  { label: 'Core Fear', val: '"Profitable on paper, but broke on the 1st of the month."' },
  { label: 'FlowFinance Hook', val: 'Automated receivables tracking & bank sync.' },
  { label: 'Headline Hook', val: '"Stop chasing spreadsheets. Protect your payroll."' },
  '• Real-time tracking of delayed receivables under Section 43B(h).',
  '• Priority alerts on payment collection bottlenecks.',
  '• Clean multi-bank consolidation in one single dashboard.'
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 640, 95, 275, 395, 'Message Pillar 3: Chartered Accountants', [
  { label: 'Core Fear', val: '"Spending 80% of our firm\'s time on low-value data cleaning."' },
  { label: 'FlowFinance Hook', val: 'Automated MIS reporting & Account Aggregator.' },
  { label: 'Headline Hook', val: '"Supercharge your firm. Deliver CFO advisory."' },
  '• Turn client bank statements into instant MIS presentations.',
  '• Seamless export bridge into Tally desktop ledgers.',
  '• 10% first-month recurring commission on verified client signups.'
], { border: COLORS.emerald });

drawFooter(doc, 'flowfinancebusiness.com brand positioning and value propositions');

// ==================== SLIDE 10: ACQUISITION SCORECARD ====================
doc.addPage();
drawHeader(doc, 10, 'Acquisition Channel Scorecard', 'Evaluating channels across CAC, velocity, scalability, and implementation risk.');

const acqHeaders = ['CHANNEL', 'REL. CAC', 'VELOCITY', 'SCALABILITY', 'RISK', 'STRATEGIC ROLE'];
const colX = [55, 220, 310, 410, 520, 630];
const tableY10 = 95;

doc.rect(45, tableY10, 870, 24).fill(COLORS.navy);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.white);
acqHeaders.forEach((h, i) => doc.text(h, colX[i], tableY10 + 7));

const acqRows = [
  { ch: '1. CA Partner Network', cac: 'Low-Mod', vel: 'Moderate (3-6 wks)', sca: 'Very High', rsk: 'Low', role: 'Primary compounding flywheel (1:25 ratio)' },
  { ch: '2. Startup Incubators / Hubs', cac: 'Low', vel: 'Fast (1-3 wks)', sca: 'Moderate', rsk: 'Low', role: 'High-conversion institutional cohorts' },
  { ch: '3. Organic LinkedIn / Content', cac: 'Very Low', vel: 'Moderate (4-8 wks)', sca: 'High', rsk: 'Very Low', role: 'Thought leadership & inbound authority' },
  { ch: '4. Campus Venture Fellows', cac: 'Very Low', vel: 'Fast (1-2 wks)', sca: 'Moderate', rsk: 'Low', role: 'Grassroots discovery in top B-schools' },
  { ch: '5. Strategic B2B Partnerships', cac: 'Moderate', vel: 'Moderate (4-8 wks)', sca: 'Very High', rsk: 'Moderate', role: 'Scale distribution with co-working hubs' },
  { ch: '6. Performance Paid Ads', cac: 'High', vel: 'Immediate (<1 wk)', sca: 'High', rsk: 'High', role: 'Tactical high-intent search capture' },
  { ch: '7. Consultative Direct Outbound', cac: 'Mod-High', vel: 'Fast-Mod (2-4 wks)', sca: 'Low-Mod', rsk: 'Low', role: 'High-touch close for multi-partner CA firms' }
];

let rowY10 = tableY10 + 24;
acqRows.forEach((r, idx) => {
  const isAlt = idx % 2 === 1;
  doc.rect(45, rowY10, 870, 34).fill(isAlt ? '#f8fafc' : '#ffffff');
  if (idx === 0) doc.rect(45, rowY10, 870, 34).fill('#eef2ff');
  doc.font(idx === 0 ? 'Helvetica-Bold' : 'Helvetica').fontSize(8).fillColor(idx === 0 ? COLORS.indigo : COLORS.slateDark);
  doc.text(r.ch, colX[0], rowY10 + 10);
  doc.text(r.cac, colX[1], rowY10 + 10);
  doc.text(r.vel, colX[2], rowY10 + 10);
  doc.text(r.sca, colX[3], rowY10 + 10);
  doc.text(r.rsk, colX[4], rowY10 + 10);
  doc.text(r.role, colX[5], rowY10 + 10, { width: 270 });
  rowY10 += 34;
});

// Ethical marketing note
doc.roundedRect(45, 395, 870, 95, 6).fillAndStroke('#fef3c7', '#f59e0b');
doc.font('Helvetica-Bold').fontSize(10).fillColor('#b45309').text('Non-Negotiable Ethical Acquisition Guardrails:', 60, 407);
doc.font('Helvetica').fontSize(8.5).fillColor('#78350f').text(
  '• Zero tolerance for bulk automated spam, unconsented cold scraping, fake signups, or circular self-referrals.\n' +
  '• Under Level 2 rules, verified paid conversions must tie to active registered entities with live bank feeds or statements.\n' +
  '• All outbound is strictly consultative, value-first, and compliant with DPDPA 2023 regulations.',
  60, 425, { width: 840, lineGap: 3 }
);

drawFooter(doc, 'Channel benchmark analysis; 02_Acquisition_Strategy.md');

// ==================== SLIDE 11: DISTRIBUTION ENGINE ====================
doc.addPage();
drawHeader(doc, 11, 'Distribution Engine: 4 Pillars', 'Four integrated distribution vectors driving sustainable, low-CAC customer acquisition.');

drawCard(doc, 45, 95, 205, 395, 'Pillar 1: Campus Fellows', [
  { label: 'Focus', val: 'Premier E-Cells & B-Schools' },
  { label: 'Partners', val: 'IIT Bombay, IIMB NSRCEL, BITS' },
  { label: 'Mechanism', val: 'Campus Venture Fellows' },
  '• Host 45-min masterclasses on startup financial modeling.',
  '• Onboard campus-incubated student & alumni startups.',
  '• Rewarded via verified entity milestones; strict anti-abuse rules.'
]);

drawCard(doc, 265, 95, 205, 395, 'Pillar 2: Community Hubs', [
  { label: 'Focus', val: 'Founder Ecosystems & Incubators' },
  { label: 'Partners', val: 'TiE Chapters, Headstart, SaaSBoomi' },
  { label: 'Mechanism', val: 'Financial Health Clinics' },
  '• Bi-weekly virtual clinics diagnosing startup burn rate.',
  '• Co-branded "Founder Finance Stack" downloadable toolkits.',
  '• In-app founder referral credits upon verified peer activation.'
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 485, 95, 205, 395, 'Pillar 3: CA Alliances', [
  { label: 'Focus', val: 'Boutique CA & Virtual CFO Firms' },
  { label: 'Partners', val: 'Independent accounting practices' },
  { label: 'Mechanism', val: 'Practice Partner Program' },
  '• Automated MIS generation cuts review time by 60%.',
  '• Level 2 commercial alignment: 10% first-month commission.',
  '• Multi-client partner dashboard for CAs managing 5+ clients.'
], { border: COLORS.emerald });

drawCard(doc, 705, 95, 205, 395, 'Pillar 4: Authority Content', [
  { label: 'Focus', val: 'Statutory & Runway Playbooks' },
  { label: 'Topics', val: 'Section 43B(h), GSTR-2B ITC, DSO' },
  { label: 'Mechanism', val: 'Interactive Web Calculators' },
  '• Free ungated calculators: Startup Burn & 43B(h) Penalty.',
  '• High search intent captures founders facing cash blocks.',
  '• Direct funnel into 7-day free trial sandbox demo.'
]);

drawFooter(doc, '03_Distribution_Strategy.md; flowfinancebusiness.com');

// ==================== SLIDE 12: PARTNERSHIPS ====================
doc.addPage();
drawHeader(doc, 12, 'Strategic Partnerships', 'Multiplying reach through institutional incubators, CA firms, and neobanks.');

drawCard(doc, 45, 95, 425, 185, '1. CA Firms & Virtual CFO Practices', [
  { label: 'Target', val: 'Boutique firms (3-15 partners) managing 30-100 clients.' },
  { label: 'Value Exchange', val: 'Automates manual client statement reconciliation in exchange for client onboarding.' },
  { label: 'Commercials', val: '10% first-month commission + milestone rewards (Rs. 4k at 5, Rs. 7k at 7, Rs. 11k at 10).' },
  { label: 'Integration', val: 'Multi-tenant client practice console with Tally export bridge.' }
], { border: COLORS.emerald });

drawCard(doc, 490, 95, 425, 185, '2. Incubators & Accelerators (Runway Alliance)', [
  { label: 'Target', val: 'T-Hub, NSRCEL, SINE IIT Bombay, Villgro.' },
  { label: 'Value Exchange', val: '3 months free Growth Plan for active cohort startups; reduces startup failure rates.' },
  { label: 'Cohort Benefit', val: 'Standardized monthly investor update decks shared directly with incubator heads.' },
  { label: 'Activation', val: 'Dedicated cohort onboarding masterclasses on runway management.' }
]);

drawCard(doc, 45, 295, 425, 195, '3. Neobanks, Payment Rails & NBFCs', [
  { label: 'Target', val: 'RazorpayX, Cashfree, ICICI Bank, Working Capital NBFCs.' },
  { label: 'Value Exchange', val: 'Contextual invoice payment links; qualified credit underwriting leads via AA data.' },
  { label: 'Fintech Hook', val: 'Embedded invoice financing: SMBs unlock 80% working capital against overdue invoices.' },
  { label: 'Revenue Share', val: '0.5% - 1.0% origination fee on disbursed invoice financing volume.' }
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 490, 295, 425, 195, '4. Accounting & Compliance Resellers', [
  { label: 'Target', val: 'Tally Certified Partners & regional accounting software vendors.' },
  { label: 'Value Exchange', val: 'Recurring SaaS revenue stream sold as an intelligence add-on to traditional Tally.' },
  { label: 'Differentiation', val: 'Positions traditional IT vendors as modern cloud business advisors.' },
  { label: 'Technical Bridge', val: '1-click Tally XML/TDL data export utility for seamless ledger sync.' }
]);

drawFooter(doc, '04_Partnerships.md; RBI Account Aggregator master directions');

// ==================== SLIDE 13: CONVERSION FRAMEWORK ====================
doc.addPage();
drawHeader(doc, 13, 'Conversion Framework', 'Isolating the primary "Aha!" moment and systematically compressing drop-offs.');

drawCard(doc, 45, 95, 425, 185, 'The Critical Activation Metric (The "Aha!" Moment)', [
  'Connecting a live bank feed via Account Aggregator is the primary predictor of paid conversion.',
  '• Psychological shift: Moving from sandbox exploration to proprietary financial stakes.',
  '• Immediate payoff: Within 120 seconds, user views their true 90-day cash runway.',
  '• Conversational value: User asks Flowy Copilot: "What is our net monthly burn rate?"',
  '• Fallback ingestion: Instant drag-and-drop PDF statement parsing for non-AA banks.'
], { border: COLORS.indigo, bg: '#eef2ff' });

drawCard(doc, 490, 95, 425, 185, 'Funnel Drop-off Benchmarks (Modeled Assumptions)', [
  { label: 'Visitor to Trial', val: '4.5% (Enabled by zero credit card requirement) [Assumption]' },
  { label: 'Trial to Activated', val: '55.0% (45% drop-off due to bank sync hesitation) [Assumption]' },
  { label: 'Activated to Value', val: '65.0% (35% drop-off due to passive non-engagement) [Assumption]' },
  { label: 'Value to Paid', val: '22.0% (Conversion into Essential/Growth/Prof.) [Assumption]' },
  { label: 'M3 Retention', val: '92.0% (8% net churn once bank feeds are active) [Assumption]' }
]);

// Step-by-step conversion timeline
doc.roundedRect(45, 295, 870, 195, 6).fillAndStroke('#ffffff', '#cbd5e1');
doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy).text('7-Day Trial Conversion Acceleration Sequence:', 60, 310);

const convSteps = [
  { day: 'Day 0', title: 'Guided Setup Checklist', desc: 'Connect bank via AA + ask Flowy first question. Fallback PDF parser eliminates setup stalls.' },
  { day: 'Day 2', title: 'Automated Insight Alert', desc: 'WhatsApp/Email notification: "Your runway is 6.4 months; Rs. 3.8L receivables due this week."' },
  { day: 'Day 5', title: 'Pre-Paywall Deliverable', desc: 'In-app prompt: Generate a complimentary 1-Click Monthly Investor MIS Deck.' },
  { day: 'Day 7', title: 'Value-Led Paywall Gate', desc: 'Display plan selection (Essential Rs. 1,999 vs Growth Rs. 3,999). 7-day extension for onboarding call.' }
];

let csY = 330;
convSteps.forEach(s => {
  doc.roundedRect(60, csY, 840, 34, 4).fillAndStroke('#f8fafc', '#e2e8f0');
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.indigo).text(`[${s.day}] ${s.title}: `, 75, csY + 10, { continued: true });
  doc.font('Helvetica').fontSize(9).fillColor(COLORS.slateDark).text(s.desc);
  csY += 38;
});

drawFooter(doc, '05_Conversion_Framework.md; B2B SaaS conversion benchmarks');

// ==================== SLIDE 14: RETENTION & EXPANSION ====================
doc.addPage();
drawHeader(doc, 14, 'Retention & Expansion', 'Driving Net Revenue Retention (NRR > 110%) through viral loops and tier upgrades.');

drawCard(doc, 45, 95, 275, 395, '1. External Collaborator Loop', [
  { label: 'Mechanism', val: 'In-app advisor invitation' },
  '• Founder invites their external CA or Angel Investor to view live MIS decks.',
  '• The CA experiences the platform\'s speed and automated categorization.',
  '• Viral Loop: The CA adopts the platform and recommends it across their portfolio of 20-50 other SMB clients.',
  '• Transforms users into zero-cost brand ambassadors.'
], { border: COLORS.emerald });

drawCard(doc, 342, 95, 275, 395, '2. Monday Morning Ritual', [
  { label: 'Mechanism', val: 'Automated weekly digest' },
  '• Automated WhatsApp & Email cash intelligence digest delivered every Monday at 8:00 AM.',
  '• Summarizes cash in bank, expected receivables, payroll commitments, and runway delta.',
  '• Result: Embeds FlowFinance as the default weekly operating ritual for founders.',
  '• Slashes passive churn to <2.5% monthly [Assumption].'
], { border: COLORS.indigo, bg: '#f8fafc' });

drawCard(doc, 640, 95, 275, 395, '3. Natural Tier Expansion', [
  { label: 'Mechanism', val: 'Operational feature gates' },
  '• Essential (Rs. 1,999/mo): Solo founders tracking basic cash position.',
  '• Upgrade to Growth (Rs. 3,999/mo): Adding secondary bank accounts, headcount planning, 3-scenario runway models.',
  '• Upgrade to Professional (Rs. 7,999/mo): Multi-entity consolidation, custom MIS reports, dedicated API feeds.',
  '• Generates >110% NRR over customer lifecycle.'
]);

drawFooter(doc, '05_Conversion_Framework.md; flowfinancebusiness.com/pricing');

// ==================== SLIDE 15: KPI FRAMEWORK ====================
doc.addPage();
drawHeader(doc, 15, 'KPI Framework & Unit Economics', '24.2x LTV/CAC ratio and 1.65-month payback validate high capital efficiency.');

drawCard(doc, 45, 95, 425, 205, 'Operational KPI Scorecard (Starting Targets)', [
  { label: 'Unique Site Visitors', val: '15,000 / month [Assumption]' },
  { label: 'Visitor-to-Trial Rate', val: '4.5% (675 trial signups/mo) [Assumption]' },
  { label: 'Data Ingestion Activation Rate', val: '55.0% (371 connected workspaces) [Assumption]' },
  { label: 'Trial-to-Paid Conversion Rate', val: '22.0% (82 paid subscribers/mo) [Assumption]' },
  { label: 'Monthly Logo Churn', val: '< 2.5% / month [Assumption]' },
  { label: 'Net Revenue Retention (NRR)', val: '> 110% annualized [Assumption]' }
]);

drawCard(doc, 490, 95, 425, 205, 'Unit Economics Derivation Model', [
  { label: 'Blended ARPU', val: 'Rs. 3,200 / month (Rs. 38,400 / year) [Assumption]' },
  { label: 'Gross Margin', val: '85% (Net of AA API & cloud inference) [Assumption]' },
  { label: 'Average Customer Lifetime', val: '40 Months (1 / 0.025 monthly churn)' },
  { label: 'Customer Lifetime Value (LTV)', val: 'Rs. 1,08,800 (ARPU x Margin x Lifetime)' },
  { label: 'Blended Acquisition Cost (CAC)', val: 'Rs. 4,500 / customer [Assumption]' },
  { label: 'LTV to CAC Ratio', val: '24.18x (Exceptional capital efficiency)' },
  { label: 'CAC Payback Period', val: '1.65 Months (< 50 days to breakeven)' }
], { border: COLORS.emerald, bg: '#f0fdf4' });

// North Star Metric Box
doc.roundedRect(45, 315, 870, 175, 6).fillAndStroke('#f8fafc', '#cbd5e1');
doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy).text('FlowFinance North Star Metric: Monthly Verified Retained Workspaces (MVRW)', 60, 330);
doc.font('Helvetica').fontSize(9).fillColor(COLORS.slateDark).text(
  'Why MVRW?\n' +
  '• Pure top-of-funnel signups are misleading in a credit-card-free trial environment.\n' +
  '• MVRW measures workspaces that have (1) connected verified bank feeds via Account Aggregator, (2) paid active subscriptions, and (3) engaged with weekly cash reports for >=60 days.\n' +
  '• Year 1 Operational Target: Scale to 500 active MVRW, generating Rs. 16,00,000 in Monthly Recurring Revenue (Rs. 1.92 Cr ARR) with an exceptional 1.65-month payback cycle [Modeled Assumption].',
  60, 350, { width: 840, lineGap: 3 }
);

drawFooter(doc, '06_KPI_Framework.md; Bessemer SaaS metrics methodology');

// ==================== SLIDE 16: ROADMAP & RISKS ====================
doc.addPage();
drawHeader(doc, 16, 'Roadmap & Challenge Milestones', 'Structured 12-week execution driving 10 verified conversions and Level 2 rewards.');

drawCard(doc, 45, 95, 425, 235, 'Level 1: Foundation (Weeks 1-4)', [
  { label: 'Week 1', val: 'Platform audit; Account Aggregator stability testing; PDF fallback parser.' },
  { label: 'Week 2', val: 'Direct beachhead pilot targeting 50 boutique B2B services agencies.' },
  { label: 'Week 3', val: 'Onboarding optimization; reduce Time-to-Value to <15 mins.' },
  { label: 'Week 4', val: 'Onboard 5 initial pilot workspaces; finalize Level 2 CA partner collateral.' },
  'Outcome: Validated value proposition and baseline conversion metrics.'
]);

drawCard(doc, 490, 95, 425, 235, 'Level 2: Scale & Milestones (Weeks 5-12)', [
  { label: 'Weeks 5-6 (Milestone 1)', val: 'CA partner rollout -> 5 Verified Paid Conversions (Unlocks Rs. 4,000 Reward + 10% commission).' },
  { label: 'Weeks 7-8 (Milestone 2)', val: 'Incubator masterclasses (T-Hub/NSRCEL) -> 7 Conversions (Unlocks Rs. 7,000 Reward).' },
  { label: 'Weeks 9-10 (Milestone 3)', val: 'Campus Fellow Network -> 10 Conversions (Unlocks Rs. 11,000 Maximum Reward).' },
  { label: 'Weeks 11-12', val: 'Launch Tally XML export bridge; 60-day cohort retention audit.' },
  'Total Potential Earnings: Rs. 14,200 (Rs. 11,000 bonus + Rs. 3,200 commission).'
], { border: COLORS.emerald, bg: '#f0fdf4' });

// Risk & Contingency table
doc.roundedRect(45, 345, 870, 145, 6).fillAndStroke('#ffffff', '#cbd5e1');
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(COLORS.navy).text('Risk Management & Contingency Safeguards:', 60, 357);

const risks = [
  { rsk: 'Bank AA Gateway Downtime', imp: 'High', mit: 'Automated drag-and-drop PDF/Excel statement parser with AI OCR as instant fallback.' },
  { rsk: 'CA Inertia due to Tally Loyalty', imp: 'High', mit: 'Position as non-disruptive MIS overlay; provide 1-click Tally XML data export utility.' },
  { rsk: 'Fake / Self-Referral Conversions', imp: 'High', mit: 'Strict verification: Must link to verified Indian legal entity with live bank activity.' },
  { rsk: 'Price Resistance in Tier 2/3 MSMEs', imp: 'Mod', mit: 'Focus strictly on high-margin agencies & venture startups where Rs. 2k-4k/mo is negligible.' }
];

let rskY = 377;
risks.forEach(r => {
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.indigo).text(`• ${r.rsk} [${r.imp}]: `, 60, rskY, { continued: true });
  doc.font('Helvetica').fontSize(8.5).fillColor(COLORS.slateDark).text(r.mit);
  rskY += 16;
});

drawFooter(doc, '07_Roadmap.md; FlowFinance Challenge Level 2 Guidelines');

doc.end();

writeStream.on('finish', () => {
  console.log('FlowFinance_Growth_Deck.pdf generated successfully at: ' + outputPath);
});
