import { db } from "@workspace/db";
import { organizationsTable, jobsTable } from "@workspace/db/schema";

const organizations = [
  // ── UN AGENCIES ──────────────────────────────────────────────────────────
  {
    name: "UNHCR Kenya",
    description:
      "The UN Refugee Agency (UNHCR) works to protect and support refugees, asylum seekers, internally displaced and stateless people in Kenya. UNHCR Kenya operates in Nairobi, Kakuma, and Dadaab — the world's largest refugee complex — supporting over 500,000 persons of concern.",
    logo_url: "https://logo.clearbit.com/unhcr.org",
    website: "https://www.unhcr.org/ke/",
    type: "UN",
  },
  {
    name: "UNICEF Kenya",
    description:
      "UNICEF works to protect the rights of every child in Kenya. Our programmes focus on child survival and development, education, child protection, and policy advocacy. We partner with the Government of Kenya and civil society to reach the most vulnerable children across all 47 counties.",
    logo_url: "https://logo.clearbit.com/unicef.org",
    website: "https://www.unicef.org/kenya/",
    type: "UN",
  },
  {
    name: "WFP Kenya",
    description:
      "The World Food Programme (WFP) is the world's largest humanitarian organization fighting hunger. In Kenya, WFP tackles food insecurity and malnutrition, provides school meals, and supports government capacity building on social protection and disaster risk management.",
    logo_url: "https://logo.clearbit.com/wfp.org",
    website: "https://www.wfp.org/countries/kenya",
    type: "UN",
  },
  {
    name: "WHO Kenya",
    description:
      "The World Health Organization (WHO) works with the Government of Kenya to improve health outcomes, strengthen health systems, prepare for and respond to health emergencies, and address disease burdens including HIV/AIDS, malaria, tuberculosis, and non-communicable diseases.",
    logo_url: "https://logo.clearbit.com/who.int",
    website: "https://www.afro.who.int/countries/kenya",
    type: "UN",
  },
  {
    name: "IOM Kenya",
    description:
      "The International Organization for Migration (IOM) is committed to the principle that humane and orderly migration benefits migrants and society. In Kenya, IOM manages displacement monitoring, assists refugees and migrants, supports border management, and implements community stabilization programs.",
    logo_url: "https://logo.clearbit.com/iom.int",
    website: "https://kenya.iom.int/",
    type: "UN",
  },
  {
    name: "UNDP Kenya",
    description:
      "UNDP Kenya works to achieve the Sustainable Development Goals by helping Kenya reduce poverty, build democratic governance, rule of law, and inclusive institutions. Key focus areas include climate change, economic transformation, energy access, and resilience programming.",
    logo_url: "https://logo.clearbit.com/undp.org",
    website: "https://www.undp.org/kenya",
    type: "UN",
  },
  {
    name: "OCHA Kenya",
    description:
      "The UN Office for the Coordination of Humanitarian Affairs (OCHA) Kenya coordinates humanitarian response to ensure effective and principled assistance. OCHA facilitates information management, supports humanitarian leadership, and advocates for the needs of people affected by crises.",
    logo_url: "https://logo.clearbit.com/unocha.org",
    website: "https://www.unocha.org/kenya",
    type: "UN",
  },
  {
    name: "UN Women Kenya",
    description:
      "UN Women Kenya works to empower women and girls through gender equality programmes, policy advocacy, and coordination of UN system efforts. Focus areas include women's economic empowerment, leadership and participation, ending violence against women, and peace and security.",
    logo_url: "https://logo.clearbit.com/unwomen.org",
    website: "https://africa.unwomen.org/en/where-we-are/eastern-and-southern-africa/kenya",
    type: "UN",
  },
  {
    name: "FAO Kenya",
    description:
      "The Food and Agriculture Organization (FAO) Kenya supports sustainable agriculture, food security, and rural development. FAO provides technical assistance to the government and farmers, responds to food emergencies such as drought, and promotes climate-resilient agricultural practices.",
    logo_url: "https://logo.clearbit.com/fao.org",
    website: "https://www.fao.org/kenya/en/",
    type: "UN",
  },
  {
    name: "ILO Kenya",
    description:
      "The International Labour Organization (ILO) Kenya promotes rights at work, decent employment opportunities, social protection, and social dialogue. Key programmes focus on youth employment, skills development, labour standards, and supporting Kenya's transition to a formalized economy.",
    logo_url: "https://logo.clearbit.com/ilo.org",
    website: "https://www.ilo.org/africa/countries-covered/kenya/lang--en/index.htm",
    type: "UN",
  },

  // ── NGOs ─────────────────────────────────────────────────────────────────
  {
    name: "Save the Children Kenya",
    description:
      "Save the Children has worked in Kenya since 1984. We fight for children's rights and deliver immediate and lasting improvement to their lives. Our work covers child protection, education in emergencies, health and nutrition, and livelihoods support for families.",
    logo_url: "https://logo.clearbit.com/savethechildren.org",
    website: "https://www.savethechildren.net/where-we-work/kenya",
    type: "NGO",
  },
  {
    name: "Oxfam Kenya",
    description:
      "Oxfam Kenya works to build a fairer world free from poverty. We run long-term programmes on food security, water and sanitation, gender justice, and emergency response. We also advocate for systemic change to tackle the root causes of poverty in Kenya.",
    logo_url: "https://logo.clearbit.com/oxfam.org",
    website: "https://www.oxfam.org/en/countries/kenya",
    type: "NGO",
  },
  {
    name: "MSF Kenya",
    description:
      "Médecins Sans Frontières (MSF) provides medical and humanitarian assistance to people in Kenya affected by armed conflicts, epidemics, disasters, or exclusion from healthcare. MSF operates in Nairobi, the coast, and arid and semi-arid regions providing life-saving medical care.",
    logo_url: "https://logo.clearbit.com/msf.org",
    website: "https://www.msf.org/kenya",
    type: "NGO",
  },
  {
    name: "IRC Kenya",
    description:
      "The International Rescue Committee (IRC) responds to some of the world's worst humanitarian crises in Kenya. Since 1992, IRC has been providing emergency relief and post-conflict reconstruction to refugees in Kakuma and host communities across Kenya.",
    logo_url: "https://logo.clearbit.com/rescue.org",
    website: "https://www.rescue.org/country/kenya",
    type: "NGO",
  },
  {
    name: "World Vision Kenya",
    description:
      "World Vision Kenya has been transforming communities for over 40 years through community development, advocacy, and emergency relief. We reach millions of the most vulnerable children through our Area Programmes across Kenya's 47 counties.",
    logo_url: "https://logo.clearbit.com/worldvision.org",
    website: "https://www.wvi.org/kenya",
    type: "NGO",
  },
  {
    name: "CARE International Kenya",
    description:
      "CARE International Kenya puts special focus on working with women and girls to bring lasting change to communities. Our programmes address food security, WASH, health, economic empowerment, and humanitarian response across Kenya.",
    logo_url: "https://logo.clearbit.com/care.org",
    website: "https://www.care.org/our-work/where-we-work/kenya/",
    type: "NGO",
  },
  {
    name: "Action Against Hunger Kenya",
    description:
      "Action Against Hunger (ACF) has been delivering lifesaving nutrition, health, WASH and food security programmes in Kenya since 1996, reaching the most vulnerable communities in Nairobi, Mandera, Wajir, Isiolo, Marsabit, and Turkana counties.",
    logo_url: "https://logo.clearbit.com/actionagainsthunger.org",
    website: "https://www.actionagainsthunger.org/country/kenya/",
    type: "NGO",
  },
  {
    name: "Norwegian Refugee Council Kenya",
    description:
      "The Norwegian Refugee Council (NRC) is an independent humanitarian organisation helping people forced to flee in Kenya. NRC provides assistance in shelter, education, legal protection, information and counselling services, and livelihoods to refugees and internally displaced people.",
    logo_url: "https://logo.clearbit.com/nrc.no",
    website: "https://www.nrc.no/countries/africa/kenya/",
    type: "NGO",
  },
  {
    name: "Danish Refugee Council Kenya",
    description:
      "The Danish Refugee Council (DRC) has been operating in Kenya since 1996. DRC provides protection, livelihoods, WASH, shelter, and food security assistance to refugees and host communities in Dadaab, Kakuma and Nairobi.",
    logo_url: "https://logo.clearbit.com/drc.ngo",
    website: "https://www.drc.ngo/where-we-work/east-africa/kenya",
    type: "NGO",
  },
  {
    name: "Mercy Corps Kenya",
    description:
      "Mercy Corps Kenya builds stronger communities by addressing the root causes of poverty and conflict. Our programmes focus on economic opportunities, climate resilience, food security, and market systems development across Kenya and the greater Horn of Africa region.",
    logo_url: "https://logo.clearbit.com/mercycorps.org",
    website: "https://www.mercycorps.org/where-we-work/kenya",
    type: "NGO",
  },
  {
    name: "Plan International Kenya",
    description:
      "Plan International Kenya has been working for children's rights and equality for girls since 1983. We focus on education, health, youth empowerment, and child protection, with a particular emphasis on ending child marriage and female genital mutilation.",
    logo_url: "https://logo.clearbit.com/plan-international.org",
    website: "https://plan-international.org/kenya/",
    type: "NGO",
  },
  {
    name: "GOAL Kenya",
    description:
      "GOAL Kenya is an international humanitarian organisation working in Nairobi's informal settlements and Northern Kenya. Our programmes focus on urban health, nutrition, WASH, livelihoods, and responding to food crises and disease outbreaks.",
    logo_url: "https://logo.clearbit.com/goal.ie",
    website: "https://www.goal.ie/en-gb/countries/kenya/",
    type: "NGO",
  },
  {
    name: "Islamic Relief Kenya",
    description:
      "Islamic Relief Kenya has been providing emergency relief and development assistance since 1993. We work across Kenya on food security, WASH, education, livelihoods, and orphan sponsorship, serving all people regardless of race, religion, or gender.",
    logo_url: "https://logo.clearbit.com/islamic-relief.org",
    website: "https://www.islamic-relief.org/country/kenya/",
    type: "NGO",
  },
  {
    name: "Catholic Relief Services Kenya",
    description:
      "Catholic Relief Services (CRS) Kenya has been assisting Kenyans since 1965. CRS implements programmes in agriculture, health, emergency response, peacebuilding, and education, partnering with the Catholic Church and local organisations across Kenya.",
    logo_url: "https://logo.clearbit.com/crs.org",
    website: "https://www.crs.org/our-work-overseas/where-we-work/kenya",
    type: "NGO",
  },
  {
    name: "Tearfund Kenya",
    description:
      "Tearfund Kenya partners with local churches and organisations to tackle poverty and injustice. Our work covers disaster risk reduction, climate resilience, livelihoods, and mental health and psychosocial support for communities across Kenya.",
    logo_url: "https://logo.clearbit.com/tearfund.org",
    website: "https://www.tearfund.org/",
    type: "NGO",
  },
  {
    name: "AMREF Health Africa",
    description:
      "AMREF Health Africa is Africa's largest homegrown health NGO, founded in Kenya in 1957. We develop, test, and scale health solutions for communities across Kenya and the continent, focusing on health system strengthening, maternal and child health, and disease prevention.",
    logo_url: "https://logo.clearbit.com/amref.org",
    website: "https://amref.org/country/kenya/",
    type: "NGO",
  },
  {
    name: "Kenya Red Cross Society",
    description:
      "Kenya Red Cross Society (KRCS) is a leading humanitarian organisation established in 1965. KRCS responds to disasters and emergencies across Kenya, and runs long-term programmes on blood services, health, disaster risk reduction, and community resilience.",
    logo_url: "https://logo.clearbit.com/redcross.or.ke",
    website: "https://www.redcross.or.ke/",
    type: "NGO",
  },
  {
    name: "Concern Worldwide Kenya",
    description:
      "Concern Worldwide Kenya works with the most vulnerable communities to tackle poverty and humanitarian crises. Our programmes focus on nutrition, health, livelihoods, education, and emergency response in Marsabit, Samburu, Isiolo, Turkana, and urban Nairobi.",
    logo_url: "https://logo.clearbit.com/concern.net",
    website: "https://www.concern.net/where-we-work/africa/kenya",
    type: "NGO",
  },
  {
    name: "Africa Humanitarian Action",
    description:
      "Africa Humanitarian Action (AHA) is an African-led humanitarian organisation delivering health, nutrition, and emergency response programmes across the Horn of Africa and East Africa, including Kenya. AHA is committed to locally-led humanitarian action.",
    logo_url: "https://logo.clearbit.com/africahumanitarianaction.org",
    website: "https://www.africahumanitarianaction.org/",
    type: "NGO",
  },
  {
    name: "Welthungerhilfe Kenya",
    description:
      "Welthungerhilfe (German Agro Action) has been fighting hunger and poverty in Kenya since 1974. Programmes cover food security and agriculture, WASH, economic development, and disaster risk reduction in Kilifi, Kwale, Kitui, and the arid and semi-arid lands.",
    logo_url: "https://logo.clearbit.com/welthungerhilfe.de",
    website: "https://www.welthungerhilfe.org/projects-countries/countries/kenya/",
    type: "NGO",
  },
];

