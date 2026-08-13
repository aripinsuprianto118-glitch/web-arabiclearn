// ─────────────────────────────────────────────
// LEVEL 1 — Vocab Quiz (10 questions)
// ─────────────────────────────────────────────

export interface VocabOption {
  id: string
  arabic: string
  transliteration: string
  emoji: string
}

export interface VocabQuestion {
  id: number
  question: { en: string; id: string; ar: string }
  correctId: string
  options: VocabOption[]
}

export const vocabQuestions: VocabQuestion[] = [
  {
    id: 1,
    question: {
      en: 'Which one is a Cup / Glass?',
      id: 'Mana yang merupakan Gelas?',
      ar: 'أيٌّ منها كوبٌ؟', 
    },
    correctId: 'a',
    options: [
      { id: 'a', arabic: 'كَأْس', transliteration: "Ka's", emoji: '🥤' },
      { id: 'b', arabic: 'صَحْن', transliteration: 'Sahn', emoji: '🍽️' },
      { id: 'c', arabic: 'كِتَاب', transliteration: 'Kitab', emoji: '📚' },
      { id: 'd', arabic: 'قَلَم', transliteration: 'Qalam', emoji: '✏️' },
    ],
  },
  {
    id: 2,
    question: {
      en: 'Which one is a Plate / Dish?',
      id: 'Mana yang merupakan Piring?',
      ar: 'أيٌّ منها صَحْنٌ؟',
    },
    correctId: 'b',
    options: [
      { id: 'a', arabic: 'كَأْس', transliteration: "Ka's", emoji: '🥤' },
      { id: 'b', arabic: 'صَحْن', transliteration: 'Sahn', emoji: '🍽️' },
      { id: 'c', arabic: 'بَاب', transliteration: 'Bab', emoji: '🚪' },
      { id: 'd', arabic: 'نَافِذَة', transliteration: 'Nafidhah', emoji: '🪟' },
    ],
  },
  {
    id: 3,
    question: {
      en: 'Which one is a Book?',
      id: 'Mana yang merupakan Buku?',
      ar: 'أيٌّ منها كِتَابٌ؟',
    },
    correctId: 'c',
    options: [
      { id: 'a', arabic: 'مَكْتَب', transliteration: 'Maktab', emoji: '🖥️' },
      { id: 'b', arabic: 'قَلَم', transliteration: 'Qalam', emoji: '✏️' },
      { id: 'c', arabic: 'كِتَاب', transliteration: 'Kitab', emoji: '📚' },
      { id: 'd', arabic: 'سَيَّارَة', transliteration: 'Sayyarah', emoji: '🚗' },
    ],
  },
  {
    id: 4,
    question: {
      en: 'Which one is a Pen?',
      id: 'Mana yang merupakan Pulpen?',
      ar: 'أيٌّ منها قَلَمٌ؟',
    },
    correctId: 'd',
    options: [
      { id: 'a', arabic: 'كِتَاب', transliteration: 'Kitab', emoji: '📚' },
      { id: 'b', arabic: 'بَيْت', transliteration: 'Bayt', emoji: '🏠' },
      { id: 'c', arabic: 'كُرْسِي', transliteration: 'Kursi', emoji: '🪑' },
      { id: 'd', arabic: 'قَلَم', transliteration: 'Qalam', emoji: '✏️' },
    ],
  },
  {
    id: 7,
    question: {
      en: 'Which one is an Apple?',
      id: 'Mana yang merupakan Apel?',
      ar: 'أيٌّ منها تُفَّاحَةٌ؟',
    },
    correctId: 'a',
    options: [
      { id: 'a', arabic: 'تُفَّاحَة', transliteration: 'Tuffahah', emoji: '🍎' },
      { id: 'b', arabic: 'مَوْزَة', transliteration: 'Mawzah', emoji: '🍌' },
      { id: 'c', arabic: 'بُرْتُقَالَة', transliteration: 'Burtuqalah', emoji: '🍊' },
      { id: 'd', arabic: 'عِنَب', transliteration: "'Inab", emoji: '🍇' },
    ],
  },
  {
    id: 6,
    question: {
      en: 'Which one is a Chair?',
      id: 'Mana yang merupakan Kursi?',
      ar: 'أيٌّ منها كُرْسِيٌّ؟',
    },
    correctId: 'b',
    options: [
      { id: 'a', arabic: 'مَكْتَب', transliteration: 'Maktab', emoji: '🖥️' },
      { id: 'b', arabic: 'كُرْسِي', transliteration: 'Kursi', emoji: '🪑' },
      { id: 'c', arabic: 'كَأْس', transliteration: "Ka's", emoji: '🥤' },
      { id: 'd', arabic: 'بَيْت', transliteration: 'Bayt', emoji: '🏠' },
    ],
  },
  {
    id: 7,
    question: {
      en: 'Which one is a Door?',
      id: 'Mana yang merupakan Pintu?',
      ar: 'أيٌّ منها بَابٌ؟',
    },
    correctId: 'c',
    options: [
      { id: 'a', arabic: 'نَافِذَة', transliteration: 'Nafidhah', emoji: '🪟' },
      { id: 'b', arabic: 'صَحْن', transliteration: 'Sahn', emoji: '🍽️' },
      { id: 'c', arabic: 'بَاب', transliteration: 'Bab', emoji: '🚪' },
      { id: 'd', arabic: 'سَيَّارَة', transliteration: 'Sayyarah', emoji: '🚗' },
    ],
  },
  {
    id: 8,
    question: {
      en: 'Which one is a Window?',
      id: 'Mana yang merupakan Jendela?',
      ar: 'أيٌّ منها نَافِذَةٌ؟',
    },
    correctId: 'd',
    options: [
      { id: 'a', arabic: 'بَاب', transliteration: 'Bab', emoji: '🚪' },
      { id: 'b', arabic: 'مَكْتَب', transliteration: 'Maktab', emoji: '🖥️' },
      { id: 'c', arabic: 'كَأْس', transliteration: "Ka's", emoji: '🥤' },
      { id: 'd', arabic: 'نَافِذَة', transliteration: 'Nafidhah', emoji: '🪟' },
    ],
  },
  {
    id: 9,
    question: {
      en: 'Which one is a House?',
      id: 'Mana yang merupakan Rumah?',
      ar: 'أيٌّ منها بَيْتٌ؟',
    },
    correctId: 'a',
    options: [
      { id: 'a', arabic: 'بَيْت', transliteration: 'Bayt', emoji: '🏠' },
      { id: 'b', arabic: 'سَيَّارَة', transliteration: 'Sayyarah', emoji: '🚗' },
      { id: 'c', arabic: 'مَدْرَسَة', transliteration: 'Madrasah', emoji: '🏫' },
      { id: 'd', arabic: 'مَسْجِد', transliteration: 'Masjid', emoji: '🕌' },
    ],
  },
  {
    id: 10,
    question: {
      en: 'Which one is a Car?',
      id: 'Mana yang merupakan Mobil?',
      ar: 'أيٌّ منها سَيَّارَةٌ؟',
    },
    correctId: 'b',
    options: [
      { id: 'a', arabic: 'دَرَّاجَة', transliteration: 'Darrajah', emoji: '🚲' },
      { id: 'b', arabic: 'سَيَّارَة', transliteration: 'Sayyarah', emoji: '🚗' },
      { id: 'c', arabic: 'حَافِلَة', transliteration: 'Hafilah', emoji: '🚌' },
      { id: 'd', arabic: 'قِطَار', transliteration: 'Qitar', emoji: '🚂' },
    ],
  },
]

