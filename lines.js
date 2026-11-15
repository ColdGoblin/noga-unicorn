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

  ex_01:"Noga and the Unicorn!", ex_02:"Welcome back, Noga!", ex_03:"Super jump is ready!", ex_04:"Wheee!", ex_05:"See you soon, Noga!"
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

  ex_01:"נוגה והחד-קרן!", ex_02:"ברוכה השבה, נוגה!", ex_03:"קפיצת העל מוכנה!", ex_04:"וויייי!", ex_05:"להתראות, נוגה!"
};
