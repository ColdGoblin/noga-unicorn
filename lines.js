/* Every spoken line, by clip id. Source of truth: design/VOICE-SCRIPT.md.
   The game plays voice/full/<id>.mp3 when it exists; otherwise the browser reads this text aloud. */
window.LINES = {
  ins_01:"Press the arrows to walk!", ins_02:"Press the green button to jump!", ins_03:"Jump!", ins_04:"Go this way!",
  ins_05:"Jump on the rock!", ins_06:"Press the pink button to dance!", ins_07:"Let's dance!",
  ins_08:"Press the star button for a super jump!", ins_09:"Super jump!", ins_10:"Find the stars!",
  ins_11:"Find three feathers!", ins_12:"Find four bubbles!", ins_13:"Jump on the bubble!", ins_14:"Find five petals!",
  ins_15:"Look up!", ins_16:"Find three puffs of steam!", ins_17:"Find five planks!", ins_18:"Find four carrots!",
  ins_19:"Catch the two little lights!", ins_20:"Find the silver ribbons!", ins_21:"Find something red!",
  ins_22:"Find something blue!", ins_23:"Find flowers for the princesses!", ins_24:"Go to your friend!", ins_25:"One more!",

  num_01:"One!", num_02:"Two!", num_03:"Three!", num_04:"Four!", num_05:"Five!",
  num_06:"Six!", num_07:"Seven!", num_08:"Eight!", num_09:"Nine!", num_10:"Ten!",
  col_01:"Red!", col_02:"Blue!", col_03:"Green!", col_04:"Yellow!", col_05:"Pink!",
  col_06:"Purple!", col_07:"White!", col_08:"Orange!", col_09:"Brown!", col_10:"Grey!",

  pr_01:"Great job, Noga!", pr_02:"You did it, Noga!", pr_03:"Wow!", pr_04:"Yes!", pr_05:"Hooray!", pr_06:"Beautiful!",
  pr_07:"Beautiful dancing!", pr_08:"I love your dancing!", pr_09:"What a jump!", pr_10:"Good try!", pr_11:"Almost!",
  pr_12:"You found it!", pr_13:"Well done!", pr_14:"Amazing, Noga!", pr_15:"You are so kind!", pr_16:"What a helper!",
  pr_17:"You are a wonderful friend!", pr_18:"Thank you for helping!", pr_19:"So many friends!", pr_20:"You are a star, Noga!",

  l1_a:"Oh no! The little bird cannot fly. Let's help!", l1_b:"The little bird is trying! Keep going!", l1_c:"Look! The little bird can fly!",
  l2_a:"Oh no! Pitzi's bubbles flew away. Let's find them!", l2_b:"Look at all the colours!", l2_c:"The bubbles are back! Pitzi is so happy!",
  l3_a:"This little tree is afraid to bloom. Let's stay with him.", l3_b:"Let's dance around the tree!", l3_c:"Look! The tree is full of flowers!",
  l4_a:"Oh no! Three unicorns are stuck in the sweet cloud!", l4_b:"A unicorn is free!", l4_c:"All the unicorns are free! Let's fly!",
  l5_a:"Oh no! The horses are stuck in the mud. Slowly, slowly.", l5_b:"We are building a bridge!", l5_c:"The horses are out! Look at Grandpa's moustache!",
  l6_a:"It is Shabbat in the garden. The little lights are dancing away!", l6_b:"Dance, and the lights will come!", l6_c:"The lights are home. Shabbat shalom!",
  l7_a:"It is night. The shadow went for a walk. Let's follow the ribbon.", l7_b:"The Riddle Tree has a riddle for you!", l7_c:"The shadows are dancing! What a show!",
  l8_a:"We are here! The Flower Party!", l8_b:"Everybody dance!", l8_c:"What a party! We love you, Noga!",

  fr_01:"Cheep cheep! I can fly!", fr_02:"Ah... ah... achoo!", fr_03:"Thank you, Noga!", fr_04:"Woof... ah... achoo!",
  fr_05:"Splash! Good morning!", fr_06:"Thank you, Noga. These flowers are mine!", fr_07:"Hello! I am Koko!", fr_08:"See you on the moon!",
  fr_09:"Thank you, Noga!", fr_10:"Slowly, slowly.", fr_11:"Well done, my Noga!", fr_12:"Hee-haw! Carrots!",
  fr_13:"The challah is ready!", fr_14:"Tea time!", fr_15:"Here is my riddle!", fr_16:"Welcome, Princess Noga!",

  x_count:"Pop the bubbles in order: one, two, three!", x_rain:"Catch the falling stars!", x_draft:"The wind will lift you up!",
  x_hide:"My friends are hiding in the bushes! Touch the bushes!", x_seek_a:"The chicks are hiding in the hay! Touch the hay!", x_seek_b:"Something is hiding under the sand! Touch the sand!", x_chick:"Peep peep! You found me!", x_gem:"Wow! A shiny gem!",
  x_simon:"Watch the lanterns!", x_now:"Now you! Stand on the lanterns in the same order.", x_rhythm:"Dance when the circle is small!", x_well:"Bring the water to the well!",
  x_find_water:"Find three drops of water!", x_find_moon:"Find five moon stars!",
  x_find_feathers:"Find the colourful feathers!", x_find_bubbles:"Find the colourful bubbles!", x_find_petals:"Find the petals!", x_find_steam:"Find the puffs of steam!", ins_18b:"Find carrots for Bilam!", x_find_water2:"Find drops of water for the well!", x_find_moon2:"Find the moon stars!", x_oven_loaf:"The oven is baking the bread!",
  fin_a:"All the friends are coming to the party!", fin_b:"This is a love party! We love you, Noga!", fin_c:"Look! Fireworks!", fin_d:"Let's all dance together!", fin_e:"Noga, you are our princess. We love you!",
  l11_a:"It is the Princesses' Flower Party today! Let's get everything ready.", x_party_cake:"Let's bake a challah for the party! Find flour, eggs and honey.", x_party_tea:"And now tea! Find two flowers and a drop of water.", x_party_table:"Put the challah and the tea on the party table!", l11_b:"The party is starting!", l11_c:"All the friends came! What a party!", l11_d:"Thank you, Noga! You were the best princess.", x_party_dance:"Now dance with everyone!",
  x_tea_start:"Let's make tea! We need flowers and water.", x_tea_flowers:"Find three flowers!", x_tea_water:"Find a drop of water!", x_tea_pot:"Put everything in the teapot!", x_tea_fire:"Now put the teapot on the fire!", x_tea_boil:"The water is boiling! The tea is ready!", x_tea_thanks:"Thank you! What a tasty tea!", x_pick:"Choose two friends to come with you!",
  l9_a:"We are in the desert. The Queen of Sheba is thirsty!", l9_b:"The well is full of water!", l9_c:"Everybody has water! Thank you, Noga!", l9_d:"Thank you, Noga! You are a true friend.",
  l10_a:"We climbed the Moon Mountain! The moon is sleepy and sad.", l10_b:"The moon is waking up!", l10_c:"The moon is smiling! What a night!", l10_d:"Good night, Noga. Sweet dreams.",

  ex_01:"Noga and the Unicorn!", ex_02:"Welcome back, Noga!", ex_03:"Super jump is ready!", ex_04:"Wheee!", ex_05:"See you soon, Noga!",
  l12_a:"Welcome to Bouncy Castle Land! Everything here bounces!", x_pad:"The trampolines will fly you up!", x_bounce:"Jump on the big trampoline! Five times!", x_candy:"Collect the candies! Jump high!", x_candy_got:"Yummy!", l12_b:"Hi Noga! Come bounce with us!", fr_17:"Wheee! Again!", l12_c:"What fun! We bounced up to the sky!", l12_d:"The candies are so sweet! You are the bounce princess!", x_tap:"Touch it!", x_bowl:"Put everything in the bowl!", x_oven:"The oven is baking the challah!", x_table:"Put it on the table!", x_feed:"Give him a carrot!", x_mill:"Bring wheat to the mill!", x_bridge:"Build the bridge from the planks!", x_horses:"Feed the horses!", x_bed:"Water the garden bed!", l13_a:"Welcome to Candy Land! Everything here is made of sweets!", x_lolli:"Take the lollipop! Our friends are hungry!", x_eat:"Give it to your friend to eat!", x_eat_done:"Yum yum! So tasty!", x_choc:"Chocolate stars are falling! Catch them!", l13_b:"A cotton candy castle! Climb up!", x_fall:"A chocolate waterfall! Jump on the marshmallows!", x_machine:"The candy machine! Press and drag the ingredients into it!", x_machine_done:"Wow! Brand new candies!", fr_18:"Yum! Thank you for the candies!", l13_c:"Everybody is eating candy! What fun!", l13_d:"You are the Candy Land princess, Noga!",
  x_rc_target:"Look at the picture! Put the ingredients in one after another and we make this candy!", x_rc_ok:"Exactly like the picture! The candy is ready!", x_rc_alt:"Wow, that is a different candy! You can try again, like the picture.", x_rc_mix:"What a bubbly mix! Try again, like the picture.", x_rc_help:"Look, the next ingredient is glowing!"
};