// ─────────────────────────────────────────────
// LEVEL 2 — Sentence Building (10 questions)
// ─────────────────────────────────────────────

export interface SentenceQuestion {
  id: number
  instruction: { en: string; id: string; ar: string }
  correctOrder: string[]
  distractors: string[]
  audioFile: string
  fullSentence: string
}

export const sentenceQuestions: SentenceQuestion[] = [
  {
    id: 1,
    instruction: { en: 'I drink water', id: 'Saya minum air', ar: 'أنا أشرب الماء' },
    correctOrder: ['أَنَا', 'أَشْرَبُ', 'الْمَاءَ'],
    distractors: ['يَأْكُلُ', 'هُوَ'],
    audioFile: 'saya_minum_air.mpeg',
    fullSentence: 'أنا أشرب الماء',
  },
  {
    id: 2,
    instruction: { en: 'He reads a book', id: 'Dia membaca buku', ar: 'هو يقرأ الكتاب' },
    correctOrder: ['هُوَ', 'يَقْرَأُ', 'الْكِتَابَ'],
    distractors: ['أَنَا', 'يَكْتُبُ'],
    audioFile: 'Dia_Membaca_Buku.mpeg',
    fullSentence: 'هو يقرأ الكتاب',
  },
  {
    id: 3,
    instruction: { en: 'I go to school', id: 'Saya pergi ke sekolah', ar: 'أنا أذهب إلى المدرسة' },
    correctOrder: ['أَنَا', 'أَذْهَبُ', 'إِلَى', 'الْمَدْرَسَةِ'],
    distractors: ['هِيَ', 'الْبَيْتِ'],
    audioFile: 'Saya_Pergi_Kesekolah.mpeg',
    fullSentence: 'أنا أذهب إلى المدرسة',
  },
  {
    id: 4,
    instruction: { en: 'This is a new book', id: 'Ini buku baru', ar: 'هذا كتاب جديد' },
    correctOrder: ['هَذَا', 'كِتَابٌ', 'جَدِيدٌ'],
    distractors: ['ذَلِكَ', 'قَدِيمٌ'],
    audioFile: 'Ini_Buku_Baru.mpeg',
    fullSentence: 'هذا كتاب جديد',
  },
  {
    id: 5,
    instruction: { en: 'Where is the pen?', id: 'Di mana pulpen itu?', ar: 'أين القلم؟' },
    correctOrder: ['أَيْنَ', 'الْقَلَمُ', '؟'],
    distractors: ['مَا', 'الْكِتَابُ'],
    audioFile: 'Dimana_Pulpen_Itu.mpeg',
    fullSentence: 'أين القلم؟',
  },
  {
    id: 6,
    instruction: { en: 'I eat rice', id: 'Saya makan nasi', ar: 'أنا آكل الرز' },
    correctOrder: ['أَنَا', 'آكُلُ', 'الرُّزَّ'],
    distractors: ['أَشْرَبُ', 'هُوَ'],
    audioFile: 'Saya_Makan_Nasi.mpeg',
    fullSentence: 'أنا آكل الرز',
  },
  {
    id: 7,
    instruction: { en: 'She writes a letter', id: 'Dia (pr) menulis surat', ar: 'هي تكتب رسالة' },
    correctOrder: ['هِيَ', 'تَكْتُبُ', 'رِسَالَةً'],
    distractors: ['يَقْرَأُ', 'كِتَابًا'],
    audioFile: 'Dia_Menulis_surat.mpeg',
    fullSentence: 'هي تكتب رسالة',
  },
  {
    id: 8,
    instruction: { en: 'The door is open', id: 'Pintu itu terbuka', ar: 'الباب مفتوح' },
    correctOrder: ['الْبَابُ', 'مَفْتُوحٌ'],
    distractors: ['النَّافِذَةُ', 'مُغْلَقٌ'],
    audioFile: 'Pintu_itu_Terbuka.mpeg',
    fullSentence: 'الباب مفتوح',
  },
  {
    id: 9,
    instruction: { en: 'I learn Arabic', id: 'Saya belajar bahasa Arab', ar: 'أنا أتعلم اللغة العربية' },
    correctOrder: ['أَنَا', 'أَتَعَلَّمُ', 'اللُّغَةَ', 'الْعَرَبِيَّةَ'],
    distractors: ['هُوَ', 'الْفَرَنْسِيَّةَ'],
    audioFile: 'Saya_Belajar_Bahasa_Arab.mpeg',
    fullSentence: 'أنا أتعلم اللغة العربية',
  },
  {
    id: 10,
    instruction: { en: 'The house is big', id: 'Rumah itu besar', ar: 'البيت كبير' },
    correctOrder: ['الْبَيْتُ', 'كَبِيرٌ'],
    distractors: ['الْمَدْرَسَةُ', 'صَغِيرٌ'],
    audioFile: 'Rumah_Itu_Besar.mpeg',
    fullSentence: 'البيت كبير',
  },
]

