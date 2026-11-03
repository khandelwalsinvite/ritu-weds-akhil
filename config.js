/**
 * ==============================================================================
 * WEDDING INVITATION CONFIGURATION (config.js)
 * ==============================================================================
 * रितु संग अखिल खण्डेलवाल — all details live in this one file.
 * Hindi is the primary language; English lines are small secondary captions.
 * ==============================================================================
 */

const WEDDING_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. COUPLE & FAMILIES
  // ----------------------------------------------------------------------------
  bride: {
    nameHi: "रितु",
    nameEn: "Ritu",
    titleHi: "हृदयांशिका",
    relationHi: "सुपुत्री",
    parentsHi: "श्रीमती मधुवाला एवं श्री अजय कुमार खण्डेलवाल",
    grandparentsHi: "स्व. श्रीमती एवं स्व. श्री प्रभातीलाल जी की सुपौत्री",
    residenceHi: "पीलसू गोपालगढ़, जिला डीग (राजस्थान)"
  },

  groom: {
    nameHi: "अखिल",
    nameEn: "Akhil",
    titleHi: "हृदयांश",
    relationHi: "सुपुत्र",
    parentsHi: "शाहजी श्रीमती शीला देवी एवं श्री आनन्द जी खण्डेलवाल",
    residenceHi: "बहरोड़, कोटपुतली (राजस्थान)"
  },

  // ----------------------------------------------------------------------------
  // 2. MAIN CEREMONY (hero + countdown)
  // ----------------------------------------------------------------------------
  wedding: {
    day: "21",
    monthHi: "नवम्बर",
    year: "2026",
    weekdayHi: "शनिवार",
    dateEn: "Saturday, 21 November 2026",
    cityHi: "बहरोड़, कोटपुतली (राजस्थान)",
    venueHi: "ओम शान्ति ओम मैरिज होम",
    // Countdown target: Saturday 21 Nov 2026, 7:00 PM IST
    countdownTargetISO: "2026-11-21T19:00:00+05:30"
  },

  // ----------------------------------------------------------------------------
  // 3. WORDING
  // ----------------------------------------------------------------------------
  wording: {
    mantra: "॥ श्री गणेशाय नमः ॥",
    blessing: "ठा. श्री बाँकेबिहारी जी महाराज की असीम अनुकम्पा से",
    inviteLine: "अपनी सुपुत्री के परिणयबंधन की मंगलमयी बेला पर आपको सस्नेह सादर आमंत्रित करते हैं",
    heroLabel: "शुभ विवाह",
    shloka: "लक्ष्मी नारायण जैसी जोड़ी हो, सुख समृद्धि का वास हो।\nससुराल में मिले इतना आदर, हर दिन जैसे कोई त्यौहार हो॥",

    thankYouHeading: "स्नेह निमंत्रण एवं आभार",
    thankYouMessage: "कृपया पधार कर वर-वधु को अपना स्नेहाशीष प्रदान कर हमें अनुगृहीत करें।",
    familySignoff: "समस्त खण्डेलवाल एवं माली परिवार",

    balAagrah: "लिफाफे में पुराने नोट न फसाना।\nहमारी बुआ जी की शादी में जलूल-जलूल आना जी।",
    balAagrahChildren: "लुभित, नैतिक, विधि, वंशू, मयंक, कृतिशा, वंश, दिव्यांश",

    busTravelNote: "नोट:- आप और हम अपने निज निवास पीलसू से सुबह 10 बजे बहरोड़ के लिए प्रस्थान करेंगे|"
  },

  // ----------------------------------------------------------------------------
  // 4. EVENTS (मांगलिक कार्यक्रम)
  //    Events sharing the same `iso` date are grouped under one date heading.
  //    `times` can hold several lines; each is { label, time }.
  // ----------------------------------------------------------------------------
  events: [
    {
      iso: "2026-11-19",
      day: "19", monthEn: "November", weekdayEn: "Thursday", monthHi: "नवम्बर", weekdayHi: "गुरुवार",
      titleHi: "लग्न लेखन एवं तेल-हल्दी",
      titleEn: "Lagn Lekhan & Tel-Haldi",
      times: [
        { label: "लग्न लेखन", time: "प्रातः 10:00 बजे" },
        { label: "तेल-हल्दी", time: "प्रातः 11:00 बजे" }
      ],
      venueHi: "निज निवास",
      addressHi: "पीलसू गोपालगढ़, जिला डीग (राजस्थान) – 321204",
      mapsUrl: "https://maps.google.com/?q=27.653390,77.088071",
      calendar: { title: "Ritu & Akhil - Lagn Lekhan & Tel-Haldi", start: "20261119T100000", end: "20261119T130000" }
    },
    {
      iso: "2026-11-20",
      day: "20", monthEn: "November", weekdayEn: "Friday", monthHi: "नवम्बर", weekdayHi: "शुक्रवार",
      titleHi: "चाक एवं गौरी पूजन",
      titleEn: "Chaak & Gauri Pujan",
      times: [
        { label: "चाक", time: "प्रातः 10:00 बजे" },
        { label: "गौरी पूजन", time: "प्रातः 11:00 बजे" }
      ],
      venueHi: "निज निवास",
      addressHi: "पीलसू गोपालगढ़, जिला डीग (राजस्थान) – 321204",
      mapsUrl: "https://maps.google.com/?q=27.653390,77.088071",
      calendar: { title: "Ritu & Akhil - Chaak & Gauri Pujan", start: "20261120T100000", end: "20261120T130000" }
    },
    {
      iso: "2026-11-21",
      day: "21", monthEn: "November",
      dayNote: "नोट:- आप और हम अपने निज निवास पीलसू से सुबह 10 बजे बहरोड़ के लिए प्रस्थान करेंगे|", weekdayEn: "Saturday", monthHi: "नवम्बर", weekdayHi: "शनिवार",
      titleHi: "स्वरुचि भोज",
      titleEn: "Wedding Dinner",
      times: [{ label: "", time: "सायं 7:00 बजे से" }],
      venueHi: "ओम शान्ति ओम मैरिज होम",
      addressHi: "खेड़की रोड, सबलपुरा कॉलोनी, बहरोड़, कोटपुतली (राजस्थान)",
      mapsUrl: "https://maps.google.com/?q=Om+Shanti+Om+Marriage+Home+Khedki+Road+Behror",
      calendar: { title: "Ritu & Akhil - Swaruchi Bhoj", start: "20261121T190000", end: "20261121T230000" }
    },
    {
      iso: "2026-11-21",
      day: "21", monthEn: "November", weekdayEn: "Saturday", monthHi: "नवम्बर", weekdayHi: "शनिवार",
      titleHi: "पाणिग्रहण संस्कार",
      titleEn: "Wedding Ceremony · Saat Phere",
      times: [{ label: "", time: "रात्रि बेला" }],
      venueHi: "ओम शान्ति ओम मैरिज होम",
      addressHi: "खेड़की रोड, सबलपुरा कॉलोनी, बहरोड़, कोटपुतली (राजस्थान)",
      mapsUrl: "https://maps.google.com/?q=Om+Shanti+Om+Marriage+Home+Khedki+Road+Behror",
      calendar: { title: "Ritu & Akhil - Panigrahan Sanskar", start: "20261121T220000", end: "20261122T040000" }
    },
    {
      iso: "2026-11-22",
      day: "22", monthEn: "November", weekdayEn: "Sunday", monthHi: "नवम्बर", weekdayHi: "रविवार",
      titleHi: "भीगी पलकें",
      titleEn: "Vidaai",
      times: [{ label: "", time: "तारों की छांव में" }],
      venueHi: "ओम शान्ति ओम मैरिज होम",
      addressHi: "खेड़की रोड, सबलपुरा कॉलोनी, बहरोड़, कोटपुतली (राजस्थान)",
      mapsUrl: "https://maps.google.com/?q=Om+Shanti+Om+Marriage+Home+Khedki+Road+Behror",
      calendar: { title: "Ritu & Akhil - Vidaai", start: "20261122T050000", end: "20261122T070000" }
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. FAMILY GREETINGS (पारिवारिक स्नेहाशीष)
  //    Each list is separated by commas; they are shown with neat dividers.
  // ----------------------------------------------------------------------------
  familyGroups: {
    openByDefault: false, // true = expanded when the page loads
    groups: [
      { label: "स्वागतोत्सुक", names: "सुशीला देवी, लक्ष्मी नारायण–मीना देवी, बीना, जगमोहन, प्रहलाद–आशा, देवेन्द्र–हेमा, मनोज–मेघा, नरेश–पूजा, रिंकू–रूबी, विपिन–सुनीता, मोहित–राधिका, संजय–हर्षिता" },
      { label: "दर्शनाभिलाषी", names: "मनीष, गौरव, सौरभ, अंकित, कृष्णा, अशोक, राजेश एवं समस्त माली परिवार" },
      { label: "विशेष आग्रह", names: "कमलेश–देवेन्द्र जी, राधा–रामवतार जी, शालू–दीनबंधु जी, रिंकी–राजेश जी, पिंकी–अंकुर जी, प्रीति–जितेश जी, मोना–पवन जी, सोनम–आशु जी, नीरा–पीयूष जी, अन्नू, प्रियंका, छवि" },
      { label: "ननिहाल पक्ष", names: "नरेश, हरिओम–श्वेता एवं समस्त रावत परिवार" }
    ],
    firms: [
      { name: "खण्डेलवाल मैडिकल स्टोर", address: "सौंख रोड़, कुम्हेर, भरतपुर (राज.)", phone: "9461643940, 9166003700" },
      { name: "कृष्णा स्टेशनरी एवं जनरल स्टोर", address: "गुड़गाँव (हरियाणा)", phone: "9990709069" }
    ]
  },

  // ----------------------------------------------------------------------------
  // 6. CONTACT (WhatsApp)
  // ----------------------------------------------------------------------------
  contact: {
    // country code + number, digits only
    phone: "919990709069",
    prefilledMessage: "नमस्ते! रितु और अखिल के विवाह समारोह के संबंध में जानकारी चाहिए।"
  },

  // ----------------------------------------------------------------------------
  // 7. SHARING
  // ----------------------------------------------------------------------------
  share: {
    title: "शुभ विवाह निमंत्रण: रितु संग अखिल खण्डेलवाल",
    message: "ठा. श्री बाँकेबिहारी जी की असीम अनुकम्पा से, रितु और अखिल के शुभ विवाह समारोह में आप सादर आमंत्रित हैं। कार्यक्रम, समय व विवाह स्थल की जानकारी यहाँ देखें:",
    url: "https://khandelwalsinvite.github.io/ritu-weds-akhil/"
  },

  // ----------------------------------------------------------------------------
  // 8. MEDIA
  // ----------------------------------------------------------------------------
  assets: {
    couplePhoto: "assets/images/couple.jpg",
    musicPath: "assets/audio/sahilmadan-wedding-invitation-421393.mp3"
  },

  // ----------------------------------------------------------------------------
  // 9. FEATURE TOGGLES
  // ----------------------------------------------------------------------------
  features: {
    enableOpeningReveal: true,
    showCouplePhoto: true,
    showCountdown: true,
    showDirectionsButtons: true,
    showAddToCalendar: false,
    showMusicPlayer: true,
    showWhatsAppShare: true,
    showContactButton: true,
    showFamilyGroups: true,
    showBusTravelNote: true
  },

  // ----------------------------------------------------------------------------
  // 10. DEVELOPER / CREATOR DETAILS
  // ----------------------------------------------------------------------------
  developer: {
    show: true,
    titleHi: "डिजिटल पत्रिका निर्माण",
    titleEn: "Website Designed & Developed by",
    name: "Lubhit Khandelwal",
    phone: "6378966072",
    phoneDisplay: "+91 63789 66072",
    email: "khandelwallubhit10@gmail.com",
    whatsappMessage: "नमस्ते लुभित! मैंने आपकी बनाई डिजिटल शादी की पत्रिका देखी और मुझे भी एक पत्रिका बनवानी है।"
  }
};

if (typeof window !== "undefined") window.WEDDING_CONFIG = WEDDING_CONFIG;
if (typeof module !== "undefined" && module.exports) module.exports = WEDDING_CONFIG;