/* Hebrew voice (the owner needs Hebrew sounds). Spoken to a girl, so commands are feminine.
   The game plays voice/he/<id>.mp3 when it exists; otherwise the browser reads this text aloud in Hebrew. */
window.LINES_HE = {
  ins_01:"לחצי על החצים כדי ללכת!", ins_02:"לחצי על הכפתור הירוק כדי לקפוץ!", ins_03:"קפצי!", ins_04:"לכי לכיוון הזה!",
  ins_05:"קפצי על האבן!", ins_06:"לחצי על הכפתור הוורוד כדי לרקוד!", ins_07:"בואי נרקוד!",
  ins_08:"לחצי על כפתור הכוכב לקפיצת על!", ins_09:"קפיצת על!", ins_10:"מצאי את הכוכבים!",
  ins_11:"מצאי שלוש נוצות!", ins_12:"מצאי ארבע בועות!", ins_13:"קפצי על הבועה!", ins_14:"מצאי חמישה עלי כותרת!",
  ins_15:"תסתכלי למעלה!", ins_16:"מצאי שלושה פרצי אדים!", ins_17:"מצאי חמישה קרשים!", ins_18:"מצאי ארבעה גזרים!",
  ins_19:"תפסי את שני האורות הקטנים!", ins_20:"מצאי את הסרטים הכסופים!", ins_21:"מצאי משהו אדום!",
  ins_22:"מצאי משהו כחול!", ins_23:"מצאי פרחים לנסיכות!", ins_24:"לכי אל החבר שלך!", ins_25:"עוד אחד!",

  num_01:"אחת!", num_02:"שתיים!", num_03:"שלוש!", num_04:"ארבע!", num_05:"חמש!",
  num_06:"שש!", num_07:"שבע!", num_08:"שמונה!", num_09:"תשע!", num_10:"עשר!",
  col_01:"אדום!", col_02:"כחול!", col_03:"ירוק!", col_04:"צהוב!", col_05:"ורוד!",
  col_06:"סגול!", col_07:"לבן!", col_08:"כתום!", col_09:"חום!", col_10:"אפור!",

  pr_01:"כל הכבוד, נוגה!", pr_02:"הצלחת, נוגה!", pr_03:"וואו!", pr_04:"כן!", pr_05:"הידד!", pr_06:"איזה יופי!",
  pr_07:"איזה ריקוד יפה!", pr_08:"אני אוהבת את הריקוד שלך!", pr_09:"איזו קפיצה!", pr_10:"ניסיון יפה!", pr_11:"כמעט!",
  pr_12:"מצאת!", pr_13:"יפה מאוד!", pr_14:"מדהים, נוגה!", pr_15:"את כל כך טובת לב!", pr_16:"איזו עוזרת!",
  pr_17:"את חברה נפלאה!", pr_18:"תודה שעזרת!", pr_19:"כל כך הרבה חברים!", pr_20:"את כוכבת, נוגה!",

  l1_a:"אוי לא! הציפור הקטנה לא יכולה לעוף. בואי נעזור לה!", l1_b:"הציפור הקטנה מנסה! תמשיכי!", l1_c:"תראי! הציפור הקטנה עפה!",
  l2_a:"אוי לא! הבועות של פיצי עפו. בואי נמצא אותן!", l2_b:"תראי כמה צבעים!", l2_c:"הבועות חזרו! איזו שמחה לפיצי!",
  l3_a:"העץ הקטן הזה מפחד לפרוח. בואי נישאר איתו.", l3_b:"בואי נרקוד סביב העץ!", l3_c:"תראי! העץ מלא פרחים!",
  l4_a:"אוי לא! שלוש חד-קרנים תקועות בענן המתוק!", l4_b:"חד-קרן אחת השתחררה!", l4_c:"כל החד-קרנים השתחררו! בואי נעוף!",
  l5_a:"אוי לא! הסוסים תקועים בבוץ. לאט לאט.", l5_b:"אנחנו בונים גשר!", l5_c:"הסוסים יצאו! תראי את השפם של סבא!",
  l6_a:"זה שבת בגינה. האורות הקטנים רוקדים ובורחים!", l6_b:"תרקדי, והאורות יבואו!", l6_c:"האורות חזרו הביתה. שבת שלום!",
  l7_a:"זה לילה. הצל יצא לטייל. בואי נלך אחרי הסרט.", l7_b:"לעץ החידות יש חידה בשבילך!", l7_c:"הצללים רוקדים! איזו הופעה!",
  l8_a:"הגענו! מסיבת הפרחים!", l8_b:"כולם רוקדים!", l8_c:"איזו מסיבה! אנחנו אוהבים אותך, נוגה!",

  fr_01:"ציף ציף! אני באוויר!", fr_02:"אה... אה... אפצ'י!", fr_03:"תודה, נוגה!", fr_04:"הב... אה... אפצ'י!",
  fr_05:"שפלוש! בוקר טוב!", fr_06:"תודה, נוגה. הפרחים האלה שלי!", fr_07:"שלום! קוראים לי קוקו!", fr_08:"נתראה על הירח!",
  fr_09:"תודה, נוגה!", fr_10:"לאט... לאט...", fr_11:"כל הכבוד, נוגה שלי!", fr_12:"היי-הו! גזרים!",
  fr_13:"החלה מוכנה!", fr_14:"זמן תה!", fr_15:"הנה החידה שלי!", fr_16:"ברוכה הבאה, הנסיכה נוגה!",

  x_count:"פוצצי את הבועות לפי הסדר: אחת, שתיים, שלוש!", x_rain:"תפסי את הכוכבים הנופלים!", x_draft:"הרוח תרים אותך למעלה!",
  x_hide:"החברים מתחבאים בשיחים! געי בשיחים!", x_seek_a:"האפרוחים מתחבאים בקש! געי בקש!", x_seek_b:"משהו מתחבא מתחת לחול! געי בחול!", x_chick:"ציף ציף! מצאת אותי!", x_gem:"וואו! אבן יקרה נוצצת!",
  x_simon:"תסתכלי על הפנסים!", x_now:"עכשיו את! עמדי על הפנסים באותו סדר.", x_rhythm:"רקדי כשהעיגול קטן!", x_well:"הביאי את המים אל הבאר!",
  x_find_water:"מצאי שלוש טיפות מים!", x_find_moon:"מצאי חמישה כוכבי ירח!",
  x_find_feathers:"מצאי את הנוצות הצבעוניות!", x_find_bubbles:"מצאי את הבועות הצבעוניות!", x_find_petals:"מצאי את עלי הכותרת!", x_find_steam:"מצאי את פרצי האדים!", ins_18b:"מצאי גזרים לבלעם!", x_find_water2:"מצאי טיפות מים בשביל הבאר!", x_find_moon2:"מצאי את כוכבי הירח!", x_oven_loaf:"התנור אופה את הלחם!",
  fin_a:"כל החברים באים למסיבה!", fin_b:"זאת מסיבת אהבה! אנחנו אוהבים אותך, נוגה!", fin_c:"תראי! זיקוקים!", fin_d:"בואו נרקוד כולנו ביחד!", fin_e:"נוגה, את הנסיכה שלנו. אנחנו אוהבים אותך!",
  l11_a:"היום מסיבת הפרחים של הנסיכות! בואי נכין הכול.", x_party_cake:"בואי נאפה חלה למסיבה! מצאי קמח, ביצים ודבש.", x_party_tea:"ועכשיו תה! מצאי שני פרחים וטיפת מים.", x_party_table:"שימי את החלה והתה על שולחן המסיבה!", l11_b:"המסיבה מתחילה!", l11_c:"כל החברים באו! איזו מסיבה!", l11_d:"תודה, נוגה! היית הנסיכה הכי טובה.", x_party_dance:"עכשיו רקדי עם כולם!",
  x_tea_start:"בואי נכין תה! צריך פרחים ומים.", x_tea_flowers:"מצאי שלושה פרחים!", x_tea_water:"מצאי טיפת מים!", x_tea_pot:"שימי הכול בקומקום!", x_tea_fire:"עכשיו שימי את הקומקום על האש!", x_tea_boil:"המים רותחים! התה מוכן!", x_tea_thanks:"תודה! איזה תה טעים!", x_pick:"בחרי שני חברים שיבואו איתך!",
  l9_a:"אנחנו במדבר. מלכת שבא צמאה!", l9_b:"הבאר מלאה במים!", l9_c:"לכולם יש מים! תודה, נוגה!", l9_d:"תודה, נוגה! את חברה אמיתית.",
  l10_a:"טיפסנו על הר הירח! הירח ישנוני ועצוב.", l10_b:"הירח מתעורר!", l10_c:"הירח מחייך! איזה לילה!", l10_d:"לילה טוב, נוגה. חלומות מתוקים.",

  ex_01:"נוגה והחד-קרן!", ex_02:"ברוכה השבה, נוגה!", ex_03:"קפיצת העל מוכנה!", ex_04:"וויייי!", ex_05:"להתראות, נוגה!",
  l12_a:"ברוכה הבאה לארץ הבאונסי קאסל! כאן הכול קופץ!", x_pad:"המקפצות יעיפו אותך למעלה!", x_bounce:"קפצי על המקפצה הגדולה! חמש פעמים!", x_candy:"אספי את הסוכריות! קפצי גבוה!", x_candy_got:"מתוק!", l12_b:"היי נוגה! בואי לקפוץ איתנו!", fr_17:"וויי! עוד פעם!", l12_c:"איזה כיף! קפצנו עד השמיים!", l12_d:"הסוכריות כל כך מתוקות! את נסיכת הקפיצות!", x_tap:"געי בו!", x_bowl:"שימי הכול בקערה!", x_oven:"התנור אופה את החלה!", x_table:"שימי על השולחן!", x_feed:"תני לו גזר!", x_mill:"הביאי חיטה לטחנה!", x_bridge:"בני את הגשר מהקרשים!", x_horses:"האכילי את הסוסים!", x_bed:"השקי את הערוגה!", l13_a:"ברוכה הבאה לארץ הממתקים! כאן הכול עשוי ממתק!", x_lolli:"קחי את הסוכריה על המקל! החברים רעבים!", x_eat:"תני לחבר לאכול!", x_eat_done:"ניאם ניאם! כמה טעים!", x_choc:"כוכבי שוקולד נופלים! תפסי אותם!", l13_b:"טירת צמר גפן! טפסי למעלה!", x_fall:"מפל שוקו! קפצי על המרשמלו!", x_machine:"מכונת הממתקים! לחצי וגררי את המצרכים לתוך המכונה!", x_machine_done:"וואו! ממתקים חדשים!", fr_18:"ניאם! תודה על הממתקים!", l13_c:"כולם אוכלים ממתקים! איזה כיף!", l13_d:"את נסיכת ארץ הממתקים, נוגה!",
  x_rc_target:"הסתכלי על הציור! שימי את המצרכים בזה אחר זה, ונכין את הממתק!", x_rc_ok:"בדיוק כמו בציור! הממתק מוכן!", x_rc_alt:"וואו, זה ממתק אחר! אפשר לנסות שוב, כמו בציור.", x_rc_mix:"איזו תערובת מבעבעת! נסי שוב, כמו בציור.", x_rc_help:"תראי, המצרך הבא זוהר!"
};