// ─────────────────────────────────────────────
// LEVEL 3 — Muthala'ah / Reading (3 stories)
// ─────────────────────────────────────────────

export interface StoryQuizOption {
  id: string
  text: { en: string; id: string; ar: string }
}

export interface Story {
  id: number
  titleAr: string
  title: { en: string; id: string; ar: string }
  image: string
  imageAlt: string
  textAr: string
  translation: { id: string; en: string }
  quiz: {
    question: { en: string; id: string; ar: string }
    options: StoryQuizOption[]
    correct: string
    explanation: { id: string; en: string }
  }
}

export const stories: Story[] = [
  {
    id: 1,
    titleAr: 'الْأَسَدُ وَالْفَأْرُ',
    title: { en: 'The Lion and the Mouse', id: 'Singa dan Tikus', ar: 'الأسد والفأر' },
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=700&h=400&fit=crop&auto=format',
    imageAlt: 'Lion resting in the savanna',
    textAr: `نَامَ الْأَسَدُ يَوْمًا فِي الْغَابَةِ، فَجَاءَ فَأْرٌ صَغِيرٌ وَلَعِبَ عَلَى ظَهْرِهِ، فَغَضِبَ الْأَسَدُ وَأَمْسَكَ بِهِ.

قَالَ الْفَأْرُ: "دَعْنِي يَا مَلِكَ الْغَابَةِ، سَأُسَاعِدُكَ يَوْمًا مَا." فَضَحِكَ الْأَسَدُ وَأَطْلَقَ سَرَاحَهُ.

وَبَعْدَ أَيَّامٍ وَقَعَ الْأَسَدُ فِي شَبَكَةِ الصَّيَّادِينَ، فَجَاءَ الْفَأْرُ وَقَطَعَ الشَّبَكَةَ بِأَسْنَانِهِ الْحَادَّةِ وَأَنْقَذَ الْأَسَدَ.

قَالَ الْأَسَدُ: "شُكْرًا يَا صَدِيقِي الصَّغِيرُ، الصَّدَاقَةُ الْحَقِيقِيَّةُ لَا تَعْرِفُ الْكَبِيرَ وَلَا الصَّغِيرَ."`,
    translation: {
      id: 'Seekor singa tidur di hutan, lalu seekor tikus kecil datang dan bermain di punggungnya. Singa marah dan menangkapnya. Tikus berkata: "Lepaskan aku, wahai raja hutan, aku akan membantumu suatu hari." Singa tertawa lalu melepaskannya. Beberapa hari kemudian singa terjebak dalam jaring pemburu. Tikus datang dan memotong jaring dengan giginya yang tajam lalu menyelamatkan singa. Singa berkata: "Terima kasih, sahabat kecilku. Persahabatan sejati tidak mengenal besar atau kecil."',
      en: 'A lion was sleeping in the forest when a small mouse came and played on his back. The lion got angry and caught him. The mouse said: "Release me, O king of the forest, I will help you one day." The lion laughed and freed him. Days later the lion fell into the hunters\' net. The mouse came and cut the net with his sharp teeth, saving the lion. The lion said: "Thank you, my small friend. True friendship knows no big or small."',
    },
    quiz: {
      question: {
        en: 'Why was the mouse able to save the lion?',
        id: 'Mengapa tikus bisa menyelamatkan singa?',
        ar: 'لماذا استطاع الفأرُ أن ينقذ الأسدَ؟',
      },
      options: [
        { id: 'a', text: { en: 'Because the mouse was very strong', id: 'Karena tikus sangat kuat', ar: 'لأن الفأر قوي جدًا' } },
        { id: 'b', text: { en: 'Because the mouse bit through the hunters\' net', id: 'Karena tikus menggigit jaring pemburu', ar: 'لأنه قطع شبكة الصيادين بأسنانه' } },
        { id: 'c', text: { en: 'Because the lion asked for help', id: 'Karena singa yang meminta tolong', ar: 'لأن الأسد طلب المساعدة' } },
        { id: 'd', text: { en: 'Because other animals helped', id: 'Karena hewan lain ikut membantu', ar: 'لأن الحيوانات الأخرى ساعدت' } },
      ],
      correct: 'b',
      explanation: {
        id: 'Tikus menggunakan giginya yang tajam untuk memotong jaring pemburu dan membebaskan singa.',
        en: 'The mouse used his sharp teeth to cut through the hunter\'s net and free the lion.',
      },
    },
  },
  {
    id: 2,
    titleAr: 'الشَّرُّ بِالشَّرِّ',
    title: { en: 'Evil Returns to its Doer', id: 'Kejahatan Dibalas Kejahatan', ar: 'الشر بالشر' },
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&h=400&fit=crop&auto=format',
    imageAlt: 'Dark stormy sky representing moral consequence',
    textAr: `كَانَ رَجُلٌ مَشْهُورٌ بِأَذَاهُ لِلنَّاسِ، وَكَانَ يَحْفِرُ الْحُفَرَ لِغَيْرِهِ كَيْ يَقَعُوا فِيهَا.

ذَاتَ يَوْمٍ مَشَى فِي الطَّرِيقِ وَهُوَ يُفَكِّرُ فِي مَكِيدَةٍ جَدِيدَةٍ، فَلَمْ يَنْتَبِهْ إِلَى الْحُفْرَةِ الَّتِي حَفَرَهَا بِنَفْسِهِ فَوَقَعَ فِيهَا.

صَاحَ يَطْلُبُ الْمُسَاعَدَةَ، لَكِنَّ النَّاسَ تَذَكَّرُوا أَذَاهُ وَمَرُّوا بِهِ دُونَ أَنْ يَمُدُّوا يَدَ الْعَوْنِ.

وَأَدْرَكَ الرَّجُلُ أَنَّ مَنْ يَزْرَعُ الشَّرَّ يَحْصُدُ الشَّرَّ، وَمَنْ يَزْرَعُ الْخَيْرَ يَحْصُدُ الْخَيْرَ.`,
    translation: {
      id: 'Dahulu ada seorang lelaki yang terkenal karena menyakiti orang lain. Ia selalu menggali lubang untuk orang lain agar mereka terjatuh ke dalamnya. Suatu hari ia berjalan di jalan sambil memikirkan makar baru, lalu ia tidak memperhatikan lubang yang ia gali sendiri dan jatuh ke dalamnya. Ia berteriak meminta tolong, namun orang-orang mengingat kejahatannya dan berlalu begitu saja tanpa mengulurkan tangan. Lelaki itu menyadari: siapa yang menanam keburukan, ia akan menuai keburukan; siapa yang menanam kebaikan, ia akan menuai kebaikan.',
      en: 'There was once a man known for harming others. He always dug pits for others to fall into. One day he was walking while plotting a new scheme, and he did not notice the pit he had dug himself — and fell into it. He cried out for help, but people remembered his cruelty and passed by without lending a hand. The man realized: whoever plants evil, reaps evil; whoever plants good, reaps good.',
    },
    quiz: {
      question: {
        en: 'What is the main moral lesson of this story?',
        id: 'Apa pesan moral utama dari kisah ini?',
        ar: 'ما هو الدرس الأخلاقي الرئيسي من هذه القصة؟',
      },
      options: [
        { id: 'a', text: { en: 'Evil deeds return to their doer', id: 'Kejahatan akan kembali kepada pelakunya', ar: 'الشر يعود على صاحبه' } },
        { id: 'b', text: { en: 'We must always forgive others', id: 'Kita harus selalu memaafkan orang lain', ar: 'يجب أن نسامح دائمًا' } },
        { id: 'c', text: { en: "Don't trust strangers easily", id: 'Jangan mudah percaya orang asing', ar: 'لا تثق بالغرباء بسهولة' } },
        { id: 'd', text: { en: 'Roads should be safe for everyone', id: 'Jalan harus aman untuk semua orang', ar: 'يجب أن تكون الطرق آمنة للجميع' } },
      ],
      correct: 'a',
      explanation: {
        id: 'Pria itu jatuh ke dalam lubang yang ia gali sendiri — simbol bahwa keburukan akan kembali kepada pelakunya.',
        en: 'The man fell into the pit he dug himself — a symbol that evil returns to its doer.',
      },
    },
  },
  {
    id: 3,
    titleAr: 'الْحَرِيقُ',
    title: { en: 'The Fire', id: 'Kebakaran', ar: 'الحريق' },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=400&fit=crop&auto=format',
    imageAlt: 'Community helping each other during a fire',
    textAr: `شَبَّ حَرِيقٌ فِي بَيْتٍ مِنْ بُيُوتِ الْقَرْيَةِ لَيْلًا، فَاسْتَيْقَظَ أَهْلُ الْقَرْيَةِ عَلَى صَوْتِ الصُّرَاخِ.

أَسْرَعَ الْجِيرَانُ إِلَى مَكَانِ الْحَرِيقِ وَبَدَأُوا فَوْرًا فِي إِطْفَاءِ النَّارِ بِالْمَاءِ وَالرَّمْلِ قَبْلَ وُصُولِ سَيَّارَةِ الْإِطْفَاءِ.

تَعَاوَنَ الصَّغِيرُ وَالْكَبِيرُ، الرَّجُلُ وَالْمَرْأَةُ، وَأُنْقِذَ أَهْلُ الْبَيْتِ بِسَلَامَةٍ.

لَمَّا وَصَلَ رِجَالُ الْإِطْفَاءِ قَالَ قَائِدُهُمْ: "لَوْلَا تَعَاوُنُكُمْ لَكَانَتِ الْكَارِثَةُ أَعْظَمَ. الْوَحْدَةُ ضَعْفٌ وَالتَّعَاوُنُ قُوَّةٌ."`,
    translation: {
      id: 'Api berkobar di sebuah rumah di desa pada malam hari, lalu penduduk desa terbangun mendengar suara teriakan. Para tetangga bergegas ke lokasi kebakaran dan segera mulai memadamkan api dengan air dan pasir sebelum mobil pemadam tiba. Besar dan kecil, lelaki dan perempuan bekerja sama, dan penghuni rumah berhasil diselamatkan dengan selamat. Ketika regu pemadam kebakaran tiba, pemimpinnya berkata: "Tanpa kerja sama kalian, bencana ini akan jauh lebih besar. Sendirian itu lemah, bersama itu kuat."',
      en: 'A fire broke out in a village house at night, and villagers woke up to screaming. Neighbors rushed to the fire and immediately began putting it out with water and sand before the fire truck arrived. Young and old, men and women cooperated, and the family was safely rescued. When the firefighters arrived, their chief said: "Without your cooperation, the disaster would have been far greater. Alone is weakness, together is strength."',
    },
    quiz: {
      question: {
        en: 'Who first attempted to put out the fire?',
        id: 'Siapa yang pertama kali berusaha memadamkan api?',
        ar: 'مَن كان أول من حاول إطفاء الحريق؟',
      },
      options: [
        { id: 'a', text: { en: 'The firefighters (fire brigade)', id: 'Pemadam kebakaran', ar: 'رجال الإطفاء' } },
        { id: 'b', text: { en: 'The neighbors / villagers', id: 'Para tetangga / penduduk desa', ar: 'الجيران وأهل القرية' } },
        { id: 'c', text: { en: 'The police', id: 'Polisi', ar: 'الشرطة' } },
        { id: 'd', text: { en: 'The family inside the house', id: 'Keluarga di dalam rumah', ar: 'أصحاب البيت' } },
      ],
      correct: 'b',
      explanation: {
        id: 'Para tetangga langsung bergerak memadamkan api dengan air dan pasir sebelum pemadam kebakaran tiba.',
        en: 'The neighbors immediately acted to put out the fire with water and sand before the firefighters arrived.',
      },
    },
  },
]
