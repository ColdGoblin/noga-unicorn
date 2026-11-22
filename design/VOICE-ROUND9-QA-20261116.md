# Round 9 raw Hebrew-STT outputs (faster-whisper small int8, language=he, beam 5, VAD)
# Second engine = built-in audio reader (generic multilingual STT).
# Classification: EXACT = whisper output matches expected words allowing homophone/spelling normalization;
# PHONETIC = engines only converge on approximate sounds, words not confirmed.

## l12_a  [EXACT]
expected : ברוכה הבאה לארץ הבאונסי קאסל! כאן הכול קופץ!
whisper-he: ברוכה הבאה לארץ הבאונסי קאסל. כאן הכל כופץ.
generic  : ברוכה הבאה לארץ ה-Bouncy Castle. כאן הכל קופץ.

## x_pad  [EXACT]
expected : המקפצות יעיפו אותך למעלה!
whisper-he: המקפצות יעיפו אותך למעלה
generic  : המשקפיים יעיפו אותך למעלה.

## x_bounce  [EXACT]
expected : קפצי על המקפצה הגדולה! חמש פעמים!
whisper-he: קפצי על המקפצה הגדולה חמש פעמים
generic  : כפית של אבקה גדולה חמש פעמים.

## x_candy  [EXACT]
expected : אספי את הסוכריות! קפצי גבוה!
whisper-he: איספי את הסוכריות. קפציגבוה!
generic  : הסفي את הסוכריות, קפצי גבוה.

## x_candy_got  [PHONETIC]
expected : מתוק!
whisper-he: מדווק!
generic  : Muttuk

## l12_b  [PHONETIC]
expected : היי נוגה! בואי לקפוץ איתנו!
whisper-he: היי, נוגה, בויליק פוציטנו
generic  : Hey, Noga, voi likpoti tanu?

## fr_17  [EXACT]
expected : וויי! עוד פעם!
whisper-he: וואי, עוד פעם
generic  : 哇，好棒！

## l12_c  [EXACT]
expected : איזה כיף! קפצנו עד השמיים!
whisper-he: איזה כיף! קפץ נו עד השמיים
generic  : איזה כיף, כפץ נועד השמיים.

## l12_d  [EXACT]
expected : הסוכריות כל כך מתוקות! את נסיכת הקפיצות!
whisper-he: הסוכריות כל כך מטוקות  את נשיחת הקפיצות
generic  : הסוכריות כל כך מתוקות, את נסיכת הקפיצות.

## x_tap  [PHONETIC]
expected : געי בו!
whisper-he: גאיבו
generic  : Ghibli (v1) / גאיבו (v2)

## x_bowl  [EXACT]
expected : שימי הכול בקערה!
whisper-he: סימי הכל בקארה
generic  : שימי הכל בקערה.

## x_oven  [EXACT]
expected : התנור אופה את החלה!
whisper-he: ‫התנור אופה את החלה.
generic  : Hat er nur auf Fehler geachtet?

## x_table  [EXACT]
expected : שימי על השולחן!
whisper-he: סימי על השולחן
generic  : שימי על השולחן.

## x_feed  [EXACT]
expected : תני לו גזר!
whisper-he: תני לו גזר
generic  : תני לי גזר.

## x_mill  [EXACT]
expected : הביאי חיטה לטחנה!
whisper-he: הוויעי חיטה לתחנה
generic  : הביאי חיטה לתחנה.

## x_bridge  [EXACT]
expected : בני את הגשר מהקרשים!
whisper-he: בני תגשר מהקרשים
generic  : בניתי גשר מעקרשים.

## x_horses  [EXACT]
expected : האכילי את הסוסים!
whisper-he: האחילי את הסוסים!
generic  : האכיל את הסוסים.

## x_bed  [EXACT]
expected : השקי את הערוגה!
whisper-he: השקי את הארוגה
generic  : השקי את הערוגה.

## pr_05  [PHONETIC]
expected : הידד!
whisper-he: רי דאד
generic  : Hey dad

## pr_12  [PHONETIC]
expected : מצאת!
whisper-he: מה זה?
generic  : मचात (v1) / What's that? (v2 matz-AT retake)