function makeJob(
  organizationIndex: number,
  title: string,
  sector: string,
  location: string,
  employmentType: string,
  deadline: string,
  description: string,
) {
  return {
    organizationIndex,
    title,
    sector,
    location,
    employment_type: employmentType,
    deadline,
    description,
  };
}

const jobTemplates = [
  // ── UNHCR Kenya (0) ──────────────────────────────────────────────────────
  makeJob(0, "Senior Protection Officer", "Protection", "Nairobi, Kenya", "Full-time", "2026-04-30",
    `OVERVIEW
UNHCR Kenya is seeking a Senior Protection Officer to lead refugee protection operations across the Dadaab refugee complex, one of the world's largest refugee hosting areas. The incumbent will supervise protection staff, manage partnerships, and ensure that UNHCR's protection mandate is fulfilled in line with international refugee law and UNHCR's standards.

KEY RESPONSIBILITIES
• Lead and supervise a protection team of 12 staff members across multiple field locations
• Coordinate registration, refugee status determination (RSD), and documentation processes
• Develop and implement the Annual Protection Plan in line with country and regional priorities
• Ensure systematic monitoring of protection risks including sexual and gender-based violence (SGBV)
• Represent UNHCR in protection coordination forums and with government counterparts
• Identify, document, and refer persons with specific needs (PSN) to appropriate services
• Ensure protection mainstreaming across all UNHCR and partner programmes
• Prepare high-quality protection reports, situation reports, and donor updates
• Support durable solutions planning including voluntary repatriation, local integration, and resettlement

REQUIRED QUALIFICATIONS
• Advanced university degree (Master's or equivalent) in Law, International Relations, Political Science, or Social Science
• Minimum 8 years of relevant professional experience in refugee protection or related area
• Extensive knowledge of international refugee and human rights law
• Proven experience in RSD and resettlement processing
• Strong analytical, leadership, and interpersonal skills
• Excellent written and spoken English; knowledge of Somali or Swahili an asset

PREFERRED QUALIFICATIONS
• Prior experience with UNHCR or other UN agency in a similar position
• Experience working in complex humanitarian emergency operations
• Knowledge of the East Africa refugee situation

WHAT WE OFFER
• Competitive UN salary and benefits package (NOB/P3 equivalent)
• Comprehensive health and life insurance coverage
• 30 days of annual leave
• Access to UNHCR's global learning and development programmes`),

  makeJob(0, "Field Associate – Registration", "Protection", "Dadaab, Kenya", "Full-time", "2026-05-15",
    `OVERVIEW
UNHCR Kenya is recruiting a Field Associate for the Registration Unit in Dadaab. The Field Associate will support the registration, documentation, and data management of refugees and asylum seekers, ensuring accuracy and confidentiality of biometric and case data in UNHCR's proGres database.

KEY RESPONSIBILITIES
• Conduct individual and family registration interviews for newly arrived refugees and asylum seekers
• Capture and verify biometric data (fingerprints and iris scans) using UNHCR registration tools
• Update and maintain accurate data in proGres v4 / PRIMES registration database
• Issue and replace documentation including refugee certificates and attestation letters
• Liaise with protection, community services, and implementing partners on case management
• Identify and immediately refer persons with specific needs for priority services
• Conduct community outreach to explain registration processes and entitlements
• Prepare daily and weekly registration statistics and activity reports

REQUIRED QUALIFICATIONS
• University degree in Social Science, Law, Information Management, or related field
• Minimum 3 years experience in refugee operations, registration, or case management
• Strong computer skills including MS Office and database management
• High attention to detail and ability to maintain confidentiality
• Knowledge of Somali or other languages spoken by refugee communities is a strong advantage

WHAT WE OFFER
• UNHCR salary scale (G-5 equivalent) with full benefits
• Hazard pay allowance for field duty station
• 30 days annual leave + public holidays`),

  makeJob(0, "Livelihoods and Economic Inclusion Officer", "Food Security", "Kakuma, Kenya", "Full-time", "2026-06-01",
    `OVERVIEW
UNHCR Kenya seeks a Livelihoods and Economic Inclusion Officer to design and implement livelihood interventions for refugees in Kakuma. The role supports refugees in achieving self-reliance through market-based livelihoods, financial inclusion, and skills development programmes.

KEY RESPONSIBILITIES
• Design, implement and monitor livelihoods programmes for refugees and host communities
• Conduct labour market assessments and value chain analyses to identify sustainable livelihoods opportunities
• Develop financial inclusion strategies in partnership with microfinance institutions and mobile money providers
• Engage private sector partners to facilitate refugee employment and apprenticeship opportunities
• Support refugees in establishing and scaling micro and small enterprises
• Coordinate with education, protection, and WASH colleagues on integrated programming
• Monitor programme implementation against output and outcome indicators
• Prepare donor reports, programme updates, and briefing notes

REQUIRED QUALIFICATIONS
• University degree (Master's preferred) in Economics, Business Administration, International Development, or related field
• Minimum 5 years experience in livelihoods, economic development, or private sector engagement
• Strong understanding of market systems development and value chain approaches
• Experience working with vulnerable and displaced populations
• Excellent analytical and report writing skills

WHAT WE OFFER
• Competitive UNHCR NOA/P2 salary scale and benefits
• Supportive team environment and structured mentoring
• International exposure and career growth opportunities`),

  // ── UNICEF Kenya (1) ─────────────────────────────────────────────────────
  makeJob(1, "Health Specialist – Immunization", "Health", "Nairobi, Kenya", "Full-time", "2026-04-25",
    `OVERVIEW
UNICEF Kenya is seeking a Health Specialist with expertise in immunization to support Kenya's Expanded Programme on Immunization (KEPI). The Health Specialist will provide technical assistance to the Ministry of Health to increase routine immunization coverage, strengthen cold chain systems, and respond to vaccine-preventable disease outbreaks.

KEY RESPONSIBILITIES
• Provide technical support to the Ministry of Health Division of National Vaccines and Immunization Programme
• Support development and implementation of the Kenya Immunization Action Plan (KIAP)
• Coordinate cold chain equipment procurement, installation, and maintenance planning
• Manage and monitor UNICEF immunization programme budgets and grants
• Facilitate social mobilization and community engagement campaigns for immunization
• Support outbreak response planning and implementation for vaccine-preventable diseases
• Prepare donor proposals, programme documents, situation reports, and progress reports
• Build capacity of county and sub-county health teams on immunization data management
• Represent UNICEF in immunization technical working groups and inter-agency meetings

REQUIRED QUALIFICATIONS
• Advanced university degree in Medicine, Public Health, or related medical field
• Minimum 5 years of professional experience in public health or immunization programme management
• Strong knowledge of immunization systems, cold chain, and vaccine management
• Experience in developing country or humanitarian contexts
• Excellent analytical, communication, and interpersonal skills
• Fluency in English required; knowledge of Swahili an advantage

WHAT WE OFFER
• UNICEF NOB/P3 salary and comprehensive benefits package
• International exposure and networking with global health leaders
• Flexible and inclusive work environment`),

  makeJob(1, "Education Officer – Learning Recovery", "Education", "Mombasa, Kenya", "Full-time", "2026-05-20",
    `OVERVIEW
UNICEF Kenya's Education Section seeks an Education Officer to support learning recovery programmes in coastal Kenya, specifically in Mombasa and Kilifi counties. The Education Officer will work with county governments, teachers, and communities to address learning losses and improve the quality of foundational learning.

KEY RESPONSIBILITIES
• Support implementation of the Kenya Learning Recovery Programme with focus on foundational literacy and numeracy
• Coordinate teacher training and support activities with county education departments
• Monitor programme implementation and collect data on learning outcomes
• Support development of low-cost teaching and learning materials
• Facilitate community engagement and school management committee strengthening
• Coordinate with NGO partners implementing education activities in the zone
• Prepare programme reports, donor updates, and case studies
• Represent UNICEF in county-level education coordination forums

REQUIRED QUALIFICATIONS
• University degree in Education, Social Sciences, or related field (Master's preferred)
• Minimum 3 years experience in education programme management or teaching
• Strong understanding of Kenya's education system and curriculum
• Experience in data collection, analysis, and report writing
• Good communication and facilitation skills
• Proficiency in English and Swahili

WHAT WE OFFER
• UNICEF NO-A/P-2 salary scale and full UN benefits
• Professional development and learning opportunities
• Supportive team culture with a focus on results`),

  makeJob(1, "Child Protection Officer – GBV Prevention", "Protection", "Nairobi, Kenya", "Full-time", "2026-06-10",
    `OVERVIEW
UNICEF Kenya's Child Protection Section is looking for a dedicated Child Protection Officer to strengthen GBV prevention and response systems for children in Kenya. The incumbent will support the Government of Kenya and civil society partners to deliver quality case management, community-based prevention, and social norm change programming.

KEY RESPONSIBILITIES
• Support implementation of Kenya's National Action Plan on GBV and Child Protection
• Provide technical assistance to child protection case management systems
• Coordinate community-based psychosocial support programming for GBV survivors
• Support development and rollout of social norms change communication campaigns
• Monitor partner performance and provide on-the-job coaching and mentorship
• Compile and analyse child protection data and prepare regular sector reports
• Represent UNICEF in child protection sub-cluster and inter-agency coordination meetings
• Contribute to resource mobilization by developing concept notes and proposals

REQUIRED QUALIFICATIONS
• University degree in Social Work, Law, Child Development, or related field
• Minimum 3 years of experience in child protection or GBV programming
• Knowledge of case management standards, referral pathways, and survivor-centred approaches
• Excellent communication, networking, and partnership management skills
• Proficiency in English required; Swahili an asset

WHAT WE OFFER
• UNICEF salary and benefits package
• Mentorship and career development within UNICEF's global network
• Meaningful work at the forefront of children's rights`),

  // ── WFP Kenya (2) ────────────────────────────────────────────────────────
  makeJob(2, "Programme Policy Officer – Nutrition", "Nutrition", "Nairobi, Kenya", "Full-time", "2026-05-05",
    `OVERVIEW
WFP Kenya's Nutrition team is seeking a Programme Policy Officer to lead nutrition-sensitive programming and support the Government of Kenya on stunting reduction and acute malnutrition response. The role involves designing, managing, and evaluating nutrition interventions integrated within food assistance programming.

KEY RESPONSIBILITIES
• Lead design and implementation of integrated acute malnutrition management (IMAM) and nutrition-sensitive programmes
• Develop annual programme plans, budgets, and implementation frameworks for nutrition activities
• Provide technical guidance on infant and young child feeding (IYCF) and micronutrient supplementation
• Coordinate nutrition surveys, SMART surveys, and programme evaluations
• Support government counterparts in county nutrition action plans and budget advocacy
• Analyse nutrition data and produce evidence-based programme recommendations
• Prepare donor proposals, situational analyses, and programme progress reports
• Participate in Nutrition Sector coordination meetings and technical working groups

REQUIRED QUALIFICATIONS
• Advanced degree in Nutrition, Public Health, Food Science, or related field
• Minimum 5 years of professional experience in nutrition programming
• Strong technical knowledge of CMAM, IMAM, and community nutrition programming
• Experience in humanitarian and development contexts
• Strong data analysis skills; proficiency in SPSS, STATA, or ENA for SMART
• Excellent English writing and communication skills

WHAT WE OFFER
• WFP NOB/FT salary scale with competitive benefits
• Exposure to WFP's global systems and technical expertise
• Vibrant Nairobi duty station with regional connectivity`),

  makeJob(2, "Supply Chain Officer", "Logistics", "Mombasa, Kenya", "Full-time", "2026-05-30",
    `OVERVIEW
WFP Kenya is seeking an experienced Supply Chain Officer based in Mombasa to manage food commodity procurement, storage, and logistics for WFP's Kenya operations. Mombasa is a critical transit hub for WFP's East Africa regional supply chain.

KEY RESPONSIBILITIES
• Manage procurement of food commodities and logistics services in line with WFP procurement policies
• Oversee port clearance, loading, and inland transport of food commodities from Mombasa port
• Manage relationships with contracted transporters, warehouse operators, and clearing agents
• Monitor commodity tracking systems (LESS/COMET) and ensure accurate stock records
• Conduct supplier performance assessments and market price monitoring
• Identify and address supply chain risks including pilferage, quality issues, and bottlenecks
• Prepare supply chain reports, dashboards, and management briefings
• Coordinate with cooperating partners on commodity dispatch and distribution monitoring

REQUIRED QUALIFICATIONS
• University degree in Supply Chain Management, Logistics, Business Administration, or related field
• Minimum 5 years experience in supply chain, logistics, or procurement management
• Familiarity with UN or large INGO procurement policies and procedures
• Strong analytical and problem-solving skills
• Excellent MS Excel skills; experience with ERP systems an advantage
• Willingness to travel to field locations

WHAT WE OFFER
• WFP salary and full benefits
• Exposure to one of the world's largest humanitarian supply chains
• Professional growth in a global organisation`),

  // ── WHO Kenya (3) ────────────────────────────────────────────────────────
  makeJob(3, "Epidemiologist – Outbreak Response", "Health", "Nairobi, Kenya", "Full-time", "2026-04-20",
    `OVERVIEW
WHO Kenya is recruiting an Epidemiologist to support disease surveillance, outbreak investigation, and emergency health response. The Epidemiologist will work within Kenya's Health Emergency Preparedness and Response programme to strengthen early warning systems and rapid response capacity.

KEY RESPONSIBILITIES
• Conduct surveillance data analysis and produce weekly epidemiological bulletins
• Lead outbreak investigation teams during disease alerts and public health emergencies
• Strengthen Kenya's Integrated Disease Surveillance and Response (IDSR) system
• Build capacity of county surveillance officers on case detection and reporting
• Develop outbreak response plans, investigation protocols, and after-action reviews
• Coordinate with ECDC, CDC, and other partners on surveillance data sharing
• Support development of WHO country office emergency preparedness and response plans
• Represent WHO in interagency health cluster and emergency coordination meetings

REQUIRED QUALIFICATIONS
• Advanced degree in Epidemiology, Public Health, Medicine, or related field
• Minimum 5 years of experience in field epidemiology, outbreak investigation, or health surveillance
• Demonstrated experience in outbreak response in developing countries
• Strong statistical analysis skills (Epi Info, R, or STATA)
• Experience in applying the International Health Regulations (IHR 2005)
• Excellent English communication skills; Swahili beneficial

WHAT WE OFFER
• WHO salary scale (P3 or equivalent) with comprehensive benefits
• Unique public health leadership role in East Africa
• Contribution to Africa's health security agenda`),

  makeJob(3, "WASH and Environmental Health Officer", "WASH", "Nairobi, Kenya", "Contract", "2026-05-10",
    `OVERVIEW
WHO Kenya's Health Emergency team seeks a WASH and Environmental Health Officer to improve water, sanitation and hygiene standards in health facilities and emergency-affected areas in Kenya. The officer will coordinate WASH in health facilities assessments and support cholera response and prevention.

KEY RESPONSIBILITIES
• Lead WASH in Health Care Facilities (WinHCF) assessments across target counties
• Develop standards and protocols for environmental health in humanitarian settings
• Support cholera response by designing and supervising safe water supply and sanitation interventions
• Train health workers on environmental health and infection prevention and control (IPC)
• Coordinate with MoH, UNICEF, and other WASH sector partners
• Conduct monitoring visits to health facilities and field project sites
• Prepare technical reports, guidance documents, and capacity building materials

REQUIRED QUALIFICATIONS
• University degree in Environmental Health, WASH Engineering, Public Health, or related field
• Minimum 4 years of experience in WASH programming, preferably in humanitarian or low-resource settings
• Technical knowledge of water quality, sanitation design, and hygiene promotion
• Experience in health facility WASH assessments
• Good report writing and communication skills

WHAT WE OFFER
• WHO salary scale (NO-B or G-7 equivalent) with benefits
• Travel opportunities across Kenya
• Professional development in global health`),

  // ── IOM Kenya (4) ────────────────────────────────────────────────────────
  makeJob(4, "Migration Health Officer", "Health", "Nairobi, Kenya", "Full-time", "2026-05-01",
    `OVERVIEW
IOM Kenya's Migration Health Division is seeking a Migration Health Officer to manage pre-departure medical examinations for refugees being resettled to third countries, and to support public health programming for migrant populations in Kenya.

KEY RESPONSIBILITIES
• Manage IOM Migration Health Assessment Centres (MHAC) operations in Nairobi
• Oversee pre-departure health examinations, TB screening, and vaccinations for departing refugees
• Coordinate with resettlement countries' embassies and health authorities on case clearance
• Supervise health assessment staff and contracted medical facilities
• Manage health data systems and ensure timely, accurate reporting to embassies and IOM headquarters
• Conduct quality assurance audits of health assessment processes
• Support emergency health response for migrants and displaced populations
• Prepare donor reports and briefings on migration health programme progress

REQUIRED QUALIFICATIONS
• University degree in Medicine, Nursing, or Public Health (advanced degree preferred)
• Minimum 3 years experience in public health, migration health, or clinical services
• Experience in managing health teams and clinical facilities
• Strong data management and reporting skills
• Excellent written and verbal English; Swahili an asset

WHAT WE OFFER
• IOM salary scale with full benefits package
• Unique exposure to resettlement and migration health operations
• Dynamic multicultural work environment`),

  makeJob(4, "Displacement Tracking Matrix (DTM) Data Officer", "M&E", "Garissa, Kenya", "Full-time", "2026-06-15",
    `OVERVIEW
IOM Kenya's Displacement Tracking Matrix (DTM) programme is looking for a Data Officer based in Garissa to collect, analyse, and report on population displacement dynamics in North-Eastern Kenya. The DTM Data Officer will manage field assessment teams and oversee data quality.

KEY RESPONSIBILITIES
• Design and implement DTM data collection tools and methodologies for mobility tracking and site assessment
• Manage and train a team of field enumerators deployed across displacement-affected areas
• Oversee data entry, cleaning, and validation processes
• Produce weekly, monthly, and ad hoc displacement situation reports and dashboards
• Maintain a comprehensive database of displacement sites and population figures
• Coordinate with UNHCR, OCHA, and county governments on displacement data sharing
• Support emergency assessments during sudden-onset displacement crises
• Contribute to regional DTM data products and analysis

REQUIRED QUALIFICATIONS
• University degree in Statistics, Social Sciences, Information Management, or related field
• Minimum 3 years of experience in data collection, management, and analysis in humanitarian contexts
• Proficiency in Kobo Toolbox, ODK, or similar data collection platforms
• Strong skills in Excel, Power BI, or Tableau for data visualisation
• Experience in managing field teams in remote locations
• Willingness to travel frequently within Garissa and to other field sites

WHAT WE OFFER
• IOM salary scale with allowances for field duty station
• Professional development in humanitarian information management
• Exposure to IOM's global DTM network`),

  // ── UNDP Kenya (5) ───────────────────────────────────────────────────────
  makeJob(5, "Climate Change Adaptation Specialist", "Coordination", "Nairobi, Kenya", "Full-time", "2026-05-25",
    `OVERVIEW
UNDP Kenya's Climate and Environment team is recruiting a Climate Change Adaptation Specialist to lead Kenya's National Adaptation Planning (NAP) process and design climate-resilient programmes for vulnerable counties. The specialist will work closely with the Ministry of Environment and Climate Change.

KEY RESPONSIBILITIES
• Lead technical support to Kenya's National Adaptation Plan (NAP) development and implementation
• Design and appraise adaptation projects for Green Climate Fund (GCF), Adaptation Fund, and other climate financing
• Coordinate climate risk and vulnerability assessments for priority sectors and counties
• Build capacity of government ministries and county governments on climate mainstreaming
• Facilitate stakeholder consultations and multi-stakeholder climate platforms
• Prepare technical reports, policy briefs, and programme documentation
• Support resource mobilization for adaptation programming
• Represent UNDP in national and international climate forums

REQUIRED QUALIFICATIONS
• Master's degree in Environmental Science, Climate Science, Development Economics, or related field
• Minimum 7 years of experience in climate change adaptation, environmental management, or sustainable development
• Strong knowledge of climate financing mechanisms (GCF, Adaptation Fund, LDCF)
• Experience in project design, management, and evaluation
• Excellent communication and policy engagement skills

WHAT WE OFFER
• UNDP NOC/P4 salary scale with comprehensive benefits
• Leadership role in Kenya's climate change response
• Opportunity to shape national policy and access to global UNDP networks`),

  // ── OCHA Kenya (6) ───────────────────────────────────────────────────────
  makeJob(6, "Humanitarian Affairs Officer – Information Management", "M&E", "Nairobi, Kenya", "Full-time", "2026-04-15",
    `OVERVIEW
OCHA Kenya is seeking a Humanitarian Affairs Officer with information management expertise to support situational awareness and data-driven decision making in Kenya's humanitarian response. The officer will coordinate with clusters, UN agencies, and NGOs to ensure timely, accurate humanitarian data products.

KEY RESPONSIBILITIES
• Design and maintain OCHA Kenya's information management products including Who Does What Where (3W), response monitoring dashboards, and needs assessments
• Coordinate with cluster information management officers to harmonise data standards and reporting
• Produce Kenya Humanitarian Overview, situation reports, and flash updates
• Manage the Kenya Humanitarian Data Exchange (HDX) profile and dissemination
• Support rapid needs assessments and inter-agency emergency monitoring
• Train partners on data collection tools and humanitarian data standards
• Coordinate geographic information systems (GIS) mapping and spatial analysis

REQUIRED QUALIFICATIONS
• Advanced university degree in Information Management, Statistics, Geography, or Social Sciences
• Minimum 5 years of relevant experience in humanitarian information management
• Expertise in data visualisation tools (Power BI, Tableau, Flourish)
• Strong GIS skills (QGIS or ArcGIS)
• Experience in the Humanitarian Programme Cycle (HNA, HRP, 3W)
• Excellent English writing and communication skills

WHAT WE OFFER
• OCHA NOB/P3 salary and UN benefits
• Exposure to Kenya's humanitarian leadership community
• Fast-paced, high-impact work environment`),

  // ── UN Women Kenya (7) ───────────────────────────────────────────────────
  makeJob(7, "Women Economic Empowerment Programme Officer", "Food Security", "Nairobi, Kenya", "Full-time", "2026-05-15",
    `OVERVIEW
UN Women Kenya's Economic Empowerment team seeks a Programme Officer to design and implement women's economic empowerment interventions. The officer will manage partnerships with government, the private sector, and civil society to expand women's access to decent work, entrepreneurship, and financial services.

KEY RESPONSIBILITIES
• Design and implement women's economic empowerment programmes targeting rural and urban women
• Manage partnerships with financial institutions, private sector companies, and government agencies
• Coordinate and monitor grants to women's rights organizations and cooperatives
• Develop training curricula and materials on financial literacy, entrepreneurship, and leadership
• Facilitate dialogues with private sector on gender-responsive procurement and employment practices
• Monitor programme results against logframes and collect data for reporting
• Contribute to resource mobilization and donor reporting
• Represent UN Women in women's economic empowerment coordination forums

REQUIRED QUALIFICATIONS
• University degree in Economics, Development Studies, Gender Studies, or related field
• Minimum 3 years of experience in women's economic empowerment, gender and development, or related area
• Strong understanding of gender mainstreaming and feminist approaches
• Experience in programme management, partnership coordination, and reporting
• Excellent writing and presentation skills

WHAT WE OFFER
• UN Women NOA/P2 salary and benefits
• Opportunity to advance gender equality and women's rights in Kenya
• Dynamic team committed to transformative change`),

  // ── FAO Kenya (8) ────────────────────────────────────────────────────────
  makeJob(8, "Food Security and Livelihoods Officer", "Food Security", "Nairobi, Kenya", "Full-time", "2026-05-20",
    `OVERVIEW
FAO Kenya is recruiting a Food Security and Livelihoods Officer to manage the Emergency Livelihoods Restoration programme in ASAL counties. The officer will lead cash-based interventions, livestock support, and agricultural input assistance targeting drought-affected smallholder farmers and pastoralists.

KEY RESPONSIBILITIES
• Design and implement emergency livelihood and food security interventions in drought-affected counties
• Lead multi-purpose cash transfer programming in partnership with government and NGOs
• Coordinate livestock offtake, restocking, and veterinary support activities
• Conduct food security and early warning analysis using IPC and NDVI data
• Manage partner NGOs and cooperating partners under FAO sub-agreements
• Monitor programme output and outcome indicators and prepare donor reports
• Facilitate farmer field school (FFS) activities and climate-smart agriculture demonstrations
• Participate in the Food Security Sector (FSS) coordination and technical working groups

REQUIRED QUALIFICATIONS
• University degree in Agriculture, Food Security, Rural Development, or related field
• Minimum 5 years of experience in food security, livelihoods, or agricultural development
• Strong experience with cash transfer programming and market systems in humanitarian contexts
• Knowledge of IPC analysis and ASAL livelihoods systems in Kenya
• Excellent data analysis and report writing skills

WHAT WE OFFER
• FAO salary scale (NOB/P3) with full benefits
• Field exposure across Kenya's ASAL counties
• Contribution to Kenya's food system resilience`),

  // ── ILO Kenya (9) ────────────────────────────────────────────────────────
  makeJob(9, "Youth Employment Specialist", "HR", "Nairobi, Kenya", "Full-time", "2026-06-01",
    `OVERVIEW
ILO Kenya is seeking a Youth Employment Specialist to lead the Kenya Youth Employment Programme (KYEP), supporting young women and men to access decent work opportunities through skills development, entrepreneurship, and labour market reform advocacy.

KEY RESPONSIBILITIES
• Lead design and implementation of youth employment programmes aligned with ILO's Decent Work Agenda
• Coordinate with the Ministry of Labour, TVET institutions, and private sector employers
• Develop apprenticeship frameworks and employer engagement strategies
• Manage programme budgets, work plans, and monitoring and evaluation frameworks
• Conduct labour market assessments and youth employment diagnostics
• Facilitate social dialogue between government, employers, and workers on youth employment policies
• Prepare programme reports, policy briefs, and communications products
• Represent ILO in national youth employment forums and UN inter-agency bodies

REQUIRED QUALIFICATIONS
• Advanced degree in Economics, Development Studies, Labour Relations, or related field
• Minimum 7 years of experience in employment programming, skills development, or labour market policy
• Strong knowledge of Kenya's labour market, TVET system, and youth challenges
• Experience in managing multi-partner development programmes
• Excellent analytical, communication, and facilitation skills

WHAT WE OFFER
• ILO NOB/P3 salary scale with full benefits
• Central role in shaping youth employment policy in Kenya
• Access to ILO's global knowledge and technical expertise`),

  // ── Save the Children Kenya (10) ─────────────────────────────────────────
  makeJob(10, "Child Protection Coordinator", "Protection", "Dadaab, Kenya", "Full-time", "2026-05-01",
    `OVERVIEW
Save the Children Kenya is looking for an experienced Child Protection Coordinator to lead CP programming in Dadaab refugee camp. The role involves managing a team of case workers and social workers, ensuring quality case management services for unaccompanied and separated children (UASC) and survivors of violence and exploitation.

KEY RESPONSIBILITIES
• Oversee all child protection case management services including UASC family tracing and reunification (FTR)
• Supervise and provide technical support to a team of 10 case workers and community volunteers
• Ensure safe programming standards and accountability to affected populations (AAP) mechanisms are in place
• Coordinate with UNHCR, UNICEF, and other CP sub-cluster members on case referrals
• Conduct regular case audits and individual supervision sessions with case workers
• Manage programme budgets and ensure proper financial accountability
• Prepare monthly programme reports, donor updates, and case studies
• Represent Save the Children in CP Sub-Cluster and inter-agency coordination forums

REQUIRED QUALIFICATIONS
• Degree in Social Work, Psychology, Child Development, or related field
• Minimum 4 years experience in child protection case management
• Knowledge of CPIMS+, PRIMERO, or similar case management systems
• Experience working with UASC and GBV survivors
• Strong supervision, coaching, and team management skills
• Fluency in English and Somali or Swahili strongly preferred

WHAT WE OFFER
• Competitive NGO salary and benefits
• Save the Children staff wellbeing and mental health support package
• Career development opportunities within a global network`),

  makeJob(10, "Education in Emergencies (EiE) Officer", "Education", "Turkana, Kenya", "Full-time", "2026-06-10",
    `OVERVIEW
Save the Children Kenya is recruiting an Education in Emergencies (EiE) Officer for Turkana county. The EiE Officer will implement quality learning programmes in pastoralist and crisis-affected communities, including accelerated education, school feeding linkages, and teacher support.

KEY RESPONSIBILITIES
• Implement accelerated education and early childhood development (ECD) programmes in target schools
• Coordinate with county education departments on teacher deployment and support
• Train and mentor teachers on child-friendly and psychosocial support-integrated teaching methods
• Monitor learning outcomes and school attendance using standardized assessment tools
• Distribute scholastic materials, school-in-a-box kits, and recreational materials
• Facilitate school water access and WASH improvements in partnership with WASH team
• Prepare programme reports and case studies highlighting child learning outcomes

REQUIRED QUALIFICATIONS
• Degree in Education, Community Development, or related field
• Minimum 3 years experience in education programme implementation
• Knowledge of Kenya's CBC curriculum and EiE minimum standards (INEE)
• Experience in pastoralist or ASAL community contexts
• Good Swahili and English communication skills

WHAT WE OFFER
• Competitive salary and benefits
• Comprehensive induction and Save the Children's learning culture
• Career development and internal mobility opportunities`),

  // ── Oxfam Kenya (11) ─────────────────────────────────────────────────────
  makeJob(11, "WASH Programme Manager", "WASH", "Turkana, Kenya", "Full-time", "2026-05-10",
    `OVERVIEW
Oxfam Kenya is seeking an experienced WASH Programme Manager to lead water, sanitation, and hygiene interventions in Turkana county. The WASH Manager will oversee engineering, hygiene promotion, and community-based water management components.

KEY RESPONSIBILITIES
• Lead design, implementation, and monitoring of WASH programmes including borehole rehabilitation, piped water systems, and latrine construction
• Supervise a multidisciplinary WASH team of engineers, hygiene promoters, and community mobilisers
• Manage WASH programme budget and ensure value for money
• Oversee procurement of WASH supplies and services in compliance with Oxfam procedures
• Facilitate establishment and capacity building of community water management committees
• Coordinate with county government WASH department and other WASH partners
• Prepare technical designs, BOQs, and engineering standards
• Contribute to proposal development and donor reporting

REQUIRED QUALIFICATIONS
• Degree in Civil Engineering, Hydrogeology, Public Health Engineering, or related field
• Minimum 5 years of WASH programme management experience in humanitarian or development contexts
• Proven ability to manage multi-disciplinary teams and large programme budgets
• Technical expertise in borehole drilling, water system design, and sanitation engineering
• Experience in community-led total sanitation (CLTS) and hygiene promotion
• Good English and Swahili communication skills

WHAT WE OFFER
• Oxfam competitive salary and benefits package
• Commitment to staff wellbeing and gender inclusion
• Collaborative and values-driven organisational culture`),

  makeJob(11, "Gender and Protection Advisor", "Protection", "Nairobi, Kenya", "Full-time", "2026-06-05",
    `OVERVIEW
Oxfam Kenya is hiring a Gender and Protection Advisor to lead gender mainstreaming, protection risk analysis, and SGBV prevention across all Oxfam Kenya programmes. The Advisor will provide technical support to programme teams and build staff and partner capacity on gender and protection standards.

KEY RESPONSIBILITIES
• Conduct gender and protection analyses and develop gender action plans for all Oxfam Kenya programmes
• Provide technical oversight of women's rights and protection programming
• Build capacity of programme staff and partners on gender mainstreaming, SGBV prevention, and survivor-centred approaches
• Lead Oxfam's participation in the GBV Sub-Cluster and Protection Sector coordination
• Develop advocacy messages and position papers on gender equality in Kenya
• Support design of gender-transformative interventions and theories of change
• Prepare gender-sensitive programme reports and donor briefings

REQUIRED QUALIFICATIONS
• Advanced degree in Gender Studies, Social Sciences, Development Studies, or related field
• Minimum 6 years of experience in gender programming, SGBV prevention, or women's rights
• Strong understanding of feminist frameworks and gender-transformative programming
• Knowledge of protection standards (SPHERE, IASC guidelines on GBV)
• Excellent analytical, writing, and facilitation skills

WHAT WE OFFER
• Oxfam salary and benefits with flexible working options
• Organisational commitment to feminist principles
• High-profile technical advisory role`),

  // ── MSF Kenya (12) ────────────────────────────────────────────────────────
  makeJob(12, "Medical Doctor – Emergency Response", "Health", "Nairobi, Kenya", "Full-time", "2026-04-25",
    `OVERVIEW
MSF Kenya is seeking a Medical Doctor for emergency field deployments across Kenya and the East Africa region. The Medical Doctor will provide direct clinical care and support MSF's emergency medical interventions, including cholera response, kala-azar treatment, and trauma care.

KEY RESPONSIBILITIES
• Provide direct clinical care to patients in MSF health facilities and emergency response settings
• Supervise clinical staff including clinical officers, nurses, and community health workers
• Implement MSF medical protocols for priority diseases (cholera, malaria, kala-azar, TB, malnutrition)
• Conduct ward rounds, clinical audits, and mortality reviews
• Support medical data collection, HMIS reporting, and analysis of health indicators
• Train and mentor national medical staff on clinical management protocols
• Participate in emergency preparedness and rapid response planning
• Represent MSF in health cluster meetings during responses

REQUIRED QUALIFICATIONS
• Medical degree (MBChB or equivalent); additional clinical training an asset
• Minimum 2 years clinical experience; experience in tropical medicine strongly preferred
• Readiness to be deployed to remote field locations at short notice
• Ability to work in high-pressure environments with limited resources
• Fluent in English; French or Somali an advantage

WHAT WE OFFER
• MSF salary commensurate with experience plus field allowances
• Return flights, housing, and medical coverage during assignments
• Unique frontline humanitarian medical experience in East Africa`),

  // ── IRC Kenya (13) ────────────────────────────────────────────────────────
  makeJob(13, "Economic Recovery and Development (ERD) Manager", "Food Security", "Kakuma, Kenya", "Full-time", "2026-05-20",
    `OVERVIEW
IRC Kenya is recruiting an ERD Manager to lead economic recovery and livelihoods programming for refugees and host communities in Kakuma. The ERD Manager will design and oversee market-systems-based interventions, financial inclusion, and small business development programming.

KEY RESPONSIBILITIES
• Develop and manage IRC's economic recovery programme portfolio in Kakuma
• Design market-based livelihoods interventions using the Making Markets Work for the Poor (M4P) approach
• Manage a team of ERD officers, business development facilitators, and community mobilisers
• Establish and manage cash transfer programming targeting vulnerable households
• Develop financial literacy training curricula and oversee implementation
• Build partnerships with banks, MFIs, and mobile money providers for refugee financial inclusion
• Conduct market assessments and value chain analyses
• Prepare donor reports, proposals, and programme documents

REQUIRED QUALIFICATIONS
• Degree in Economics, Business Administration, Development Studies, or related field (Master's preferred)
• Minimum 5 years experience in livelihoods, economic development, or cash programming
• Strong knowledge of market systems development approaches
• Experience managing large teams and complex programme budgets
• Excellent analytical and writing skills

WHAT WE OFFER
• IRC competitive salary plus benefits including health insurance and leave
• Professional development through IRC's global learning platform (RescueNet)
• Opportunity to improve the lives of refugee communities`),

  makeJob(13, "Nutrition Officer – Acute Malnutrition Response", "Nutrition", "Turkana, Kenya", "Full-time", "2026-06-01",
    `OVERVIEW
IRC Kenya's Nutrition programme is seeking a Nutrition Officer to manage community-based management of acute malnutrition (CMAM) activities in Turkana county. The Nutrition Officer will oversee OTP, TSFP, and IYCF-E programming delivered through health facilities and community outreach.

KEY RESPONSIBILITIES
• Implement and monitor CMAM programming (OTP, TSFP, SC) across target health facilities
• Train and supervise community health volunteers on MUAC screening and referral
• Conduct regular supportive supervision visits to health facilities
• Manage nutrition supply pipeline and ensure timely ordering and delivery of therapeutic foods
• Collect and analyse nutrition programme data including admission, default, recovery, and mortality rates
• Prepare monthly programme reports and donor updates
• Coordinate with WHO, UNICEF, and county health teams on nutrition response
• Support integration of IYCF counselling into MCH services

REQUIRED QUALIFICATIONS
• Degree in Nutrition, Dietetics, Public Health, or related field
• Minimum 3 years experience in CMAM programming in emergency or development contexts
• Strong knowledge of community nutrition approaches and SPHERE nutrition standards
• Good supervisory and training skills
• Proficiency in English and Swahili

WHAT WE OFFER
• IRC salary and benefits
• Specialised training on nutrition programming standards
• Immersive field experience in one of Kenya's most underserved counties`),

  // ── World Vision Kenya (14) ───────────────────────────────────────────────
  makeJob(14, "Area Programme Manager", "Coordination", "Kitui, Kenya", "Full-time", "2026-05-05",
    `OVERVIEW
World Vision Kenya is seeking an Area Programme Manager (APM) to lead a community development programme in Kitui county. The APM will manage integrated programming across health, education, livelihoods, WASH, and child protection, working with communities, local government, and faith-based organisations.

KEY RESPONSIBILITIES
• Provide strategic and operational leadership for all programme activities in the area programme
• Manage a multi-disciplinary team of programme officers and community facilitators
• Oversee budget management, financial reporting, and compliance for the area programme
• Coordinate with county government departments and local community structures
• Ensure community participation, accountability mechanisms, and child safeguarding standards
• Monitor programme output and outcome indicators and ensure data quality
• Prepare donor and board reports, case studies, and programme evaluations
• Represent World Vision in county-level coordination forums and inter-agency meetings

REQUIRED QUALIFICATIONS
• Degree in Development Studies, Community Development, Social Sciences, or related field
• Minimum 5 years experience in NGO programme management, including staff supervision
• Strong financial management, reporting, and donor compliance skills
• Experience working with community-based organisations and local government
• Excellent interpersonal, communication, and problem-solving skills
• Valid driving licence and willingness to travel frequently

WHAT WE OFFER
• World Vision salary and benefits package
• Commitment to staff spiritual nurture and wholistic wellbeing
• Career development and internal promotion opportunities`),

  // ── CARE International Kenya (15) ────────────────────────────────────────
  makeJob(15, "MEAL Officer", "M&E", "Nairobi, Kenya", "Full-time", "2026-05-15",
    `OVERVIEW
CARE International Kenya is looking for a MEAL (Monitoring, Evaluation, Accountability and Learning) Officer to support cross-sectoral programming across CARE's Kenya portfolio. The MEAL Officer will support data collection, quality assurance, and learning documentation for health, food security, and gender programmes.

KEY RESPONSIBILITIES
• Support development and implementation of MEAL frameworks, logframes, and indicator tracking systems
• Design and conduct programme quality assessments, post-distribution monitoring, and process evaluations
• Train programme staff and partners on data collection tools and methodologies
• Manage mobile data collection systems (Kobo, ODK, CommCare)
• Conduct data analysis and produce evidence-based learning briefs and reports
• Support establishment of Feedback and Response Mechanisms (FRM) and accountability to affected populations
• Contribute to proposal development, baseline surveys, and end-line evaluations
• Maintain CARE Kenya's programme database and performance dashboard

REQUIRED QUALIFICATIONS
• Degree in Statistics, Development Studies, Social Sciences, or related field
• Minimum 3 years experience in monitoring and evaluation in NGO or UN contexts
• Proficiency in quantitative and qualitative research methods
• Strong skills in Kobo Toolbox, Excel, SPSS, or Stata
• Experience in accountability to affected populations and complaints mechanisms
• Good English and Swahili communication skills

WHAT WE OFFER
• CARE salary and benefits
• Exposure to diverse sectors and programme modalities
• Commitment to feminist principles and gender equality`),

  // ── Action Against Hunger Kenya (16) ─────────────────────────────────────
  makeJob(16, "Nutrition and Health Programme Manager", "Nutrition", "Mandera, Kenya", "Full-time", "2026-05-01",
    `OVERVIEW
Action Against Hunger Kenya is seeking a Nutrition and Health Programme Manager for Mandera county. The incumbent will manage integrated nutrition-health-WASH programming, lead a large field team, and ensure programme quality in one of Kenya's most food-insecure counties.

KEY RESPONSIBILITIES
• Manage integrated CMAM, maternal and child nutrition, and primary health care programming in Mandera
• Supervise a team of nutrition officers, clinical officers, and health workers
• Oversee programme budget planning, expenditure tracking, and financial reporting
• Ensure compliance with MoH and ACF technical standards and protocols
• Coordinate with county health management team (CHMT) and health sub-sector working group
• Lead programme monitoring, data review, and adaptive management processes
• Contribute to proposal development and donor reporting for ECHO, USAID, and UNICEF-funded projects
• Ensure ACF's security protocols are adhered to in a complex security environment

REQUIRED QUALIFICATIONS
• Degree in Nutrition, Public Health, Nursing, or Medicine (advanced degree preferred)
• Minimum 5 years experience in nutrition-health programming, including at least 2 years in management
• Strong financial management and donor compliance skills
• Experience working in insecure or remote field environments
• Excellent leadership, team building, and problem-solving skills
• Fluency in Somali is a strong asset

WHAT WE OFFER
• Competitive ACF salary and comprehensive benefits including R&R allowance
• Security and psychosocial support for field staff
• Career progression in a leading nutrition-focused organisation`),

  // ── NRC Kenya (17) ───────────────────────────────────────────────────────
  makeJob(17, "Information Counselling and Legal Assistance (ICLA) Officer", "Legal", "Nairobi, Kenya", "Full-time", "2026-05-20",
    `OVERVIEW
NRC Kenya's ICLA programme is seeking an ICLA Officer to deliver legal assistance and counselling services to refugees and asylum seekers in Nairobi. The ICLA Officer will provide individual case assistance, legal information sessions, and referrals on civil documentation, housing land and property rights, and asylum procedures.

KEY RESPONSIBILITIES
• Provide individual legal counselling and case assistance to refugees and asylum seekers
• Facilitate legal information sessions on refugee rights, RSD procedures, and civil documentation
• Support clients in accessing civil documentation including birth certificates, marriage certificates, and national ID cards
• Liaise with UNHCR, the Refugee Affairs Secretariat, and courts on legal cases
• Monitor legal and policy developments affecting refugees in Kenya
• Maintain accurate case records in NRC's ICLA database
• Prepare monthly programme reports and case statistics
• Support legal needs assessments and protection monitoring activities

REQUIRED QUALIFICATIONS
• Degree in Law (LLB); admitted to the bar in Kenya an asset
• Minimum 3 years of experience in legal aid, refugee law, or human rights work
• Strong knowledge of Kenya's Refugees Act (2021) and international refugee law
• Excellent interpersonal and communication skills
• Fluency in English and Somali or Arabic an asset

WHAT WE OFFER
• NRC salary and competitive benefits
• Professional development in refugee law and humanitarian protection
• Supportive and inclusive team environment`),

  // ── DRC Kenya (18) ────────────────────────────────────────────────────────
  makeJob(18, "Shelter and NFI Project Officer", "Shelter", "Garissa, Kenya", "Full-time", "2026-05-25",
    `OVERVIEW
DRC Kenya is recruiting a Shelter and NFI Project Officer to manage shelter construction and non-food item (NFI) distribution activities in Dadaab refugee complex. The Project Officer will oversee construction quality, distribution logistics, and community engagement.

KEY RESPONSIBILITIES
• Supervise construction and rehabilitation of emergency and transitional shelter units in Dadaab
• Manage NFI distribution activities including beneficiary verification, stock management, and distribution logistics
• Conduct post-distribution monitoring and shelter quality assessments
• Coordinate with UNHCR, CARE, and other shelter partners on gap analysis and joint planning
• Manage relationships with community structures, refugee leaders, and contractors
• Ensure compliance with SPHERE standards, DRC quality benchmarks, and donor requirements
• Prepare technical reports, distribution reports, and monthly programme updates
• Support proposal development with budget estimates and activity plans

REQUIRED QUALIFICATIONS
• Degree in Civil Engineering, Architecture, Construction Management, or related field
• Minimum 3 years of shelter or construction management experience in humanitarian contexts
• Knowledge of emergency shelter standards (SPHERE, humanitarian shelter guidelines)
• Strong organisational, planning, and logistics management skills
• Experience in conducting participatory community consultations
• Good English communication skills; Somali an advantage

WHAT WE OFFER
• DRC competitive salary and benefits
• International exposure and networking opportunities
• Supportive and committed humanitarian team`),

  // ── Mercy Corps Kenya (19) ────────────────────────────────────────────────
  makeJob(19, "Market Systems Development Advisor", "Food Security", "Nairobi, Kenya", "Full-time", "2026-06-01",
    `OVERVIEW
Mercy Corps Kenya is seeking a Market Systems Development Advisor to lead market-systems-based programming for food security and economic development in the ASAL counties of northern Kenya. The Advisor will guide programme teams and partners in applying systemic change approaches.

KEY RESPONSIBILITIES
• Provide technical leadership on market systems development (M4P/Systemic change) across Mercy Corps Kenya's food security portfolio
• Conduct market assessments, system analyses, and value chain studies
• Design facilitative interventions to catalyse sustainable market change
• Build capacity of programme staff and local partners on market systems approaches
• Develop monitoring and results measurement (MRM) frameworks for market systems programmes
• Contribute to learning and adaptation processes based on programme evidence
• Engage with private sector actors, government, and financial service providers as market facilitators
• Contribute to business development and proposal writing for USAID, FCDO, and EU-funded programmes

REQUIRED QUALIFICATIONS
• Advanced degree in Agricultural Economics, Development Economics, Business Administration, or related field
• Minimum 7 years of experience in market systems development, value chains, or private sector engagement
• Strong knowledge of Springfield Centre MSD methodology or equivalent frameworks
• Experience in designing MRM systems for market systems programmes
• Excellent analytical and communication skills

WHAT WE OFFER
• Mercy Corps competitive salary and comprehensive benefits
• Organisational learning culture and team collaboration
• Opportunity to drive systems-level change in Kenya's food economy`),

  // ── Plan International Kenya (20) ─────────────────────────────────────────
  makeJob(20, "Girls' Education Programme Officer", "Education", "Kwale, Kenya", "Full-time", "2026-05-10",
    `OVERVIEW
Plan International Kenya is looking for a Girls' Education Programme Officer to implement girls' education and empowerment programming in Kwale county. The officer will work with communities, schools, and county government to keep girls in school, prevent GBV, and support learning outcomes.

KEY RESPONSIBILITIES
• Implement girls' education and adolescent empowerment activities in target schools and communities
• Coordinate with county education and gender departments
• Train teachers, parents, and community leaders on gender-responsive teaching and child protection
• Facilitate girls' clubs and safe spaces for adolescent girls
• Conduct community awareness sessions on girls' education, child marriage, and FGM prevention
• Distribute dignity kits and educational materials to girls
• Monitor girls' attendance, retention, and learning outcomes
• Prepare programme reports and case studies on girls' education outcomes

REQUIRED QUALIFICATIONS
• Degree in Education, Gender Studies, Social Work, or related field
• Minimum 3 years experience in girls' education, gender, or adolescent programming
• Experience working with community-based structures and local government
• Good facilitation, training, and communication skills
• Proficiency in English and Swahili; knowledge of Digo or Duruma language an asset

WHAT WE OFFER
• Plan International salary and benefits
• Commitment to girls' rights and gender equality
• Supportive and values-driven team`),

  // ── GOAL Kenya (21) ──────────────────────────────────────────────────────
  makeJob(21, "Urban Health Programme Manager", "Health", "Nairobi, Kenya", "Full-time", "2026-05-15",
    `OVERVIEW
GOAL Kenya seeks an Urban Health Programme Manager to lead health systems strengthening and community health programming in Nairobi's informal settlements. The Programme Manager will manage a multi-donor urban health portfolio targeting health facility improvement, community health volunteer systems, and disease surveillance.

KEY RESPONSIBILITIES
• Lead and manage GOAL Kenya's urban health programme across target informal settlements in Nairobi
• Supervise programme staff including health officers, community health supervisors, and M&E staff
• Strengthen Nairobi City County health facilities through supply chain support, quality improvement, and HR capacity building
• Manage community health volunteer (CHV) networks and community health unit systems
• Coordinate with Nairobi City County Health Management Team and sub-county health teams
• Manage programme budgets and financial reporting for donor-funded grants
• Prepare donor reports, programme evaluations, and lessons learned documents
• Represent GOAL in urban health working groups and coordination forums

REQUIRED QUALIFICATIONS
• Degree in Public Health, Medicine, Nursing, or related health field (Master's preferred)
• Minimum 5 years of health programme management experience, ideally in urban contexts
• Understanding of Kenya's health system architecture and community health strategy
• Strong financial management and donor compliance experience
• Excellent leadership and people management skills

WHAT WE OFFER
• GOAL salary with health insurance and leave benefits
• Opportunity to lead a high-impact urban health programme
• Friendly and professional organisational culture`),

  // ── Islamic Relief Kenya (22) ─────────────────────────────────────────────
  makeJob(22, "Zakat and Livelihood Programme Officer", "Food Security", "Nairobi, Kenya", "Full-time", "2026-05-25",
    `OVERVIEW
Islamic Relief Kenya is seeking a Livelihood Programme Officer to design and implement livelihood and food security programmes for vulnerable communities in Kenya. The officer will manage Zakat-funded income generation activities, vocational training, and agricultural support.

KEY RESPONSIBILITIES
• Design and implement livelihood restoration and income generation activities for beneficiary households
• Manage Zakat-funded emergency food assistance and distribution programmes
• Support vocational skills training and link graduates to employment and self-employment opportunities
• Conduct household vulnerability assessments and beneficiary targeting
• Manage programme budgets and ensure proper donor accountability
• Coordinate with community leaders, local government, and partner organisations
• Prepare programme reports, case studies, and donor documentation
• Ensure Islamic Relief's humanitarian principles and code of conduct are maintained

REQUIRED QUALIFICATIONS
• Degree in Development Studies, Agriculture, Business Administration, or related field
• Minimum 3 years experience in livelihoods or food security programming
• Knowledge of Islamic social finance (Zakat, Sadaqah) principles an advantage
• Good community facilitation and partnership management skills
• Proficiency in English and Swahili

WHAT WE OFFER
• Islamic Relief competitive salary and benefits
• Values-driven and inclusive organisational culture
• Opportunity to serve vulnerable communities across Kenya`),

  // ── CRS Kenya (23) ────────────────────────────────────────────────────────
  makeJob(23, "Head of Programming", "Coordination", "Nairobi, Kenya", "Full-time", "2026-04-30",
    `OVERVIEW
CRS Kenya is seeking an experienced Head of Programming to provide strategic leadership and oversight of all CRS Kenya programme operations. The HoP will manage a team of technical leads, ensure programme quality, and represent CRS Kenya with donors, government, and partners.

KEY RESPONSIBILITIES
• Provide strategic leadership and oversight of CRS Kenya's health, agriculture, emergency response, and education programmes
• Ensure programme quality, coherence, and integration across CRS Kenya's portfolio
• Lead resource mobilization including proposal development for USAID, EU, and private donors
• Represent CRS Kenya in national coordination forums, donor meetings, and government engagements
• Manage and develop a senior team of programme technical leads and managers
• Ensure compliance with CRS programme quality standards and donor requirements
• Lead annual country programme planning processes
• Collaborate with finance, operations, and HR departments to ensure programmatic effectiveness

REQUIRED QUALIFICATIONS
• Master's degree in Development Studies, International Development, Public Health, or related field
• Minimum 10 years of progressive programme management experience in international development or humanitarian settings
• Demonstrated experience in resource mobilization and donor relationship management (USAID, FCDO, EU)
• Strong leadership, strategic thinking, and team development skills
• Excellent written and oral communication skills in English
• Commitment to Catholic social teaching principles

WHAT WE OFFER
• CRS competitive salary and comprehensive benefits
• Senior leadership role in a respected and growing organisation
• Strong organisational commitment to staff development`),

  // ── Tearfund Kenya (24) ───────────────────────────────────────────────────
  makeJob(24, "Climate Resilience Programme Officer", "Coordination", "Kitui, Kenya", "Full-time", "2026-05-30",
    `OVERVIEW
Tearfund Kenya is looking for a Climate Resilience Programme Officer to implement climate adaptation and disaster risk reduction programming in Kitui county. The officer will work with local church partners, community groups, and county government to build community resilience to climate shocks.

KEY RESPONSIBILITIES
• Implement Tearfund's Umoja and community resilience programming in target communities
• Facilitate community-based disaster risk reduction (DRR) assessments and planning
• Support communities in developing and implementing community climate adaptation plans
• Train local church partners and community volunteers on DRR, WASH, and resilient livelihoods
• Coordinate farmer field schools on climate-smart agricultural practices
• Monitor programme activities and collect data against indicators
• Prepare programme reports and document learning from the community resilience approach
• Engage with county government on DRR policy and mainstreaming

REQUIRED QUALIFICATIONS
• Degree in Environmental Science, Community Development, Agriculture, or related field
• Minimum 3 years experience in DRR, climate adaptation, or rural development programming
• Knowledge of participatory community development approaches
• Experience working through local church or faith-based partners
• Good Swahili and English communication skills; Kamba language an advantage

WHAT WE OFFER
• Tearfund competitive salary and benefits
• Faith-based and values-driven organisational culture
• Supportive team committed to community empowerment`),

  // ── AMREF Kenya (25) ──────────────────────────────────────────────────────
  makeJob(25, "Health Systems Strengthening Specialist", "Health", "Nairobi, Kenya", "Full-time", "2026-05-20",
    `OVERVIEW
AMREF Health Africa Kenya is recruiting a Health Systems Strengthening (HSS) Specialist to lead capacity building and quality improvement initiatives with county health management teams. The Specialist will work across AMREF's Kenya portfolio to strengthen health governance, health information systems, and health workforce performance.

KEY RESPONSIBILITIES
• Design and implement health systems strengthening interventions with County Health Management Teams (CHMTs)
• Provide technical support on health governance, planning, and coordination at county level
• Strengthen county health management information systems (DHIS2) and data quality
• Lead capacity development of health facility management teams on quality improvement (QI) approaches
• Support development of County Integrated Development Plans (CIDPs) health components
• Coordinate with MoH, USAID, and other HSS partners on health system investments
• Conduct systems assessments using WHO health system building blocks framework
• Prepare technical reports, publications, and presentations

REQUIRED QUALIFICATIONS
• Advanced degree in Public Health, Health Policy and Management, or related field
• Minimum 7 years experience in health systems strengthening, ideally in Kenya
• Strong understanding of Kenya's devolved health system and County health structures
• Experience in quality improvement methodologies and health governance approaches
• Proficiency in DHIS2 and other health information systems
• Excellent analytical and communication skills

WHAT WE OFFER
• AMREF competitive salary and benefits
• Opportunity to shape Kenya's health system at scale
• Africa-led, Africa-based professional environment`),

  // ── Kenya Red Cross (26) ──────────────────────────────────────────────────
  makeJob(26, "Disaster Risk Reduction Officer", "Coordination", "Nairobi, Kenya", "Full-time", "2026-06-10",
    `OVERVIEW
Kenya Red Cross Society is looking for a Disaster Risk Reduction (DRR) Officer to support community resilience programming across KRCS's branch network. The DRR Officer will facilitate community vulnerability and capacity assessments, train volunteers, and coordinate with county governments on disaster preparedness planning.

KEY RESPONSIBILITIES
• Facilitate community vulnerability and capacity assessments (VCA) in target communities
• Train KRCS branch volunteers and community disaster response teams (CDRTs) on DRR approaches
• Support communities in developing community disaster preparedness plans
• Coordinate with county governments and National Disaster Operations Centre on disaster preparedness
• Monitor and support implementation of DRR activities across KRCS branches
• Document and share lessons learned from KRCS's community resilience programming
• Represent KRCS in DRR coordination forums and working groups
• Prepare programme reports and donor updates

REQUIRED QUALIFICATIONS
• Degree in Disaster Management, Community Development, Social Sciences, or related field
• Minimum 3 years experience in DRR, emergency preparedness, or community development
• Knowledge of Red Cross Red Crescent Movement principles and volunteer management
• Strong facilitation and training skills
• Excellent community engagement and communication skills
• Valid driving licence and willingness to travel across Kenya

WHAT WE OFFER
• KRCS salary and benefits
• Engagement with the global Red Cross Red Crescent network
• Contribution to Kenya's humanitarian preparedness`),

  // ── Concern Worldwide Kenya (27) ──────────────────────────────────────────
  makeJob(27, "Nutrition Manager", "Nutrition", "Samburu, Kenya", "Full-time", "2026-05-15",
    `OVERVIEW
Concern Worldwide Kenya is recruiting a Nutrition Manager for Samburu county to lead integrated nutrition programming including CMAM, MIYCN, and multi-sector nutrition integration with WASH and food security programmes.

KEY RESPONSIBILITIES
• Lead design, implementation, and monitoring of integrated nutrition programmes in Samburu
• Manage and supervise a team of nutrition officers, community health workers, and enumerators
• Oversee CMAM programme including OTP, TSFP, and Stabilisation Centre linkage
• Lead implementation of Mother, Infant and Young Child Nutrition (MIYCN) interventions
• Coordinate with MoH Samburu County Health Department and sub-county nutrition focal persons
• Manage programme budgets and donor financial reporting
• Conduct SMART surveys and programme evaluations
• Represent Concern in nutrition sub-sector working groups and inter-agency forums

REQUIRED QUALIFICATIONS
• Degree in Nutrition, Public Health, or related field (Master's preferred)
• Minimum 5 years of nutrition programme management experience including CMAM
• Strong skills in SMART surveys, ENA for SMART, and nutrition data analysis
• Experience in MIYCN programming and community mobilisation
• Strong leadership and team management abilities
• Good English and Swahili; Samburu language an asset

WHAT WE OFFER
• Concern Worldwide salary and comprehensive benefits including R&R
• Professional development and international exposure
• Opportunity to lead nutrition programming in a priority county`),

  // ── Africa Humanitarian Action (28) ──────────────────────────────────────
  makeJob(28, "Emergency Health Coordinator", "Health", "Nairobi, Kenya", "Full-time", "2026-06-01",
    `OVERVIEW
Africa Humanitarian Action (AHA) is seeking an Emergency Health Coordinator to lead health emergency response operations in Kenya. The Emergency Health Coordinator will manage rapid response deployments, health cluster coordination, and AHA's emergency medical teams in disease outbreaks and disaster-affected areas.

KEY RESPONSIBILITIES
• Coordinate AHA's health emergency response operations in Kenya
• Lead deployment of Emergency Medical Teams (EMT) and community health workers during emergencies
• Manage health cluster coordination and inter-agency response planning
• Oversee disease outbreak response including cholera, measles, and meningitis
• Develop emergency health response plans and standard operating procedures
• Manage emergency response budgets and logistics
• Prepare situation reports, donor proposals, and after-action reviews
• Represent AHA in health cluster, WHO, and government emergency coordination structures

REQUIRED QUALIFICATIONS
• Medical degree (MBChB or equivalent); Master's in Public Health preferred
• Minimum 5 years experience in emergency health response and health coordination
• Experience with Emergency Medical Team (EMT) systems and WHO EMT standards
• Strong programme management and donor reporting skills
• Excellent leadership and communication skills under pressure

WHAT WE OFFER
• AHA competitive salary reflecting African leadership values
• Unique role in Africa-led humanitarian health response
• Career development in a growing African humanitarian organisation`),

  // ── Welthungerhilfe Kenya (29) ────────────────────────────────────────────
  makeJob(29, "WASH Engineer", "WASH", "Kilifi, Kenya", "Full-time", "2026-05-30",
    `OVERVIEW
Welthungerhilfe Kenya is looking for a WASH Engineer for Kilifi county to design, supervise, and manage water supply and sanitation infrastructure projects in rural coastal communities. The WASH Engineer will oversee construction quality, community water management systems, and hygiene promotion integration.

KEY RESPONSIBILITIES
• Design and prepare Bills of Quantities (BoQs) and engineering drawings for water supply and sanitation infrastructure
• Supervise construction of boreholes, piped water systems, water kiosks, and sanitation facilities
• Manage contractors and ensure construction quality and adherence to specifications
• Facilitate establishment and capacity building of community water management committees
• Coordinate with county WASH department and other WASH implementing partners
• Conduct water quality testing and develop action plans to address contamination
• Prepare technical engineering reports, construction completion certificates, and progress updates
• Support integration of hygiene promotion into WASH infrastructure programming

REQUIRED QUALIFICATIONS
• Degree in Civil Engineering, Water Engineering, or Environmental Engineering
• Minimum 3 years experience in WASH infrastructure programming in development or humanitarian settings
• Knowledge of borehole hydrogeology, water system design, and sanitation technology
• Experience in community-based water management and CLTS approaches
• Proficiency in AutoCAD or other engineering design software
• Valid driving licence

WHAT WE OFFER
• Welthungerhilfe competitive salary and benefits
• Hands-on engineering and development experience in coastal Kenya
• Supportive German-standard organisational management`),
];

async function seed() {
  console.log("🌱 Seeding organizations...");

  // Clear existing data
  await db.delete(jobsTable);
  await db.delete(organizationsTable);

  // Insert organizations
  const insertedOrgs = await db
    .insert(organizationsTable)
    .values(
      organizations.map((org) => ({
        name: org.name,
        description: org.description,
        logo_url: org.logo_url,
        website: org.website,
        type: org.type,
      }))
    )
    .returning();

  console.log(`✅ Inserted ${insertedOrgs.length} organizations`);

  // Insert jobs
  const jobsToInsert = jobTemplates.map((job) => ({
    title: job.title,
    description: job.description,
    organization_id: insertedOrgs[job.organizationIndex].id,
    sector: job.sector,
    location: job.location,
    employment_type: job.employment_type,
    deadline: job.deadline,
    is_active: true,
  }));

  const insertedJobs = await db.insert(jobsTable).values(jobsToInsert).returning();

  console.log(`✅ Inserted ${insertedJobs.length} jobs`);
  console.log("\n🎉 Seeding complete!");
  console.log(`   Organizations: ${insertedOrgs.length}`);
  console.log(`   Jobs: ${insertedJobs.length}`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
